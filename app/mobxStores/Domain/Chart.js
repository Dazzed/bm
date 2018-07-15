import { observable, action, computed, toJS } from 'mobx';
import { getTickerDetails, getStockChartDetail } from '../../api';

export default class AccountStore {

    constructor() {
    }

    @observable chartData = null;
    @observable chartLoading = true;

    @action setTickerDataLoading = (loadingBool) => {
      this.chartLoading = loadingBool;
    }

    @action setTickerData = (data) => {
      this.chartData = data;
    }

    @action getTickerDetails = (data) => {
        console.log('===== get ticker data', data)
      let symbol = data.ticker;
      this.setTickerDataLoading(true);
      let params = {
        ticker: symbol
      }
      getTickerDetails(params)
      .then((res) => {
          console.log('GET TICKER DATA', res);
        if(res.ok) {
          this.setTickerData(res.json.result);

          this.getStockChartDetails();

        } else {
        }
        this.setTickerDataLoading(false);
      })
      .catch((err) => {
        console.log('err', err);
        this.setTickerDataLoading(false);
      })
    }

    @computed get tickerDataJS() {
      if(this.chartData === null) {
        return null;
      } else {
        return toJS(this.chartData);
      }
    }


    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////


    @observable range = '1y';

    @action setRange = (newRange) => {
        this.range = newRange;
        this.getStockChartDetails();
    }

    @observable stockChartLoading = true;
    @action setStockChartLoading = (newBool) => {
        this.stockChartLoading = newBool;
    }

    @observable indicatorsList = [];
    @action setIndicatorsList = (newList) => {
        console.log('NEW INDICATORS LIST INCOMING', newList)
        this.indicatorsList = newList;
    }

    @action getStockChartDetails = () => {

        if(this.chartData === null) {
            return;
        }

        this.setStockChartLoading(true);

        console.log('chartData ============================================= ', this.tickerDataJS.ticker);

        // let symbol = data.ticker;

        // this.setTickerDataLoading(true);

        // ["OBV","TRND","ICHI","EMA","MACD","RSI","BOL"]

        // "parameters":{
        //     "ICHI":{
        //         "conversionPeriod": 9,
        //             "basePeriod": 26,
        //             "spanPeriod": 52,
        //             "displacement": 26
        //     },
        //     "EMA":{
        //         "period":50
        //     },
        //     "MACD":{
        //         "fastPeriod": 5,
        //             "slowPeriod": 8,
        //             "signalPeriod": 3,
        //             "SimpleMAOscillator": false,
        //             "SimpleMASignal": false
        //     },
        //     "RSI":{
        //         "period":14
        //     },
        //     "BOL":{
        //         "period":14,
        //             "stdDev":2
        //     }
        // }

        let params = {
            "ticker": this.tickerDataJS.ticker,
            "range": this.range,
            "indicator": toJS(this.indicatorsList),

        }


        getStockChartDetail(params)
        .then((res) => {
            console.log('GET CHART DATA', res);
            // if(res.ok) {
            //     this.setTickerData(res.json.result);
            // } else {
            // }
            // this.setTickerDataLoading(false);
            this.setStockChartLoading(false);
        })
        .catch((err) => {
            console.log('err', err);
            // this.setTickerDataLoading(false);

            this.setStockChartLoading(false);
        })
    }

}
