import { observable, action, computed, toJS } from 'mobx';
import { getTickerDetails, getStockChartDetail } from '../../api';
import { initialIndicators, initialChartRangeIndicator } from '../../constants';

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
          // don't do anything
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


    @observable range = initialChartRangeIndicator;

    @action setRange = (newRange) => {
        this.range = newRange;
        this.getStockChartDetails();
    }

    @observable stockChartLoading = true;
    @action setStockChartLoading = (newBool) => {
        this.stockChartLoading = newBool;
    }

    // make sure this initiates the same way in the view state at chart.js
    @observable indicatorsList = initialIndicators;
    @computed get indicatorsListJS() {
      return toJS(this.indicatorsList);
    }
    @action setIndicatorsList = (newList) => {
        this.indicatorsList = newList;
        this.getStockChartDetails();
    }

    @observable chartDetailData = null;
    @action setChartDetailData = (newData) => {
        this.chartDetailData = newData;
    }
    @computed get chartDetailDataJS() {
        return toJS(this.chartDetailData)
    }

    @action getStockChartDetails = () => {

        if(this.chartData === null) {
            return;
        }

        this.setStockChartLoading(true);

        let params = {
          options: {
            'ticker': this.tickerDataJS.ticker,
            'indicator': [ 'OBV', 'TRND', 'ICHI', 'EMA', 'MACD', 'RSI', 'BOL' ],
            'parameters':{
              'ICHI': {
                'conversionPeriod': 9,
                'basePeriod': 26,
                'spanPeriod': 52,
                'displacement': 26
              },
              'EMA': {
                'period':50
              },
              'MACD': {
                'fastPeriod': 5,
                'slowPeriod': 8,
                'signalPeriod': 3,
                'SimpleMAOscillator': false,
                'SimpleMASignal': false
              },
              'RSI': {
                'period':14
              },
              'BOL': {
                'period':14,
                'stdDev':2
              }
            }
          }
        }

        let rangeToQuery = this.range;
        let dataPoints = 30;
        console.log('============ THIS RANGE', this.range);

        // 'range': this.range,
        // "interval":{"periodType":"D","period":10}
        // 'data_point': dataPoints,

        if(this.range == '1h') {

          // one hour
          params.options.range = this.range;
          // params.options.interval = {periodType: "m", period: 60}
          params.options.data_point = 60;

        } else if (this.range == '1d') {

          // five days
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 120;

        } else if (this.range == '5d') {

          // five days
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 120;

        } else if (this.range == '1m') {

          // one month
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 30;

        } else if (this.range == '6m') {

          // six months
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 60;

        } else if (this.range == '1yr') {

          // one year
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 52;

        } else if (this.range == '2yr') {

          // two years
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 52;

        }
        else if (this.range == '5yr') {

          // five years
          params.options.range = this.range;
          // params.options.interval = {periodType: "D", period: 10}
          params.options.data_point = 52;

        }


        getStockChartDetail(params)
        .then((res) => {
            console.log('GET CHART DATA', res);
            if(res.ok) {
                this.setChartDetailData(res.json.result);
            } else {
            }
            this.setStockChartLoading(false);
        })
        .catch((err) => {
            console.log('err', err);
            // this.setTickerDataLoading(false);

            this.setStockChartLoading(false);
        })
    }

}
