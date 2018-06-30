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
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal'

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import styles_2 from '../style/style_2';
import fonts from '../style/fonts';

import { setTheme, getTheme, colors } from '../store/store';

class ContactUs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
      message: '',
      subject: '',
      email: '',
      name: '',
      issue_type: 'Feedback',
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.globalData.currentUser.firstName,
      email: this.props.globalData.currentUser.email,
    })
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

  onTextChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.setState({
      [field]: text
    });
  }

  submitContact = async () => {
    const contact = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      issueType: this.state.issue_type,
      message: this.state.message
    }
    const res = await axios.post(`${API_URL}/api/contacts?access_token=${this.props.globalData.currentUser.access_token}`, contact);
    this.props.hideContact()
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideContact()}>
              <Image
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Contact us</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalContainer, { paddingTop: 15 }]}>
            <Text style={[{ color: this.state.colors['lightGray'] }, styles.contactUsTxt, fonts.hindGunturRg]}>Your feedback is very important. This will help us continue to create the best product for you.</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>SUBJECT</Text>
            <TextInput
              style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles.contact_us_subject_field]}
              onChange={(event) => this.onTextChange(event, 'subject')}
            />
            <TextInput
              style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles.contact_us_field]}
              onChange={(event) => this.onTextChange(event, 'message')}
              multiline={true}
              placeholder="Message"
              placeholderTextColor={this.state.colors['darkSlate']} 
            />
          </ScrollView>
          <View style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalAgree]}>
            <TouchableOpacity style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]} onPress={this.submitContact}>
              <Text style={[{ color: this.state.colors['white'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// export default ContactUs;
ContactUs.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(ContactUs);
