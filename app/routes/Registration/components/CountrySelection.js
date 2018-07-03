import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  ScrollView,
  KeyboardAvoidingView,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  WebView,
  Image,
  Alert,
  TouchableOpacity,
  TouchableHighlight
} from 'react-native';
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';

import checkBoxBlue from '../../../images/checkbox_blue.png';
import checkBoxOutline from '../../../images/checkbox_outline.png';
import { isPresent } from '../validation';


import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';

const country_list = [
  { "label": "U.S. Citizen", "value": 0 },
  { "label": "I am NOT a U.S. Citizen", "value": 1 }
];

@observer
export default class CountrySelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    updateRegistrationParams: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired
  }

  constructor(props){
    super(props);

    // const {
    //   registrationPage: {
    //     country
    //   }
    // } = this.props;
    //
    // console.log(typeof country)
    // console.log(country);
    //
    // if (country === null) {
    //   this.state = {
    //     country: 0
    //   }
    // } else {
    //   this.state = {
    //     country: country
    //   }
    // }

  }

  setStatus(value) {
    console.log('val', value)
    // let val = value.target.val
    this.props.updateRegistrationParams({
      country: value
    });
  }

  onHandleCountrySelection = () => {
    const { registrationDataJS } = registrationStore;
    if (registrationDataJS.country === 1) {
      this.props.navigation.goBack();
    } else {
      this.props.onForwardStep();
    }
  };


  render() {
    const { registrationDataJS } = registrationStore;
    return (
      <KeyboardAvoidingView
        behavior={this.props.behavior}
        style={styles_2.section}>
        <View style={[{ margin: 15 }]}>
          <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
          <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: this.props.progress, borderRadius: 1.5 }]}></View>
        </View>
        <ScrollView style={{ height: '72%' }}>
          <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, { paddingTop: 25 }]}>
            COUNTRY OF CITIZENSHIP
          </Text>
          <View style={[styles_2.whyWeAskView]}>
            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
              Currently our application only supports United States citizens. If you are not a U.S. citizen, we will reach out and let you know when we can support additional countries.
            </Text>
          </View>
          <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 20, paddingTop: 0 }]}>
            <View style={[styles_2.registrationFormView]}>
              <View style={styles_2.subMenuRow}>
                <RadioForm
                  radio_props={country_list}
                  initial={registrationDataJS.country}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={this.props.colors['blue']}
                  buttonOuterColor={this.props.colors['white']}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.props.colors['darkSlate'] }, styles_2.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.props.colors['blue'] }, styles_2.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ borderBottomColor: this.props.colors['borderGray'] }, styles_2.radioLabelWrap]}
                  onPress={(value) => { this.setStatus(value) }}
                  style={styles_2.radioField}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
          <TouchableHighlight onPress={this.onHandleCountrySelection} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 80 }]}>
            <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
          </TouchableHighlight>
          <Text> </Text>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
