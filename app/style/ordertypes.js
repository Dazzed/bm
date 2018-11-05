import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const OrderTypes = StyleSheet.create({
  tabContent: {
    // backgroundColor: colors.contentBg,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 200,
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  //radio modal
  radio: {
    width: 375,
    maxHeight: 200,
    left: 0,
    top: 0,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#ffffff',
  },
  radioField: {
    padding: 25,
    paddingTop: 0
  },
  radioTitle: {
    textAlign: 'left',
    paddingLeft: 80,
    paddingTop: 25,
  },
  radioLabel: {
    fontSize: 14, 
    paddingLeft: 25, 
    paddingTop: 10, 
    paddingBottom: 10,
    marginBottom: 2
  },
  radioLabelWrap: {
    width: 50,
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderGray    
  },


});
module.exports = OrderTypes;