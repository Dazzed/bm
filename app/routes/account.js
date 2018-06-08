/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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

import Modal from 'react-native-modal'
import {setTheme, getTheme, colors} from '../store/store';

import Tabs from 'react-native-tabs';
import AccountBal from '../routes/accountbalances';
import AccountHist from '../routes/accounthistory';
import AccountPos from '../routes/accountpositions';
import Search from './search';

import styles from '../style/style';
import account from '../style/account';
import fonts from '../style/fonts';
import navstyle from '../style/nav';

class Account extends React.Component {
  static navigationOptions = {
    title: 'Account',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/accounts.png')}
        style={[navstyle.icon, {tintColor: tintColor}]}
      />
    ),    
  };
  constructor(props){
    super(props);
    this.state = {
      page:'balances',
      isSearchVisible: false,
      todaysChange: ['+13.7%','+1.50']
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }
  componentWillMount(){
    this.setState({colors: colors()});
  }
  getTabView() {
    switch (this.state.page) {
      case 'balances':
        return <AccountBal/>
        break;
      case 'history':
        return <AccountHist/>
        break;
      case 'positions':
        return <AccountPos/>
        break;
    }
  }
  showSearch() {
    this.setState({isSearchVisible:true});
  }
  hideSearch() {
    this.setState({isSearchVisible:false});
  }
  render() {
    return (
      <View style={[{backgroundColor: this.state.colors['white']}, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <View style={styles.leftCta}></View>
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{color: this.state.colors['lightGray']}, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
                <Image 
                  source={require('../images/search.png')}
                  style={styles.searchImg}
                />
            </TouchableOpacity>
            <View style={styles.rightCta}></View>            
          </View>
        </View>
        <View style={[{backgroundColor: this.state.colors['white']}, account.topContainer]}>
          <View style={[{backgroundColor: this.state.colors['white']}, account.valueContainer]}>
            <View style={account.values}>
              <Text style={[{color: this.state.colors['lightGray']}, account.acctVal, fonts.hindGunturRg]}>ACCOUNT VALUE</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, account.accValNum, fonts.hindGunturRg]}>$5,485.00</Text>
            </View>
            <View style={account.changeContainer}>
              <Text style={[{color: this.state.colors['lightGray']}, account.change, fonts.hindGunturRg]}>TODAY'S CHANGE</Text>
              <View style={account.changeWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.changeNum, fonts.hindGunturRg]}>+385.59</Text>
                <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['white']},  styles.smallGrnBtn, account.changePercent, fonts.hindGunturBd]} onPress={() => this.setState({myButtonOpacity: 0.5})}>+7.03%</Text>
              </View>
            </View>
          </View>
          <Tabs selected={this.state.page} style={[{backgroundColor:this.state.colors['white']}, account.tabBtns]}
                selectedStyle={{color:this.state.colors['blue']}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="balances" style={[{color: this.state.colors['lightGray']}, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:this.state.colors['blue']}}>Balances</Text>
              <Text name="positions" style={[{color: this.state.colors['lightGray']}, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:this.state.colors['blue']}}>Positions</Text>
              <Text name="history" style={[{color: this.state.colors['lightGray']}, account.tabTxt, fonts.hindGunturSb]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:this.state.colors['blue']}}>History</Text>
          </Tabs>
        </View>
        <ScrollView style={[{backgroundColor: this.state.colors['contentBg']}, account.tabContainer]}>
          {this.getTabView()}
        </ScrollView>
        <Modal 
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation}/>
        </Modal>
      </View>
    );
  }
}

export default Account;
