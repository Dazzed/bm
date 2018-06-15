import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  registrationPageTitle: {
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 24,
    paddingTop: 24

  },
  fullBtn: {
    marginTop: 25,
    // backgroundColor: colors.green,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: colors.green,
    flex: 1,
    width: 320,
    marginLeft: 25,
    marginRight: 25
  },
  imageStyle: {
    width: 25,
    height: 25
  },
  countryStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    marginLeft: 10,
  },
  countryStyleSelected: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  naturalizedImage: {
    width: 15,
    height: 15,
    paddingTop: 15,
    paddingLeft: 15,
  },
  whyWeAsk: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: "#9a9ea8", borderWidth: 1, width: 125, alignContent: 'center', marginLeft: '50%', left: -62.5, borderRadius: 15, paddingTop: 1, paddingLeft: 5, paddingRight: 5, paddingBottom: 0    
  },
  whyWeAskLabel: {
    fontSize: 11
  },
  whyWeAskView: {
    flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: 2.5, paddingLeft: 2.5, paddingRight: 5, paddingBottom: 3 
  },
  whyWeAskText: { margin: 30, lineHeight: 30, fontSize: 20 },
  registrationFormView: { flex: 1, flexDirection: 'column', marginLeft: 40, marginRight: 40, marginBottom: 20 },
  registrationFormLabel: { margin: 4, marginTop: 25, lineHeight: 18, fontSize: 12 },
  registrationFormField: { height: 30, fontSize: 24, borderBottomColor: '#d3d3d8', borderBottomWidth: 1, borderTopWidth: 0 },
  registrationFormFieldDropDown: { height: 38, borderBottomColor: '#d3d3d8', borderBottomWidth: 1, borderTopWidth: 0 },
  registrationFormFieldActive: { borderBottomColor: '#00ceff' },
  registrationFormFieldInActive: { borderBottomColor: '#d3d3d8' },

  registrationFormKeypadField: {fontSize: 36, height: 45},
  halfModal: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    height: 305
  },
  //menu modals,
  fullModal: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 335
  },
  downArrow: {
    width: 12,
    height: 6,
    position: 'absolute',
    right: 20,
    top: 15,
    zIndex: 1
  },
  downArrowOpen: {
    width: 12,
    height: 6,
    position: 'absolute',
    right: 80,
    top: 32,
    zIndex: 1
  },
  subMenuRightModal: {
    position: 'absolute',
    // backgroundColor: colors.white,
    right: 0,
    top: 76,
    width: 189,
    height: 69,
    padding: 20,
  },
  subMenuFullModal: {
    position: 'absolute',
    // backgroundColor: colors.white,
    right: 0,
    top: 176,
    width: '100%',
    height: 69,
    padding: 20,
  },
  subMenuTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    // color: colors.darkSlate,
    height: 20
  },
  lastTradeModal: {
    // backgroundColor: colors.white,
    height: 400,
    position: 'absolute',
    top: 245,
    left: 0,
    right: 0
  },
  stateRadio: {
    marginRight: 30,
    paddingLeft: 10
  },
  radioField: {
    padding: 25,
  },
  subMenuFull: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 0.5,
    // borderBottomColor: colors.borderGray,
    flexDirection: 'column'
  },
  subMenuHalf: {
    flex: 1,
    borderRightWidth: 0.5,
    // borderRightColor: colors.borderGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  subMenuTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
    // color: colors.darkSlate,
    height: 20
  },
  subMenuTxt: {
    width: '100%',
    textAlign: 'left',
    // color: colors.lightGray,
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
  activeNumber: {
    color: '#ffffff'
  },
  inactiveNumber: {
    color: '#888888'
  },
  radioLabelWrap: {
    width: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 60
    // borderBottomColor: colors.borderGray    
  },
  radioLabel: {
    fontSize: 16,
    paddingLeft: 25,
    paddingTop: 6,
    paddingBottom: 6,
    marginBottom: 2,
    // color: colors.lightGray
  },
  activeRadioLabel: {
    // color: colors.darkGray
  },
  progressActual: {
    backgroundColor: '#00ceff',
  }

});
module.exports = styles;