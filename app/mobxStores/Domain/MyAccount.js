import { observable, action, computed, toJS } from 'mobx';
// import { getMyAccountData } from '../../api';

export default class MyAccountData {

  constructor() {
  }

  @observable myAccoutData = null;

  @action setMyAccountData = (data) => {
    this.myAccoutData = data;
  }


  @action getMyAccountData = () => {
    let params = {

    }
    getMyAccountData(params)
    .then((res) => {
      console.log('account data', res)
    })
    .catch((err) => {
      console.log('account data err', err)
    });
  };

@computed get myAccoutDataJS() {
  return {
    totalAccountValue: '5484.00',
    todaysChange: '+385.58',
    todaysChangePercentage:'+7.04',
  }
}

@computed get balancesJS() {
    let balanceData = {
      investments: {
        total: '1553.20',
        securities: '949.40',
        cash: '2395.45',
        options: '880'
      },
      fundsAvailable: {
        toTrade: '3890.28',
        toWithdraw: '1535.29'
      }
    }
    return balanceData;
  }

  @computed get positionsJS() {
    let positionData = [
      {
        companyName: 'Apple Computer',
        companyAbbreviation: 'APPL',
        quantity: 10,

        priceChange: '153.53',
        priceChangePercentage: '9.78',
        priceChangeDecimal: '+1.85',
        priceChangeColor: 'green',

        marketValuation: '1535.30',
        marketChangePercentage: '1535.30',
        marketChangeDecimal: '+1.85',
        marketChangeColor: 'green'
      },
      {
        companyName: 'Tesla Motors',
        companyAbbreviation: 'TSLA',
        quantity: 11,

        priceChange: '153.53',
        priceChangePercentage: '9.78',
        priceChangeDecimal: '-1.85',
        priceChangeColor: 'red',

        marketValuation: '1535.30',
        marketChangePercentage: '1535.30',
        marketChangeDecimal: '-1.85',
        marketChangeColor: 'red'

      }
    ]
    return positionData;
  }

  @computed get positionTotalsJS() {
    return {
      total: '3890.29',
      decimalChange: '+1.85',
      decimalChangeColor: 'red'
    }
  }

  @computed get historyJS() {
    let historyData = [
      {
        datestamp: '1232132131',
        values: [{
          buyOrSell: true,
          companyName: 'Tesla Motors',
          companyAbbreviation: 'TSLA'
        },
        {
          buyOrSell: false,
          companyName: 'Tesla Motors',
          companyAbbreviation: 'TSLA'
        }]
      },
      {
        datestamp: '3424234234',
        values: [{
          buyOrSell: false,
          companyName: 'Apple Inc.',
          companyAbbreviation: 'APPL'
        }]
      }
    ];
    return historyData;
  }


}
