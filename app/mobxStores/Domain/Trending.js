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
    this.trendingLoading = newVal;
  }

  @action setTrendingData = (data) => {
    if(!data) {
      this.trendingData = [];
      this.currentPage = 0;
      this.totalPages = 0;
      this.pageSize = 0;
    } else {
      this.trendingData = data.data;
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

  @computed get currentIndustryOptions() {
     if(this.sectorOption === null) {
       return null;
     }
     if(this.sectorOption === 0) {
       return industry_consumerdiscretionary
     }
     if(this.sectorOption === 1) {
       return industry_consumerdiscretionary
     }
     if(this.sectorOption === 2) {
       return industry_consumerstaples
     }
     if(this.sectorOption === 3) {
       return industry_energy
     }
     if(this.sectorOption === 4) {
       return industry_financials
     }
     if(this.sectorOption === 5) {
       return industry_health
     }
     if(this.sectorOption === 6) {
       return industry_industrials
     }
     if(this.sectorOption === 7) {
       return industry_infotech
     }
     if(this.sectorOption === 8) {
       return industry_materials
     }
     if(this.sectorOption === 9) {
       return industry_realestate
     }
     if(this.sectorOption === 10) {
       return industry_telecomm
     }
     if(this.sectorOption === 11) {
       return industry_utilities
     }
  }


  @action getTrendingData = () => {
    this.setLoading(true);




    let filterOptions = {
      "trending": scan_props[this.trendingOption].queryString,
    }

    if(sectorIndustriesStore.selectedSectorJS !== 'All') {
      filterOptions.sector = sectorIndustriesStore.selectedSectorJS  
    }

    if(sectorIndustriesStore.selectedIndustryJS !== 'All') {
      filterOptions.industry = sectorIndustriesStore.selectedIndustryJS;
    }

    console.log('=============== params', filterOptions, sectorIndustriesStore.selectedSectorJS, sectorIndustriesStore.selectedIndustryJS )

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

}
