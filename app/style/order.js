import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')


const order = StyleSheet.create({
  accContainer: {
    // backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 0

  },
  accInfoContainer: {
    alignItems: 'center',
    // backgroundColor: colors.white,
    paddingTop: 0,
    flex: 1,
    maxHeight: 100
  },
  orderConfirmContainer: {
    alignItems: 'center',
    paddingTop: 5,
    flex: 1
  },
  leftCta: {
    width: 500,
    height: 25,
    position: 'absolute',
    left: 15,
    top: 20,
  },
  mainCta: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    top: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    // color: colors.darkSlate
  },
  orderType: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    top: 32,
    textAlign: 'center',
    fontSize: 12,
    // color: colors.lightGray
  },
  rightCta: {
    height: 25,
    position: 'absolute',
    top: 15,
    right: 10,
    // color: colors.lightGray
  },
  tabBtns: {
    // backgroundColor:colors.white,
    borderBottomWidth:1,
    // borderBottomColor: colors.borderGray,
    justifyContent: 'space-between',
    width: '100%'
  },
  tabTxt: {
    // color: colors.lightGray
  },
  tabContainer: {
    // backgroundColor: colors.contentBg,
    paddingTop: 30,
    flex: 2,
    width: '100%'
  },
  tabContent: {
    // backgroundColor: colors.contentBg,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: -15,
  },
  rowLabel: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor: colors.borderGray,
    maxHeight: 50,
    paddingBottom: 0,
    marginBottom: 10
  },
  details: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 25,
    paddingRight: 25,
  },
  confDetails: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 25,
  },
  confTxt: {
    fontSize: 22,
    lineHeight: 35,
    // color: colors.darkSlate,
    marginBottom: -5,
    textAlign: 'center'
  },
  confSpacing: {
    marginBottom: 25,
    textAlign: 'center'
  },
  detailsFirstRow: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomColor: colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    marginBottom: 10
  },
  detailsRow: {
    flex: 1,
    flexDirection: 'row',
    height: 35
  },
  inputLabelQty: {
    flex: 1,
    fontSize: 14,
    // color: colors.darkSlate,
    paddingTop: 5
  },
  inputQty: {
    flex: 1,
    fontSize: 30,
    textAlign: 'right',
    // color: colors.darkSlate,
  },
  inputLabel: {
    flex: 1,
    fontSize: 14,
    // color: colors.lightGray,
    paddingTop: 5
  },
  input: {
    flex: 1,
    fontSize: 14,
    // color: colors.lightGray,
    textAlign: 'right',
  },
  numContainer: {
    // backgroundColor: colors.white,
    marginTop: 15,
    borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderGray,
    flex: 2,
    flexDirection: 'column',
  },
  digitContainer: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
  },
  purchaseDetails: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 10,
    borderTopWidth:StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderGray,
    marginBottom: 15,
  },
  purchaseDetailsWrap: {
    flex: 1,
    flexDirection: 'row'
  },
  purchaseTxtLeft: {
    flex: 1,
    fontSize: 10,
    color: colors.darkGray,
    textAlign: 'left'
  },
  purchaseTxt: {
    flex: 1,
    fontSize: 10,
    // color: colors.darkGray,
    textAlign: 'center'
  },
  purchaseTxtBtn: {
    flex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    // color: colors.darkGray,
    textAlign: 'right'
  },
  btnRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  btnLeft: {
    paddingLeft: 20,
    paddingRight: 10
  },
  btnRight: {
    paddingRight: 20
  },
  btnColumn: {
    flex: 1,
    flexDirection: 'row',
  },
  typeModal: {
  },
  confirmModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  menuBorder: {
    maxHeight: 30,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 0,
    marginBottom: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.lightGray
  },
   placeDetails: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
    paddingBottom: 0,
  },
  placeTxt: {
    fontSize: 22,
    lineHeight: 35,
    // color: colors.darkSlate,
    marginBottom: -5,
    textAlign: 'center'
  },
 
  confirmContainer: {
    // backgroundColor: colors.white,
    marginTop: 15,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderGray,
    flex: 2,
    flexDirection: 'column',
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
  },
  confirmRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 35
  },
  confirmColLeft: {
    flex:1,
    color: colors.lightGray,
    fontSize: 14
  },
  confirmColRight: {
    flex: 1,
    textAlign: 'right',
    color: colors.lightGray,
    fontSize: 14
  },
  shareContainer: {
    // backgroundColor: colors.white,
    // borderTopWidth: StyleSheet.hairlineWidth,
    // borderTopColor: colors.borderGray,
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingLeft: 40,
    paddingRight: 40,
    maxHeight: 200
  },
  shareRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxHeight: 35
  },
  optionbtn: {
    flex: 1,
    flexDirection: 'column',
    maxHeight: 40,
    width: 250,
    marginTop: 25,
    paddingTop: 10,
    borderRadius: 5,
    borderWidth: StyleSheet.hairlineWidth,
    // borderColor: colors.darkGray,
    opacity: 0.5,
    alignItems: 'center'
  },
  btnWrap: {
    flex: 1,
    alignItems: 'center'
  },
  searchingImg: {
    maxWidth: 18,
    maxHeight: 18,
    paddingRight: 15,
    paddingTop: 15,
  },
  twitterImg: {
    maxWidth: 22,
    maxHeight: 18,
    paddingRight: 15,
    paddingTop: 15,
  },
});
module.exports = order;