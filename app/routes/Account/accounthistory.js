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
import styles from '../../style/style';
import account from '../../style/account';
import fonts from '../../style/fonts';
import {setTheme, getTheme, colors} from '../../store/store';
import { selectGlobalData } from '../../selectors';

import { observer } from 'mobx-react';
import { myAccount } from '../../mobxStores';

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

  renderDateList() {

    let renderBuyOrSell = (buyBoolean) => {
      if(buyBoolean) {
        return (<Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>BUY</Text>);
      } else {
        return (<Text style={[{backgroundColor: this.state.colors['red']}, {borderColor: this.state.colors['red']}, {color: this.state.colors['realWhite']}, styles.smallRedBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>SELL</Text>);
      }
    }

    const { historyJS } = myAccount;
    return <View style={{borderWidth: 1, borderColor: 'red'}}>
      {historyJS.map((eachDate, i) => {
        return <View key={'eachDate' + i} style={{borderWidth: 1, borderColor: 'blue'}}>
          <View style={account.titleWrap}>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDate, fonts.hindGunturBd]}>{eachDate.datestamp}</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>COST BASIS</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySmF, fonts.hindGunturRg]}>QTY</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>TOTAL</Text>
          </View>
          <View style={[account.sectionFull,{backgroundColor: this.state.colors['white']}]}>
            {eachDate.values.map((elem, i) => {
              return <View key={'eachDateEntry' + i} style={account.symbolRowHistory}>
                <View style={account.symbolWrap}>
                  <View style={account.historyTransaction}>
                    {renderBuyOrSell(elem.buyOrSell)}
                    <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>{elem.companyAbbreviation}</Text>
                  </View>
                  <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>{elem.companyTitle}</Text>
                </View>
                <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>$0.81</Text>
                <View style={account.priceWrap}>
                  <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>1000</Text>
                </View>
                <View style={account.mktWrap}>
                  <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$811.03</Text>
                </View>
              </View>
            })}
          </View>
        </View>
      })}
    </View>
  }

  render() {
    return (
      <View style={account.tabContent}>
        <Text>This view in progress, being mapped to data stores</Text>
        {this.renderDateList()}
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
