import { observable, action, computed, toJS } from 'mobx';
import { buy as buyApiCall, sell as sellApiCall } from '../../api';
import { chartStore } from '../';
import { validity_props, order_type } from '../../constants';

export default class BuySellStore {
  constructor() {
  }

  @observable commission = 0;

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
    console.log('======= TRANSACTION TYPE', this.transactionType)
    if(this.transactionType === 'Buy') {
      return this.buy();
    } else if(this.transactionType === 'Sell') {
      return this.sell();
    }
  }


// ticker(required),
// shares(required),
// orderOption(required),
// limitPrice,
// orderValidity,
// account(required),
// commission(required)

// ticker=AAPL&shares=10&orderOption=market&account=savings&commission=10

// orderOption[market, limit, stopLoss], orderValidity[dayOnly, extended, GTC], account[savings, checking]

  @action sell = () => {
    return new Promise((resolve, reject) => {
      console.log('SELL', this);

      console.log('quantity', this.quantity)
      console.log('validityIndex', this.validityIndex)
      console.log('orderTypeIndex', this.orderTypeIndex)

      this.sellInProgress = true;

      let params = {
        ticker: 'AAPL',
        shares: 10,
        orderOption: 'market',
        account: 'savings',
        commission: this.commission

        // limitPrice,
        // orderValidity,
      }

      sellApiCall(params)
      .then((res) => {
        console.log('sell res', res);
        this.sellInProgress = false;
        resolve(res);
      })
      .catch((err) => {
        console.log('sell err', err);
        this.sellInProgress = false;
        reject(err);
      })
    })
  }

  @action shortSell = () => {
    return new Promise((resolve, reject) => {

      resolve();
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
        commission: this.commission
      }

      console.log('BUY', params, validity_props[this.validityIndex].query, order_type[this.orderTypeIndex].query)

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
      })

    })
  }

}
