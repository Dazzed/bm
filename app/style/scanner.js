import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const scanner = StyleSheet.create({
  //radio modal
  radio: {
  	maxHeight: 335,
  	left: 0,
    right: 0,
  	top: 0,
  	flex: 1,
  	justifyContent: 'flex-start',
    // backgroundColor: colors.white,
  },
  radioField: {
    padding: 25,
  },
  radioTitle: {
  	textAlign: 'left',
  	paddingLeft: 80,
  	paddingTop: 25,
    // color: colors.darkSlate,
  },
  radioLabel: {
  	fontSize: 16, 
  	paddingLeft: 25, 
  	paddingTop: 10, 
  	paddingBottom: 10,
  	marginBottom: 2
  },
  //submenu
  subMenu: {
    flex: 1,
    borderBottomWidth:0.5,
    // borderBottomColor: colors.borderGray,
    maxHeight: 140,
    // backgroundColor: colors.white
  },
  subMenuTitle: {
    width: '100%',
    textAlign: 'left',
    fontSize:15,
    // color: colors.darkSlate,
    height: 20
  },
  subMenuTxt: {
    width: '100%',
    textAlign: 'left',
    // color: colors.lightGray,
  },
  subMenuRow: {
    flex: 1,
    flexDirection: 'row'
  },
  subMenuFull: {
    flex: 1,
    padding: 20,
    borderBottomWidth:0.5,
    // borderBottomColor: colors.borderGray,
    flexDirection: 'column'
  },
  subMenuHalf: {
    flex: 1,
    borderRightWidth:0.5,
    // borderRightColor: colors.borderGray,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
  },
  leftMenuText: {
    width: '100%',
    textAlign: 'left',
    // color: colors.darkSlate 
  },
  //menu modals,
  fullModal: {
    position:'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 335
  },
  halfModal: {
    position:'absolute',
    top: 120,
    left: 0,
    right:0,
    height: 305
  },
  subMenuLeftModal: {
    position: 'absolute',
    // backgroundColor: colors.white,
    left: 0,
    top: 0,
    width: 185,
    height: 70,
    padding: 25,
  },
  subMenuRightModal: {
    position: 'absolute',
    // backgroundColor: colors.white,
    right: 0,
    top: 0,
    width: 189,
    height: 69,
    padding: 20,
  },
  //scan results
  scanContainer: {
    flex: 1,
    // backgroundColor: colors.contentBg
  },
  symbolsContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 30,
  },
  symbolsStyle: {
    flex: 1, 
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  symbolsRowFirst: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-start',
  	maxHeight: 45,
    paddingRight: 40
  },
  symbolsRow: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-start',
  	borderBottomWidth:0.5,
  	// borderBottomColor: colors.borderGray,
  	paddingTop: 10,
  	paddingBottom: 5,
  	height: 50,
  },
  symbolsSpacer: {
  	width: 100
  },
  symbolsLabel: {
  	flex: 1,
  },
  symbolsTitle: {
    fontSize: 11,
    marginTop: 25,
    marginBottom: 5,
    // color: colors.lightGray,
    textAlign: 'right'
  },
  symbolsTxt: {
  	// color: colors.blue,
  	fontSize: 28,
    marginTop: -5,
    height: 40
  },
  symbolsLabelTxt: {
  	fontSize: 17,
  	paddingTop: 5,
    paddingRight: 10,
    // color: colors.darkSlate,
    textAlign: 'right'
  },
  lastTradeModal: {
  	// backgroundColor: colors.white,
  	height: 500,
  	position: 'absolute',
  	top: 45,
  	left: 0,
    right: 0
  },
  sectorRadio: {
    marginRight: 30,
    paddingLeft: 10
  },
  scanRadio: {
    marginRight: 70,
    paddingLeft: 10
  },
  confirmBtn: {
    flex: 1,
    maxHeight: 45,
    alignItems: 'center'
  },
  sectorModal: {
  	backgroundColor: '#ffffff',
  	height: 500,
  	width: 375,
  	position: 'absolute',
  	top: 145,
  	left: 0
  },
  scanModal: {
  },
  downArrow: {
    width: 12,
    height: 6,
    position: 'absolute',
    right: 20,
    top: 30,
    zIndex: 1
  },
  downArrowOpen: {
    width: 12,
    height: 6,
    position: 'absolute',
    right: 80,
    top: 32,
    zIndex: 1
  }


});
module.exports = scanner;