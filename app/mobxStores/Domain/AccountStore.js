import { observable, action, computed, toJS } from 'mobx';

import { authStore } from '../index';
import { get } from '../../api/apiUtility';

export default class AccountStore {
    @observable selectedAccountIndex = 0;
    @observable isLoadingData = false;

    @observable accountList = [];

    @action getAccountList = async () => {
        const userData = authStore.userDataToJs;
        this.accountList = [
            {
                title: 'ACCOUNT',
                subtitle: 'Mock Checking - 1234',
                amount: userData.checkingAccount
            },
            {
                title: 'ACCOUNT',
                subtitle: 'Mock Savings - 1234',
                amount: userData.savingsAccount
            },
        ]
    }

    @action selectAccountByIndex = (index) => {
        this.selectedAccountIndex = index;
    }

    @computed get selectedAccount() {
        let accountListJS = toJS(this.accountList);
        let selectedAccount = toJS(accountListJS[this.selectedAccountIndex]);
        return selectedAccount;
    }

    @computed get accountListJS() {
        return toJS(this.accountList);
    }

}
