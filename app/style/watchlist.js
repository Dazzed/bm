import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const watchstyle = StyleSheet.create({
  symbolContainer: {
  },
  symbol: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 75,
    // backgroundColor: colors.white,
    borderBottomWidth:0.5,
    // borderBottomColor: colors.borderGray,
    paddingTop:15,
    paddingBottom: 0,
    paddingLeft: 15,
    paddingRight: 15,
  },
  symName: {
    fontSize: 20,
    lineHeight: 30,
    paddingTop: 2,
    // color: colors.darkSlate,
    marginTop: 4,
    marginBottom: -10
  },
  drag: {
    width: 25,
    height: 14,
    marginTop: 15
  },
  coName: {
    fontSize: 13,
    // color: colors.lightGray,
    lineHeight: 25,
  },
  symDelete: {
    flex: 1,
    maxWidth: 35
  },
  dragDelete: {
    width: 25,
    height: 25,
    marginTop: 10
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
  },
  symDetails: {
    height: 175,
    maxWidth: 140,
    flex: 1
  },
  symMomentum: {
    flex: 1,
  },
  symMomentumTxt: {
    width: 150,
    backgroundColor: 'transparent'
  },
  momenutmImg: {
    width: 83,
    height: 41,
  },  
  symCost: {
    alignItems: 'flex-end',
  },
  symPrice: {
    textAlign: 'right',
    fontSize: 16,
    // color: colors.darkSlate,
    lineHeight: 16,
    paddingTop: 10,
    height: 20
  },
  symTime: {
    textAlign: 'right',
    // color: colors.lightGray,
    fontSize: 10,
    lineHeight: 12,
    paddingTop: 3,
    marginBottom: -3
  },
  delete: {
    backgroundColor: colors.darkGray
  },
  vol: {
    fontSize: 11,
    // color: colors.lightGray,
    textAlign: 'center',
    marginBottom: -9
  },
  symVolWrap: {
    position: 'absolute',
    top: 10,
    left: 25,
    height: 30,
    width: 30,
    backgroundColor: 'transparent'
  },
  bottomModal: {
    width: 375,
    maxHeight: 200,
    left: 0,
    top: '55%',
    justifyContent: 'flex-start',

  }

});
module.exports = watchstyle;