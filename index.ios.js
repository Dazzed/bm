// To prevent the annoying remote debugger message
console.ignoredYellowBox = ['Remote debugger'];
import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import {
  StackNavigator,
} from 'react-navigation';

import Orientation from 'react-native-orientation';

import { Provider } from 'react-redux';

import { store } from './app/store/redux';

import Modal from './app/components/react-native-modal'


import styles from './app/style/style';
import fonts from './app/style/fonts';

import FadeInView from './app/components/fadein';
import AppNav from './app/routes/appnav';
import SignIn from './app/routes/signin';
import Registration from './app/routes/Registration';
import Chart from './app/routes/chart';
import Scanner from './app/routes/scanner';
import Terms from './app/routes/terms';

import { setTheme, getTheme, colors } from './app/store/store';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: 'Cancel',
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      isTermsVisible: false,
    }
  }
  componentWillMount() {
    this.setState({ colors: colors() });
  }
  showTerms() {
    this.setState({ isTermsVisible: true })
  }
  hideTerms() {
    this.setState({ isTermsVisible: false })
  }
  componentDidMount() {
    Orientation.lockToPortrait();

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={[{ backgroundColor: this.state.colors['white'] }, styles.container]}>
          <View style={styles.landingIcon}>
            <Image
              source={require('./app/images/logo.png')}
              style={styles.appIcon}
            />
          </View>
          <View style={styles.landingTT}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.title, fonts.gothamBld]}>
              BLUMARTINI
          </Text>
          </View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, styles.tagline, fonts.hindGunturLt]}>
            The premier stock trading platform with zero commisions.
        </Text>
          <TouchableHighlight
            style={[{ borderColor: this.state.colors['darkGray'] }, styles.optionbtn]}
            onPress={() => navigate('AppNav')}>
            <Text style={[{ color: this.state.colors['darkGray'] }, styles.touchOption, fonts.hindGunturMd]}>
              PREVIEW THE APP
          </Text>
          </TouchableHighlight>
          <Text style={[{ color: this.state.colors['lightGray'] }, styles.legal, fonts.hindGunturRg]}>By using BluMartini you agree to our <Text style={[styles.legalLink, fonts.hindGunturRg]} onPress={() => this.showTerms()}>Terms & Conditions</Text></Text>
          <TouchableHighlight
            style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
            onPress={() => navigate('Registration')}>
            <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>JOIN 1,347,25 TRADERS</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={[{ backgroundColor: this.state.colors['darkGray'] }, { borderColor: this.state.colors['darkGray'] }, styles.fullBtnGray]}
            onPress={() => navigate('SignIn')}>
            <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>ALREADY A MEMBER? SIGN IN</Text>
          </TouchableHighlight>
          <Modal
            isVisible={this.state.isTermsVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <Terms hideTerms={() => this.hideTerms()} />
          </Modal>
        </View>
    );
  }
}

const LostAvenue = StackNavigator({
  Home: { screen: HomeScreen },
  SignIn: { screen: SignIn },
  Registration: { screen: Registration },
  AppNav: { screen: AppNav },
}, {
    headerMode: 'screen',
    lazy: true,
  });

const WithProvider = () => (
  <Provider store={store}>
    <LostAvenue />
  </Provider>
);

AppRegistry.registerComponent('LostAvenue', () => WithProvider);
