import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const numbers = StyleSheet.create({
  //radio modal
  container: {
  	flex:1,
    flexDirection: 'column',
    padding: 30,
    maxHeight: 375,
    // backgroundColor: colors.white
  },
  row: {
    flex: 2,
    flexDirection: 'row',
  },
  rowOption: {
    flex: 1,
    flexDirection: 'row',
    borderWidth:2,
    borderColor: colors.blue,
    borderRadius: 5,
    maxHeight: 60,
    paddingBottom: 0,
    marginBottom: 30
  },
  rowLabel: {
    flex: 2,
    flexDirection: 'row',
    borderBottomWidth:StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderGray,
    maxHeight: 70,
    paddingBottom: 0,
    marginBottom: 30
  },
  inputLabel: {
    flex: 1,
    fontSize: 14,
    // color: colors.lightGray,
    marginTop: 22
  },
  input: {
    flex: 1,
    fontSize: 40,
    textAlign: 'right',
    width: '100%',
    height: 47,
    marginTop: 0,
    // color: colors.darkSlate
  },
  numbers: {
    flex: 1,
    textAlign: 'center',
    // color: colors.darkSlate,
    fontSize: 33
  },
  numbers_right: {
    flex: 1,
    textAlign: 'center',
    marginTop: -10,
    // color: colors.darkSlate,
    fontSize: 33
  },
  selectTxt: {
    // color: colors.white,
    fontSize: 13,
    height: 22
  }


});
module.exports = numbers;