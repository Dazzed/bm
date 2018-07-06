import ColorStore from './Domain/ColorStore';
import AccountStore from './Domain/AccountStore';
import RegistrationStore from './Domain/RegistrationStore';
import AuthStore from './Domain/AuthStore';

import MyAccount from './Domain/MyAccount';
import Watchlist from './Domain/Watchlist';
import Trending from './Domain/Trending';
import Scanner from './Domain/Scanner';

// Import and init all stores here
let colorStore = new ColorStore();
let accountStore = new AccountStore();
let registrationStore = new RegistrationStore();
let authStore = new AuthStore();

let myAccount = new MyAccount();
let watchListStore = new Watchlist();
let trendingStore = new Trending();
let scanner = new Scanner();


export {
    colorStore,
    accountStore,
    registrationStore,
    authStore,
    myAccount,
    watchListStore,
    trendingStore,
    scanner
}
