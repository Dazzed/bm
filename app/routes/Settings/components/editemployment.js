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
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';

import { setTheme, getTheme, colors } from '../../../store/store';
const status_list = [
  { "label": "Employed", "value": 1 },
  { "label": "Student", "value": 2 },
  { "label": "Retired", "value": 3 },
  { "label": "Unemployed", "value": 4 },
  { "label": "Self-employed", "value": 5 },
  { "label": "Other", "value": 6 }
];

class EditEmployment extends React.Component {
  constructor(props) {
    super(props);
    const {
      employment
    } = this.props.globalData.currentUser;

    var result = status_list.find(x => x.label === employment)
    let employmentOption = 0;
    if (result && 'value' in result) {
      employmentOption = result.value;
    }

    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      employmentOption: employmentOption,
      employment: employment
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
      this.props.hideEmploymentStatus();
    }
  }

  hideStatus = value => {
    if (value) {
      this.setState({
        employmentOption: value,
        employment: status_list.find(l => l.value === value).label
      });
    }
  }

  updateEmploymentStatus = async () => {
    const user_employment = {
      employment: this.state.employment
    }
    this.props.initiatePatchingUser(user_employment);
  }

  onBackButtonPress = () => {
    if (this.props.globalData.isPatchingUser) {
      return;
    }
    this.props.hideEmploymentStatus();
  }

  render() {
    const { globalData } = this.props;
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
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Employment Status</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'], paddingTop: 15 }]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, { paddingTop: 25 }]}>
              EMPLOYMENT STATUS
                    </Text>
            <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 20, paddingTop: 0 }]}>
              <View style={[styles_2.registrationFormView]}>
                <View style={styles_2.subMenuRow}>
                  <RadioForm
                    radio_props={status_list}
                    initial={this.state.employmentOption - 1}
                    formHorizontal={false}
                    labelHorizontal={true}
                    borderWidth={1}
                    buttonColor={this.state.colors['blue']}
                    buttonOuterColor={this.state.colors['white']}
                    buttonSize={22}
                    buttonOuterSize={20}
                    animation={false}
                    labelStyle={[{ color: this.state.colors['darkSlate'] }, styles_2.radioLabel, fonts.hindGunturRg]}
                    radioLabelActive={[{ color: this.state.colors['blue'] }, styles_2.activeRadioLabel, fonts.hindGunturBd]}
                    labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles_2.radioLabelWrap]}
                    onPress={this.hideStatus}
                    style={styles_2.radioField}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight disabled={globalData.isPatchingUser} onPress={this.updateEmploymentStatus} style={[styles_2.fullBtn, { height: 80 }, styles_2.formValid]}>
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

EditEmployment.propTypes = {
  globalData: PropTypes.object.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
  hideEmploymentStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditEmployment);
