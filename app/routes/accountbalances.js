/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane
} from 'react-native';

import {setTheme, getTheme, colors} from '../store/store';
import { connect } from 'react-redux';

import styles from '../style/style';
import account from '../style/account';
import fonts from '../style/fonts';
import { selectGlobalData } from '../selectors';

class AccountBal extends React.Component {
  static navigationOptions = {
    title: 'AccountBal',
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    return (
      <View style={[{backgroundColor: this.state.colors['contentBg']}, account.tabContent]}>
        <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>INVESTMENTS</Text>
        <View style={[{backgroundColor: this.state.colors['white']}, account.section]}>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TOTAL</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$1,535.30</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>SECURITIES</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$939.30</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>CASH</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$2,397.98</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>OPTIONS</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$890</Text>
          </View>
        </View>
        <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>FUNDS AVAILABLE</Text>
        <View style={[{backgroundColor: this.state.colors['white']}, account.section]}>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TO TRADE</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$3,890.29</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TO WITHDRAW</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>$1,535.29</Text>
          </View>
        </View>
      </View>
    );
  }
}

// export default AccountBal;
AccountBal.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(AccountBal);
