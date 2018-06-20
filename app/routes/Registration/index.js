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
import {
  selectGlobalData
} from '../../selectors';
import * as registerActions from '../../store/actions/registration';

// import CountrySelection from './components/CountrySelection';
import NameSelection from './components/NameSelection';
import AddressSelection from './components/AddressSelection';
import PhoneSelection from './components/PhoneSelection';
import DateOfBirthSelection from './components/DateOfBirthSelection';
import SocialSecurityNumberSelection from './components/SocialSecurityNumberSelection';
import MaritalStatusSelection from './components/MaritalStatusSelection';
import DependentSelection from './components/DependentSelection';
import EmploymentStatusSelection from './components/EmploymentStatusSelection';
import InvestmentExperienceSelection from './components/InvestmentExperienceSelection';
import AccountSelection from './components/AccountSelection';
import Declaration from './components/Declaration';
import Thankyou from './components/Thankyou';

class RegistrationPage extends React.Component {
  static navigationOptions = {
    title: 'Registration',
    header: null
  }

  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      behavior: 'padding', 
      step: 1,
      colors: colors(props.globalData.isDarkThemeActive)
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

  componentWillUnmount() {
    this.props.resetRegistrationParams();
  }

  setColor(value) {
    setTheme(value);
    this.setState({ activeColor: value, colors: colors() });
  }

  onSegmentChange = (segment: String) => {
    this.setState({ behavior: segment.toLowerCase() });
  };

  renderStepComponent = () => {
    const propsToPass = {
      ...this.props,
      ...this.state,
      onForwardStep: this.onForwardStep
    }
    switch (this.state.step) {
      case 1:
        return <NameSelection  {...propsToPass} />;
      case 2:
        return <AddressSelection {...propsToPass} />;
      case 3:
        return <PhoneSelection {...propsToPass} />;
      case 4:
        return <DateOfBirthSelection {...propsToPass} />;
      case 5:
        return <SocialSecurityNumberSelection {...propsToPass} />;
      case 6:
        return <MaritalStatusSelection {...propsToPass} />;
      case 7:
        return <DependentSelection {...propsToPass} />;
      case 8:
        return <EmploymentStatusSelection {...propsToPass} />;
      case 9:
        return <InvestmentExperienceSelection {...propsToPass} />;
      case 10:
        return <AccountSelection {...propsToPass} />;
      case 11:
        return <Declaration {...propsToPass} />;
      case 12:
        return <Thankyou {...propsToPass} />;
    }
  }

  onForwardStep = () => {
    if (this.state.step === 12) {
      // alert('Registered!');
      this.props.navigation.navigate('Login', { color: this.state.activeColor });
    } else {
      this.setState(({ step }) => ({ step: step + 1 }));
    }
  }

  onBackwardStep = () => {
    if (this.state.step === 1) {
      this.props.navigation.goBack();
    } else {
      this.setState(({ step }) => ({ step: step - 1 }));
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={this.onBackwardStep}>
              <Image
                source={require('../../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.mainCta, fonts.gothamBld]}>Basic Info</Text>
            <TouchableOpacity style={styles.rightCta} onPress={() => this.props.navigation.goBack()}>
              <Image
                source={require('../../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
          </View>
        </View>
        {this.renderStepComponent()}
      </View>
    );
  }
}

RegistrationPage.propTypes = {
  globalData: PropTypes.object.isRequired,
  updateRegistrationParams: PropTypes.func.isRequired,
  resetRegistrationParams: PropTypes.func.isRequired,
  registrationPage: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state),
  registrationPage: selectRegistrationPage(state)
});

const mapDispatchToProps = bindActionCreators.bind(this, registerActions);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
