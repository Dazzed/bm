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
                subtitle: 'SUBTITLE 1',
                amount: '30000'
            },
            {
                title: 'MOCK BANK TITLE 2',
                subtitle: 'SUBTITLE 2',
                amount: '40000'
            },
            {
                title: 'MOCK BANK TITLE 3',
                subtitle: 'SUBTITLE 3',
                amount: '50000'
            }
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