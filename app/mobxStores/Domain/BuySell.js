import { observable, action, computed, toJS } from 'mobx';
import { buy as buyApiCall, sell as sellApiCall } from '../../api';

export default class BuySellStore {
  constructor() {
  }

  @observable buyInProgress = false;
  @observable sellInProgress = false;

  @computed get transactionLoading() {
    if(buyInProgress || sellInProgress) {
      return true;
    } else {
      return false;
    }
  }

  @action sell = () => {
    return new Promise((resolve, reject) => {
      console.log('SELL');
      this.sellInProgress = true;
      setInterval(() => {
        this.sellInProgress = false;
        resolve()
      })
    })
  }

  @action buy = () => {
    return new Promise((resolve, reject) => {
      console.log('BUY')
      this.buyInProgress = true;
      setInterval(() => {
        this.buyInProgress = false;
        resolve();
      })
    })
  }

}
