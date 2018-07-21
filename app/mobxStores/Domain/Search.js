import { observable, action, computed, toJS } from 'mobx';
import { searchStocks } from '../../api';

export default class Trending {

    page = 1;
    @observable searchData = null;
    @observable searchLoading = false;
    @observable isFetchingMoreData = false;
    @observable searchQuery = '';
    @observable lastQueryTime = 0;

    @action setSearchData = (newData) => {
        if (newData.current_page !== 1) {
            const {
                current_page,
                total_pages,
                result
            } = newData;
            this.searchData = {
                current_page,
                total_pages,
                result: this.searchData.result.concat(result)
            };
        } else {
            this.searchData = newData;
        }
    }

    @computed get searchDataJS() {
        if (!this.searchData) {
            return [];
        } else {
            return toJS(this.searchData);
        }
    }

    @action setPage = number => {
        this.page = number;
    }

    @action setSearchQuery = (newQuery) => {
        this.setPage(1);
        this.searchQuery = newQuery;
        let thisQueryTime = Date.now();
        this.lastQueryTime = this.lastQueryTime;
        this.getSearchData(newQuery, thisQueryTime)
    }

    @action fetchMoreData = () => {
        if (this.page >= this.searchDataJS.total_pages) {
            return;
        }
        this.setPage(this.page + 1);
        let thisQueryTime = Date.now();
        this.lastQueryTime = this.lastQueryTime;
        this.getSearchData(this.searchQuery, thisQueryTime, true);
    };

    @action setLoading = (newVal) => {
        this.searchLoading = newVal;
    }

    @action setIsFetchingMoreData = newVal => {
        this.isFetchingMoreData = newVal;
    }

    @action getSearchData = (newQuery, thisQueryTime, fromFetchMoreData = false) => {

        if (this.searchQuery == '') {
            this.lastQueryTime = Date.now();
            this.searchData = null;
            this.setLoading(false);
            return;
        }
        if (fromFetchMoreData) {
            this.setIsFetchingMoreData(true);
        } else {
            this.setLoading(true);
        }

        let params = {
            ticker: newQuery,
            page: this.page
        }

        searchStocks(params)
            .then((res) => {
                if (thisQueryTime < this.lastQueryTime) {
                    // there has been a new call queried out before this one could return
                    // disregard all further output
                    return
                } else {
                    // this is the freshest
                    console.log('trending data', res)
                    if (res.ok) {
                        this.setSearchData(res.json.data)
                    } else {
                        // this.setTrendingData(null)
                    }
                    if (fromFetchMoreData) {
                        this.setIsFetchingMoreData(false);
                    } else {
                        this.setLoading(false);
                    }
                }
            })
            .catch((err) => {
                if (fromFetchMoreData) {
                    this.setIsFetchingMoreData(false);
                } else {
                    this.setLoading(false);
                }
                console.log('trending data err', err)
            })
    }

    @action reset = () => {
        this.page = 1;
        this.searchData = null;
        this.searchQuery = '';   
    }

}
