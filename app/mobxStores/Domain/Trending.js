import { observable, action, computed, toJS } from 'mobx';
import { getTrendingData as getTrendingDataApi } from '../../api';
import { watchListStore, colorStore } from '../index';
import { millionBillionFormatter, formatPrice } from '../../utility';
import { sectorIndustriesStore } from '../';

import {
  scan_props,
  sector_props,
  industry_utilities,
  industry_telecomm,
  industry_realestate,
  industry_materials,
  industry_infotech,
  industry_industrials,
  industry_health,
  industry_financials,
  industry_energy,
  industry_consumerstaples,
  industry_consumerdiscretionary
} from '../../constants';

export default class Trending {

  @observable trendingData = [];
  @observable currentPage = 0;
  @observable totalPages = 0;
  @observable pageSize = 0;

  @observable trendingLoading = false;

  @observable displayDecimal = false;

  @observable trendingOption = 0;

  @observable industryOption = 0;

  @observable sectorOption = 0;

  @action setSectorOption = (newOption) => {
    console.log('SET SECOTR', newOption);
    this.industryOption = 0;
    this.sectorOption = newOption;
    this.getTrendingData()
  }

  @action setIndustryOption = (newOption) => {
    console.log('Set new industry option', newOption)
    this.industryOption = newOption;
    this.getTrendingData()
  }

  @action setTrendingOption = (newOption) => {
    this.trendingOption = newOption;
    this.getTrendingData()
  }


  @action setLoading = (newVal) => {
    if(this.pageNumber > 1) {
      this.newPageLoading = newVal;
    } else {
      this.trendingLoading = newVal;
    }
  }

  @action setTrendingData = (data) => {
    if(!data) {
      this.trendingData = [];
      this.currentPage = 0;
      this.totalPages = 0;
      this.pageSize = 0;

    } else if(this.pageNumber === 1) {

      this.trendingData = data.data;
      this.currentPage = data.current_page;
      this.totalPages = data.total_pages;
      this.pageSize = data.page_size;

    } else if(this.pageNumber > 1) {
      let oldDataPlusNewPage = toJS(this.trendingData).concat(data.data);
      this.trendingData = oldDataPlusNewPage;
      this.currentPage = data.current_page;
      this.totalPages = data.total_pages;
      this.pageSize = data.page_size;

    }
  }

  @computed get trendingDataJS() {
    const { theme } = colorStore;
    const { watchlistDataJS } = watchListStore;
    const watchListItems = watchlistDataJS;
    if(!this.trendingData) {
      return []
    } else {
      return toJS(this.trendingData)
      .map(data => {
        let parseData = {
          ...data,
          latestPriceFormatted: formatPrice(data.latestPrice),
          latestVolumeFormatted: millionBillionFormatter(data.latestVolume),
          posNegColor: data.change > 0 ? theme.green : theme.red
        }
        if(watchListItems.length > 0) {
          parseData.inWatchList = watchListItems.some(({ ticker }) => ticker === data.ticker)
        }
        return parseData;
      });
    }

  }

  @action addSymToWatchList = ticker => {
    watchListStore.addTickerToWatchList(ticker);
  }

  @action removeSymFromWatchList = ticker => {
    watchListStore.removeTickerFromWatchList(ticker);
  }

  @action setDecimalOrPercentage = (newVal) => {
    this.displayDecimal = newVal;
  }

  @observable newPageLoading = false;
  @observable pageNumber = 1;

  @action getFirstPage = () => {
    this.pageNumber = 1;
    this.getTrendingDataWithPageNumber()
  }

  @action getNextPage = () => {
    this.pageNumber = this.pageNumber + 1;
    this.getTrendingDataWithPageNumber()
  }

  @action getTrendingDataWithPageNumber = () => {
    this.setLoading(true);

    // Deal with adding props to api request around here
    let filterOptions = {
      "trending": scan_props[this.trendingOption].queryString,
      "page": this.pageNumber
    }

    if(sectorIndustriesStore.selectedSectorJS !== 'All' && sectorIndustriesStore.selectedSectorJS !== null) {
      filterOptions.sector = sectorIndustriesStore.selectedSectorJS
    }

    if(sectorIndustriesStore.selectedIndustryJS !== 'All' && sectorIndustriesStore.selectedIndustryJS !== null) {
      filterOptions.industry = sectorIndustriesStore.selectedIndustryJS;
    }

    let params = {
      filter: JSON.stringify(filterOptions)
    }

    getTrendingDataApi(params)
    .then((res) => {
      console.log('trending data', res)
      if(res.ok) {
        this.setTrendingData(res.json.data)
      } else {
        this.setTrendingData(null)
      }
      this.setLoading(false);
    })
    .catch((err) => {
      this.setLoading(false);
      console.log('trending data err', err)
    })
  }

  // this legacy function is called by a view
  @action getTrendingData = () => {
    this.getFirstPage()
  }

}
