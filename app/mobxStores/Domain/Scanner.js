import { observable, action, computed, toJS } from 'mobx';
import { getScannerList } from '../../api';

export default class Scanner {

  @observable scannerData = null;
  @observable scannerDataLoading = false;
  @observable newPageLoading = false;

  @action setScannerDataLoading = (loadingBool) => {
    if(this.currentPage > 1) {
      this.newPageLoading = loadingBool;
    } else {
      this.scannerDataLoading = loadingBool;
    }
  }

  @action setScannerData = (data) => {
    if(this.currentPage > 1) {
      this.scannerData = toJS(this.scannerData).concat(data);
    } else {
      this.scannerData = data;
    }

  }

  @computed get scannerDataJS() {
    if(!this.scannerData) {
      return [];
    } else {
      return toJS(this.scannerData)
    }
  }

  @observable savedParams = null;

  @action saveRecentParamaters(params) {
    this.savedParams = params;
  }

  @observable currentPage = 1;

  @action getNewPage = () => {
    console.log('Get new page')
    this.currentPage = this.currentPage + 1;
    this.getScannerDataApiCall(null, true);
  }

  @action getScannerData = (params) => {
    this.setScannerData(null);
    this.getScannerDataApiCall(params)
  }

  @action getScannerDataApiCall = (params, newPage) => {

    if(!newPage) {
      this.saveRecentParamaters(params);
      this.currentPage = 1;
    }

    let paramsForThisCall = this.savedParams;
    paramsForThisCall.page = this.currentPage;

    console.log('===== GETTING SCANNER DATA ========')

    let stringifyParams = JSON.stringify(paramsForThisCall)
    let newparams = {
      filter: stringifyParams
    }

    this.setScannerDataLoading(true);

    getScannerList(newparams)
    .then((res) => {

      console.log('account data', res)
      if(res.ok) {
        this.setScannerData(res.json.data.data);
      } else {
        console.log('======= ERROR')
      }
      this.setScannerDataLoading(false);
    })
    .catch((err) => {
      console.log('account data err', err);
      this.setScannerDataLoading(false);
    })
  }

}
