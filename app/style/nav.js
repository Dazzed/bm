import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors');
import fonts from './fonts';

const navstyle = StyleSheet.create({
  //appnav
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.white,
  },
  navContainer: {
    flex: 1,
    backgroundColor: colors.lightGray,
    display: 'flex'
  },
  navBtns: {
    backgroundColor:'white',
    borderTopWidth:0.5,
    borderTopColor: colors.darkGray,
    zIndex: 200,
    flex:1
  },
  tabContainer: {
    width: '100%',
    flex: 100
  },
  btns: {
    color: '#9c9fa4'
  },
  icon: {
    width: 20,
    height: 20,
  },
  iconBig: {
    width: 25,
    height: 25,
  },
  tabStyles: {
    fontFamily: 'HindGuntur-Regular'
  }

});
module.exports = navstyle;