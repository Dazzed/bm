import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../../../selectors';
import {
  ScrollView,
  KeyboardAvoidingView,
  Text,
  TextInput,
  SafeAreaView,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Image
} from 'react-native';
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import numbers from '../../../style/numbers';

import { colors } from '../../../store/store';
import { formatPhoneNumber } from '../../../utility';

class PhoneSelection extends Component {
  static propTypes = {
    onForwardStep: PropTypes.func.isRequired,
    colors: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      phone: props.globalData.currentUser.phone,
      colors: colors(props.globalData.isDarkThemeActive),
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
      this.props.hidePhone();
    }
  }

  formValid = () => {
    return this.state.phone.length === 10;
  }

  returnFormValidClass() {
    return this.formValid() ? styles_2.formValid : styles_2.formInvalid
  }

  addNum = num => {
    let inputValue = num + '';
    let updatedValue = this.state.phone;
    if (updatedValue.length < 10) {
      updatedValue += inputValue;
    }
    this.setState({
      phone: updatedValue
    });
  }

  removeNum = () => {
    if (this.state.phone.length >= 1) {
      this.setState(({ phone }) => ({
        phone: phone.substr(0, phone.length - 1)
      }));
    }
  }

  onBackButtonPress = () => {
    if (this.props.globalData.isPatchingUser) {
      return;
    }
    this.props.hidePhone();
  }

  patchPhone = () => {
    const { phone } = this.state;
    this.props.initiatePatchingUser({
      phone
    });
  }

  render() {
    const {
      phone
    } = this.state;
    const {
      globalData
    } = this.props;
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
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Phone</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'], paddingTop: 15 }]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, { paddingTop: 20 }]}>
              PHONE NUMBER
            </Text>
            <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 25, paddingTop: 40 }]}>
              <View style={[styles_2.registrationFormView]}>
                <TextInput placeholder="XXX-XXX-XXXX" placeholderTextColor={this.state.colors['grey']} value={formatPhoneNumber(phone)}
                  style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={2} editable={false}
                  selectionColor="#00CEEF"
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
            <TouchableHighlight disabled={!this.formValid() || globalData.isPatchingUser} onPress={this.patchPhone} style={[styles_2.fullBtnSettings, { height: 80 }, this.returnFormValidClass()]}>
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

PhoneSelection.propTypes = {
  colors: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
  hidePhone: PropTypes.func.isRequired,
  behavior: PropTypes.string,
};

PhoneSelection.defaultProps = {
  behaviour: 'padding'
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(PhoneSelection);
