import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const trending = StyleSheet.create({
  //radio modal
  radio: {
    maxHeight: 300,
    top: 0,
    right: 0,
    left: 0,
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: colors.white,
  },
  radioField: {
    padding: 25,
  },
  radioTitle: {
    textAlign: 'left',
    paddingLeft: 70,
    paddingTop: 25,
    fontWeight: 'bold',
    // color: colors.darkSlate,
  },
  radioLabel: {
    fontWeight: 'bold',
    fontSize: 14, 
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
    height: 20
     
  },
  subMenuTxt: {
    width: '100%',
    textAlign: 'left',
    // color: colors.lightGray,
    fontSize: 14
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
    fontWeight: 'bold'    
  },
  //menu modals,
  fullModal: {
    position:'absolute',
    top: 50,
    left: 0,
    right:0,
    height: 305,
    backgroundColor: colors.white
  },
  halfModal: {
    position:'absolute',
    top: 45,
    left: 0,
    right: 0,
    height: 305
  },
  subMenuLeftModal: {
    position: 'absolute',
    // backgroundColor: colors.white,
    left: 0,
    top: 75,
    width: 185,
    height: 70,
    padding: 25,
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
  lastTradeModal: {
    // backgroundColor: colors.white,
    height: 500,
    position: 'absolute',
    top: 145,
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
  //scan results
  scanContainer: {
    flex: 1,
    // backgroundColor: colors.contentBg
  },
  symbolsContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  symbolsRow: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'flex-start',
    borderBottomWidth:0.5,
    // width: '100%',
    // borderBottomColor: colors.borderGray,
    paddingTop: 10,
    paddingBottom: 5,
    height: 70
  },
  symbolsSpacer: {
    flex: 1.7
  },
  symbolsLabel: {
    flex: 1
  },
  symbolsVolume: {
    flex: 2,
    alignItems: 'center'
  },
  addBtn: {
    width: 25,
  },
  symbolsTxt: {
    // color: colors.darkSlate,
    fontSize: 20,
    height: 26
  },
  symbolsTxtDetail: {
    // color: colors.lightGray,
    fontSize: 12
  },
  symbolsTxtDetailBox: {
    fontSize: 10,
    padding: 5,
    textAlign: 'center',
    color: '#323943',
    backgroundColor: colors.darkSlate,
    width: 55,
    color: '#ffffff'
  },
  symbolsLabel: {
    marginTop:-8
  },
  symbolsLabelTxt: {
    fontSize: 17,
    paddingTop: 5,
    paddingLeft: 5,
    // color: colors.darkSlate,  
    height: 32  
  },
  symbolsLabelTxtSM: {
    fontSize: 10,
    paddingTop: 12,
    // color: colors.lightGray
  },
  symbolsAdd: {
    paddingTop: 15,
    paddingLeft: 10,
    height: 32  
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
  },
  inactive: {
    // color: colors.lightGray
  }

});
module.exports = trending;