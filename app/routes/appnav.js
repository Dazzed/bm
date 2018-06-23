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
import { colors } from '../store/store';

var color = colors();

const AppNav = TabNavigator({
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
  initialRouteName: 'Account',
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
  AppNav: {
    screen: AppNav,
  },
  Chart: {
    screen: Chart,
  },
}, {
  initialRouteName: 'AppNav',
  lazy: false,
  animationEnabled: false
});

export default StackNav;