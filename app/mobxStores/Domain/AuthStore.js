import { observable, action, computed, toJS } from 'mobx';
import { login, getUserById, resetPassword, logout as logoutApiCall } from '../../api';
import { saveToken } from '../../api/tokenUtility';
import { watchListStore, autoLogOffStore } from '../index';
import axios from 'axios';
import {
  AsyncStorage
} from 'react-native';
import { API_URL } from '../../config';
import {
  THEME_KEY,
  ACCESS_TOKEN_KEY,
  CURRENT_USER_ID_KEY,
  TOUCH_ID_ENABLED_KEY
} from '../../constants';

export default class AuthStore {
  constructor() {
  }

  @observable loginData = null;
  @observable userData = null;
  @observable loginLoading = false;
  @observable loginErrorMessage = null;

  @observable resetLoading = false;
  @observable resetErrorMessage = null;
  @observable resetSuccess = true;

  @computed get isAuthenticated() {
    return true;
  }

  @action setResetSuccess = (bool) => {
    this.resetSuccess = bool;
  }

  @action setResetErrorMessage = (msg) => {
    this.resetErrorMessage = msg;
  }

  @action setResetLoading = (bool) => {
    this.resetLoading = bool;
  }

  @action setLoginErrorMessage = (msg) => {
    this.loginErrorMessage = msg;
  }

  @action setLoginData = (loginData) => {
    this.loginData = loginData;
  }

  @action setUserData = (userData) => {
    this.userData = userData;
    watchListStore.getWatchlistData();
  }

  @computed get loginDataJS() {
    return toJS(this.loginData);
  }


  @observable verifyingAuth = false;

  @action verifyAuth = () => {

    return new Promise((resolve, reject) => {
      console.log('GO verify auth')

      // check if login is expired before anything

      this.verifyingAuth = true;
      let accessToken = null;
      let userId = null;
      AsyncStorage.getItem(ACCESS_TOKEN_KEY)
        .then((res) => {
          console.log('verify auth res token', res);
          if (!res) {
            throw 'No access token present on verification check!'
          }
          accessToken = res;
          return AsyncStorage.getItem(CURRENT_USER_ID_KEY)
        })
        .then((res) => {
          if (!res) {
            throw 'No User ID present on verification check!'
          }
          userId = res;
          return axios.get(`${API_URL}/api/users/${userId}?access_token=${accessToken}`);
        })
        .then((res) => {
          console.log('api call check res', res)
          this.verifyingAuth = false;
          autoLogOffStore.startTimer();
          resolve({ userData: res })
        })
        .catch((err) => {
          console.log('VERIFY ERROR: ', err)
          this.verifyingAuth = false;
          const promises = [
            AsyncStorage.removeItem(ACCESS_TOKEN_KEY),
            AsyncStorage.removeItem(CURRENT_USER_ID_KEY),
            AsyncStorage.removeItem(TOUCH_ID_ENABLED_KEY),
            AsyncStorage.removeItem(THEME_KEY)
          ];
          Promise.all(promises)
            .then((res) => {
              console.log('---- ALL DATA DELETED', res)
            })
            .catch((err) => {
              cosnole.log('ERROR deleting data: ', err)
            });
          // do nothing for navigation, leave it on this page
        })
    })
  }

  @action populateUserById = (id) => {
    return new Promise((resolve, reject) => {
      getUserById(id)
        .then((res) => {
          console.log('GET YSER BY ID RES-------- ', res)
          if (res.ok) {
            console.log('got user data', res)
            resolve(res)
          } else {
            // this.setLoginErrorMessage(res.json.error.message)
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
    })
  }

  @observable loginErrorPresent = false;

  @action login = (params) => {
    this.loginLoading = true;
    this.loginErrorPresent = false;
    this.setLoginErrorMessage(null);
    let userId = 0;
    let loginData = null;
    return new Promise((resolve, reject) => {
      console.log('======= LOGIN FIRES', params)
      login(params)
        .then((res) => {
          console.log('login first call res', res)
          if (res.ok) {
            loginData = res.json;
            this.setLoginData(res.json)
            userId = res.json.userId;

            return saveToken(res.json.id)
          } else {
            // this.setLoginErrorMessage(res.json.error.message)
            this.loginLoading = false;
            this.loginErrorPresent = true;
            if (res.json.error.code === 'LOGIN_FAILED_EMAIL_NOT_VERIFIED') {
              this.setLoginErrorMessage('You must verify your email before you login');
            } else {
              this.setLoginErrorMessage('Invalid email/password');
            }
            reject(res);
          }
        })
        .then(() => {
          return AsyncStorage.setItem(CURRENT_USER_ID_KEY, userId.toString());
        })
        .then(() => {
          return this.populateUserById(userId)
        })
        .then((res) => {
          console.log('======= res from populate by user id', res)
          return this.populateUserById(userId)
        })
        .then((res) => {
          console.log('after populate user by id', res)
          autoLogOffStore.startTimer();
          this.loginLoading = false;
          if (res.ok) {
            this.setUserData(res.json)
            resolve({
              userData: res,
              loginData: loginData
            })
          } else {
            this.loginErrorPresent = true;
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  @action submitForgot = (params) => {
    return new Promise((resolve, reject) => {
      console.log('PRARMS', params);
      this.setResetLoading(true);
      this.setResetErrorMessage(null)
      this.setResetSuccess(false);

      resetPassword(params)
        .then((res) => {
          console.log('RES reste', res)
          if (res.ok) {
            this.setResetSuccess(true);
            this.setResetErrorMessage('Password reset email has been sent!')
            resolve(res)
          } else {
            this.setResetSuccess(false);
            this.setResetErrorMessage(res.json.error.message)
          }
          this.setResetLoading(false);
        })
        .catch((err) => {
          this.setResetSuccess(false);
          this.setResetLoading(false);
          reject(err)
        })
    })
  }

  @action autoLogOut = () => {
    return new Promise((resolve, reject) => {
      logoutApiCall()
      .then(() => {
        console.log('logout fired')
        return AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      })
      .then(() => {
        return AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      })
      .then(() => {
        return AsyncStorage.removeItem(CURRENT_USER_ID_KEY);
      })
      .then(() => {
        return AsyncStorage.removeItem(TOUCH_ID_ENABLED_KEY);
      })
      .then(() => {
        console.log('success')
        resolve()
      })
      .catch((err) => {
        reject(err)
      })
    })
  }

}
