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
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { isPresent } from '../validation';

import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';


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

@observer
export default class AddressSelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
    updateRegistrationParams: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      showWhyWeAsk: false,
      isStateListVisible: false,
      // stateOption: 0,
      addressOneClass: styles_2.registrationFormFieldInActive,
      addressTwoClass: styles_2.registrationFormFieldInActive,
      cityClass: styles_2.registrationFormFieldInActive,
      zipClass: styles_2.registrationFormFieldInActive,
    };
  }

  getFormValidClass() {
    return this.isFormValid() ? styles_2.formValid : styles_2.formInvalid
  }

  hideState = value => {
    if (value) {
      this.props.updateRegistrationParams({
        stateOption: value,
        state: state_list[value].label
      });
    }

    this.setState({ isStateListVisible: false });
  };

  showState() {
    this.setState({ isStateListVisible: true });
  }

  toggleWhyWeAsk = () => this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));

  whyWeAsk = () => {
    if (this.state.showWhyWeAsk) {
      return (
        <View style={[styles_2.whyWeAskView]}>
          <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
            Uncle Sam requires all brokerages to collect this info for identification verification
          </Text>
          <Image source={this.props.colors['illustration']} style={{ width: 358, height: 150, marginRight: -52 }} />
        </View>
      );
    }
  }

  onFocus = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldActive })
  }

  onBlur = (item) => {
    this.setState({ [item]: styles_2.registrationFormFieldInActive })
  }



  isFormValid = () => {
    const { registrationDataJS } = registrationStore;
    const {
      address,
      zip,
      state,
      city
    } = registrationDataJS;
    const isValid = isPresent({
      address,
      zip,
      state,
      city
    });
    return isValid;
  }

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.props.updateRegistrationParams({
      [field]: text
    });
    this.setState({
      [field]: text
    }, this.validate);
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
            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
              ADDRESS
            </Text>
            <View style={[styles_2.whyWeAsk]}>
              <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                WHY WE ASK
              </Text>
              <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
            </View>
            {this.whyWeAsk()}
            <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25 }]}>
              <View style={[styles_2.registrationFormView]}>
                <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS</Text>
                <TextInput
                    onBlur={() => this.onBlur('addressOneClass')}
                    onFocus={() => this.onFocus('addressOneClass')}
                    style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressOneClass]}
                    onChange={(event) => this.onTextChange(event, 'address')}
                    value={registrationDataJS.address}
                />
                <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS (LINE 2)</Text>
                <TextInput
                    onBlur={() => this.onBlur('addressTwoClass')}
                    onFocus={() => this.onFocus('addressTwoClass')}
                    style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressTwoClass]}
                    onChange={(event) => this.onTextChange(event, 'address2')}
                    value={registrationDataJS.address2}
                />
                <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>CITY</Text>
                <TextInput
                    onBlur={() => this.onBlur('cityClass')}
                    onFocus={() => this.onFocus('cityClass')}
                    style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.cityClass]}
                    onChange={(event) => this.onTextChange(event, 'city')}
                    value={registrationDataJS.city}
                />
                <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]} onPress={() => { this.showState() }}>STATE</Text>
                <View style={styles_2.subMenuRow}>
                  <TouchableOpacity style={[{ borderBottomColor: this.props.colors['borderGray'] }, styles_2.registrationFormFieldDropDown]} onPress={() => { this.showState() }}>
                    <Image onPress={() => { this.showState() }}
                           source={require('../../../images/arrowblue.png')}
                           style={[styles_2.downArrow]}
                    />
                    <Text onPress={() => { this.showState() }}
                          style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                    >{state_list[registrationDataJS.stateOption].label}</Text>
                  </TouchableOpacity>
                  <Modal
                      isVisible={this.state.isStateListVisible}
                      animationIn={'fadeIn'}
                      animationOut={'fadeOut'}
                      style={styles_2.fullModal}
                      // onModalHide={() => { this.hideState() }}
                  >
                    <View style={[{ backgroundColor: this.props.colors['white'] }, styles_2.subMenuFullModal]}>
                      { //<Image source={require('../../../images/arrowblue.png')} style={[styles_2.downArrow]}/>
                      }
                      <Text style={[{ color: this.props.colors['darkSlate'] }, styles_2.subMenuTitle, fonts.hindGunturBd]}>STATE</Text>
                    </View>
                    <View style={[{ backgroundColor: this.props.colors['white'] }, styles_2.lastTradeModal]}>
                      <ScrollView style={styles_2.stateRadio}>
                        <RadioForm
                            radio_props={state_list}
                            initial={registrationDataJS.stateOption}
                            formHorizontal={false}
                            labelHorizontal={true}
                            borderWidth={1}
                            buttonColor={this.props.colors['blue']}
                            buttonOuterColor={this.props.colors['lightGray']}
                            buttonSize={22}
                            buttonOuterSize={20}
                            animation={false}
                            labelStyle={[{ color: this.props.colors['lightGray'] }, styles_2.radioLabel, fonts.hindGunturRg]}
                            radioLabelActive={[{ color: this.props.colors['blue'] }, styles_2.activeRadioLabel, fonts.hindGunturBd]}
                            labelWrapStyle={[{ borderBottomColor: this.props.colors['borderGray'] }, styles_2.radioLabelWrap]}
                            onPress={(value) => { this.hideState(value) }}
                            style={styles_2.radioField}
                        />
                      </ScrollView>
                    </View>
                  </Modal>
                </View>
                <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>ZIP CODE</Text>
                <TextInput
                    onBlur={() => this.onBlur('zipClass')}
                    onFocus={() => this.onFocus('zipClass')}
                    style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.zipClass]}
                    onChange={(event) => this.onTextChange(event, 'zip')}
                    value={registrationDataJS.zip}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight disabled={!this.isFormValid()} onPress={this.props.onForwardStep} style={[styles_2.fullBtn, { height: 80 }, this.getFormValidClass()]}>
              <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
            </TouchableHighlight>
            <Text> </Text>
          </View>
        </KeyboardAvoidingView>
    )
  }
}
