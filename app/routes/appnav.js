import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';
import Account from './Account/account';
import Watchlists from './Watchlist/watchlists';
import Trending from './Trending/trending';
import Scanner from './scanner';
import Settings from './Settings';
import CustomTabBar from './customtabbar';
import Chart from './chart';
import AccountSelect from './Funding/AccountSelect';
import FundMyAccount from './Funding/FundMyAccount';
import Success from './Funding/Success';
import Trade from './Trade';
import { watchListStore, myAccountStore, trendingStore, scannerStore } from '../mobxStores';
import FundAccountSplash from './Registration/components/FundAccountSplash';
import { colors } from '../store/store';
import {
  appNavDefaultTabRoute,
  stackNavDefaultRoute
} from '../devControlPanel';
import { autoLogOffStore } from '../mobxStores';
var color = colors();

const AppNavTabs = TabNavigator({
  Account: {
    screen: Account,
  },
  Watchlists: {
    screen: Watchlists,
  },
  Trending: {
    screen: Trending,
  },
  Scanner: {
    screen: Scanner,
  },
  Settings: {
    screen: Settings,
  }
}, {
    initialRouteName: appNavDefaultTabRoute,
    lazy: false,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: color['darkSlate'],
      inactiveTintColor: color['lightGray'],
      style: {
        backgroundColor: color['white'],
        paddingBottom: 5,
        paddingTop: 5
      }
    },
    navigationOptions: {
      tabBarOnPress: ({ jumpToIndex, scene }) => {
        if (scene.index === 0) {
          myAccountStore.getMyAccountData();
        }
        if (scene.index === 1) {
          watchListStore.getWatchlistData();
        }
        if (scene.index === 2) {
          trendingStore.getTrendingDataWithPageNumber()
        }
        if (scene.index === 3) {
          scannerStore.getScannerData(scannerStore.savedParams)
        }

        return jumpToIndex(scene.index);
      },
    },
    tabBarComponent: CustomTabBar,
  });

const StackNav = StackNavigator({
  AppNavTabs: {
    screen: AppNavTabs,
  },
  Chart: {
    screen: Chart,
  },
  AccountSelect: {
    screen: AccountSelect
  },
  FundMyAccount: {
    screen: FundMyAccount
  },
  Success: {
    screen: Success
  },
  FundAccountSplash: {
    screen: FundAccountSplash
  },
  Trade: {
    screen: Trade
  }
}, {
    initialRouteName: stackNavDefaultRoute,
    lazy: false,
    animationEnabled: true,
    mode: 'modal',
    headerMode: 'float',
    headerTransitionPreset: 'uikit'
  });



export default StackNav;
