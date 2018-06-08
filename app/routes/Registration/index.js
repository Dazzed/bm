import React, { Component } from 'react';
import {
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
  TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  StackNavigator,
} from 'react-navigation';

import PropTypes from 'prop-types';

import { setTheme, getTheme, colors } from '../../store/store';

import styles from '../../style/style';
import fonts from '../../style/fonts';

import { selectRegistrationPage } from './selectors';
import * as registerActions from '../../store/actions/registration';

import CountrySelection from './components/CountrySelection';

class RegistrationPage extends React.Component {
  static navigationOptions = {
    title: 'Registration',
    header: null
  }

  constructor(props) {
    super(props);
    this.state = { email: '', behavior: 'padding' };
  }

  componentWillMount() {
    this.setState({ colors: colors() });
  }

  setColor(value) {
    setTheme(value);
    this.setState({ activeColor: value, colors: colors() });
  }

  onSegmentChange = (segment: String) => {
    this.setState({ behavior: segment.toLowerCase() });
  };

  render() {
    console.log('props ~>', this.props)
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => { this.props.navigation.goBack() }}>
              <Image
                source={require('../../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[styles.mainCta, fonts.gothamBld]}>Basic Info</Text>
            <TouchableOpacity style={styles.rightCta} onPress={() => { this.props.navigation.goBack() }}>
              <Image
                source={require('../../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        <CountrySelection {...this.props} {...this.state} />
      </View>
    );
  }
}

RegistrationPage.propTypes = {
  updateRegistrationParams: PropTypes.func.isRequired,
  resetRegistrationParams: PropTypes.func.isRequired,
  registrationPage: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  registrationPage: selectRegistrationPage(state)
});

const mapDispatchToProps = bindActionCreators.bind(this, registerActions);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
