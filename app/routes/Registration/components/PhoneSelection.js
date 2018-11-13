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
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import NumericalSelector from '../../../sharedComponents/NumericalSelector';
import { observer } from 'mobx-react';
import { registrationStore, colorStore } from '../../../mobxStores';
import RegistrationHeader from './registrationHeader';
import { formatPhoneNumber } from '../../../utility';
import Button from '../../../sharedComponents/Button1';


@observer
export default class PhoneSelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    updateRegistrationParams: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      showWhyWeAsk: false,
      // numFieldClass: styles_2.registrationFormFieldInActive,
    }
  }

  formValid() {
    const { registrationDataJS } = registrationStore;
    return registrationDataJS.phoneField.length === 10
  }

  returnFormValidClass() {
    return this.formValid() ? styles_2.formValid : styles_2.formInvalid
  }

  addNum = (num) => {
    const { registrationDataJS } = registrationStore;

    let inputValue = num + '';
    let updatedValue = registrationDataJS.phoneField;
    if (registrationDataJS.phoneField.length < 10) {
      updatedValue += inputValue;
    }

    this.props.updateRegistrationParams({
      phoneField: updatedValue
    });
  }

  removeNum = num => {
    const { registrationDataJS } = registrationStore;
    if (registrationDataJS.phoneField.length >= 1) {
      this.props.updateRegistrationParams({
        phoneField: registrationDataJS.phoneField.substr(0, registrationDataJS.phoneField.length - 1)
      });
    }
  }

  toggleWhyWeAsk = () => {
    this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
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
        <ScrollView style={{ flex: 1 }}>
          <RegistrationHeader headerText={'PHONE NUMBER'} generalText={null} whyWeAskText={'Uncle Sam requires all brokerages to collect this info for identification verification'} />
          <View style={[{ backgroundColor: this.props.colors['white'], paddingVertical: 40 }]}>
            <View style={[styles_2.registrationFormView]}>
              <TextInput placeholder="XXX-XXX-XXXX" placeholderTextColor={this.props.colors['lightGray']} value={formatPhoneNumber(registrationDataJS.phoneField)}
                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField]} maxLength={12} editable={false}
                selectionColor="#00CEEF"
              />
            </View>
            <NumericalSelector onChange={(value) => this.addNum(value)} onDelete={this.removeNum} disabledList={['.']} hideDot={true} />
          </View>
        </ScrollView>
        <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
          
          <View style={{padding: 20}}>
            <Button title={'NEXT'} disabled={!this.formValid()} onPress={this.props.onForwardStep} />
          </View>
          
        </View>
      </KeyboardAvoidingView>
    )
  }
}
