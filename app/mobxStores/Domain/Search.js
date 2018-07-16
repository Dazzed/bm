import { observable, action, computed, toJS } from 'mobx';
import { searchStocks } from '../../api';

export default class Trending {


    @observable searchQuery = '';

    @action setSearchQuery = (newQuery) => {
        this.searchQuery = newQuery;
        this.getSearchData()
    }

    @observable searchLoading = false;

    @action setLoading = (newVal) => {
        this.searchLoading = newVal;
    }

    @computed get searchDataJS() {
        return toJS(this.searchDataJS);
    }

    @action getSearchData = () => {
        this.setLoading(true);



        let params = {
            ticker: this.searchQuery
        }


        // searchStocks(params)
        //     .then((res) => {
        //         console.log('trending data', res)
        //         if(res.ok) {
        //             this.setTrendingData(res.json.data)
        //         } else {
        //             this.setTrendingData(null)
        //         }
        //         this.setLoading(false);
        //     })
        //     .catch((err) => {
        //         this.setLoading(false);
        //         console.log('trending data err', err)
        //     })

    }

}
