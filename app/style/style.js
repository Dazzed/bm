import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.white,
  },
  subcontainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentBg: {
    // backgroundColor: colors.contentBg,
  },
  menuBorder: {
    height: 50,
    paddingTop: 25
  },
  menuBorderptions: {
    borderBottomWidth:0.5,
    // borderBottomColor: colors.borderGray,
    height: 65,
    paddingTop: 25,
    // backgroundColor: colors.white
  },
  menuContainer: {
    width: '100%',
    height: 75,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCta: {
    width: 50,
    height: 25,
    flex: 1,
    paddingLeft: 20,
    paddingTop: 5
  },
  leftCtaTxt: {
    // color: colors.lightGray
  },
  leftCtaSpacer: {
    width: 50,
    height: 25,
    flex: 1,
  },
  rightCta: {
    height: 25,
    flex: 1,
    paddingRight: 15,
    paddingTop: 3,
    alignItems: 'flex-end'
  },
  rightCtaTxt: {
    // color: colors.lightGray
  },
  rightCtaTxt2: {
    // color: colors.lightGray,
    fontSize: 15
  },
  rightCta2: {
    height: 25,
    flex: 1,
    paddingRight: 20,
    alignItems: 'flex-end'
  },
  mainCta: {
    height: 25,
    width: 150,
    flex: 1,
    textAlign: 'center',
    // color: colors.lightGray,
    fontSize: 14
  },
  searchCta: {
    height: 30,
    width: 150,
  },
  searchCtaTxt: {
    height: 25,
    width: 150,
    textAlign: 'center',
    // color: colors.lightGray,
    fontSize: 15,
  },
  boldTitle: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    fontSize: 16,
    top: 0,
    textAlign: 'center',
    // color: colors.darkSlate
  },
  boldTitleConf: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    fontSize: 16,
    top: 15,
    textAlign: 'center',
    // color: colors.darkSlate
  },
  mainOption: {
    height: 25,
    width: 150,
    position: 'absolute',
    left: 112,
    top: 25,
    textAlign: 'center',
    color: '#000000'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 2,
    textAlign: 'center',
    marginBottom: 25,
    // color: colors.darkSlate
  },
  fullBtn: {
    paddingTop: 10,
    // backgroundColor: colors.green,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: colors.green,
    flex: 1,
    maxHeight: 45,
    width: 320
  },
  fullBtnGray: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    // backgroundColor: colors.darkGray,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: colors.darkGray,
    flex: 1,
    maxHeight: 45,
    width: 320
  },
  fullBtnStocktwits: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: '#7E98B4',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#7E98B4',
    flex: 1,
    maxHeight: 45,
    width: 320
  },
  fullBtnTwitter: {
    marginTop: 10,
    marginBottom: 10,
    paddingTop: 10,
    backgroundColor: '#00ACED',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#00ACED',
    flex: 1,
    maxHeight: 45,
    width: 320
  },
  fullBtnTxt: {
    textAlign: 'center',
    fontSize: 16,
    letterSpacing: 1,
    // color: colors.white,
  },
  smallGrnBtn: {
    // backgroundColor: colors.green,
    borderWidth: 0.5,
    // borderColor: colors.green,
    borderRadius: 2,
    overflow: 'hidden',
    textAlign: 'center',
    // color: colors.white,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 1,
    maxHeight: 21,
  },
  smallRedBtn: {
    // backgroundColor: colors.red,
    borderWidth: 0.5,
    borderColor: colors.red,
    borderRadius: 2,
    overflow: 'hidden',
    textAlign: 'center',
    // color: colors.white,
    fontSize: 12,
    paddingLeft: 6,
    paddingRight: 6,
    maxHeight: 20,
    marginLeft: 5,
  },
  smallBtnTxt: {
    fontSize: 10,
    paddingTop: 2,
    paddingLeft: 6,
    paddingRight: 6,
    maxHeight: 20,
    marginRight: 5,
    marginLeft: 0,
    width: 45
  },  
  //landing
  landingTT: {
    flex: 1,
    alignItems: 'center',
  },
  landingIcon: {
    paddingTop: 100,
    flex: 2
  },
  appIcon: {
    width: 100,
    height: 100,
  },
  tagline: {
    textAlign: 'center',
    // color: colors.darkSlate,
    marginBottom: 5,
    fontSize: 24,
    lineHeight: 35,
    width: '65%',
    flex: 2
  },
  touchOption: {
    textAlign: 'center',
    fontSize: 13,
    letterSpacing: 1,
    // color: colors.darkGray,
  },
  optionbtn: {
    flex: 1,
    maxHeight: 40,
    width: 250,
    marginTop: 25,
    paddingTop: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: colors.darkGray,
    opacity: 0.5
  },
  bluebtn: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 45,
    width: 250,
    marginTop: 25,
    paddingTop: 13,
    borderRadius: 5,
    borderWidth: 1.25,
    borderColor: colors.blue,
  },
  touchblueOption: {
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 1,
    color: colors.blue,
    marginTop: -3
  },
  //legal
  legalPageTitle: {
    fontSize: 16
  },
  legal: {
    fontSize: 12,
    color: colors.lightGray,
    flex: 1,
    marginTop: 25
  },
  legalLink: {
    fontSize: 12,
    color: colors.lightGray,
    flex: 1,
    marginTop: 25,
    textDecorationLine: 'underline'
  },
  legalContainer: {
    flex: 1,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 40,
    borderTopWidth: 0.5,
    // borderTopColor: colors.borderGray
  },
  legalTitle: {
    fontSize: 24,
    // color: colors.darkSlate
  },
  legalTxt: {
    marginTop: 5,
    marginBottom: 25,
    fontSize: 16,
    lineHeight: 24,
    // color: colors.lightGray,
  },
  legalAgree: {
    flex: 1,
    alignItems: 'center',
    maxHeight: 95,
    borderTopWidth: 0.5,
    // borderTopColor: colors.borderGray,
    paddingTop: 25
  },
  //radio modal
  radio: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  radioField: {
    paddingTop: 25,
    paddingLeft: 35,
  },
  radioTitle: {
    textAlign: 'left',
    paddingLeft: 80,
    paddingTop: 25,
  },
  radioLabel: {
    fontSize: 14, 
    paddingLeft: 25, 
    paddingTop: 15, 
    paddingBottom: 10,
    marginBottom: 2,
    // color: colors.lightGray
  },
  activeRadioLabel: {
    // color: colors.darkGray
  },
  radioLabelWrap: {
    width: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: colors.borderGray    
  },
  bottomModal: {
    width: 375,
    maxHeight: 200,
    left: 0,
    top: '55%',
    justifyContent: 'flex-start',
  },
  bottomModalTall: {
    width: 375,
    maxHeight: 300,
    left: 0,
    top: '43%',
    justifyContent: 'flex-start',
  },
  //checkbox
  checkBox: {
    width: 27,
    height: 27,
  },
  checkBoxLabelWrap: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderGray,
    width: 145
  },
  checkBoxLabel: {
    fontSize: 13,
    paddingLeft: 5,
    paddingTop: 15, 
    marginBottom: -5,
    color: colors.darkGray
  },
  checkBoxSubLabel: {
    fontSize: 11,
    lineHeight: 16,
    paddingLeft: 15, 
    paddingBottom: 10,
    marginBottom: 2,
    color: colors.lightGray
  },
  checkField: {
    paddingLeft: 20
  },
  //sign in
  details: {
    textAlign: 'center',
    // color: colors.lightGray,
    marginTop: 50,
    fontSize: 14,
    marginBottom: 50
  },
  formcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputLabel: {
    // color: colors.darkGray,
    fontSize: 12,
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  inputWrap: {
    flex: 1,
    borderBottomWidth: 0.5,
    // borderBottomColor: colors.lightGray,
    maxHeight: 50
  },
  input: {
    textAlign: 'right',
    margin:20,
    height: 40,
    padding: 10,
    width: 300,
    // color: colors.lightGray
  },
  switch: {
    margin: 10
  },
  button: {
    position: 'absolute',
    bottom: 0,
    marginTop: 25,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.darkSlate,
    width: 375
  },
  buttontxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  confButton: {
    marginTop: 25,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: colors.green,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.green
  },
  confButtontxt: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
  },
  sellBtn: {
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.red,
    flex: 1,
    maxHeight: 45,
    marginRight: 10,
    borderColor: colors.red,
    borderRadius: 5
  },
  sellBtnShort: {
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: colors.red,
    maxHeight: 45,
    flex: 1,
    borderColor: colors.red,
    borderRadius: 5
  },
  sellBtnTxt: {
    // color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    height: 24,
    letterSpacing: 1
  },
  btnRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buyBtn: {
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.green,
    maxHeight: 45,
    flex: 1,
    borderColor: colors.green,
    borderRadius: 5
  },
  buyBtnShort: {
    marginLeft: 4,
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 5,
    backgroundColor: colors.green,
    maxHeight: 45,
    flex: 1,
    borderColor: colors.green,
    borderRadius: 5,
  },
  buyBtnTxt: {
    // color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    height: 26,
    letterSpacing: 1
  },
  cancelBtn: {
    paddingTop: 8,
    paddingBottom: 12,
    backgroundColor: colors.darkGray,
    maxHeight: 45,
    flex: 1,
    borderColor: colors.darkGray,
    borderRadius: 5
  },
  cancelBtnTxt: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    height: 24,
    letterSpacing: 1
  },
  greentTxt: {
    color: colors.green,
    fontWeight: 'bold'
  },
  //rotate device
  rotateDevice: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  rotateFont: {
    fontSize: 22,
    color: colors.darkSlate,
    lineHeight: 33,
    marginBottom: -5
  },
  rotateImg: {
    width: 100,
    height: 100,
    marginBottom: 25
  },
  //images
  closeImg: {
    width: 15,
    height: 15
  },
  searchImg: {
    width: 12,
    height: 12,
    marginTop: -18,
    marginLeft: 10
  },
  backImg: {
    width: 27,
    height: 18
  },
  deleteImg: {
    width: 25,
    height: 15
  },
  deleteNumImg: {
    width: 39,
    height: 25,
    flex: 1,
    marginTop: 38
  },
  addImg: {
    width: 23,
    height: 23
  },
  report_bug_field: {
    height: 140,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#979797',
    fontSize: 24
  },
  contact_us_field: {
    height: 140,
    padding: 5,
    borderWidth: 0.5,
    borderColor: '#979797',
    fontSize: 24
  },
  contact_us_subject_field: {
    padding: 5,
    borderBottomColor: '#979797', borderBottomWidth: 0.5,
    fontSize: 24,
    marginBottom: 10
  },

});
module.exports = styles;