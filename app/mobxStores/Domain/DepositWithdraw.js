import { observable, action, computed, toJS } from 'mobx';
import { deposit, withdraw } from '../../api';

export default class DepositWithdraw {

    constructor() {
    }

    @observable transactionLoading = false;

    @action setTransactionLoading = (loadingBool) => {
        this.transactionLoading = loadingBool;
    }


    @action makeTransaction = (params) => {
        return new Promise((resolve, reject) => {
            let options = {
                amount: params.amount,
            }
            this.setTransactionLoading(true);
            let formattedParams = {};
            if (params.type === 'deposit') {
                formattedParams = {
                    options: JSON.stringify(options),
                    account: params.account.subtitle == 'Checking - 1234' ? 'checking' : 'savings'
                };
            } else {
                formattedParams = options;
            }
            let transactionFunction = deposit;
            if(params.type === 'withdraw') {
                transactionFunction = withdraw
            }
            transactionFunction(formattedParams)
            .then((res) => {
                console.log('MAKE TRANSACTION', res);
                if(res.ok) {
                    resolve(res)
                } else {
                    reject(res)
                }
                this.setTransactionLoading(false);
            })
            .catch((err) => {
                console.log('err', err);
                this.setTransactionLoading(false);
            })
        })
    }

}
