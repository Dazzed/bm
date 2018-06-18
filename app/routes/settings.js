/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../components/react-native-simple-radio-button';
import {setTheme, getTheme, colors} from '../store/store';

import styles from '../style/style';
import settings from '../style/settings';
import Search from './search';
import navstyle from '../style/nav';

import Modal from 'react-native-modal'
import fonts from '../style/fonts';
// import colors from '../style/colors';


var sort_props = [
  {label: '10 minutes', value: 0 },
  {label: '5 minutes', value: 1 },
  {label: '2 minutes', value: 2 },
  {label: '1 minute', value: 3 }
];

class Settings extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/settings.png')}
        style={[navstyle.icon, {tintColor: tintColor}]}
      />
    ),    
  };
  constructor(props) {
    super(props);
    this.state = {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      isSearchVisible: false,
      isAutoLogVisible: false,
      autoLog: 3,
      darkTheme: false,
      numField: null
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }
  componentWillMount(){
    this.setState({colors: colors()});
  }
  showSearch() {
    this.setState({isSearchVisible:true});
  }
  hideSearch() {
    this.setState({isSearchVisible:false});
  }
  showAutoLog() {
    this.setState({isAutoLogVisible:true});
  }
  hideAutoLog(value) {
    if(value) {
      this.setState({isAutoLogVisible:false, autoLog: value});
    } else {
      this.setState({isAutoLogVisible:false});
    }
  }
  setColor(value) {
    setTheme(value);
    this.setState({ colors: colors() });
    this.setState({darkTheme: value});
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
        <ScrollView style={[{backgroundColor: this.state.colors['contentBg']}, settings.contentBg]}>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>ACCOUNT INFOS</Text>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Email</Text>
            <TextInput style={[{borderBottomColor: this.state.colors['borderGray']}, {color: this.state.colors['darkSlate']}, settings.input, fonts.hindGunturRg]}
              placeholder="your@email.com"
              onChangeText={(email) => this.setState({email})}
              keyboardType="email-address"
              value="your@email.com"
              />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Mobile</Text>
            <TextInput style={[{borderBottomColor: this.state.colors['borderGray']}, {color: this.state.colors['darkSlate']}, settings.input, fonts.hindGunturRg]}
              placeholder="510.473.2257"
              onChangeText={(mobile) => this.setState({mobile})}
              keyboardType="number-pad"
              value="510.473.2257"
              />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Password</Text>
            <TextInput style={[{borderBottomColor: this.state.colors['borderGray']}, {color: this.state.colors['darkSlate']}, settings.input, fonts.hindGunturRg]}
              placeholder="Password"
              onChangeText={(password) => this.setState({password})}
              secureTextEntry={true}
              value="mypassword"
              />
          </View>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>COLOR SCHEME</Text>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Dark Theme</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setColor(value)}
              value={this.state.darkTheme} />
          </View>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>TOUCH ID</Text>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Touch ID Log-in</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.falseSwitchIsOn} />
          </View>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>AUTO LOG OFF</Text>
          <TouchableOpacity style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]} onPress={(value) => {this.showAutoLog()}}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Log out after</Text>
            <Text style={[{borderBottomColor: this.state.colors['borderGray']}, {color: this.state.colors['lightGray']}, settings.inputSelected, fonts.hindGunturRg]}>{sort_props[this.state.autoLog].label} inactivity</Text>
          </TouchableOpacity>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>NOTIFICATIONS</Text>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Bank Transfers</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Dividends</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Price Movements</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Orders</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <Text style={[{color: this.state.colors['darkSlate']}, settings.fieldTitle, fonts.hindGunturBd]}>NEWS SOURCE</Text>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>CNBC</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Bloomberg</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>MarketWatch</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={false} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Reuters</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={false} />
          </View>
          <View style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, settings.field]}>
            <Text style={[{color: this.state.colors['darkSlate']}, settings.inputLabel, fonts.hindGunturRg]}>Morningstart</Text>
             <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
              value={false} />
          </View>
        </ScrollView>
        <Modal 
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation}/>
        </Modal>
        <Modal 
          isVisible={this.state.isAutoLogVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={styles.bottomModalTall}
          onModalHide={() => {this.hideAutoLog()}}>
          <View style={[{backgroundColor: this.state.colors['white']}, styles.radio,styles.bottomModalTall]}>
            <RadioForm
              radio_props={sort_props}
              initial={this.state.autoLog}
              formHorizontal={false}
              labelHorizontal={true}
              borderWidth={1}
              buttonColor={colors.blue}
              buttonOuterColor={this.state.colors['lightGray']}
              buttonSize={22}
              buttonOuterSize={20}
              animation={false}
              labelStyle={[{color: this.state.colors['lightGray']}, styles.radioLabel,fonts.hindGunturRg]}
              radioLabelActive={[{color: this.state.colors['darkGray']}, styles.activeRadioLabel,fonts.hindGunturBd]}
              labelWrapStyle={[{borderBottomColor: this.state.colors['borderGray']}, styles.radioLabelWrap]}
              onPress={(value) => {this.hideAutoLog(value)}}
              style={styles.radioField}
            />
          </View>
        </Modal>          

      </View>
    );
  }
}

export default Settings;
