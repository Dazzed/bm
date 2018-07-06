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

import { connect } from 'react-redux';
import styles from '../style/style';
import account from '../style/account';
import fonts from '../style/fonts';
import {setTheme, getTheme, colors} from '../store/store';
import { selectGlobalData } from '../selectors';

import { observer } from 'mobx-react';
import { myAccount } from '../mobxStores';

@observer
class AccountHist extends React.Component {
  static navigationOptions = {
    title: 'AccountHist',
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
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
      <View style={account.tabContent}>
        <View style={account.titleWrap}>
          <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDate, fonts.hindGunturBd]}>JAN 11, 2017</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>COST BASIS</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySmF, fonts.hindGunturRg]}>QTY</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>TOTAL</Text>
        </View>
        <View style={[account.sectionFull,{backgroundColor: this.state.colors['white']}]}>
          <View style={account.symbolRowHistory}>
            <View style={account.symbolWrap}>
              <View style={account.historyTransaction}>
                <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>BUY</Text>
                <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>APPL</Text>
              </View>
              <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>Apple, Inc</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>$0.81</Text>
            <View style={account.priceWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>1000</Text>
            </View>
            <View style={account.mktWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$811.03</Text>
            </View>
          </View>
          <View style={account.symbolRowHistory}>
            <View style={account.symbolWrap}>
              <View style={account.historyTransaction}>
                <Text style={[{backgroundColor: this.state.colors['red']}, {borderColor: this.state.colors['red']}, {color: this.state.colors['realWhite']}, styles.smallRedBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>SELL</Text>
                <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>AMID</Text>
              </View>
              <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>American Midstream</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>$0.81</Text>
            <View style={account.priceWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>1000</Text>
            </View>
            <View style={account.mktWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$811.03</Text>
            </View>
          </View>
        </View>
        <View style={account.titleWrap}>
          <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDate, fonts.hindGunturBd]}>JAN 09, 2017</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>COST BASIS</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>QTY</Text>
          <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>TOTAL</Text>
        </View>
        <View style={[account.sectionFull, { backgroundColor: this.state.colors['white'] }]}>
          <View style={account.symbolRowHistory}>
            <View style={account.symbolWrap}>
              <View style={account.historyTransaction}>
                <Text style={[{backgroundColor: this.state.colors['red']}, {borderColor: this.state.colors['red']}, {color: this.state.colors['realWhite']}, styles.smallRedBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>SHORT</Text>
                <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>NGG</Text>
              </View>
              <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>National Grid PLC</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>$0.81</Text>
            <View style={account.priceWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>1000</Text>
            </View>
            <View style={account.mktWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$811.03</Text>
            </View>
          </View>

        </View>

      </View>
    );
  }
}

// export default AccountHist;
AccountHist.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(AccountHist);
