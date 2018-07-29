import { observable, action, computed, toJS } from 'mobx';
import { settingsStore, authStore } from '../index';
import { autoLogOffOptions } from '../../constants';

export default class AutoLogOff {
    constructor() {
      this.checkInterval = 5000;
      this.setIntervalID = null;
      this.navObject = null;
    }

    @action saveNavObject = (navObject) => {
      this.navObject = navObject;
    }

    @action startTimer = () => {
      this.activityPing()
      this.setIntervalID = setInterval(() => {
        this.checkLogin()
      }, this.checkInterval)
    }

    @action stopTimer = () => {
      clearInterval(this.setIntervalID);
    }

    @action checkLogin = () => {
      const { getSettingsDataJS } = settingsStore;
      let settingsDataJS = getSettingsDataJS();
      if( settingsDataJS && 'autoLogOff' in settingsDataJS) {
        let autoLogOffTimeSeconds = autoLogOffOptions[settingsDataJS.autoLogOff].minutes * 60;
        let timeNowUnixSeconds = Date.now() / 1000;
        if(timeNowUnixSeconds > this.lastPingTimeUnixSeconds + autoLogOffTimeSeconds) {
          authStore.autoLogOut()
          .then((res) => {
            this.navObject.navigate('Home');
            this.stopTimer();
          })
          .catch((err) => {
            console.log('====== ERROR', error);
          })
        }
      }
    }

    @observable lastPingTimeUnixSeconds = Date.now() / 1000;

    @action activityPing = () => {
      this.lastPingTimeUnixSeconds = Date.now() / 1000;
    }

    @action isLoginExpired = () => {
      return false;
    }

}
