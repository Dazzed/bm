import './prototypes';
import { showConsole } from './app/devControlPanel';

if (!showConsole) {
  // eslint-disable-line no-undef
  [
    'assert',
    'clear',
    'count',
    'debug',
    'dir',
    'dirxml',
    'error',
    'exception',
    'group',
    'groupCollapsed',
    'groupEnd',
    'info',
    'log',
    'profile',
    'profileEnd',
    'table',
    'time',
    'timeEnd',
    'timeStamp',
    'trace',
    'warn',
  ].forEach(methodName => {
    console[methodName] = () => {
      /* noop */
    };
  });
}

// To prevent the annoying remote debugger message
console.ignoredYellowBox = ['Remote debugger'];

import React from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';
// init stores
import './app/mobxStores'
import { Provider } from 'react-redux';
import { store } from './app/store/redux';
import BioWrapper from './app/containers/BioWrapper';
import AppNav from './app/routes/appnav';
import Login from './app/routes/Login';
import Registration from './app/routes/Registration';
import HomeScreen from './app/containers/Home';
import ForgotPassword from './app/routes/Forgot';
import { firstNavDefaultRoute } from './app/devControlPanel';

const LostAvenue = BioWrapper(StackNavigator({
  Home: { screen: HomeScreen },
  ForgotPassword: { screen: ForgotPassword },
  Login: { screen: Login },
  Registration: { screen: Registration },
  AppNav: { screen: AppNav },
}, {
  headerMode: 'none',
  lazy: true,
  initialRouteName: firstNavDefaultRoute
}));

const WithProvider = () => (
  <Provider store={store}>
    <LostAvenue />
  </Provider>
);

AppRegistry.registerComponent('LostAvenue', () => WithProvider);
