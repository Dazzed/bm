import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const search = StyleSheet.create({
  mainCta: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    top: 15,
    textAlign: 'center',
    color: colors.lightGray,
  },
  leftCta: {
    flex: 7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    maxWidth: 320
  },
  leftInput: {
    flex: 1,
    height: 25,
    width: 100,
    marginLeft: 15,
    marginTop: 0,
    flex: 5,
    fontSize: 15,
    // color: colors.darkGray
  },
  searchingImg: {
    maxWidth: 12,
    maxHeight: 12,
    paddingTop: 5,
    marginTop: 3,
    marginLeft: 10,
    flex: 1
  },

  searchcancel: {
    flex: 2,
    maxWidth: 25
  },
  searchcancelImg: {
    height: 17,
    width: 17,
    top: 2,
    position: 'absolute',
  },

  rightCta: {
    height: 25,
    flex: 1,
    color: colors.lightGray
  },
  menuBorder: {
    height: 60,
    width: 375,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.lightGray
  },
  searchPresets: {
    // backgroundColor: colors.contentBg,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  presetContainer: {
    // backgroundColor: colors.white,
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  title: {
    textAlign: 'center',
    paddingTop: 45,
    paddingBottom: 50,
    color: colors.lightGray
  },
  symbolsAdd: {
    paddingTop: 15,
    paddingLeft: 10,
    height: 32  
  },
  symDetails: {
    flex: 1
  },



});
module.exports = search;