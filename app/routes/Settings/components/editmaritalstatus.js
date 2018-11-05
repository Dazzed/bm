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
  SafeAreaView,
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

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';

import { setTheme, getTheme, colors } from '../../../store/store';

import { maritalStatusList } from '../../../constants';

const status_list = maritalStatusList;

class EditMaritalStatus extends React.Component {
  constructor(props) {
    super(props);
    const {
      maritalStatus
    } = this.props.globalData.currentUser;


    let maritalStatusOption = '';
    let maritalStatusText = '';
    
    status_list.every((elem, i) => {
      console.log('elem ', elem, maritalStatus)
      if(elem.label == maritalStatus) {
        maritalStatusOption = elem.value;
        maritalStatusText = elem.label;
        return false;
      }
      return true;
    })
    
    // var result = status_list.find(x => x.label === maritalStatus)
    // let maritalStatusOption = 0;
    // if('value' in result) {
    //   maritalStatusOption = result;
    // }

    this.state = {
      page: 'presets',
      colors: colors(props.globalData.isDarkThemeActive),
      maritalStatusOption: maritalStatusOption,
      maritalStatus: maritalStatusText
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
      this.props.hideMaritalStatus();
    }
  }

  setMaritalStatus = (value) => {
      let textStatus = '';
      status_list.every((elem, i) => {
        if(value === elem.value) {
          textStatus = elem.label;
          return false;
        }
        return true;
      })
      this.setState({
        maritalStatusOption: value,
        maritalStatus: textStatus
      });
  }

  updateMaritalStatus = () => {
    const user_marital_status = {
      maritalStatus: this.state.maritalStatus
    }
    this.props.initiatePatchingUser(user_marital_status);
  }

  onBackButtonPress = () => {
    if (this.props.globalData.isPatchingUser) {
      return;
    }
    this.props.hideMaritalStatus();
  }

  render() {
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
                    onPress={this.setMaritalStatus}
                    style={styles_2.radioField}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{ backgroundColor: this.state.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
            <TouchableHighlight onPress={this.updateMaritalStatus} style={[styles_2.fullBtnSettings, { height: 80 }, styles_2.formValid]}>
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

EditMaritalStatus.propTypes = {
  globalData: PropTypes.object.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
  hideMaritalStatus: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditMaritalStatus);
