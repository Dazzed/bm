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
  TouchableOpacity,
  TabbedArea,
  TabPane
} from 'react-native';

import {setTheme, getTheme, colors} from '../store/store';
import { connect } from 'react-redux';

import styles from '../style/style';
import account from '../style/account';
import fonts from '../style/fonts';
import { selectGlobalData } from '../selectors';
class AccountPos extends React.Component {
  static navigationOptions = {
    title: 'AccountPos',
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      applChg: false,
      tslaChg: false,
      colors: colors(props.globalData.isDarkThemeActive)
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
  }

  render() {
    return (
      <View style={[{backgroundColor: this.state.colors['contentBg']}, account.tabContent]}>
        <View style={account.titleWrap}>
          <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>EQUITY</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>QTY</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>PRICE/CHG</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, account.titleLast, fonts.hindGunturRg]}>MKT VALUATION</Text>
        </View>
        <View style={account.sectionFull}>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, account.symbolRow]}>
            <View style={account.symbolWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>APPL</Text>
              <Text style={[{color: this.state.colors['lightGray']},account.symbolDets, fonts.hindGunturRg]}>Apple, Inc</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>10</Text>
            <TouchableOpacity style={account.priceWrapTouch} onPress={() => this.setState({applChg: !this.state.applChg})}>
            <View style={account.priceWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>$153.53</Text>
              {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+1.85</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>9.78%</Text>}
            </View>
            <View style={account.mktWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$1,535.30</Text>
              {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+1.85</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>9.78%</Text>}
            </View>
            </TouchableOpacity>
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, account.symbolRow]}>
            <View style={account.symbolWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>TSLA</Text>
              <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>Tesla Motors</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>10</Text>
            <TouchableOpacity style={account.priceWrapTouch} onPress={() => this.setState({tslaChg: !this.state.tslaChg})}>
            <View style={account.priceWrap} onPress={() => this.setState({tslaChg: !this.state.tslaChg})}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>$320.00</Text>
              {this.state.tslaChg ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+3.12</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>10.41%</Text>}              
            </View>
            <View style={account.mktWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$3,072.00</Text>
              {this.state.tslaChg ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+130.00</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>10.41%</Text>}              
            </View>
            </TouchableOpacity>
          </View>          
        </View>
        <View style={[{backgroundColor: this.state.colors['white']}, {borderTopColor: this.state.colors['borderGray']}, account.bottomSticky]}>
          <View style={account.section}>
            <View style={account.sectionWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.stickyTitle, fonts.hindGunturBd]}>TOTAL</Text>
              <View style={account.stickyWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.stickyDetail, fonts.hindGunturBd]}>$3,890.29</Text>
                <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+1.85</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

// export default AccountPos;
AccountPos.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(AccountPos);
