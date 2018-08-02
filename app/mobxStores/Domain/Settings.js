import { observable, action, computed, toJS } from 'mobx';
import { updateSettings as updateSettingsApiCall } from '../../api';
import { newsSources as newsSourcesConstant, SETTINGS_DATA_KEY } from '../../constants';
import { AsyncStorage } from 'react-native';

export default class Settings {

    constructor() {
      // // fill with local data
      // this.getSettingsFromLocal()
      // .then((res) => {
      //   let settingsObject = JSON.parse(res);
      //   this.hydrateSettings(settingsObject)
      // })

      // fill with remote data
      this.getSettings()
    }

    @observable settingsData = {}

    @computed get settingsDataJS() {
      return toJS(this.settingsData);
    }

    @action getSettingsDataJS = () => {
      return toJS(this.settingsData);
    }

    @action hydrateSettings = (data) => {
      this.settingsData = data;
    }

    @action saveSettingsLocally = () => {
      let dataToSave = JSON.stringify(this.settingsData);
      AsyncStorage.setItem(SETTINGS_DATA_KEY, dataToSave);
    }

    // @action getSettingsFromLocal = () => {
    //   return new Promise((resolve, reject) => {
    //     AsyncStorage.getItem(ACCESS_TOKEN_KEY)
    //     .then((res) => {
    //       console.log('get settings from local')
    //       resolve(res);
    //     })
    //   })
    // }

    @action setNewsSourceValue = (elem) => {
      // copy current data
      let settingsData = toJS(this.settingsData);
      // toggle value
      settingsData.newsSource[elem.code] = !elem.active;
      // overwrite new data
      this.hydrateSettings(settingsData);
      this.updateSettings();
    }

    @computed get newsSourcesJS() {
        if(!this.settingsData || !this.settingsData.newsSource) {
          return []
        } else {
          let newsSource = toJS(this.settingsData.newsSource)
          let result = [];
          Object.keys(newsSource).forEach((key, i) => {
            let code = key;
            let value = newsSource[key];
            result.push({
              code: code,
              name: newsSourcesConstant[code] || code,
              active: value
            })
          })
          return result;
        }
    }

    @action setOrderValue = (value) => {
      if(!this.settingsData || !this.settingsData.newsSource) {
        return
      } else {
        let oldSettingsData = this.settingsData;
        oldSettingsData.notification.orders = value;
        this.hydrateSettings(oldSettingsData);
        this.updateSettings();
      }
    }

    @computed get orderValue() {
      if(!this.settingsData || !this.settingsData.newsSource) {
        return false
      }
      if(this.settingsData.notification.orders) {
        return true;
      }
    }

    @action setLogOutAfterCount = (newValue) => {
      console.log('set log out after count', newValue);
      let newSettingsData = this.settingsData;
      newSettingsData.autoLogOff = newValue;
      this.hydrateSettings(newSettingsData);
      this.updateSettings();
    }

    @computed get autoLog() {
      if(this.settingsData) {
        return this.settingsData.autoLogOff;
      } else {
        return 0;
      }
    }

    @action getSettings = () => {
      let params = {
        data: JSON.stringify({})
      };
      updateSettingsApiCall(params)
      .then((res) => {
        console.log('========= GET SETTTINGS', res)
        if(res.ok) {
          this.hydrateSettings(res.json.data);
        }
      })
      .catch((err) => {
        console.log('Just get err', err)
      })
    }

    @action updateSettings = () => {
      let params = {
        data: JSON.stringify(this.settingsData)
      };
      updateSettingsApiCall(params)
      .then((res) => {
        console.log('-res update response', res)
        if(res.ok) {
          this.hydrateSettings(res.json.data);
        }
      })
      .catch((err) => {
        console.log('err', err)
      })
    }
}
