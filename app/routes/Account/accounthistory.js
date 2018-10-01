import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../../style/style';
import account from '../../style/account';
import fonts from '../../style/fonts';
import { setTheme, getTheme, colors } from '../../store/store';
import { selectGlobalData } from '../../selectors';
import { observer } from 'mobx-react';
import { myAccountStore, accountStore } from '../../mobxStores';

@observer
class AccountHist extends Component {
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

  initiateCancelling = id => {
    if (myAccountStore.isCancellingOrder) {
      return;
    }
    myAccountStore.setCancellingOrderId(id);
    Alert.alert(
      '',
      'Do you want to cancel this order?',
      [
        { text: 'Cancel', onPress: () => myAccountStore.setCancellingOrderId(null), style: 'cancel' },
        { text: 'OK', onPress: () => myAccountStore.performCancellingOrder() },
      ],
      { cancelable: true }
    )
  }

  renderDateList = () => {

    let renderBuyOrSell = (buyBoolean) => {
      if (buyBoolean) {
        return (<Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>BUY</Text>);
      } else {
        return (<Text style={[{ backgroundColor: this.state.colors['red'] }, { borderColor: this.state.colors['red'] }, { color: this.state.colors['realWhite'] }, styles.smallRedBtn, styles.smallBtnTxt, fonts.hindGunturBd]}>SELL</Text>);
      }
    }

    const { historyJS } = myAccountStore;
    const { pendingOrders, filledOrders } = historyJS;

    const symbolRowHistory = {
      flex: 1,
      flexDirection: 'row',
      borderBottomColor: colors.borderGray,
      borderBottomWidth: 0.5,
      marginTop: 15,
      maxHeight: 70,
      height: 70,
      paddingLeft: 20,
      paddingRight: 0,
      // borderWidth: 1,
      // borderColor: 'blue',
    }

    const symbolRowHistoryPending = {
      flex: 1,
      flexDirection: 'row',
      marginTop: 15,
      maxHeight: 70,
      height: 70,
      paddingLeft: 20,
      paddingRight: 0,
      // borderWidth: 1,
      // borderColor: 'blue',
    }

    const symbolWrapStyle = {
      flex: 3,
      flexDirection: 'column',
      // borderWidth: 1,
      // borderColor: 'blue',
      // height: 100
      // maxWidth: 150,
      // height: 50
    }

    const inlineHistoryTransactionStyle = {
      flex: 1,
      flexDirection: 'row',
      // maxWidth: 150,
      // maxHeight: 45,
      // borderWidth: 1,
      // borderColor: 'red',
      alignItems: 'center'
    }

    const symbolLabel = {
      fontSize: 20,
      alignItems: 'center'
      // lineHeight: 30,
      // paddingTop: 5,
      // marginBottom: -7
    }

    const { isCancellingOrder, cancellingOrderId } = myAccountStore;
    return (
      <View>
        <Text style={[{ color: this.state.colors['darkSlate'] }, account.sectionDate, fonts.hindGunturBd]}>
          PENDING
        </Text>
        {pendingOrders.length ?
          pendingOrders.map((eachDate, i) => {
            return <View key={'eachDate' + i}>
              <View style={account.titleWrap}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, account.sectionDate, fonts.hindGunturBd]}>{eachDate.datestamp}</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>COST BASIS</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>QTY</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>TOTAL</Text>
              </View>
              <View style={[account.sectionFull, { backgroundColor: this.state.colors['white'] }]}>
                {eachDate.values.map((elem, i) => {
                  return <View key={'eachDateEntry' + i} style={symbolRowHistoryPending}>
                    <View style={symbolWrapStyle}>
                      <View style={inlineHistoryTransactionStyle}>
                        {renderBuyOrSell(elem.buyOrSell)}
                        <Text style={[{ color: this.state.colors['darkSlate'] }, symbolLabel, fonts.hindGunturRg]}>{elem.companyAbbreviation}</Text>
                      </View>
                      <Text style={[{ color: this.state.colors['lightGray'] }, account.symbolDets, fonts.hindGunturRg]}>
                        {elem.companyName ?
                          (elem.companyName.length > 20 ? `${elem.companyName.slice(0, 17)}...` : elem.companyName) : elem.companyAbbreviation}
                      </Text>
                    </View>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>
                      {elem.price ? `$${elem.price.toFixed(2)}` : 'N/A'}
                    </Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>{elem.shares}</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>
                      ${elem.totalAmount ? elem.totalAmount.toFixed(2) : (elem.price || 0 * elem.shares || 0).toFixed(2)}
                    </Text>
                  </View>
                })}
                <View style={[account.pendingActionWrap, symbolRowHistory]}>
                  <View style={account.pendingActionItem}>
                    <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturBd]}>VALIDITY</Text>
                    <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturBd]}>{eachDate.orderValidity}</Text>
                  </View>
                  <View style={account.pendingActionItem}>
                    <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>TYPE</Text>
                    <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>{eachDate.orderOption}</Text>
                  </View>
                  <TouchableOpacity
                    style={[{ borderColor: '#DB868E' }, account.cancelOptionBtn]}
                    onPress={this.initiateCancelling.bind(this, eachDate.id)}
                  >
                    <Text style={[styles.touchOption, fonts.hindGunturMd, { color: '#DB868E' }]}>
                      {isCancellingOrder && cancellingOrderId === eachDate.id ? 'LOADING...' : 'CANCEL'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }) : <Text style={[account.noOrdersText, fonts.hindGunturBd]}>You have no pending trades.</Text>}
        <Text style={[{ color: this.state.colors['darkSlate'] }, account.sectionDate, fonts.hindGunturBd]}>
          FILLED
        </Text>
        {filledOrders.length ?
          filledOrders.map((eachDate, i) => {
            return <View key={'eachDate' + i}>
              <View style={account.titleWrap}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, account.sectionDate, fonts.hindGunturBd]}>{eachDate.datestamp}</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>COST BASIS</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>QTY</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, account.titleHistorySmF, fonts.hindGunturRg]}>TOTAL</Text>
              </View>
              <View style={[account.sectionFull, { backgroundColor: this.state.colors['white'] }]}>
                {eachDate.values.map((elem, i) => {
                  return <View key={'eachDateEntry' + i} style={symbolRowHistory}>
                    <View style={symbolWrapStyle}>
                      <View style={inlineHistoryTransactionStyle}>
                        {renderBuyOrSell(elem.buyOrSell)}
                        <Text style={[{ color: this.state.colors['darkSlate'] }, symbolLabel, fonts.hindGunturRg]}>{elem.companyAbbreviation}</Text>
                      </View>
                      <Text style={[{ color: this.state.colors['lightGray'] }, account.symbolDets, fonts.hindGunturRg]}>
                        {elem.companyName ?
                          (elem.companyName.length > 20 ? `${elem.companyName.slice(0, 17)}...` : elem.companyName) : elem.companyAbbreviation}
                      </Text>
                    </View>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>
                      {elem.price ? `$${elem.price.toFixed(2)}` : 'N/A'}
                    </Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>{elem.shares}</Text>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, account.titleHistorySmF, account.historyDataLabel, fonts.hindGunturRg]}>
                      ${elem.totalAmount ? elem.totalAmount.toFixed(2) : (elem.price || 0 * elem.shares || 0).toFixed(2)}
                    </Text>

                  </View>
                })}
              </View>
            </View>
          }) : <Text style={[account.noOrdersText, fonts.hindGunturBd]}>You have no filled orders.</Text>}
      </View>
    );
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
