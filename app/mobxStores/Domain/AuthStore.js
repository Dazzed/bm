import { observable, action, computed, toJS } from 'mobx';
import { login, getUserById } from '../../api';
import { saveToken } from '../../api/tokenUtility';
import { watchListStore } from '../index';

export default class ColorStore {
    constructor() {
    }

    @observable loginData = null;

    @observable userData = null;

    @observable loginLoading = false;

    @observable loginErrorMessage = null;

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
                    console.log('res', res)
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

            resolve()
        })
    }

}
