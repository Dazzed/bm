import { observable, action, computed, toJS } from 'mobx';
import { get, deleteRequest, post } from '../../api/apiUtility';
import { sortStringArrayByParam, sortNumberArrayByParam, millionBillionFormatter } from '../../utility';

export default class Watchlist {
  sort_props = [
    { label: 'NONE', value: 0 },
    { label: 'A-Z', value: 1 },
    { label: 'Volume', value: 2 },
    { label: '% Change', value: 3 }
  ];

  constructor() {
    this.getWatchlistData();
  }

  @observable isFetchingWatchlistData = true;
  @observable deletingRecordId = null;
  @observable watchlistData = [];
  @observable listOrder = ["0", "1", "2", "3", "4", "5"];
  @observable sortByIndex = 0;

  @action setWatchlistData = (data) => {
    this.scannerData = data;
  }

  @action getWatchlistData = async () => {
    try {
      const { json: watchlistData } = await get('userWatchLists');
      this.watchlistData = watchlistData;
      this.isFetchingWatchlistData = false;
    } catch (e) {
      this.isFetchingWatchlistData = false;
      console.log('Error in getWatchlistData', e);
    }
  }

  @action onRowMove = async evt => {
    try {
      const targetRowId = evt.row.data.id;
      const indexOfMovingItem = evt.from
      const indexOfReplacingItem = evt.to;
      const watchlistDatatoJS = toJS(this.watchlistData);
      watchlistDatatoJS.move(indexOfMovingItem, indexOfReplacingItem);
      this.watchlistData = watchlistDatatoJS.map((item, index) => ({
        ...item,
        position: index
      }));
      const { json: watchlistData } = await post('userWatchLists/reorderPosition', {
        id: targetRowId,
        newPosition: indexOfReplacingItem
      });
      this.watchlistData = watchlistDatatoJS.map(data => {
        const {
          position: thizPosition,
          id: thizId
        } = watchlistData.find(d => d.ticker === data.ticker);
        return {
          ...data,
          position: thizPosition,
          id: thizId
        };
      });
    } catch (e) {
      console.log('Error in onRowMove', e);
    }
  }

  @action removeFromWatchlist = async itemToDelete => {
    try {
      this.deletingRecordId = itemToDelete.id;
      await deleteRequest(`userWatchLists/${itemToDelete.id}`);
      this.watchlistData = toJS(this.watchlistData).filter(d => d.id !== itemToDelete.id);
      this.deletingRecordId = null;
    } catch (e) {
      console.log('Error in removeFromWatchlist', e);
    }
  }

  @action sortBy = (sortValue) => {
    this.sortByIndex = sortValue;
  }

  @computed get watchlistOrderJS() {
    return toJS(this.listOrder);
  }

  @computed get watchlistDataJS() {
    let originalData = toJS(this.watchlistData);
    let formattedData = originalData.map((data, i) => {
      let thisData = {
        ...data,
        formattedLatestVolume: millionBillionFormatter(data.latestVolume)
      }
      return thisData
    });

    switch (this.sortByIndex) {
      case 0:
        return sortNumberArrayByParam(formattedData, 'position');
      case 1:
        return sortStringArrayByParam(formattedData, 'companyName');
      case 2:
        return sortNumberArrayByParam(formattedData, 'avgTotalVolume', 'DESC');
      case 3:
        return sortNumberArrayByParam(formattedData, 'changePercent', 'DESC');
      default:
        return toJS(formattedData);
    }
  }

  @action addTickerToWatchList = async ticker => {
    try {
      this.isFetchingWatchlistData = true;
      this.watchlistData = this.watchlistDataJS.concat({ ticker });
      await post('userWatchLists', { ticker });
      await this.getWatchlistData();
    } catch (e) {
      console.info('Error in addTickerToWatchList', e);
    }
  }

  @action removeTickerFromWatchList = async ticker => {
    console.info('removeTickerFromWatchList', ticker);
    try {
      this.isFetchingWatchlistData = true;
      const deletingItem = this.watchlistDataJS.find(data => data.ticker === ticker);
      const deleteResponse = await deleteRequest(`userWatchLists/${deletingItem.id}`);

      console.log('delestRs', deleteResponse)
      if(deleteResponse.ok) {
        await this.getWatchlistData();
      }
    } catch (e) {
      console.info('Error in removeTickerToWatchList', e);
      // throw e;
    }
  }


}
