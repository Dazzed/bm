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

class ReportBug extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
      message: '',
      subject: 'Bug',
      email: '',
      name: '',
      issue_type: 'Issue',
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

  submitBug = async () => {
    const contact = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      issueType: this.state.issue_type,
      message: this.state.message
    } 
    const res = await axios.post(`${API_URL}/api/contacts?access_token=${this.props.globalData.currentUser.access_token}`, contact);
    this.props.hideBug();
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideBug()}>
              <Image
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Report a bug</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <KeyboardAvoidingView
          behavior="padding"
          style={styles_2.section}>
          <ScrollView ref={component => this.ScrollView_Reference = component} style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalContainer, { paddingTop: 15}]}>
            <Text style={[{ color: this.state.colors['lightGray'] }, styles.legalTxt, fonts.hindGunturRg]}>Your feedback is very important. This will help us continue to create the best product for you.</Text>
            <TextInput
              style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, styles.report_bug_field]}
              multiline={true}
              onFocus={() => this.ScrollView_Reference.scrollToEnd()}
              onChange={(event) => this.onTextChange(event, 'message')}
            />
          </ScrollView>
          <View style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalAgree]}>
            <TouchableOpacity style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]} onPress={this.submitBug}>
              <Text style={[{ color: this.state.colors['white'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
}

// export default ReportBug;
ReportBug.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(ReportBug);
