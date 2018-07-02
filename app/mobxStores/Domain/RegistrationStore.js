import { observable, action, computed, toJS } from 'mobx';

export default class RegistrationStore {

    constructor() {
        this.initRegistrationData = {

            // country selection
            country: 0,

            // name selection
            firstName: '',
            lastName: '',

            // address selection
            address: '1',
            address2: '1',
            zip: '1',
            state: '1',
            city: '1',
            zip: '1',
            stateOption: 1,

            // phone selection
            phoneField: '',

            // date of birth
            

            maritalStatus: 'Married',
            employment: 'Employed',
            experience: 'None'
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


}