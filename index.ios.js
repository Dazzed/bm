// To prevent the annoying remote debugger message
console.ignoredYellowBox = ['Remote debugger'];
import React from 'react';
import {
  AppRegistry
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import { Provider } from 'react-redux';

import { store } from './app/store/redux';

import AppNav from './app/routes/appnav';
import Login from './app/routes/Login';
import Registration from './app/routes/Registration';
import HomeScreen from './app/containers/Home';

import { firstNavDefaultRoute } from './app/devControlPanel';

const LostAvenue = StackNavigator({
      Home: { screen: HomeScreen },
      Login: { screen: Login },
      Registration: { screen: Registration },
      AppNav: { screen: AppNav },
    }, {
    headerMode: 'screen',
    lazy: true,
    initialRouteName: firstNavDefaultRoute
  });

const WithProvider = () => (
  <Provider store={store}>
    <LostAvenue />
  </Provider>
);

AppRegistry.registerComponent('LostAvenue', () => WithProvider);
