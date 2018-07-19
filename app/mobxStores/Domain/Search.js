import { observable, action, computed, toJS } from 'mobx';
import { searchStocks } from '../../api';

export default class Trending {


    @observable searchData = null;

    @action setSearchData = (newData) => {
        this.searchData = newData;
    }

    @computed get searchDataJS() {
        if(!this.searchData) {
            return [];
        } else {
            return toJS(this.searchData);
        }
    }

    @observable searchQuery = '';
    @observable lastQueryTime = 0;

    @action setSearchQuery = (newQuery) => {
        this.searchQuery = newQuery;
        let thisQueryTime = Date.now();
        this.lastQueryTime = this.lastQueryTime;
        this.getSearchData(newQuery, thisQueryTime)
    }

    @observable searchLoading = false;

    @action setLoading = (newVal) => {
        this.searchLoading = newVal;
    }

    @action getSearchData = (newQuery, thisQueryTime) => {

        if(this.searchQuery == '') {
            this.lastQueryTime = Date.now();
            this.searchData = null;
            this.setLoading(false);

            return;
        }

        this.setLoading(true);

        let params = {
            ticker: newQuery
        }

        searchStocks(params)
            .then((res) => {
                if(thisQueryTime < this.lastQueryTime) {
                    // there has been a new call queried out before this one could return
                    // disregard all further output
                    return
                } else {
                    // this is the freshest
                    console.log('trending data', res)
                    if(res.ok) {
                        this.setSearchData(res.json.data)
                    } else {
                        // this.setTrendingData(null)
                    }
                    this.setLoading(false);
                }
            })
            .catch((err) => {
                this.setLoading(false);
                console.log('trending data err', err)
            })

    }

}
