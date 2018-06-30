/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import axios from 'axios';
import { API_URL } from '../config';

import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  WebView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import { isDependentValid } from './Registration/validation';

import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../components/react-native-simple-radio-button';

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import styles_2 from '../style/style_2';
import fonts from '../style/fonts';
import numbers from '../style/numbers';

import { setTheme, getTheme, colors } from '../store/store';


class EditDependents extends React.Component {
  constructor(props) {
    super(props);
    const {
      dependents
    } = this.props.globalData.currentUser;

    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      numFieldClass: styles_2.registrationFormFieldInActive,
      formValid: true,
      dependentField: dependents || '',
      formValidClass: styles_2.formValid
    };
  }

  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
      this.setState({ colors: colors(currentGlobalData.isDarkThemeActive) });
    }
    if (prevGlobalData.isPatchingUser === true && currentGlobalData.isPatchingUser === false) {
      this.props.hideDependents();
    }
  }

  addNum(num) {
    var curNums;
    if (this.state.dependentField == null) {
      curNums = num;
    } else {
      curNums = this.state.dependentField + '' + num;
      if (curNums.length > 2) {
        curNums = this.state.dependentField;
      }
    }

    this.setState({
      dependentField: curNums, numFieldClass: styles_2.registrationFormFieldActive
    });
    const isFormValid = isDependentValid(curNums);
    this.setState({
      formValid: isFormValid,
      formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
    });
  }

  removeNum(num) {
    if (this.state.dependentField) {
      var delNums = this.state.dependentField;
      delNums = delNums.substr(0, delNums.length - 1);
      if (delNums === '') {
        this.setState({
          numFieldClass: styles_2.registrationFormFieldInActive, formValid: false,
          formValidClass: styles_2.formInvalid
        });
      }
      this.setState({ dependentField: delNums })
    }
    this.setState({
      dependentField: delNums, numFieldClass: styles_2.registrationFormFieldActive
    });
    const isFormValid = isDependentValid(delNums);
    this.setState({
      formValid: isFormValid,
      formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
    });
  }

  updateDependent = async () => {
    const user_dependents = {
      dependents: this.state.dependentField
    }
    this.props.initiatePatchingUser(user_dependents);
  }

  onBackButtonPress = () => {
    if (this.props.globalData.isPatchingUser) {
      return;
    }
    this.props.hideDependents();
  }

  render() {
    const {
      globalData
    } = this.props;
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={this.onBackButtonPress}>
              <Image
                source={require('../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Dependents</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'], paddingTop: 15 }]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, { paddingTop: 20 }]}>
              NUMBER OF DEPENDENTS
            </Text>
            <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 25, paddingTop: 40 }]}>
              <View style={[styles_2.registrationFormView]}>
                <TextInput placeholder="XX" placeholderTextColor={this.state.colors['darkSlate']} value={this.state.dependentField}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={2} editable={false}
                />
              </View>
              <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 25, borderBottomWidth: 0, borderBottomColor: this.state.colors['white'] }, styles_2.numContainer]}>
                <View style={styles_2.digitContainer}>
                  <View style={numbers.row}>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(1); }}>1</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(2); }}>2</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(3); }}>3</Text>
                  </View>
                  <View style={numbers.row}>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(4); }}>4</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(5); }}>5</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(6); }}>6</Text>
                  </View>
                  <View style={numbers.row}>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(7); }}>7</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(8); }}>8</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(9); }}>9</Text>
                  </View>
                  <View style={numbers.row}>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]}></Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(0); }}>0</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers_right, fonts.hindGunturRg]} onPress={() => { this.removeNum(); }}>
                      <Text> </Text>
                      <Image
                        source={this.state.colors['deleteImg']}
                        style={{ width: 40, height: 26 }}
                      />
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight disabled={!this.state.formValid} onPress={this.updateDependent} style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>
                {globalData.isPatchingUser ? 'LOADING' : 'SAVE'}
              </Text>
            </TouchableHighlight>
            <Text> </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

EditDependents.propTypes = {
  globalData: PropTypes.object.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
  hideDependents: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditDependents);
