import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../../../selectors';
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
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';
import Modal from 'react-native-modal'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from '../../../components/react-native-simple-radio-button';
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import { isPresent } from '../../Registration/validation';
import { setTheme, getTheme, colors } from '../../../store/store';
import { stateOptionsMap } from '../../../constants';
const state_list = stateOptionsMap;

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

    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      isStateVisible: false,
      stateOption: state_list.findIndex(({label, value}) => {
        if(label === state) {
          return label === state;
        } else {
          return 0;
        }
      }),
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
    
    let stateTextLabel = '';
    if(state_list[this.state.stateOption]) {
      stateTextLabel = state_list[this.state.stateOption].label;
    }
    
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={this.onBackButtonPress}>
              <Image
                source={require('../../../images/back.png')}
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
                  selectionColor="#00CEEF"
                  onFocus={() => this.onFocus('addressOneClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressOneClass]}
                  onChange={(event) => this.onTextChange(event, 'address')}
                  value={this.state.address}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS (LINE 2)</Text>
                <TextInput
                  onBlur={() => this.onBlur('addressTwoClass')}
                  selectionColor="#00CEEF"
                  onFocus={() => this.onFocus('addressTwoClass')}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.addressTwoClass]}
                  onChange={(event) => this.onTextChange(event, 'address2')}
                  value={this.state.address2}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>CITY</Text>
                <TextInput
                  onBlur={() => this.onBlur('cityClass')}
                  onFocus={() => this.onFocus('cityClass')}
                  selectionColor="#00CEEF"
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.cityClass]}
                  onChange={(event) => this.onTextChange(event, 'city')}
                  value={this.state.city}
                />
                <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]} onPress={() => { this.showState() }}>STATE</Text>
                <View style={styles_2.subMenuRow}>
                  <TouchableOpacity style={[{ borderBottomColor: this.state.colors['borderGray'] }, styles_2.registrationFormFieldDropDown]} onPress={() => { this.showState() }}>
                    <Image onPress={() => { this.showState() }}
                      source={require('../../../images/arrowblue.png')}
                      style={[styles_2.downArrow]}
                    />
                    <Text onPress={() => { this.showState() }}
                      style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                    >{stateTextLabel}</Text>
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
                  selectionColor="#00CEEF"
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.zipClass]}
                  onChange={(event) => this.onTextChange(event, 'zipCode')}
                  value={this.state.zipCode}
                />
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight disabled={!this.state.formValid || globalData.isPatchingUser} onPress={this.updateAddress} style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>
                {globalData.isPatchingUser ? 'LOADING' : 'SAVE'}
              </Text>
            </TouchableHighlight>
            <Text> </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
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
