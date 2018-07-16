import { observable, action, computed, toJS } from 'mobx';
import { login, getUserById, resetPassword } from '../../api';
import { saveToken } from '../../api/tokenUtility';
import { watchListStore } from '../index';

export default class ColorStore {
    constructor() {
    }

    @observable loginData = null;
    @observable userData = null;
    @observable loginLoading = false;
    @observable loginErrorMessage = null;

    @observable resetLoading = false;
    @observable resetErrorMessage = null;
    @observable resetSuccess = true;

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

    @action populateUserById = (id) => {
        return new Promise((resolve, reject) => {
            getUserById(id)
                .then((res) => {
                    console.log('GET YSER BY ID RES-------- ', res)
                    if (res.ok) {
                        console.log('got user data', res)
                        resolve(res)
                    } else {
                        this.setLoginErrorMessage(res.json.error.message)
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                })
        })
    }

    @action login = (params) => {
        return new Promise((resolve, reject) => {

            this.loginLoading = true;

            let userId = 0;

            login(params)
                .then((res) => {
                    console.log('res', res)
                    if (res.ok) {
                        this.setLoginData(res.json)
                        userId = res.json.userId;
                        return saveToken(res.json.id)
                    } else {
                        this.setLoginErrorMessage(res.json.error.message)
                        this.loginLoading = false;
                        reject(err);
                    }
                })
                .then(() => {
                    return this.populateUserById(userId)
                })
                .then((res) => {
                    // nav out
                    if (res.ok) {
                        this.setUserData(res.json)
                        resolve()
                    } else {
                        this.setLoginErrorMessage(res.json.error.message);
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                    this.loginLoading = false;
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
                if(res.ok) {
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

}
