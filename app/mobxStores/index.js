import ColorStore from './Domain/ColorStore';
import AccountStore from './Domain/AccountStore';
import RegistrationStore from './Domain/RegistrationStore';
import AuthStore from './Domain/AuthStore';

// Import and init all stores here
let colorStore = new ColorStore();
let accountStore = new AccountStore();
let registrationStore = new RegistrationStore();
let authStore = new AuthStore();


export {
    colorStore,
    accountStore,
    registrationStore,
    authStore
}