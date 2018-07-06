import {
  TabNavigator,
  StackNavigator
} from 'react-navigation';

import Account from './account';
import Watchlists from './watchlists';
import Trending from './trending';
import Scanner from './scanner';
import Settings from './settings';
import CustomTabBar from './customtabbar';
import Chart from './chart';

import AccountSelect from './Funding/AccountSelect';
import FundMyAccount from './Funding/FundMyAccount';
import Success from './Funding/Success';
import { colors } from '../store/store';

import {
    appNavDefaultTabRoute,
    stackNavDefaultRoute
} from '../devControlPanel';

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
}, {
  initialRouteName: stackNavDefaultRoute,
  lazy: false,
  animationEnabled: false,
  mode: 'modal',
  headerMode: 'float',
  headerTransitionPreset: 'uikit',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 0,
    },
  }),
});



export default StackNav;
