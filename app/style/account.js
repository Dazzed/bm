import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const account = StyleSheet.create({
  accContainer: {
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'column',
    width: '100%'
  },
  topContainer: {
    // backgroundColor: colors.white,
    flex: 1,
    flexDirection:'column',
    alignItems: 'center',
    maxHeight: 225
  },
  valueContainer: {
    // backgroundColor: colors.white,
    flex: 1,
    maxHeight: 190
  },
  values: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 25,
  },
  acctVal: {
    // color: colors.lightGray,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 24,
    fontSize: 16
  },
  accValNum: {
    // color: colors.darkSlate,
    fontSize: 36,
    textAlign: 'center',
    lineHeight: 55
  },
  changeContainer: {
    flex: 1
  },
  change: {
    // color: colors.lightGray,
    textAlign: 'center',
    letterSpacing: 1,
    lineHeight: 24,
    fontSize: 16
  },
  changeWrap: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  changeNum: {
    // color: colors.darkSlate,
    fontSize: 30,
    lineHeight: 46,
    marginRight: 5
  },
  changePercent: {
    marginLeft: 5,
    marginTop: 5,
    textAlign: 'center',
  },
  tabBtns: {
    // backgroundColor:colors.white,
    justifyContent: 'space-between',
    width: '100%',
    height: 50
  },
  tabTxt: {
    // color: colors.lightGray,
    fontSize: 14,
    lineHeight: 20,
    height: 15,
    marginBottom: -20
  },
  tabContainer: {
    // backgroundColor: colors.contentBg,
    paddingTop: 30,
    flex: 2,
    width: '100%'
  },
  //tab contents
  tabContent: {
    // backgroundColor: colors.contentBg,
    flex: 1
  },
  titleWrap: {
    flex: 1,
    flexDirection: 'row',
    width: '100%'
  },
  securityTitle: {
    marginLeft: 20,
    fontSize: 16,
    flex: 2.5,
    maxWidth: 145,
  },
  sectionTitle: {
    marginLeft: 20,
    fontSize: 16,
    flex: 2.5,
    maxWidth: 185,
    // color: colors.darkGray
  },
  noOrdersText: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 60
  },
  sectionDate: {
    marginLeft: 20,
    paddingBottom: 5,
    fontSize: 13,
    flex: 1.5
  },
  titleSm: {
    fontSize: 10,
    lineHeight: 24,
    // color: colors.lightGray,
    flex: 1,
    maxWidth: 95
  },
  titleHistorySm: {
    fontSize: 10,
    lineHeight: 24,
    // color: colors.lightGray,
    width: 65
  },
  titleHistorySmF: {
    fontSize: 10,
    lineHeight: 24,
    // color: colors.lightGray,
    width: 65,
    marginLeft: 10
  },
  titlePrc: {
    fontSize: 10,
    lineHeight: 24,
    color: colors.lightGray,
    flex: 1
  },
  titleLast: {
    flex: 2,
    textAlign: 'right',
    paddingRight: 5
  },
  titleCost: {
    fontSize: 10,
    color: colors.lightGray,
    flex: 1
  },
  titleTotal: {
    fontSize: 10,
    color: colors.lightGray,
    flex: 1
  },
  section: {
    // backgroundColor: colors.white,
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    marginBottom:20,
  },
  sectionFull: {
    // backgroundColor: colors.white,
    marginBottom:20,
    flex: 1
  },
  sectionWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingBottom: 12
  },
  sectionLabel: {
    flex:2,
    // color: colors.lightGray,
    lineHeight: 20,
    fontSize: 12
  },
  sectionDetail: {
    flex: 2,
    textAlign: 'right',
    fontSize: 14,
    lineHeight: 20
  },
  symbolRow: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    paddingTop: 10,
    maxHeight: 70,
    paddingLeft: 20,
    paddingRight: 5,    
  },
  symbolRowHistory: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.5,
    marginTop: 15,
    maxHeight: 70,
    paddingLeft: 20,
    paddingRight: 20,    
  },
  symbolWrap: {
    flex: 3,
    flexDirection: 'column',
    maxWidth: 150,
    height: 50
  },
  symbolLabel: {
    fontSize: 20,
    lineHeight: 30,
    paddingTop: 5,
    marginBottom: -7
  },
  symbolDets: {
    fontSize: 13,
    // color: colors.lightGray,
    lineHeight: 20,
    flex: 1,
  },
  symbolQty: {
    flex: 0.4,
    fontSize: 16,
    // maxWidth: 40
  },
  priceWrapTouch: {
    flex: 1,
    flexDirection: 'row'
  },
  priceWrap: {
    flex: 1.2,
    alignItems: 'flex-start',
    paddingRight: 10,
    maxWidth: 150
  },
  sharesWrap: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 10,
    maxWidth: 80
  },
  mktWrap: {
    flex: 1.4,
    alignItems: 'flex-end',
    maxWidth: 135
  },

  priceLabel: {
    textAlign: 'right',
    fontSize: 16
  },
  mktLabel: {
    textAlign: 'right',
    fontSize: 16
  },
  historyDataLabel: {
    fontSize: 16
  },
  mktChange: {
    backgroundColor: colors.green,
    borderWidth: 0.5,
    borderColor: colors.green,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    maxHeight: 20,
    marginLeft: 5,
  },
  priceChange: {
    backgroundColor: colors.green,
    borderWidth: 0.15,
    borderColor: colors.green,
    borderRadius: 5,
    overflow: 'hidden',
    textAlign: 'center',
    color: colors.white,
    fontSize: 12,
    paddingLeft: 3,
    paddingRight: 3,
    maxHeight: 20,
    marginLeft: 5,
  },
  bottomSticky: {
    marginTop: 40,
    // borderTopColor: colors.borderGray,
    borderTopWidth: 0.5,
    width: '100%',
    flex: 1
  },
  stickyTitle: {
    paddingTop: 10,
    flex: 2,
    // color: colors.darkGray
  },
  stickyDetail: {
    flex: 1,
    textAlign: 'right',
    // color: colors.darkGray,
    fontSize: 16,
    lineHeight: 26
  },
  stickyWrap: {
    flex: 1,
    alignItems: 'flex-end',
    maxWidth: 150
  },
  historyTransaction: {
    flex: 1,
    flexDirection: 'row',
    maxWidth: 150,
    maxHeight: 45,
  },
  historyAction: {
    flex: 1,
    backgroundColor: colors.green,
    textAlign: 'center',
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 5,
    marginRight: 5
  },
  historyActionSell: {
    flex: 1,
    backgroundColor: colors.red,
    textAlign: 'center',
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 5,
    marginRight: 5
  },
  historyLabel: {
    flex: 1,
    marginLeft: 2
  }
});
module.exports = account;