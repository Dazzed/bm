import { observable, action, computed, toJS } from 'mobx';
import { createUser } from '../../api';
import { formatDate } from '../../routes/Registration/utility';
import { fillRegistrationWithFakeData } from '../../devControlPanel';

import {
  maritalStatusList,
  employmentStatusList,
  investmentStatusList
} from '../../constants';

export default class RegistrationStore {

    constructor() {
        this.initRegistrationData = {
            // country selection
            country: 0,

            // name selection
            firstName: '',
            lastName: '',

            // address selection
            address: '',
            address2: '',
            zip: '',
            state: '',
            city: '',
            zip: '',
            stateOption: 0,

            // phone selection
            phoneField: '',

            // date of birth
            dateField: '',

            // ssn
            ssnField: '',

            // martial status
            maritalStatus: 0,

            // dependents
            dependentField: '',

            // employment status
            employmentStatus: 0,

            // investment experience
            investmentStatus: 0,

            // account setup
            email: '',
            password: '',
        }
        this.initRegistation();

        if(fillRegistrationWithFakeData) {
            this.initWithTestData();
        }
    }

    @action initWithTestData = () => {
        this.registrationData = {
            // country selection
            country: 0,
            // name selection
            firstName: 'test1',
            lastName: 'test2',
            // address selection
            address: '1123 street',
            address2: '22 line two',
            zip: '12345',
            // state: 'California',
            city: 'LosAngeles',
            zip: '1234',
            stateOption: 0,
            // phone selection
            phoneField: '1111111111',
            // date of birth
            dateField: '01121991',
            // ssn
            ssnField: '123121234',
            // martial status
            maritalStatus: 0,
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


    @observable registrationErrorData = null;

    @computed get registrationErrorDataJS() {
      return toJS(this.registrationErrorData);
    }

    @action setErrorData = (data) => {
        console.log('setting err mesg', data)
        this.registrationErrorData = data;
    }

    @action submitRegistration = () => {
        return new Promise((resolve, reject) => {

            // let stateName = '';
            // console.log('----------- options', stateOptionsMap)
            // stateOptionsMap.every((elem, i) => {
            //
            //   console.log('== elem', elem, this.registrationData.state)
            //
            //   if(elem.value === this.registrationData.state) {
            //     console.log('== elem', elem, this.registrationData.state)
            //     stateName = elem.value;
            //     return false;
            //   }
            //   return true;
            // })
            //

            // get maritalStatus from index
            let maritalStatusFormatted = '';
            maritalStatusList.every((elem, i) => {
              console.log('== elem', elem, this.registrationData.maritalStatus)
              if(elem.value === this.registrationData.maritalStatus) {
                maritalStatusFormatted = elem.label;
                return false;
              }
              return true;
            })

            // get employment status from index
            let employmentStatusFormatted = '';
            employmentStatusList.every((elem, i) => {
              console.log('== elem', elem, this.registrationData.employmentStatus)
              if(elem.value === this.registrationData.employmentStatus) {
                employmentStatusFormatted = elem.label;
                return false;
              }
              return true;
            })

            // investment experience
            let investmentStatusFormatted = '';
            investmentStatusList.every((elem, i) => {
              console.log('== elem', elem, this.registrationData.investmentStatus)
              if(elem.value === this.registrationData.investmentStatus) {
                investmentStatusFormatted = elem.label;
                return false;
              }
              return true;
            })

            let params = {
                "email": this.registrationData.email,
                "firstName": this.registrationData.firstName,
                "lastName": this.registrationData.lastName,
                "dob": formatDate(this.registrationData.dateField),
                "address": this.registrationData.address,
                "address2": this.registrationData.address2,
                "phone": this.registrationData.phoneField,
                "socialSecurityNo": this.registrationData.ssnField,
                "maritalStatus": maritalStatusFormatted,
                "dependents": this.registrationData.dependentField,
                "employment": employmentStatusFormatted,
                "experience": investmentStatusFormatted,
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
                console.log('create user res', res);
                if(res.status === 500 || res.status === 422) {
                    this.setErrorData(res.json.error)
                    reject(res)
                } else if(res.ok) {
                    this.initRegistation();
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
