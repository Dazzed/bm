import { observable, action, computed, toJS } from 'mobx';
// import { getWatchlistData as getWatchlistDataApi } from '../../api';
import { get, deleteRequest, post } from '../../api/apiUtility';
import { sortStringArrayByParam, sortNumberArrayByParam } from '../../utility';

export default class Watchlist {
  sort_props = [
    { label: 'NONE', value: 0 },
    { label: 'A-Z', value: 1 },
    { label: 'Volume', value: 2 },
    { label: '% Change', value: 3 }
  ];

  constructor() {}

  @observable isFetchingWatchlistData = true;
  @observable isEditingWatchList = false;
  @observable deletingRecordId = null;
  @observable watchlistData = [];
  @observable listOrder = ["0", "1", "2", "3", "4", "5"];
  @observable sortByIndex = 0;

  @action setWatchlistData = (data) => {
    this.scannerData = data;
  }

  /* IMPORTANT */
  // The AuthStore.js will call *getWatchlistData* after the user logs in for the first time..
  // The store/actions/global.js verifyAuth action will call *getWatchlistData* after existing auth token is validated successfully.
  /* END IMPORTANT */
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
    if (this.isEditingWatchList) {
      return toJS(this.watchlistData);
    }
    switch (this.sortByIndex) {
      case 0:
        return sortNumberArrayByParam(toJS(this.watchlistData), 'position');
      case 1:
        return sortStringArrayByParam(toJS(this.watchlistData), 'companyName');
      case 2:
        return sortNumberArrayByParam(toJS(this.watchlistData), 'avgTotalVolume', 'DESC');
      case 3:
        return sortNumberArrayByParam(toJS(this.watchlistData), 'changePercent', 'DESC');
      default:
        return toJS(this.watchlistData);
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
      this.watchlistData = this.watchlistDataJS.filter(data => data.ticker !== ticker);
      await deleteRequest(`userWatchLists/${deletingItem.id}`);
      await this.getWatchlistData();
    } catch (e) {
      console.info('Error in removeTickerToWatchList', e);
    }
  }

  @action toggleEditingWatchList = flag => {
    this.isEditingWatchList = flag;
  }
}
