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

import { firstNavDefaultRoute } from './app/devControlPanel';

const LostAvenue = BioWrapper(StackNavigator({
  Home: { screen: HomeScreen },
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
