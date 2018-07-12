import { observable, action, computed, toJS } from 'mobx';
// import { getTrendingData as getTrendingDataApi } from '../../api';
import { watchListStore } from '../index';

let list = [
  {
    sym: 'ETH',
    exch: 'NYSE',
    name: 'Ethereum',
    vol: '24.9M',
    price: '30.75',
    time: '12:30 PM PT',
    posNeg: 'green',
    change: '+1.85',
    changePerc: '+10.41%',
    stockChange: true,
  },
  {
    sym: 'AMID',
    exch: 'NYSE',
    name: 'American Midstream',
    vol: '65.2M',
    price: '12.45',
    time: '12:30 PM PT',
    posNeg: 'red',
    change: '-3.12',
    changePerc: '-2.15%',
    stockChange: true,
  },
  {
    sym: 'AAPL',
    exch: 'NASDAQ',
    name: 'Apple, Inc.',
    vol: '16.3M',
    price: '146.19',
    time: '12:30 PM PT',
    posNeg: 'green',
    change: '+2.01',
    changePerc: '+2.43%',
    stockChange: true,
  },
  {
    sym: 'TSLA',
    exch: 'NASDAQ',
    name: 'Tesla Motors, Inc.',
    vol: '5.3M',
    price: '378.47',
    time: '12:30 PM PT',
    posNeg: 'green',
    change: '+3.10',
    changePerc: '+1.05%',
    stockChange: true,
  },
  {
    sym: 'SPH',
    exch: 'NYSE',
    name: 'Suburban Propan',
    vol: '37.9M',
    price: '24.31',
    time: '12:30 PM PT',
    posNeg: 'red',
    change: '-4.43',
    changePerc: '-5.64%',
    stockChange: true,
  },
  {
    sym: 'NGG',
    exch: 'NYSE',
    name: 'National Grid PLC',
    vol: '12.4M',
    price: '64.85',
    time: '12:30 PM PT',
    posNeg: 'green',
    change: '+0.15',
    changePerc: '+4.04%',
    stockChange: true,
  },
];

export default class Trending {

  @observable trendingData = [];

  @observable trendingLoading = false;

  @observable displayDecimal = false;

  @observable trendingOption = 0;

  @observable industryOption = 0;

  @observable sectorOption = 0;

  @action setSectorOption = (newOption) => {
    this.sectorOption = newOption;
    this.industryOption = 0;
    this.getTrendingData()
  }

  @action setIndustryOption = (newOption) => {
    this.industryOption = newOption;
    this.getTrendingData()
  }

  @action setTrendingOption = (newOption) => {
    this.trendingOption = newOption;
    this.getTrendingData()
  }


  @action setLoading = (newVal) => {
    this.trendingLoading = newVal;
  }

  @action setTrendingData = (data) => {
    this.trendingData = data;
  }

  @computed get trendingDataJS() {
    const watchListItems = watchListStore.watchlistDataJS;
    return toJS(this.trendingData)
      .map(data => ({
        ...data,
        watching: watchListItems.some(({ ticker }) => ticker === data.sym)
      }))
  }

  @action addSymToWatchList = sym => {
    watchListStore.addTickerToWatchList(sym);
  }

  @action removeSymFromWatchList = sym => {
    console.info('removeSymFromWatchList', sym);
    watchListStore.removeTickerFromWatchList(sym);
  }

  @action setDecimalOrPercentage = (newVal) => {
    this.displayDecimal = newVal;
  }

  @action getTrendingData = () => {

    let params = {

    }
    // getTrendingDataApi(params)
    // .then((res) => {
    //   console.log('trending data', res)
    // })
    // .catch((err) => {
    //   console.log('trending data err', err)
    // })

    this.setLoading(true);
    setTimeout(() => {
      this.setTrendingData(list);
      this.setLoading(false);
    }, 500)

  }

}
