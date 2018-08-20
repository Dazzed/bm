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
import { myAccountStore } from '../../mobxStores';

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

    const { historyJS } = myAccountStore;
    
    let containerStyle = {
    }
    
    return <View style={containerStyle}>
      {historyJS.map((eachDate, i) => {
        return <View key={'eachDate' + i}>
          <View style={account.titleWrap}>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDate, fonts.hindGunturBd]}>{eachDate.datestamp}</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>COST BASIS</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySmF, fonts.hindGunturRg]}>QTY</Text>
            <Text style={[{color: this.state.colors['lightGray']}, account.titleHistorySm, fonts.hindGunturRg]}>TOTAL</Text>
          </View>
          <View style={[account.sectionFull,{backgroundColor: this.state.colors['white']}]}>
            {eachDate.values.map((elem, i) => {
              console.log('=== history list', elem)
              
              let symbolRowHistory = {
                flex: 1,
                flexDirection: 'row',
                borderBottomColor: colors.borderGray,
                borderBottomWidth: 0.5,
                marginTop: 15,
                maxHeight: 70,
                height: 70,
                paddingLeft: 20,
                paddingRight: 20,
                // borderWidth: 1,
                // borderColor: 'blue',
              }
              
              let symbolWrapStyle = {
                flex: 3,
                flexDirection: 'column',
                // borderWidth: 1,
                // borderColor: 'blue',
                // height: 100
                // maxWidth: 150,
                // height: 50
              }
              
              let inlineHistoryTransactionStyle = {
                flex: 1,
                flexDirection: 'row',
                // maxWidth: 150,
                // maxHeight: 45,
                // borderWidth: 1,
                // borderColor: 'red',
                alignItems: 'center'
              }
              
              let symbolLabel = {
                fontSize: 20,
                alignItems: 'center'
                // lineHeight: 30,
                // paddingTop: 5,
                // marginBottom: -7
              }
              
              return <View key={'eachDateEntry' + i} style={symbolRowHistory}>
              
                <View style={symbolWrapStyle}>
                  <View style={inlineHistoryTransactionStyle}>
                    {renderBuyOrSell(elem.buyOrSell)}
                    <Text style={[{color: this.state.colors['darkSlate']}, symbolLabel, fonts.hindGunturRg]}>{elem.companyAbbreviation}</Text>
                  </View>
                  <Text style={[{color: this.state.colors['lightGray']}, account.symbolDets, fonts.hindGunturRg]}>{elem.companyName}</Text>
                </View>
                
                
                <View style={account.priceWrap}>
                  <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>$0.81??</Text>
                </View>
                
                
                <View style={account.priceWrap}>
                  <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>{elem.shares}</Text>
                </View>
                
                <View style={account.mktWrap}>
                  <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>${elem.totalAmount}</Text>
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
