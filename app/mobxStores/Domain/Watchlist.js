import { observable, action, computed, toJS } from 'mobx';
// import { getWatchlistData as getWatchlistDataApi } from '../../api';

export default class Watchlist {

  @observable watchlistData = null;

  @observable listOrder = ["0", "1", "2", "3", "4", "5"];

  @action setWatchlistData = (data) => {
    this.scannerData = data;
  }

  @action getWatchlistData = () => {
    let params = {}
    // getWatchlistDataApi(params)
    // .then((res) => {
    //   console.log('trending data', res)
    // })
    // .catch((err) => {
    //   console.log('trending data err', err)
    // })
  }



  @action saveListOrderChange = (newOrder) => {
    console.log('save new order change', newOrder)
  }

  @action onRowMove = (e) => {
    console.log('row moved', e)
  }

  @action removeFromWatchlist = (itemToRemove) => {
    console.log('REMOVE THIS', itemToRemove);

  }

  @computed get watchlistOrderJS() {
    return toJS(this.listOrder);
  }

  @computed get watchlistDataJS() {
    let listData = [
      { sym: 'ETH', exch: 'NYSE', name: 'Ethereum', img: require('../../images/momo_watch_01.gif'), vol: '24.9M', price: '30.75', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
      { sym: 'AMID', exch: 'NYSE', name: 'American Midstream', img: require('../../images/momo_watch_02.gif'), vol: '65.2M', price: '12.45', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
      { sym: 'AAPL', exch: 'NASDAQ', name: 'Apple, Inc.', img: require('../../images/momo_watch_03.gif'), vol: '16.3M', price: '146.19', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
      { sym: 'TSLA', exch: 'NASDAQ', name: 'Tesla Motors, Inc.', img: require('../../images/momo_watch_01.gif'), vol: '5.3M', price: '378.47', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
      { sym: 'SPH', exch: 'NYSE', name: 'Suburban Propan', img: require('../../images/momo_watch_04.gif'), vol: '37.9M', price: '24.31', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
      { sym: 'NGG', exch: 'NYSE', name: 'National Grid PLC', img: require('../../images/momo_watch_02.gif'), vol: '12.4M', price: '64.85', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
    ]
    return listData;
  }

}
