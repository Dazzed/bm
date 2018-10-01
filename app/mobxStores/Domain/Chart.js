import { observable, action, computed, toJS } from 'mobx';
import { getTickerDetails, getStockChartDetail } from '../../api';
import { initialIndicators, initialChartRangeIndicator } from '../../constants';
import largeChartTestData from '../../sharedComponents/ChartGraph/largeChartTestData';
import { showGraphTestPattern } from '../../devControlPanel';
import { modifyTestDataIntoTestPattern } from '../../sharedComponents/ChartGraph/utility';
import { generateChartOptionsQuery } from '../../utility';

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
      // console.log('===== get ticker data', data)
      let symbol = data.ticker;
      this.setTickerDataLoading(true);
      let params = {
        ticker: symbol
      }
      getTickerDetails(params)
      .then((res) => {
        // console.log('GET TICKER DATA', res);
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
    @action initIndicatorsList = () => {
      this.indicatorsList = initialIndicators;
    }

    @observable chartDetailData = null;

    @action resetChartData = () => {
      this.chartDetailData = null;
    }
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

        let params = {}

        let includeICHI = false;
        if(this.indicatorsListJS.indexOf('ICHI') > -1) {
          includeICHI = true;
        }

        params.options = generateChartOptionsQuery(this.tickerDataJS.ticker, this.range, includeICHI)

        // conditinally display test data
        if(showGraphTestPattern) {
          console.log('========== largeChartTestData', largeChartTestData);

          // modify data into test pattern

          this.setChartDetailData( modifyTestDataIntoTestPattern(largeChartTestData.result) );
          this.setStockChartLoading(false);

        } else {

          getStockChartDetail(params)
          .then((res) => {
            console.log('GET CHART DATA', res);
            if(res.ok) {
              this.setChartDetailData(res.json.result);
            } else {
              // do nothing
            }
            this.setStockChartLoading(false);
          })
          .catch((err) => {
            console.log('err', err);
            this.setStockChartLoading(false);
          })

        }

    }

}
