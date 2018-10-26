import { observable, action, computed, toJS } from 'mobx';
import { numberWithCommas } from '../../utility';
import {
  buy as buyApiCall,
  sell as sellApiCall,
  cover as coverApiCall,
  short as shortApiCall
} from '../../api';
import { chartStore, myAccountStore } from '../';
import { validity_props, order_type } from '../../constants';

export default class BuySellStore {
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
      if (parseFloat(curNums) < 1000000000) {
        this.setQuantity(curNums);
      }
    } else if (type === 'price') {
      if (num === '.') {
        if (this.price.includes('.')) {
          return;
        }
      }
      if (this.price == null) {
        curNums = num;
      } else {
        curNums = this.price + '' + num;
      }
      if (parseFloat(curNums) < 10000000) {
        this.setPrice(curNums);
      }
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
    return numberWithCommas(calculatedCost,2);
    // return calculatedCost.toFixed(2);
  }

  // Constructs the total cost when the price is entered manually
  @computed get calculatedCostCustom() {
    const { tickerDataJS } = chartStore;
    if (this.quantity === '' || this.quantity === undefined || !tickerDataJS) {
      return 0
    }
    const { Price } = tickerDataJS;
    let calculatedCost = parseInt(this.quantity) * Price;
    if (this.price !== 0 && this.price !== '') {
      calculatedCost = parseInt(this.quantity) * this.price;
    }
    return numberWithCommas(calculatedCost,2);
  }

  @observable transactionType = '';
  @action setTransactionType = (name) => {
    console.info('set transaction type', name);
    this.transactionType = name;
  }

  @computed get transactionLoading() {
    if (transactionInProgress) {
      return true;
    } else {
      return false;
    }
  }

  @action makeTransaction = (targetStockData) => {
    console.info('======= TRANSACTION TYPE', this.transactionType);
    console.info('========= targetStockData', targetStockData);
    if (this.transactionType === 'Buy') {
      return this.conductTransaction(targetStockData, buyApiCall);
    } else if (this.transactionType === 'Sell') {
      return this.conductTransaction(targetStockData, sellApiCall);
    } else if (this.transactionType === 'Short') {
      return this.conductTransaction(targetStockData, shortApiCall);
    } else if (this.transactionType === 'Cover') {
      return this.conductTransaction(targetStockData, coverApiCall);
    }
  }

  @action _conductTransaction = (targetStockData, functionToCall) => {
    return new Promise((resolve, reject) => {
      this.transactionInProgress = true;
      // orderOption[market, limit]
      // orderValidity[dayOnly, extended, GTC]
      // account[savings, checking]

      // let params = {
      //   ticker: 'AAPL',
      //   shares: 10,
      //   orderOption: 'market',
      //   account: 'savings',
      //   commission: 10
      // }
      let params = {
        ticker: targetStockData.ticker,
        shares: Number(this.quantity),
        orderOption: this.orderTypeName,
        account: 'savings',
        commission: 0
      };

      functionToCall(params)
        .then((res) => {
          console.info('transaction res', res);
          this.transactionInProgress = false;
          if (res.ok !== true) {
            if (res.json.error) {
              if (res.json.error.message) {
                return reject(res.json.error.message);
              }
            }
            return reject('There was an error. Please try again later');
          }
          return resolve();
        })
        .catch((err) => {
          console.info('transaction err', err);
          this.transactionInProgress = false;
          return reject(err);
        });
    });
  };

  @action conductTransaction = (targetStockData, functionToCall) => {
    return new Promise((resolve, reject) => {
      this.transactionInProgress = true;
      // orderOption[market, limit]
      // orderValidity[dayOnly, extended, GTC]
      // account[savings, checking]


      let params = {
        ticker: targetStockData.ticker,
        shares: Number(this.quantity),
        orderOption: this.orderTypeName,
        account: 'savings',
        commission: 0
      };

      console.info('conduct transaction');
      console.info({...params, thisdotprice: this.price, orderValidity: validity_props[this.validityIndex].query })

      if (this.orderTypeName === 'limit') {
        if (this.price === 0) {
          return reject('Please Enter a price');
        }
        params['limitPrice'] = this.price;
      }

      if (this.orderTypeName === 'limit' || this.orderTypeName === 'stop_loss') {
        params['orderValidity'] = validity_props[this.validityIndex].query;
      }

      functionToCall(params)
        .then((res) => {
          console.info('transaction res', res);
          this.transactionInProgress = false;
          if (res.ok !== true) {
            if (res.json.error) {
              if (res.json.error.message) {
                return reject(res.json.error.message);
              }
            }
            return reject('There was an error. Please try again later');
          }
          myAccountStore.addNewOrder(res.json.result.order);
          return resolve();
        })
        .catch((err) => {
          console.info('transaction err', err);
          this.transactionInProgress = false;
          return reject(err);
        });
    });
  };
}
