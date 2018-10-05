import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Dimensions, Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import TouchID from 'react-native-touch-id';
import {
  StackNavigator,
} from 'react-navigation';
import Orientation from 'react-native-orientation';

import { setTheme, colors } from '../../store/store';

import styles from '../../style/style';
import fonts from '../../style/fonts';

import * as globalActions from '../../store/actions/global';
import {
  selectGlobalData
} from '../../selectors';

import { authStore, colorStore } from '../../mobxStores';
import { observer } from 'mobx-react';
import { autoLogin, forceLoginToFundingEveryTime } from '../../devControlPanel';

@observer
class SignIn extends Component {
  static navigationOptions = {
    title: 'Sign In',
    header: null
  }

  constructor(props) {
    super(props);
    let d = Dimensions.get('window');
    const { height, width } = d;

    this.state = {
      email: '',
      password: '',
      behavior: 'padding',
      bioId: (Platform.OS === 'ios' && (height === 812 || width === 812)) ? 'FACE' : 'TOUCH',
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    if(autoLogin) {
      this.setState({
        email: 'fogg4444@gmail.com',
        password: 'Password11!',
      }, () => {
        this._signIn()
      })
    }
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

    // console.log('================= LOGIN =========== ', prevProps.globalData)
    // handle navigation with mobx
    // if (!prevProps.globalData.isAuthenticated && this.props.globalData.isAuthenticated) {
    //   const { navigate } = this.props.navigation;
    //   // navigate('AppNavTabs', { color: this.state.activeColor })
    // }
  }

  setColor(value) {
    setTheme(value);
    this.setState({ activeColor: value, colors: colors() });
  }

  onSegmentChange = (segment: String) => {
    this.setState({ behavior: segment.toLowerCase() });
  };

  handleTouch = () => {
    // TouchID.authenticate('Authenticate to access your BluMartini account.', {})
    //   .then(success => {
    //     // Success code
    //     console.log(success);
    //   })
    //   .catch(error => {
    //     // Failure code
    //     console.log(error)
    //   });
    this.props.toggleRemindBioProtectionAfterLoggingIn(true);
    alert(`You can enable ${this.state.bioId} ID after you login`);
  }

  _signIn = () => {
    // // Alert.alert(
    // //   'Enable Touch ID',
    // //   '',
    // //   [
    // //     {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    // //     {text: 'OK', onPress: () => console.log('OK Pressed')},
    // //   ],
    // //   { cancelable: true }
    // // )

    let params = {
      email: this.state.email,
      password: this.state.password
    }
    authStore.login(params)
    .then((res) => {
      this.props.saveUserData(res.userData.json)

      console.log('LOGIN SUCCESS =============== ', res, res.loginData);

      if(res.loginData.firstLogin || forceLoginToFundingEveryTime) {
        this.props.navigation.navigate('FundAccountSplash')
      } else {
        this.props.navigation.navigate('AppNavTabs');
      }

    })
    .catch((err) => {
      console.log('err', err)
      console.log('code', err.json.error.code);
    })

  }

  navToForgotPassword() {
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {
    const { navigate } = this.props.navigation;
    const { theme } = colorStore;
    const { loginErrorPresent, loginLoading, isVerifyingAuth } = authStore

    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => { this.props.navigation.goBack() }}>
              <Image
                source={require('../../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.mainCta, fonts.gothamBld]}>Sign In</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={this.state.behavior}
          style={styles.formcontainer}>
          <View style={[{ backgroundColor: this.state.colors['white'] }, styles.container]}>
            <View style={styles.landingIconLogin}>
              <Image
                source={this.state.colors['logoImage']}
                style={styles.appIcon}
              />
            </View>
            <View style={styles.landingTTLogin}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, styles.title, fonts.gothamBld]}>
                BLUMARTINI
              </Text>
            </View>
          <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.inputLabel, fonts.hindGunturMd]}>EMAIL</Text>
            <TextInput style={[{ color: this.state.colors['darkSlate'] }, styles.input, fonts.hindGunturRg]}
              placeholder="your@email.com"
              placeholderTextColor={this.state.colors['lightGray']}
              value={this.state.email}
              onChangeText={(email) => this.setState({ email })}
              keyboardType="email-address" autoCapitalize='none'
            />
          </View>
          <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.inputLabel, fonts.hindGunturMd]}>PASSWORD</Text>
            <TextInput style={[{ color: this.state.colors['darkSlate'] }, styles.input, fonts.hindGunturRg]}
              placeholder="password"
              placeholderTextColor={this.state.colors['lightGray']}
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', display: loginErrorPresent ? 'flex' : 'none' }}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Error: </Text>
            <Text style={{ color: 'red' }}>{(authStore.loginErrorMessage !== '') ? authStore.loginErrorMessage : 'Error logging you in' }</Text>
          </View>
          <TouchableOpacity
            style={[{ borderColor: this.state.colors['darkGray'] }, styles.optionbtn]}
            onPress={this.handleTouch}>
            <Text style={[styles.touchOption, fonts.hindGunturMd, { color: theme.darkSlate }]}>
              ENABLE {this.state.bioId} ID
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.navToForgotPassword()}>
            <Text style={[styles.details, fonts.hindGunturRg, { color: theme.darkSlate, fontSize: 16 }]}>
              Forgot password?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
            // onPress={() => navigate('AppNav', { color: this.state.activeColor })}
            onPress={this._signIn}
          >
            <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>
              {(this.props.globalData.isAuthenticating || loginLoading || isVerifyingAuth) ? 'LOADING...' : 'SIGN IN'}
            </Text>
          </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

SignIn.propTypes = {
  globalData: PropTypes.object.isRequired,
  // loginAction: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  toggleRemindBioProtectionAfterLoggingIn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});
const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
