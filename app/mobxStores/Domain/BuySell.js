import { observable, action, computed, toJS } from 'mobx';
import { buy as buyApiCall, sell as sellApiCall } from '../../api';
import { chartStore } from '../';

export default class BuySellStore {
  constructor() {
  }

  @observable transactionInProgress = false;

  @observable quantity = '';
  @observable validityIndex = 0;

  @observable orderTypeIndex = 0;
  @action setOrderTypeIndex = (value) => {
    console.log('====== setOrderTypeIndex')
    this.orderTypeIndex = value;
  }

  @action setValidityIndex = (val) => {
    this.validityIndex = val;
  }

  @action setQuantity = (val) => {
    this.quantity = val;
  }

  @action addNumber = (num) => {
    let curNums;
    if(this.quantity == null) {
     curNums = num;
    } else {
     curNums = this.quantity + '' + num;
    }
    this.setQuantity(curNums);
  }
  @action removeNumber = (num) => {
    if(this.quantity) {
      var delNums = this.quantity;
      console.log(delNums);
      delNums = delNums.substr(0, delNums.length - 1);
      console.log(delNums);
      this.setQuantity(delNums);
    }
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
    if(transactionInProgress) {
      return true;
    } else {
      return false;
    }
  }

  @action makeTransaction = () => {
    return new Promise((resolve, reject) => {
      this.transactionLoading = true;
      setTimeout(() => {
        this.transactionLoading = false;
        resolve();
      }, 2000)
    })
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
