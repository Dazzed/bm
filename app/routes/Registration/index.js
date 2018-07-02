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

import PropTypes from 'prop-types';

import { setTheme, getTheme, colors } from '../../store/store';

import styles from '../../style/style';
import fonts from '../../style/fonts';

import { selectRegistrationPage } from './selectors';
import {
  selectGlobalData
} from '../../selectors';
import * as registerActions from '../../store/actions/registration';

import CountrySelection from './components/CountrySelection';
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

import { registrationStore } from '../../mobxStores';

class RegistrationPage extends React.Component {
  static navigationOptions = {
    title: 'Registration',
    header: null
  }

  constructor(props) {
    super(props);
    this.totalSteps = 13;
    this.state = { 
      email: '', 
      behavior: 'padding', 
      step: 2,
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

    console.log('updated ~>', this.props.registrationPage);

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
      onForwardStep: this.onForwardStep,
      updateRegistrationParams: registrationStore.updateRegistrationParams
    }


    // Steps to add
    // funding

    let progressWidthPercentage = parseInt(((this.state.step + 1) / this.totalSteps) * 100) + '%';

    switch (this.state.step) {
      case 0:
        return <CountrySelection  progress={progressWidthPercentage} {...propsToPass} />;
      case 1:
        return <NameSelection  progress={progressWidthPercentage} {...propsToPass} />;
      case 2:
        return <AddressSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 3:
        return <PhoneSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 4:
        return <DateOfBirthSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 5:
        return <SocialSecurityNumberSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 6:
        return <MaritalStatusSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 7:
        return <DependentSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 8:
        return <EmploymentStatusSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 9:
        return <InvestmentExperienceSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 10:
        return <AccountSelection progress={progressWidthPercentage} {...propsToPass} />;
      case 11:
        return <Declaration progress={progressWidthPercentage} {...propsToPass} />;
      case 12:
        return <Thankyou progress={progressWidthPercentage} {...propsToPass} />;
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
    if (this.state.step === 0) {
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
  // registrationPage: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state),
  // registrationPage: selectRegistrationPage(state)
});

const mapDispatchToProps = bindActionCreators.bind(this, registerActions);

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
