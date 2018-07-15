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
            this.setTransactionLoading(true);
            let formattedParams = {
                options: JSON.stringify({
                    account: 'savings',
                    amount: params.amount,
                })
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


    @computed get chartDataJS() {
        if(this.chartData === null) {
            return null;
        } else {
            return toJS(this.chartData);
        }
    }

}
