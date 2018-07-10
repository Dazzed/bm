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

import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../components/react-native-simple-radio-button';

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import styles_2 from '../style/style_2';
import fonts from '../style/fonts';
import { isPresent } from './Registration/validation';

import { setTheme, getTheme, colors } from '../store/store';
const state_list = [
  { "label": "Select", "value": 0 },
  { "label": "Alabama", "value": 1 },
  { "label": "Alaska", "value": 2 },
  { "label": "Arizona", "value": 3 },
  { "label": "Arkansas", "value": 4 },
  { "label": "California", "value": 5 },
  { "label": "Colorado", "value": 6 },
  { "label": "Connecticut", "value": 7 },
  { "label": "Delaware", "value": 8 },
  { "label": "District of Columbia", "value": 9 },
  { "label": "Florida", "value": 10 },
  { "label": "Georgia", "value": 11 },
  { "label": "Hawaii", "value": 12 },
  { "label": "Idaho", "value": 13 },
  { "label": "Illinois", "value": 14 },
  { "label": "Indiana", "value": 15 },
  { "label": "Iowa", "value": 16 },
  { "label": "Kansa", "value": 17 },
  { "label": "Kentucky", "value": 18 },
  { "label": "Lousiana", "value": 19 },
  { "label": "Maine", "value": 20 },
  { "label": "Maryland", "value": 21 },
  { "label": "Massachusetts", "value": 22 },
  { "label": "Michigan", "value": 23 },
  { "label": "Minnesota", "value": 24 },
  { "label": "Mississippi", "value": 25 },
  { "label": "Missouri", "value": 26 },
  { "label": "Montana", "value": 27 },
  { "label": "Nebraska", "value": 28 },
  { "label": "Nevada", "value": 29 },
  { "label": "New Hampshire", "value": 30 },
  { "label": "New Jersey", "value": 31 },
  { "label": "New Mexico", "value": 32 },
  { "label": "New York", "value": 33 },
  { "label": "North Carolina", "value": 34 },
  { "label": "North Dakota", "value": 35 },
  { "label": "Ohio", "value": 36 },
  { "label": "Oklahoma", "value": 37 },
  { "label": "Oregon", "value": 38 },
  { "label": "Pennsylvania", "value": 39 },
  { "label": "Rhode Island", "value": 40 },
  { "label": "South Carolina", "value": 41 },
  { "label": "South Dakota", "value": 42 },
  { "label": "Tennessee", "value": 43 },
  { "label": "Texas", "value": 44 },
  { "label": "Utah", "value": 45 },
  { "label": "Vermont", "value": 46 },
  { "label": "Virginia", "value": 47 },
  { "label": "Washington", "value": 48 },
  { "label": "West Virginia", "value": 49 },
  { "label": "Wisconsin", "value": 50 },
  { "label": "Wyoming", "value": 51 }
];

class EditAddress extends React.Component {
  constructor(props) {
    super(props);
    const {
      address,
      address2,
      city,
      state,
      zipCode,
    } = this.props.globalData.currentUser;

    let stateAsInt = state;
    if(typeof state !== 'number') {
      stateAsInt = Number(state);
    }

    console.log('state as int', stateAsInt)

    let stateOption = 0;
    
    state_list.every((elem, i) => {
      
      if(elem.value === stateAsInt) {
        stateOption = elem.value;
        return false;
      }
      return true;
    })
    
    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      isStateVisible: false,
      stateOption: stateOption,
      addressOneClass: styles_2.registrationFormFieldInActive,
      addressTwoClass: styles_2.registrationFormFieldInActive,
      cityClass: styles_2.registrationFormFieldInActive,
      zipClass: styles_2.registrationFormFieldInActive,
      address: address || '',
      address2: address2 || '',
      city: city || '',
      state: state || 'Select',
      zipCode: zipCode || '',
      formValid: true,
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
      this.props.hideAddress();
    }
  }

  hideState = value => {
    if (value) {
      this.setState({
        isStateVisible: false,
        stateOption: value,
        state: state_list[value].label
      }, this.validate);
    } else {
      this.setState({
        isStateVisible: false
      }, this.validate);
    }
  };

  showState() {
    this.setState({ isStateVisible: true });
  }

  onFocus = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldActive })
  }

  onBlur = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldInActive })
  }

  validate = () => {
    const {
      address,
      zipCode,
      state,
      city
    } = this.state;
    const isValid = isPresent({
      address,
      zipCode,
      state,
      city
    }) && this.state.state !== 'Select';
  
    this.setState({
      formValid: isValid,
      formValidClass: isValid ? styles_2.formValid : styles_2.formInvalid
    });
  }

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.setState({
      [field]: text
    }, this.validate);
  }

  updateAddress = () => {
    const addressData = {
      address: this.state.address,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zipCode: this.state.zipCode
    } 
    this.props.initiatePatchingUser(addressData);
  }

  onBackButtonPress = () => {
    if (this.props.globalData.isPatchingUser) {
      return;
    }
    this.props.hideAddress();
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
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Address</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'], paddingTop: 15}]}>
            <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 25 }]}>
              <View style={[styles_2.registrationFormView]}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS</Text>
                <TextInput
                  onBlur={() => this.onBlur('addressOneClass')}
                  onFocus={() => this.onFocus('addressOneClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressOneClass]}
                  onChange={(event) => this.onTextChange(event, 'address')}
                  value={this.state.address}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS (LINE 2)</Text>
                <TextInput
                  onBlur={() => this.onBlur('addressTwoClass')}
                  onFocus={() => this.onFocus('addressTwoClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressTwoClass]}
                  onChange={(event) => this.onTextChange(event, 'address2')}
                  value={this.state.address2}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>CITY</Text>
                <TextInput
                  onBlur={() => this.onBlur('cityClass')}
                  onFocus={() => this.onFocus('cityClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.cityClass]}
                  onChange={(event) => this.onTextChange(event, 'city')}
                  value={this.state.city}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]} onPress={() => { this.showState() }}>STATE</Text>
                <View style={styles_2.subMenuRow}>
                  <TouchableOpacity style={[{ borderBottomColor: this.state.colors['borderGray'] }, styles_2.registrationFormFieldDropDown]} onPress={() => { this.showState() }}>
                    <Image onPress={() => { this.showState() }}
                      source={require('../images/arrowblue.png')}
                      style={[styles_2.downArrow]}
                    />
                    <Text onPress={() => { this.showState() }}
                      style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                    >{state_list[this.state.stateOption].label}</Text>
                  </TouchableOpacity>
                  <Modal
                    isVisible={this.state.isStateVisible}
                    animationIn={'fadeIn'}
                    animationOut={'fadeOut'}
                    style={styles_2.fullModal}
                  // onModalHide={() => { this.hideState() }}
                  >
                    <View style={[{ backgroundColor: this.state.colors['white'] }, styles_2.subMenuFullModal]}>
                      { //<Image source={require('../../../images/arrowblue.png')} style={[styles_2.downArrow]}/>
                      }
                      <Text style={[{ color: this.state.colors['darkSlate'] }, styles_2.subMenuTitle, fonts.hindGunturBd]}>STATE</Text>
                    </View>
                    <View style={[{ backgroundColor: this.state.colors['white'] }, styles_2.lastTradeModal]}>
                      <ScrollView style={styles_2.stateRadio}>
                        <RadioForm
                          radio_props={state_list}
                          initial={this.state.stateOption}
                          formHorizontal={false}
                          labelHorizontal={true}
                          borderWidth={1}
                          buttonColor={this.state.colors['blue']}
                          buttonOuterColor={this.state.colors['lightGray']}
                          buttonSize={22}
                          buttonOuterSize={20}
                          animation={false}
                          labelStyle={[{ color: this.state.colors['lightGray'] }, styles_2.radioLabel, fonts.hindGunturRg]}
                          radioLabelActive={[{ color: this.state.colors['blue'] }, styles_2.activeRadioLabel, fonts.hindGunturBd]}
                          labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles_2.radioLabelWrap]}
                          onPress={(value) => { this.hideState(value) }}
                          style={styles_2.radioField}
                        />
                      </ScrollView>
                    </View>
                  </Modal>
                </View>
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>ZIP CODE</Text>
                <TextInput
                  onBlur={() => this.onBlur('zipClass')}
                  onFocus={() => this.onFocus('zipClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.zipClass]}
                  onChange={(event) => this.onTextChange(event, 'zipCode')}
                  value={this.state.zipCode}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight disabled={!this.state.formValid} onPress={this.updateAddress} style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}>
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

EditAddress.propTypes = {
  globalData: PropTypes.object.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
  hideAddress: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditAddress);
