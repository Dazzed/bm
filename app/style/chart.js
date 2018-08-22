import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const chart = StyleSheet.create({
  container: {
    paddingBottom: 100,
    width: '100%'
  },
  portrait: {

  },
  fakeTabNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 55,
    zIndex: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    // borderTopColor: colors.borderGray,
    // backgroundColor: colors.white
  },
  fakeTab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 7
  },
  fakeIcon: {
    height: 25
  },
  fakeTabLabel: {
    fontSize: 10,
    // color: colors.lightGray
  },
  symbolPosition: {
    position: 'absolute',
    bottom: 55,
    left: 0,
    width: '100%',
    height: 30,
    zIndex: 100,
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    // borderTopColor: colors.borderGray
  },
  symbolColumn: {
    flex: 1,
    fontSize: 12,
    paddingTop: 6,
    // color: colors.darkSlate,
    textAlign: 'left',
  },
  symbolColumnFirst: {
    paddingLeft: 20,
  },
  symbolColumnMiddle: {
    marginLeft: -25,
  },
  symbolColumnPrice: {
    // color: colors.green,
    fontSize: 12,
    paddingTop: 6,
    paddingRight: 20,
  },
  header: {
    maxHeight: 100,
    marginBottom: 25,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  wrapper: {
    marginLeft: '4%',
    width: '92%',
    padding: 20,
    marginBottom: 70
  },
  titleContainer: {
    flex: 3,
    marginTop: -5
  },
  name: {
    fontSize: 24,
    marginBottom: -10,
    // color: colors.darkSlate
  },
  symbol: {
    fontSize: 12,
    // color: colors.lightGray,
  },
  newsBtn: {
    flex: 1,
    borderWidth: 1,
    // borderColor: colors.lightGray,
    borderRadius: 2,
    maxWidth: 60,
    marginTop: 5,
    paddingTop: 2,
    paddingBottom: 2
  },
  newsBtnTxt: {
    textAlign: 'center',
    // color: colors.lightGray,
    fontSize: 12,
    height: 19
  },
  prices: {
    flex: 1,
    flexDirection: 'row',
  },
  stockPrice: {
    fontSize: 44,
    // color: colors.darkSlate,
    height: 50,
    marginTop: -12,
    marginRight: 10
  },
  priceInfo: {
  },
  priceTime: {
    fontSize: 11,
    // color: colors.darkGray,
    height: 15,
    marginBottom: 2
  },
  pricePerc: {
    flex: 1,
    backgroundColor: colors.green,
    textAlign: 'center',
    color: colors.white,
    fontSize: 9,
    fontWeight: 'bold',
    padding: 5,
    marginTop: 5,
    maxWidth: 50,
    maxHeight: 25    
  },
  pricePoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    maxWidth: 285
  },
  priceOpen: {
    flex: 1
  },
  priceLabel: {
    // color: colors.lightGray,
    fontSize: 12,
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
    marginTop: 35,
    flex: 1,
    flexDirection: 'column'
  },
  timePeriod: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  time: {
    fontSize: 12,
    // color: colors.lightGray,
    height: 20,
    paddingLeft: 5,
    paddingRight: 5,
    textAlign: 'center',
  },
  bigtime: {
    fontSize: 12,
    //color: colors.lightGray,
    height: 14,
    width: 5,
    textAlign: 'center',
  },
  tabBtns: {
    backgroundColor:colors.white,
    justifyContent: 'space-between',
    width: '100%',
    height: 50
  },
  tabTxt: {
    color: colors.lightGray,
    fontSize: 14,
    lineHeight: 20,
    height: 10
  },
  timeSelected: {
    // backgroundColor: colors.grayTwo,
    borderWidth: 0.5,
    // borderColor: colors.grayTwo,
    borderRadius: 2,
    overflow: 'hidden',
    height: 21,
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 1,
    fontSize: 12,
    // color: colors.white
  },
  timeSelectedBig: {
    // backgroundColor: colors.grayTwo,
    borderWidth: 0.5,
    // borderColor: colors.grayTwo,
    borderRadius: 2,
    overflow: 'hidden',
    height: 21,
    paddingLeft: 5,
    paddingRight:5 ,
    paddingTop: 1,
    fontSize: 12,
    // color: colors.white
  },
  chartWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chartFPO: {
  },
  portraitChart: {
    padding: 50,
    marginTop: 10
  },
  momentumWrapper: {
    marginTop: 25,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row',
  },
  momentumInfo: {
    flex: 2,
    marginTop: 10
  },
  sectionTitle: {
    fontSize: 16,
    // color: colors.darkSlate,
  },
  momentumTitle: {
    fontSize: 16,
    // color: colors.darkSlate,
  },
  momentumSubTitle: {
    fontSize: 14,
    // color: colors.lightGray,
    marginTop: -10
  },
  momentumFPO: {
    padding: 20,
    flex: 1,
    maxHeight: 70,
    marginRight: 15,
    textAlign: 'center',
  },
  momenutmImg: {
    width: 120,
    height: 43,
    marginTop: 10
  },
  bidAsksWrapper: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25,
    paddingBottom: 25,
    maxWidth: '95%',
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.5
  },
  bid: {
    flex: 1
  },
  bidaskRow: {
    flex: 1,
    flexDirection: 'row',
  },
  bidaskNum: {
    flex: 1,
    // color: colors.lightGray,
    fontSize: 12
  },
  bidaskPrice: {
    flex: 1,
    // color: colors.darkGray,
    fontSize: 12
  },
  statsWrapper: {
    flex: 1,
    marginBottom: 25,
    paddingBottom: 25,
    borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.5
  },
  statsRow: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  statsTitle: {
    flex: 1,
    // color: colors.lightGray,
    fontSize: 10,
    height: 15
  },
  statsNum: {
    flex: 1,
    // color: colors.darkSlate,
    fontSize: 14,
    marginTop: -2,
    height: 20
  },
  statsColumn: {
    flex: 1,
  },
  statsColumnLong: {
    flex: 2
  },
  statsColumnShort: {
    flex: 0
  },
  profileWrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingBottom: 25,
    marginBottom: 25,
    // borderBottomColor: colors.borderGray,
    borderBottomWidth: 0.5
  },
  profileTxt: {
    flex: 1,
    marginTop: 20,
  },
  sectionTxt: {
    // color: colors.lightGray,
    lineHeight: 20,
    fontSize: 14,
  },
  sectionTxtDrk: {
    // color: colors.darkSlate,
    lineHeight: 20,
    fontSize: 14,
    height: 20,
    opacity: 0.9,
    width: '95%'
  },
  sectionTxt: {
    // color: colors.lightGray,
    lineHeight: 20,
    fontSize: 14,
    width: '95%'
  },
  sectionTxtSm: {
    // color: colors.lightGray,
    fontSize: 10
  },
  sectionTxtSymbol: {
    // color: colors.blue,
    fontSize: 28,
    height: 35,
    marginTop: -10
  },
  modal: {
  },


});
module.exports = chart;