import { observable, action, computed, toJS } from 'mobx';

export default class RegistrationStore {

    constructor() {
        this.initRegistrationData = {
            country: 0,
            maritalStatus: 'Married',
            employment: 'Employed',
            experience: 'None'
        }
        this.initRegistation()
    }

    @observable registrationData = {}

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


}