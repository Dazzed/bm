import { observable, action, computed, toJS } from 'mobx';
import { getScannerList } from '../../api';

export default class Scanner {

  @observable scannerData = null;
  @observable scannerDataLoading = false;

  @action setScannerDataLoading = (loadingBool) => {
    this.scannerDataLoading = loadingBool;
  }

  @action setScannerData = (data) => {
    this.scannerData = data;
  }

  @computed get scannerDataJS() {
    if(!this.scannerData) {
      return [];
    } else {
      return toJS(this.scannerData)
    }
  }

  @action getScannerData = (params) => {
    console.log('===== GETTING SCANNER DATA ========')
    let stringifyParams = JSON.stringify(params)
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
