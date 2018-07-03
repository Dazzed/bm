import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Button,
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

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { isPresent } from '../validation';

export default class NameSelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    updateRegistrationParams: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
    registrationPage: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    const {
      registrationPage: {
        firstName,
        lastName
      }
    } = this.props;
    const isFormValid = isPresent(firstName) && isPresent(lastName);
    this.state = {
      showWhyWeAsk: false,
      firstNameClass: styles_2.registrationFormFieldInActive,
      lastNameClass: styles_2.registrationFormFieldInActive,
      formValid: isFormValid,
      firstName: firstName || '',
      lastName: lastName || '',
      formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
    }
  }

  toggleWhyWeAsk = () => {
    this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
  }

  whyWeAsk = () => {
    if (this.state.showWhyWeAsk) {
      return (
        <View style={[styles_2.whyWeAskView]}>
          <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
            Uncle Sam requires all brokerages to collect this info for identification verification
                </Text>
          <Image source={this.props.colors['illustration']} style={{ width: 380, height: 159, marginRight: 5 }} />
        </View>
      );
    }
    return null;
  }

  onFocus = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldActive })
  }

  onBlur = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldInActive })
  }

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.props.updateRegistrationParams({
      [field]: text
    });
    this.setState({
      [field]: text
    });
    const isFormValid = isPresent(this.state.firstName) && isPresent(this.state.lastName);
    this.setState({
      formValid: isFormValid,
      formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
    });
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={this.props.behavior}
        style={styles_2.section}>
        <View style={[{ margin: 15 }]}>
          <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
          <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '17%', borderRadius: 1.5 }]}></View>
        </View>
        <ScrollView style={{ height: '72%' }}>
          <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
            NAME
          </Text>
          <View style={[styles_2.whyWeAsk]}>
            <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
              WHY WE ASK
            </Text>
            <Image onPress={this.toggleWhyWeAsk} source={this.state.showWhyWeAsk ? up : down} style={{ width: 11, height: 7, marginLeft: 5, marginBottom: 1 }} />
          </View>
          {this.whyWeAsk()}
          <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25 }]}>
            <View style={[styles_2.registrationFormView]}>
              <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>FIRST NAME</Text>
              <TextInput
                onBlur={() => this.onBlur('firstNameClass')}
                onFocus={() => this.onFocus('firstNameClass')}
                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.firstNameClass]}
                onChange={(event) => this.onTextChange(event, 'firstName')}
                value={this.state.firstName}
              />
              <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>LAST NAME</Text>
              <TextInput
                onBlur={() => this.onBlur('lastNameClass')}
                onFocus={() => this.onFocus('lastNameClass')}
                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.lastNameClass]}
                onChange={(event) => this.onTextChange(event, 'lastName')}
                value={this.state.lastName}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
          <TouchableHighlight
            disabled={!this.state.formValid}
            onPress={this.props.onForwardStep}
            style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}
          >
            <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
          </TouchableHighlight>
          <Text> </Text>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
