import { observable, action, computed, toJS } from 'mobx';
import { accountOrders } from '../../api';
import { colorStore } from '../';
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
        console.log(20, res.json.result);
        // save the data
        this.accountValue = res.json.result.accountValue;
        this.cash = res.json.result.cash;
        this.changePercent = res.json.result.changePercent;
        this.checkingAccount = res.json.result.checkingAccount;
        this.savingsAccount = res.json.result.savingsAccount;
        this.securities = res.json.result.securities;
        this.todayChange = res.json.result.todayChange;
        this.todayChangeChangePercent = res.json.result.todayChangeChangePercent;
        this.overallChange = res.json.result.overallChange;
        this.overallChangePercent = res.json.result.overallChangePercent;
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
        this.positions = res.json.result.position;
        this.positionsTotal = res.json.result.total;
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
    if(this.total === null) {
      return '0.00'
    }
    
    return '$' + this.total.toFixed(2);
  }

  @observable cash = 0;
  @observable changePercent = 0;
  @observable todayChangeChangePercent = 0;
  @observable overallChange = 0;
  @observable overallChangePercent = 0;
  @computed get changePercentJS() {
    if (this.todayChangeChangePercent === null) {
      return '0.00'
    }
    let plusString = '';
    if (this.todayChangeChangePercent > 0) {
      plusString = '+';
    }
    return plusString + this.todayChangeChangePercent.toFixed(2) + '%';
  }

  @observable checkingAccount = 0;
  @observable savingsAccount = 0;
  @observable securities = 0;
  @observable todayChange = 0;

  @computed get todayChangeJS() {
    if(this.todayChange === null) {
      return '0.00';
    }
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
  @observable positionsTotal = 0;

  @computed get positionsJS() {
    const { theme } = colorStore;

    console.log('=== GETTING POSTIONS', toJS(this.positions))

    let positionsArray = toJS(this.positions);
    if(positionsArray.length === 0) {
      return [];
    } else {
      let results = toJS(this.positions).map((elem, i) => {
       console.log('===== POSITION elem', elem, theme)

        // what to do with these?
        // valuationChange

        let priceChangeColor = 'red';
        if(elem.changePercent > 0) {
          priceChangeColor = 'green';
        }

        let marketValuationChangeColor = 'red';
        if(elem.valuationChange > 0) {
          marketValuationChangeColor = 'green';
        }

       return {
         ...elem,
         test: 'test??',

         companyName: elem.companyName,
         companyAbbreviation: elem.ticker,
         quantity: elem.quantity,

         priceChange: elem.latestPrice,
        //  priceChangePercentage: elem.priceChangePercentage,
         priceChangePercentage: elem.changePercent,
        //  priceChangeDecimal: '----???',
         priceChangeDecimal: elem.change,
         priceChangeColor: priceChangeColor,

         marketValuation: elem.marketValuation,
        //  marketChangePercentage: '???',
         marketChangePercentage: elem.valuationChangePercent,
         marketChangeDecimal: elem.valuationChange,
         marketChangeColor: marketValuationChangeColor
       }
     })
     return results;
    }
  }
  @computed get positionTotalsJS() {
    return {
      total: this.positionsTotal,
      decimalChange: this.overallChange.toFixed(2),
      decimalChangePct: this.overallChangePercent,
      decimalChangeColor: (this.overallChange < 0 ? 'red' : 'green')
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
        total: '0.00',
        securities: '0.00',
        cash: '0.00',
        options: '---?'
      },
      fundsAvailable: {
        toTrade: '0.00',
        toWithdraw: '0.00'
      }
    }

    if(this.total) {
      balanceData.investments.total = this.total.toFixed(2);
    }
    if(this.securities) {
      balanceData.investments.securities = this.securities.toFixed(2);
    }
    if(this.cash) {
      balanceData.investments.cash = this.cash.toFixed(2);
      balanceData.fundsAvailable.toTrade = this.cash.toFixed(2);
      balanceData.fundsAvailable.toWithdraw = this.cash.toFixed(2);
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
          price: elem.price,
          shares: elem.shares,
          totalAmount: elem.totalAmount
        }]
      }
    });
    return historyData;
  }


}
