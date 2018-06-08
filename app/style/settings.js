import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

// import colors from './colors'
import {colors} from '../store/store';

const settings = StyleSheet.create({
  field: {
    // backgroundColor: colors.white,
    borderBottomWidth:0.5,
    // borderBottomColor: colors.borderGray,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    fontSize: 14,
    textAlign: 'left',
    marginLeft:5,
    marginRight:5,
    marginTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 35,
    borderBottomWidth: 0.5,
    // borderBottomColor: colors.borderGray,
    // color: colors.darkSlate
  },
  inputLabel: {
    fontSize: 14,
    flex: 1,
    textAlign: 'left',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    // color: colors.darkSlate
  },
  inputSelected: {
    flex: 1,
    fontSize: 14,
    textAlign: 'right',
    marginRight:15,
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    height: 35,
    borderBottomWidth: 0.5,
    // borderBottomColor: colors.borderGray,
    // color: colors.lightGray
  },
  contentBg: {
    // backgroundColor: colors.contentBg,
  },
  fieldTitle: {
    fontSize: 12,
    marginTop: 25,
    marginBottom: 5,
    // color: colors.darkSlate,
    paddingLeft: 10
  },

});
module.exports = settings;