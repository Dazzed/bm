import { observable, action, computed, toJS } from 'mobx';
import { getTickerDetails } from '../../api';

export default class AccountStore {

    constructor() {
    }

    @observable chartData = null;
    @observable chartLoading = true;

    @action setChartLoading = (loadingBool) => {
      this.chartLoading = loadingBool;
    }

    @action setChartData = (data) => {
      this.chartData = data;
    }

    @action getChartData = (data) => {
        console.log('===== get chart data', data)
      let symbol = data.ticker;
      this.setChartLoading(true);

      let params = {
        ticker: symbol
      }
      getTickerDetails(params)
      .then((res) => {
          console.log('GET CHART DATA', res);
        if(res.ok) {
          this.setChartData(res.json.result);
        } else {
        }
        this.setChartLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        this.setChartLoading(false);
      })

    }

    @computed get chartDataJS() {
      if(this.chartData === null) {
        return null;
      } else {
        return toJS(this.chartData);
      }
    }

}
