import { observable, action, computed, toJS } from 'mobx';
import { buy as buyApiCall, sell as sellApiCall } from '../../api';
import { chartStore } from '../';
import { validity_props, order_type } from '../../constants';

export default class BuySellStore {
  constructor() {
  }

  @observable transactionInProgress = false;

  @observable quantity = '';
  @observable price = '';
  @observable validityIndex = 0;

  @observable orderTypeName = 'market';

  @action setOrderTypeName = value => {
    this.orderTypeName = value;
  }

  @action setValidityIndex = (val) => {
    this.validityIndex = val;
  }

  @action setQuantity = (val) => {
    this.quantity = val;
  }

  @action setPrice = val => {
    this.price = val;
  }

  @action addNumber = (num, type) => {
    let curNums;
    if (type === 'quantity') {
      if (this.quantity == null) {
        curNums = num;
      } else {
        curNums = this.quantity + '' + num;
      }
      this.setQuantity(curNums);
    } else if (type === 'price') {
      if (this.price == null) {
        curNums = num;
      } else {
        curNums = this.price + '' + num;
      }
      this.setPrice(curNums);
    } else {
      throw new Error(`Domain/BuySell.js addNumber(), Expected one of quantity or price. Received '${type}'`)
    }
  }
  @action removeNumber = (num, type) => {
    if (type === 'quantity') {
      if (this.quantity) {
        let delNums = this.quantity;
        delNums = delNums.substr(0, delNums.length - 1);
        this.setQuantity(delNums);
      }
    } else if (type === 'price') {
      if (this.price) {
        let delNums = this.price;
        delNums = delNums.substr(0, delNums.length - 1);
        this.setPrice(delNums);
      }
    } else {
      throw new Error(`Domain/BuySell.js removeNumber(), Expected one of quantity or price. Received '${type}'`)
    }
  }

  @computed get calculatedCost() {
    const { tickerDataJS } = chartStore;
    if (this.quantity === '' || this.quantity === undefined || !tickerDataJS) {
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
    if (transactionInProgress) {
      return true;
    } else {
      return false;
    }
  }

  @action makeTransaction = () => {
    console.log('======= TRANSACTION TYPE', this.transactionType)
    if (this.transactionType === 'Buy') {
      return this.buy()
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


      this.buyInProgress = true;

      // orderOption[market, limit]
      // orderValidity[dayOnly, extended, GTC]
      // account[savings, checking]

      let params = {
        ticker: 'AAPL',
        shares: 10,
        orderOption: 'market',
        account: 'savings',
        commission: 10
      }


      const orderTypeIndex = order_type.findIndex(t => t.name === this.orderTypeName);
      console.log('BUY', params, validity_props[this.validityIndex].query, order_type[orderTypeIndex].query)

      buyApiCall(params)
        .then((res) => {
          console.log('buy res', res);
          this.buyInProgress = false;
          resolve();
        })
        .catch((err) => {
          console.log('buy err', err);
          this.buyInProgress = false;
          reject(err);
        });
    });
  }

}
