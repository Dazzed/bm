import { observable, action, computed, toJS } from 'mobx';
import { getNewsList } from '../../api/index';

export default class News {

    @observable newsData = null;
    @observable newsDataLoading = false;

    @action setNewsDataLoading = (loadingBool) => {
        this.newsDataLoading = loadingBool;
    }

    @action setNewsData = (data) => {
        this.newsData = data;
    }

    @computed get newsArticleListJS() {
        if(!this.newsData) {
            return [];
        } else {
            return toJS(this.newsData.articles)
        }
    }

    @computed get newsDataJS() {
        if(!this.newsData) {
            return [];
        } else {
            return toJS(this.newsData)
        }
    }

    @action getNewsData = (params) => {
        console.log('===== GETTING NEWS DATA ========')

        // reset
        this.setNewsData(null)

        this.setNewsDataLoading(true);

        getNewsList(params)
            .then((res) => {

                console.log('news data', res)
                if(res.ok) {
                    this.setNewsData(res.json.data);
                } else {
                    console.log('======= ERROR')
                }
                this.setNewsDataLoading(false);
            })
            .catch((err) => {
                console.log('account data err', err);
                this.setNewsDataLoading(false);
            })
    }

}