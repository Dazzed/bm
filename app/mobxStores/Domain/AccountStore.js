import { observable, action, computed, toJS } from 'mobx';

export default class AccountStore {

    constructor() {
        console.log('====== COLOR STORE STARTS');
        this.getAccountList();
    }

    @observable selectedAccountIndex = 0;

    @observable accountList = [];



    @action getAccountList = () => {
        this.accountList = [
            {
                title: 'MOCK BANK',
                subtitle: 'Checking - 1234',
                amount: '4283'
            },
            {
                title: 'MOCK BANK',
                subtitle: 'Savings - 1234',
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
