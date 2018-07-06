import { observable, action, computed, toJS } from 'mobx';
// import { getTrendingData as getTrendingDataApi } from '../../api';

export default class Trending {

  @observable trendingData = null;

  @action setTrendingData = (data) => {
    this.scannerData = data;
  }

  @computed get trendingDataJS() {
    return toJS(this.trendingData)
  }

  @action getTrendingData = () => {
    let params = {

    }
    // getTrendingDataApi(params)
    // .then((res) => {
    //   console.log('trending data', res)
    // })
    // .catch((err) => {
    //   console.log('trending data err', err)
    // })
  }

}
