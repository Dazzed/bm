import ColorStore from './Domain/ColorStore';
import AccountStore from './Domain/AccountStore';
import RegistrationStore from './Domain/RegistrationStore';
import AuthStore from './Domain/AuthStore';
import MyAccount from './Domain/MyAccount';
import Watchlist from './Domain/Watchlist';
import Trending from './Domain/Trending';
import Scanner from './Domain/Scanner';
import Chart from './Domain/Chart';
import News from './Domain/News';
import DepositWithdraw from './Domain/DepositWithdraw';
import Search from './Domain/Search';
import SectorIndustries from './Domain/sectorIndustries';
import DeviceSize from './Domain/deviceSize';
import Settings from './Domain/settings';
import AutoLogOff from './Domain/AutoLogOff'

// Import and init all stores here
let colorStore = new ColorStore();
let accountStore = new AccountStore();
let registrationStore = new RegistrationStore();
let authStore = new AuthStore();
let myAccountStore = new MyAccount();
let watchListStore = new Watchlist();
let trendingStore = new Trending();
let scannerStore = new Scanner();
let chartStore = new Chart();
let newsStore = new News();
let depositWithdrawStore = new DepositWithdraw();
let searchStore = new Search();
let sectorIndustriesStore = new SectorIndustries();
let deviceSizeStore = new DeviceSize();
let settingsStore = new Settings();
let autoLogOff = new AutoLogOff();

export {
    colorStore,
    accountStore,
    registrationStore,
    authStore,
    myAccountStore,
    watchListStore,
    trendingStore,
    scannerStore,
    chartStore,
    newsStore,
    depositWithdrawStore,
    searchStore,
    sectorIndustriesStore,
    deviceSizeStore,
    settingsStore,
    autoLogOff
}
