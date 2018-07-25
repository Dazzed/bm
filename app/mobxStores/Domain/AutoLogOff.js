import { observable, action, computed, toJS } from 'mobx';

export default class AutoLogOff {
    constructor() {
      this.checkInterval = 5000;
      // this.setIntervalID = setInterval(() => {
      //   this.checkLogin()
      // }, checkInterval)
    }

    @observable autoLogOffTime = 1000 * 60 * 1;

    @action checkLogin = () => {
      console.log('check login', Date.now())

      if(Date.now() > this.lastPingTime + this.autoLogOffTime) {

      }


    }

    @observable lastPingTime = Date.now();

    @action pingAutoLogOff = () => {
      this.lastPingTime = Date.now();
    }

}
