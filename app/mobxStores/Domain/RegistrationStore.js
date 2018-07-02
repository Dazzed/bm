import { observable, action, computed, toJS } from 'mobx';
import { createUser } from '../../api';
import { formatDate } from '../../routes/Registration/utility';

export default class RegistrationStore {

    constructor() {
        this.initRegistrationData = {

            // country selection
            country: 0,

            // name selection
            firstName: 'test1',
            lastName: 'test2',

            // address selection
            address: '1',
            address2: '1',
            zip: '1',
            state: '1',
            city: '1',
            zip: '1',
            stateOption: 1,

            // phone selection
            phoneField: '1111111111',

            // date of birth
            dateField: '01121991',

            // ssn
            ssnField: '123121234',

            // martial status
            maritalStatus: 4,

            // dependents
            dependentField: '1',

            // employment status
            employmentStatus: 0,

            // investment experience
            investmentStatus: 0,

            // account setup
            email: 'test44@gmail.com',
            password: 'Password44!',
        }

        this.initRegistation()
    }

    @observable registrationData = {};

    @action initRegistation = () => {
        this.registrationData = this.initRegistrationData;
    }

    @action updateRegistrationParams = (params) => {
        console.log('update MOBX registration params', params);

        this.registrationData = {
            ...toJS(this.registrationData),
            ...params
        }

        console.log('==== new registration data', toJS(this.registrationDataJS) )
    }

    @computed get registrationDataJS() {
        return toJS(this.registrationData)
    }


    @observable registrationErrorMessage = null;

    @action setErrorMessage = (msg) => {
        console.log('setting err mesg', msg)
        this.registrationErrorMessage = msg;
    }

    @action submitRegistration = () => {
        return new Promise((resolve, reject) => {
            console.log('SUBMITTING REGISTRATION')


            let params = {
                "email": this.registrationData.email,
                "firstName": this.registrationData.firstName,
                "lastName": this.registrationData.lastName,
                "dob": formatDate(this.registrationData.dateField),
                "address": this.registrationData.address,
                "address2": this.registrationData.address2,
                "phone": this.registrationData.phoneField,
                "socialSecurityNo": this.registrationData.ssnField,
                "maritalStatus": this.registrationData.maritalStatus,
                "dependents": this.registrationData.dependentField,
                "employment": this.registrationData.employmentStatus,
                "experience": this.registrationData.investmentStatus,
                "city": this.registrationData.city,
                "zipCode": this.registrationData.zip,
                "state": this.registrationData.state,
                // "country": this.registrationData.country,
                "naturalized": this.registrationData.country,
                "password": this.registrationData.password,
                // "profilePictureUrl": ,
                // "checkingAccount": ,
                // "savingsAccount": ,
                // "id": ,
            }

            console.log('===== PARAMS', params)

            createUser(params)
                .then((res) => {
                    console.log('create user res', res)
                    if(res.status === 500 || res.status === 422) {
                        this.setErrorMessage(res.json.error.message)
                        reject(res)
                    } else if(res.ok) {
                        resolve(res);
                    } else {
                        reject(res);
                    }

                })
                .catch((err) => {
                    console.log('create user err', err);
                    reject();
                })


        })

    }

}