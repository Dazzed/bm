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

import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';
import RegistrationHeader from './registrationHeader';

@observer
export default class NameSelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    updateRegistrationParams: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
    // registrationPage: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.checkFormValidity();

    this.state = {
      showWhyWeAsk: false,
      firstNameClass: styles_2.registrationFormFieldInActive,
      lastNameClass: styles_2.registrationFormFieldInActive,
      formValid: false,
    }

  }

  toggleWhyWeAsk = () => {
    this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
  }

  onFocus = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldActive })
  }

  onBlur = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldInActive })
  }

  checkFormValidity() {
    const { registrationDataJS } = registrationStore;
    return isPresent(registrationDataJS.firstName) && isPresent(registrationDataJS.lastName);
  }

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.props.updateRegistrationParams({
      [field]: text
    });
    this.setState({
      formValid: this.checkFormValidity(),
    });

  }

  getFormValidityClass() {
    return this.checkFormValidity() ? styles_2.formValid : styles_2.formInvalid
  }

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
          
          <RegistrationHeader headerText={'NAME'} generalText={null} whyWeAskText={'Uncle Sam requires all brokerages to collect this info for identification verification'} />

          <View style={[{ backgroundColor: this.props.colors['white'] }]}>
            <View style={[styles_2.registrationFormView]}>
              <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>FIRST NAME</Text>
              <TextInput
                onBlur={() => this.onBlur('firstNameClass')}
                onFocus={() => this.onFocus('firstNameClass')}
                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.firstNameClass]}
                onChange={(event) => this.onTextChange(event, 'firstName')}
                value={registrationDataJS.firstName}
              />
              <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>LAST NAME</Text>
              <TextInput
                onBlur={() => this.onBlur('lastNameClass')}
                onFocus={() => this.onFocus('lastNameClass')}
                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.lastNameClass]}
                onChange={(event) => this.onTextChange(event, 'lastName')}
                value={registrationDataJS.lastName}
              />
            </View>
          </View>
        </ScrollView>
        <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
          <TouchableHighlight
            disabled={!this.checkFormValidity()}
            onPress={this.props.onForwardStep}
            style={[styles_2.fullBtn, { height: 80 }, this.getFormValidityClass()]}
          >
            <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
          </TouchableHighlight>
          <Text> </Text>
        </View>
      </KeyboardAvoidingView>
    )
  }
}
