import { observable, action, computed, toJS } from 'mobx';
import { positions, accountOrders } from '../../api';
import moment from 'moment';

export default class MyAccountData {

  constructor() {
  }

  // API CALLS
  @action getBalances = () => {
    this.balanceLoading = true;
    let params = { show: 'balances' }
    accountOrders(params)
    .then((res) => {
      console.log('BALANCES res', res);
      if(res.ok) {
        // save the data
        this.accountValue = res.json.result.accountValue;
        this.cash = res.json.result.cash;
        this.changePercent = res.json.result.changePercent;
        this.checkingAccount = res.json.result.checkingAccount;
        this.savingsAccount = res.json.result.savingsAccount;
        this.securities = res.json.result.securities;
        this.todayChange = res.json.result.todayChange;
        this.total = res.json.result.total;
      }
      this.balanceLoading = false;
    })
    .catch((err) => {
      console.log('err', err);
      this.balanceLoading = false;
    })
  }
  @action getPositions = () => {
    this.positionsLoading = true;
    let params = { show: 'positions' }
    accountOrders(params)
    .then((res) => {
      console.log('POSITIONS res', res);
      if(res.ok) {
        // save the data
        this.positions = res.json;
      }
      this.positionsLoading = false;
    })
    .catch((err) => {
      console.log('err', err);
      this.positionsLoading = false;
    })
  }
  @action getHistory = () => {
    this.historyLoading = true;
    let params = { show: 'history' }
    accountOrders(params)
    .then((res) => {
      console.log('HISTORY res', res);
      if(res.ok) {
        // save the data
        this.history = res.json.result.history;
      }
      this.historyLoading = false;
    })
    .catch((err) => {
      console.log('err', err);
      this.historyLoading = false;
    })
  }

  @action getMyAccountData = () => {
    this.getBalances();
    this.getPositions();
    this.getHistory();
  };



  // ACCOUNT BALANCE DETAILS
  @observable accountValue = 0;
  @computed get accountValueJS() {
    return '$' + this.accountValue.toFixed(2);
  }

  @observable cash = 0;
  @observable changePercent = 0;
  @computed get changePercentJS() {
    let plusString = '';
    if(this.changePercent > 0) {
      plusString = '+';
    }
    return plusString + this.changePercent.toFixed(2) + '%';
  }

  @observable checkingAccount = 0;
  @observable savingsAccount = 0;
  @observable securities = 0;
  @observable todayChange = 0;

  @computed get todayChangeJS() {
    let plusOrMinusChar = '+';
    if(this.todayChange < 0) {
      // minus is already included
      plusOrMinusChar = '';
    }
    return plusOrMinusChar + this.todayChange.toFixed(2);
  }

  @observable total = 0;

  @observable positionsLoading = false;
  @observable positions = [];
  @computed get positionsJS() {
    // if(posi)
    console.log('=== GETTING POSTIONS', toJS(this.positions))
    return [];

    // let results = toJS(this.positions).map((elem, i) => {
    //   console.log('===== POSITION elem', elem)
    //   return {
    //     ...elem,
    //     test: 'test??',
    //
    //     companyName: elem.ticker,
    //     companyAbbreviation: elem.ticker,
    //     quantity: elem.shares,
    //
    //     priceChange: '---???',
    //     priceChangePercentage: '---???',
    //     priceChangeDecimal: '----???',
    //     priceChangeColor: '---???',
    //
    //     marketValuation: '-???',
    //     marketChangePercentage: '???',
    //     marketChangeDecimal: '-???',
    //     marketChangeColor: '-???'
    //   }
    // })
    // return results;
  }
  @computed get positionTotalsJS() {
    return {
      total: '3890.29',
      decimalChange: '+1.85',
      decimalChangeColor: 'red'
    }
  }



  @computed get anythingLoading() {
    return this.balanceLoading || this.positionsLoading || this.historyLoading;
  }

@computed get myAccoutDataJS() {
  return {
    totalAccountValue: '5484.00',
    todaysChange: '+385.58',
    todaysChangePercentage:'+7.04',
  }
}

////// BALANCE
@observable balanceLoading = false;
@computed get balancesJS() {
    let balanceData = {
      investments: {
        total: this.total.toFixed(2),
        securities: this.securities.toFixed(2),
        cash: this.cash.toFixed(2),
        options: '880?????'
      },
      fundsAvailable: {
        toTrade: '3890.28?????',
        toWithdraw: '1535.29?????'
      }
    }
    return balanceData;
  }

  ////// HISTORY
  // commission
  // :
  // 10
  // companyName
  // :
  // "Apple Inc."
  // createdAt
  // :
  // "2018-08-15T18:31:53.000Z"
  // orderType
  // :
  // "buy"
  // price
  // :
  // 209.23
  // shares
  // :
  // 10
  // ticker
  // :
  // "AAPL"
  // totalAmount
  // :
  // 2102.3


  @observable historyLoading = false;
  @observable history = [];
  @computed get historyJS() {
    let historyData = toJS(this.history).map((elem, i) => {
      // console.log('====== EACH HISTORY', elem);
      return {
        datestamp: moment(elem.createdAt).format('MMMM DD, YYYY'),
        values: [{
          buyOrSell: elem.orderType == 'buy',
          companyName: elem.companyName,
          companyAbbreviation: elem.ticker,
          shares: elem.shares,
          totalAmount: elem.totalAmount.toFixed(2)
        }]
      }
    });
    return historyData;
  }


}
