import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

var colors = require('./colors')

const styles = StyleSheet.create({
  registrationPageTitle: {
    paddingTop: 40,
    paddingBottom: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  fullBtn: {
    paddingTop: 20,
    // backgroundColor: colors.green,
    borderRadius: 5,
    borderWidth: 0.5,
    // borderColor: colors.green,
    flex: 1,
    maxHeight: 60,
    width: 320,
    marginLeft: 25
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
  }
});
module.exports = styles;