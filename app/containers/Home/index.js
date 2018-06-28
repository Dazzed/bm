import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Modal from '../../components/react-native-modal'

import styles from '../../style/style';
import fonts from '../../style/fonts';
import Terms from '../../routes/terms';

import { colors } from '../../store/store';
import * as globalActions from '../../store/actions/global';
import { selectGlobalData } from '../../selectors';

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home',
    headerBackTitle: 'Cancel',
    header: null
  };

  constructor(props) {
    super(props);
    this.displayPreviewButton = true;
    this.state = {
      isTermsVisible: false,
      colors: colors(props.globalData.isDarkThemeActive)
    };
    props.setThemeFromLocal();
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

  renderAppPreviewButton() {
    const { navigate } = this.props.navigation;
    if(this.displayPreviewButton) {
      return <TouchableHighlight
        style={[{ borderColor: this.state.colors['darkGray'] }, styles.optionbtn]}
        onPress={() => navigate('AppNav')}>
        <Text style={[{ color: this.state.colors['darkGray'] }, styles.touchOption, fonts.hindGunturMd]}>
          PREVIEW THE APP
        </Text>
      </TouchableHighlight>
    } else {
      return null;
    }

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.container]}>
        <View style={styles.landingIcon}>
          <Image
            source={this.state.colors['logoImage']}
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
        {this.renderAppPreviewButton()}
        <Text style={[{ color: this.state.colors['lightGray'] }, styles.legal, fonts.hindGunturRg]}>By using BluMartini you agree to our <Text style={[styles.legalLink, fonts.hindGunturRg]} onPress={() => this.showTerms()}>Terms & Conditions</Text></Text>
        <TouchableHighlight
          style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
          onPress={() => navigate('Registration')}>
          <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>JOIN 1,347,254 TRADERS</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[{ backgroundColor: this.state.colors['darkGray'] }, { borderColor: this.state.colors['darkGray'] }, styles.fullBtnGray]}
          onPress={() => navigate('Login')}>
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

HomeScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  setThemeFromLocal: PropTypes.func.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});
const mapDispatchToProps = bindActionCreators.bind(this, globalActions);


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);