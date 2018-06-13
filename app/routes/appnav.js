import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight,
  Button
} from 'react-native';

import {
  TabNavigator,
  TabView,
  StackNavigator
} from 'react-navigation';

import Account from './account';
import Watchlists from './watchlists';
import Trending from './trending';
import Scanner from './scanner';
import Settings from './settings';
// import SignIn from './signin';
import Chart from './chart';
import Search from './search';

import styles from '../style/style';
import navstyle from '../style/nav';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

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


module.exports = StackNav;

