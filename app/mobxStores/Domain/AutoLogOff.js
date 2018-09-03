import { observable, action, computed, toJS } from 'mobx';
import { settingsStore, authStore } from '../index';
import { autoLogOffOptions } from '../../constants';
import { autoLogOffEnabled } from '../../devControlPanel';

export default class AutoLogOff {
  navObject = null;
  setIntervalID = null;

  @action saveNavObject = (navObject) => {
    this.navObject = navObject;
  }

  @action isLoginExpired = () => {
    return false;
  }

  @action startTimer = () => {
    console.info(19, 'in starttimer');
    const { autoLog } = settingsStore;
    const targetIndex = autoLogOffOptions.findIndex(o => o.apiValue === autoLog);
    console.info({autoLog, targetIndex});
    if (targetIndex === -1 || targetIndex === 0) {
      return;
    }
    const millis = Number(autoLog) *60 * 1000;
    this.setIntervalID = setInterval(this.checkLogin, millis);
  }

  @action checkLogin = () => {
    authStore.autoLogOut()
      .then(() => {
        this.doLogOut()
      })
      .catch((err) => {
        console.log('====== ERROR checkLogin', err);
      })
  }

  @action doLogOut = () => {
    this.navObject.navigate('Home');
    this.stopTimer();
  }

  @action stopTimer = () => {
    if (this.setIntervalID)
      clearInterval(this.setIntervalID);
  }

}
