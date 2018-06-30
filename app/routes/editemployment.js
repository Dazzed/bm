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

import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../components/react-native-simple-radio-button';

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import styles_2 from '../style/style_2';
import fonts from '../style/fonts';
import { isPresent } from './Registration/validation';

import { setTheme, getTheme, colors } from '../store/store';
const status_list = [
  { "label": "Employed", "value": 0 },
  { "label": "Student", "value": 1 },
  { "label": "Retired", "value": 2 },
  { "label": "Unemployed", "value": 3 },
  { "label": "Self-employed", "value": 4 },
  { "label": "Other", "value": 5 }
];

class EditEmployment extends React.Component {
  constructor(props) {
    super(props);
    const {
      employment
    } = this.props.globalData.currentUser;

    var result = status_list.find(x => x.label === employment)
    const employmentOption = result.value;

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
  }

  hideStatus(value) {
    if (value) {
      this.setState({
        employmentOption: value,
        employment: status_list.find(l => l.value === value).label
      });
    } else {
      this.setState({})
    }
  }

  updateEmploymentStatus = async () => {
    const user_employment = {
      employment: this.state.employment
    }
    const res = await axios.patch(`${API_URL}/api/users/${this.props.globalData.currentUser.id}?access_token=${this.props.globalData.currentUser.access_token}`, user_employment);
    console.log(res);
    this.props.hideEmploymentStatus();
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideEmploymentStatus()}>
              <Image
                source={require('../images/back.png')}
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
                    initial={this.state.employmentOption}
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
                    onPress={(value) => { this.hideStatus(value) }}
                    style={styles_2.radioField}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight onPress={this.updateEmploymentStatus} style={[styles_2.fullBtn, { height: 80 }, styles_2.formValid]}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>SAVE</Text>
            </TouchableHighlight>
            <Text> </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// export default EditEmployment;
EditEmployment.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditEmployment);
