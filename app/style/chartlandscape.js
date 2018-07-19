import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';

var colors = require('./colors')
var LancscapeHeight = Dimensions.get("window").width;

console.log(LancscapeHeight);

const chart = StyleSheet.create({
  landscape: {
    height: LancscapeHeight
  },
  rightCta: {
    height: 25,
    paddingTop: 10,
    flex: 0.35,
    paddingLeft: 0,
  },
  leftCtaSpacer: {
    paddingTop: 12,
    paddingLeft: 10,
    width: 50,
    height: 25,
    flex: 0.5,
  },
  symbolPosition: {
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderGray,
    maxHeight: 25
  },
  symbolColumn: {
    flex: 1,
    fontSize: 11,
    paddingTop: 3,
  },
  symbolColumnPrice: {
    color: colors.green,
    fontSize: 11,
    paddingTop: 3,
    fontWeight: 'bold'
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    alignItems: 'flex-start',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth,
    maxHeight: 58
  },
  wrapper: {
    padding: 20
  },
  titleContainer: {
    flex:1,
    marginRight: 15
  },
  name: {
    // color: colors.darkSlate,
    fontSize: 20,
    height: 40,
    marginBottom: -15
  },
  symbol: {
    fontSize: 12,
    lineHeight: 20,
    height: 15,
    // color: colors.lightGray,
  },
  currentPrice: {
    flex: 3,
    flexDirection: 'row',
    maxWidth: 175
  },
  prices: {
    flex:3,
    flexDirection: 'row',
    paddingLeft: 45
  },
  stockPrice: {
    fontSize: 38,
    lineHeight: 60,
    height: 40,
    // color: colors.darkSlate,
    flex: 1
  },
  priceInfo: {
    flex: 0.5
  },
  priceTime: {
    fontSize: 11,
    // color: colors.darkGray,
    height: 15,
    marginBottom: 2
  },
  pricePoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceOpen: {
    flex: 1
  },
  priceLabel: {
    // color: colors.lightGray,
    fontSize: 11,
    height: 15,
  },
  priceNum: {
    fontSize:15,
    // color: colors.darkSlate,
  },
  priceHigh: {
    flex: 1
  },
  priceLow: {
    flex: 1
  },
  priceVol: {
    flex: 1
  },
  verticalChart: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'column'
  },
  timePeriod: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderRightColor: colors.borderGray,
    borderRightWidth: StyleSheet.hairlineWidth,
    paddingTop: 20
  },
  timeSelected: {
    // backgroundColor: colors.grayTwo,
    borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.grayTwo,
    borderRadius: 2,
    overflow: 'hidden',
    height: 21,
    marginTop: -3,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 2,
    fontSize: 11,
    // color: colors.white
  },
  indicatorsContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 7,
    paddingLeft: 10,
    paddingRight: 10,
    maxWidth: 185,
    borderRightColor: colors.borderGray,
    borderRightWidth: StyleSheet.hairlineWidth
  },
  indicatorsWrap: {
    flex: 1,
    flexDirection: 'row',
  },
  indicatorsBtn: {
    flex:1,
    fontSize: 12,
    // color: colors.darkSlate
  },
  indicatorsTxt: {
    flex:1,
    fontSize: 11,
    // color: colors.lightGray
  },
  time: {
    fontSize: 10,
    // color: colors.lightGray,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  chartWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  leftSide: {
    flex: 1,
    flexDirection: 'column',
  },
  right: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    maxWidth: 220
  },
  chartFPO: {
    // flex: 3,
    borderRightColor: colors.borderGray,
    borderRightWidth: StyleSheet.hairlineWidth,
    // alignItems: 'flex-start'
  },
  landscapeChart: {
    marginTop: 10
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor: colors.borderGray,
    borderTopWidth: StyleSheet.hairlineWidth,
    maxHeight: 35
  },
  momentumWrapper: {
    marginTop: 10,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  momentumInfo: {
    flex: 1
  },
  momenutmImg: {
    width: 83,
    height: 40,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  momentumSubTitle: {
    fontSize: 11,
    // color: colors.darkGray
  },
  momentumFPO: {
    padding: 20,
    flex: 0.5,
    textAlign: 'center',
    fontSize: 4
  },
  bidAsksWrapper: {
    flex: 3,
    flexDirection: 'row',
    marginTop: 25,
  },
  bid: {
    flex: 1,
    paddingRight: 10
  },
  bidaskRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 5,
    maxHeight: 15
  },
  bidaskNum: {
    flex: 1,
    // color: colors.lightGray,
    fontSize: 10
  },
  bidaskPrice: {
    flex: 1,
    // color: colors.darkGray,
    fontSize: 10
  },
  statsWrapper: {
    flex: 1,
    marginBottom: 25,
    paddingBottom: 25,
    borderBottomColor: colors.lightGray,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15
  },
  statsNum: {
    flex: 1,
    color: colors.darkSlate,
    fontSize: 14
  },
  statsColumn: {
    flex: 1
  },
  profileWrapper: {
    flex: 1.5,
    flexDirection: 'column',
  },
  fullModal: {
    position:'absolute',
    top: 0,
    left: 0,
    bottom: 0
  },
  fullModalBg: {
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 1,
    flex: 1,
    backgroundColor: '#000000',
  },
  radioWrap: {
    marginTop: 0,
    flex: 1
  },
  radio: {
    width: 200,
    left: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: colors.white,
  },
  radioField: {
    paddingLeft: 25,
    paddingRight: 25,
  },
  radioTitleWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.lightGray,

  },
  radioTitle: {
    textAlign: 'center',
    paddingTop: 13,
    fontSize: 14,
    color: colors.darkSlate,
    marginBottom: -3
  },
  radioSubTitle: {
    textAlign: 'center',
    fontSize: 11,
    marginTop: -7,
    paddingBottom: 10,
    color: colors.lightGray,
  },
  radioLabel: {
    fontSize: 12,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    marginBottom: 2,
    color: colors.lightGray
  },


});
module.exports = chart;
