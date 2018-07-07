import { observable, action, computed, toJS } from 'mobx';
// import { getScannerData as getScannerDataApi } from '../../api';

export default class Scanner {

  @observable scannerData = null;

  @action setScannerData = (data) => {
    this.scannerData = data;
  }

  @computed get scannerDataJS() {
    return toJS(this.scannerData)
  }

  @action getScannerData = () => {
    let params = {

    }
    // getScannerDataApi(params)
    // .then((res) => {
    //   console.log('account data', res)
    // })
    // .catch((err) => {
    //   console.log('account data err', err)
    // })
  }

}
