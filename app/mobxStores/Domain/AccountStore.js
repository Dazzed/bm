import { observable, action, computed, toJS } from 'mobx';

export default class ColorStore {

    constructor() {
        console.log('====== COLOR STORE STARTS');
        this.getAccountList();
    }

    @observable selectedAccountIndex = 0;

    @observable accountList = [];



    @action getAccountList = () => {
        this.accountList = [
            {
                title: 'MOCK BANK TITLE 1',
                subtitle: 'Checking 1',
                amount: '4283'
            },
            {
                title: 'MOCK BANK TITLE 2',
                subtitle: 'Savings 2',
                amount: '52495'
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
