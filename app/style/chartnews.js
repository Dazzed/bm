import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const chartNews = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  row: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center',
  	borderBottomWidth:0.5,
  	// borderBottomColor: colors.borderGray,
  	paddingTop: 10,
  	paddingBottom: 5,
  	height: 100,
  },
  rowBtn: {
  	flex: 1,
    flexDirection: 'row',
    marginRight: 25
  },
  image: {
    margin: 20,
    width: 85,
    height: 85
  },
  label: {
  	flex: 4,
    marginTop: 20
  },
  txt: {
  	fontSize: 14,
    fontWeight: 'bold',
    // color: colors.darkSlate,
    maxWidth: 200
  },
  detailTxt: {
    // color: colors.lightGray,
    fontSize: 12
  },

});
module.exports = chartNews;