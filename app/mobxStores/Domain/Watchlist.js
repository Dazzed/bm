import { observable, action, computed, toJS } from 'mobx';
// import { getWatchlistData as getWatchlistDataApi } from '../../api';

export default class Watchlist {

  @observable watchlistData = null;

  @action setWatchlistData = (data) => {
    this.scannerData = data;
  }

  @computed get watchlistDataJS() {
    return toJS(this.watchlistData)
  }

  @action getWatchlistData = () => {
    let params = {

    }
    // getWatchlistDataApi(params)
    // .then((res) => {
    //   console.log('trending data', res)
    // })
    // .catch((err) => {
    //   console.log('trending data err', err)
    // })
  }

}
