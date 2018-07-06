
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Dimensions,
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal'
import { setTheme, getTheme, colors } from '../store/store';

import Tabs from 'react-native-tabs';
import AccountBal from '../routes/accountbalances';
import AccountHist from '../routes/accounthistory';
import AccountPos from '../routes/accountpositions';
import Search from './search';

import styles from '../style/style';
import account from '../style/account';
import fonts from '../style/fonts';
import navstyle from '../style/nav';
import { selectGlobalData } from '../selectors';

import { observer } from 'mobx-react';
import { myAccount } from '../mobxStores';

@observer
class Account extends Component {
  static navigationOptions = {
    title: 'Account',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/accounts.png')}
        style={[navstyle.icon, { tintColor: tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 'balances',
      isSearchVisible: false,
      todaysChange: ['+13.7%', '+1.50'],
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
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

  getTabView() {
    switch (this.state.page) {
      case 'balances':
        return <AccountBal />
      case 'history':
        return <AccountHist />
      case 'positions':
        return <AccountPos />
    }
  }

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  hideSearch() {
    this.setState({ isSearchVisible: false });
  }

  render() {
    
    const { myAccoutDataJS } = myAccount;
    const { totalAccountValue, todaysChange, todaysChangePercentage } = myAccoutDataJS;
    
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <View style={styles.leftCta}></View>
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
              <Image
                source={require('../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <View style={styles.rightCta}></View>
          </View>
        </View>
        <View style={[{ backgroundColor: this.state.colors['white'] }, account.topContainer]}>
          <View style={[{ backgroundColor: this.state.colors['white'] }, account.valueContainer]}>
            <View style={account.values}>
              <Text style={[{ color: this.state.colors['lightGray'] }, account.acctVal, fonts.hindGunturRg]}>ACCOUNT VALUE</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, account.accValNum, fonts.hindGunturRg]}>${totalAccountValue}</Text>
            </View>
            <View style={account.changeContainer}>
              <Text style={[{ color: this.state.colors['lightGray'] }, account.change, fonts.hindGunturRg]}>{"TODAY'S CHANGE"}</Text>
              <View style={account.changeWrap}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, account.changeNum, fonts.hindGunturRg]}>{todaysChange}</Text>
                <Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['white'] }, styles.smallGrnBtn, account.changePercent, fonts.hindGunturBd]} onPress={() => this.setState({ myButtonOpacity: 0.5 })}>{todaysChangePercentage}%</Text>
              </View>
            </View>
          </View>
          <Tabs selected={this.state.page} style={[{ backgroundColor: this.state.colors['white'] }, account.tabBtns]}
            selectedStyle={{ color: this.state.colors['blue'] }} onSelect={el => this.setState({ page: el.props.name })}>
            <Text name="balances" style={[{ color: this.state.colors['lightGray'] }, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: this.state.colors['blue'] }}>Balances</Text>
            <Text name="positions" style={[{ color: this.state.colors['lightGray'] }, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: this.state.colors['blue'] }}>Positions</Text>
            <Text name="history" style={[{ color: this.state.colors['lightGray'] }, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: this.state.colors['blue'] }}>History</Text>
          </Tabs>
        </View>
        <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, account.tabContainer]}>
          {this.getTabView()}
        </ScrollView>
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
      </View>
    );
  }
}

Account.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Account);
