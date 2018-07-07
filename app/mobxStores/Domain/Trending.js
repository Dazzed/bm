import { observable, action, computed, toJS } from 'mobx';
// import { getTrendingData as getTrendingDataApi } from '../../api';

export default class Trending {

  @observable trendingData = null;

  @action setTrendingData = (data) => {
    this.scannerData = data;
  }

  @computed get trendingDataJS() {
    return toJS(this.trendingData)
  }

  @computed get trendingListJS() {
    let list = [
      {
        name: 'Etherem',
        sym: 'ETH',
        volume: '65.2M',
        price: '30.75',
        posNeg: 'green',
        changePerc: '1.85',
        watching: true
      },
      {
        name: 'American Midstream',
        sym: 'AMID',
        volume: '34.2M',
        price: '12.45',
        posNeg: 'red',
        changePerc: '2.12',
        watching: false
      }
    ]
    return list;
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
  }

}
