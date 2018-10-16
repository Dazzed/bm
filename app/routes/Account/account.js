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
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal'
import { setTheme, getTheme, colors } from '../../store/store';
import Tabs from 'react-native-tabs';
import AccountBal from './accountbalances';
import AccountHist from './accounthistory';
import AccountPos from './accountpositions';
import Search from '../Search';
import styles from '../../style/style';
import account from '../../style/account';
import fonts from '../../style/fonts';
import navstyle from '../../style/nav';
import { selectGlobalData } from '../../selectors';
import { observer } from 'mobx-react';
import { myAccountStore } from '../../mobxStores';
let SearchImage = '../../images/search.png';
let TabBarIcon = '../../images/accounts.png';

@observer
class Account extends Component {
  static navigationOptions = {
    title: 'Account',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require(TabBarIcon)}
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

  componentDidMount() {
      myAccountStore.getMyAccountData()
      
  }


  getTabView() {
    const { anythingLoading } = myAccountStore;
    if(anythingLoading) {
      return null;
    }
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
  
  _onRefresh() {
    const { getMyAccountData } = myAccountStore;
    getMyAccountData();
  }
  
  render() {
    const { anythingLoading, todayChangeJS, accountValueJS, changePercentJS, todayChangeChangePercent } = myAccountStore;
    let todayChangeColor = 'green';
    if (todayChangeChangePercent < 0) {
      todayChangeColor = 'red';
    }
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <View style={styles.leftCta}></View>
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
              <Image
                source={require(SearchImage)}
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
              <Text style={[{ color: this.state.colors['darkSlate'] }, account.accValNum, fonts.hindGunturRg]}>{accountValueJS}</Text>
            </View>
            <View style={account.changeContainer}>
              <Text style={[{ color: this.state.colors['lightGray'] }, account.change, fonts.hindGunturRg]}>{"TODAY'S CHANGE"}</Text>
              <View style={account.changeWrap}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, account.changeNum, fonts.hindGunturRg]}>{todayChangeJS}</Text>
                <Text style={[{ backgroundColor: this.state.colors[todayChangeColor] }, { borderColor: this.state.colors[todayChangeColor] }, { color: this.state.colors['white'] }, styles.smallGrnBtn, account.changePercent, fonts.hindGunturBd]} onPress={() => this.setState({ myButtonOpacity: 0.5 })}>{changePercentJS}</Text>
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
        <ScrollView
          refreshControl={<RefreshControl
            refreshing={anythingLoading}
            onRefresh={this._onRefresh}
          />}
          style={[{ backgroundColor: this.state.colors['contentBg'] }, account.tabContainer]}
        >
          {this.getTabView()}
        </ScrollView>
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
      </SafeAreaView>
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
