import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

// import colors from './colors'
import { colors } from '../store/store';

const settings = StyleSheet.create({
  field: {
    borderBottomWidth:0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fieldLink: {
    borderBottomWidth:0.5,
    borderTopWidth:0.5,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    fontSize: 14,
    flex: 6,
    textAlign: 'right',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    // borderBottomColor: colors.borderGray,
    // color: colors.darkSlate
  },
  image: {
    width: 10,
    height: 18,
    marginRight: 5,
    marginTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLabel: {
    fontSize: 14,
    flex: 6,
    textAlign: 'left',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    // color: colors.darkSlate
  },
  inputLink: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    height: 50,
    // color: colors.darkSlate
  },
  inputSelected: {
    flex: 1.5,
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
  downArrowOpen: {
    width: 12,
    height: 6,
    position: 'absolute',
    right: 80,
    bottom: 138,
    zIndex: 1
  }

});
module.exports = settings;
