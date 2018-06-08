/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal'

import OrderTypes from './ordertypes';

import styles from '../style/style';
import order from '../style/order';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';


class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount(){
    this.setState({colors: colors()});
  }

  render() {
    return(
      <View>
        <View style={[{borderBottomColor: this.state.colors['lightGray']}, order.menuBorder]}>
          <View style={styles.menuContainer}>
            <Text style={[{color: this.state.colors['darkSlate']},styles.boldTitleConf, fonts.hindGunturBd]}>Order Placed</Text>
          </View>
        </View>
        <View style={order.tabContent}>
          <View style={order.placeDetails}>
            <View style={styles.landingIcon}>
              <Image 
                source={require('../images/logo.png')}
                style={styles.appIcon}
              />
            </View>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>You just bought</Text>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>10 shares of APPL</Text>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>Cheers!</Text>
            <Text style={order.confSpacing}></Text>
            <View style={order.btnWrap}>
              <TouchableHighlight style={[{borderColor: this.state.colors['darkGray']}, order.optionbtn]} onPress={() => {this.props.hideOrderPlaced()}}>
                <Text style={[{color: this.state.colors['darkGray']}, styles.touchOption, fonts.hindGunturMd]}>DONE</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={order.shareContainer}>
            <TouchableHighlight style={styles.fullBtnStocktwits} onPress={() => {this.props.hideOrderPlaced()}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.fullBtnTxt, fonts.hindGunturSb]}>SHARE ON STOCKTWITS</Text>
            </TouchableHighlight>            
            <TouchableHighlight style={styles.fullBtnTwitter} onPress={() => {this.props.hideOrderPlaced()}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.fullBtnTxt, fonts.hindGunturSb]}>SHARE ON TWITTER</Text>
            </TouchableHighlight>            
          </View>   
        </View>     
      </View>
    )
  }
}

export default OrderPlaced;
