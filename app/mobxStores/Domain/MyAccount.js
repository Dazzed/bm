import { observable, action, computed, toJS } from 'mobx';
// import { getMyAccountData } from '../../api';

export default class MyAccountData {

  constructor() {
    this.setFakeData()
  }

  @action setFakeData = () => {
    this.myAccoutData = {
      totalAccountValue: '5484.00',
      todaysChange: '+385.58',
      todaysChangePercentage:'+7.04',
    }
  }

  @observable myAccoutData = null;

  @action setMyAccountData = (data) => {
    this.myAccoutData = data;
  }

  @computed get myAccoutDataJS() {
    return toJS(this.myAccoutData)
  }

  @action getMyAccountData = () => {
    let params = {

    }
    getMyAccountData(params)
    .then((res) => {
      console.log('account data', res)
    })
    .catch((err) => {
      console.log('account data err', err)
    })
  }

}
