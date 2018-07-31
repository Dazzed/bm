import { observable, action, computed, toJS } from 'mobx';
import { buy as buyApiCall, sell as sellApiCall } from '../../api';
import { chartStore } from '../'

export default class BuySellStore {
  constructor() {
  }

  @observable buyInProgress = false;
  @observable sellInProgress = false;
  @observable quantity = '';

  @action setQuantity = (val) => {
    console.log('set quantity', val);
    this.quantity = val;
  }

  @computed get calculatedCost() {
    const { tickerDataJS } = chartStore;
    if(this.quantity === '' || this.quantity === undefined || !tickerDataJS) {
      return 0
    }
    const { Price } = tickerDataJS;
    console.log('---- calculate cost', this.quantity, parseInt(this.quantity), Price)
    let calculatedCost = parseInt(this.quantity) * Price;
    return calculatedCost.toFixed(2);
  }

  @observable transactionType = '';
  @action setTransactionType = (name) => {
    console.log('set transaction type', name);
    this.transactionType = name;
  }

  @computed get transactionLoading() {
    if(buyInProgress || sellInProgress) {
      return true;
    } else {
      return false;
    }
  }

  @action makeTransaction = () => {
    console.log('=========== MAKE TRANSACTION!!!')
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
