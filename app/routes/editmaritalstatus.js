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
  { "label": "Married", "value": 0 },
  { "label": "Divorced", "value": 1 },
  { "label": "Separated", "value": 2 },
  { "label": "Widowed", "value": 3 },
  { "label": "Single", "value": 4 }
];

class EditMaritalStatus extends React.Component {
  constructor(props) {
    super(props);
    const {
      maritalStatus
    } = this.props.globalData.currentUser;

    var result = status_list.find(x => x.label === maritalStatus)
    const maritalStatusOption = result.value;

    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      maritalStatusOption: maritalStatusOption,
      maritalStatus: maritalStatus
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
        maritalStatusOption: value,
        maritalStatus: status_list.find(l => l.value === value).label
      });
    } else {
      this.setState({})
    }
  }

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.setState({
      [field]: text
    }, this.validate);
  }

  updateMaritalStatus = async () => {
    const user_marital_status = {
      maritalStatus: this.state.maritalStatus
    }
    const res = await axios.patch(`${API_URL}/api/users/${this.props.globalData.currentUser.id}?access_token=${this.props.globalData.currentUser.access_token}`, user_marital_status);
    console.log(res);
    this.props.hideMaritalStatus();
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideMaritalStatus()}>
              <Image
                source={require('../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Marital Status</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'], paddingTop: 15 }]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, { paddingTop: 25 }]}>
              MARITAL STATUS
                    </Text>
            <View style={[{ backgroundColor: this.state.colors['white'], marginTop: 20, paddingTop: 0 }]}>
              <View style={[styles_2.registrationFormView]}>
                <View style={styles_2.subMenuRow}>
                  <RadioForm
                    radio_props={status_list}
                    initial={this.state.maritalStatusOption}
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
            <TouchableHighlight onPress={this.updateMaritalStatus} style={[styles_2.fullBtn, { height: 80 }, styles_2.formValid]}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>SAVE</Text>
            </TouchableHighlight>
            <Text> </Text>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// export default EditMaritalStatus;
EditMaritalStatus.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditMaritalStatus);
