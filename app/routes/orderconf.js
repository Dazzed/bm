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
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal'

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import order from '../style/order';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

class OrderConf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderPlaced: false,
      animateOut: 'slideOutLeft'
    };

    this.hideOrderPlaced = this.hideOrderPlaced.bind(this);

  }
  componentWillMount(){
    this.setState({colors: colors()});
  }
  showOrderPlaced() {
    this.setState({ isOrderPlaced: true })
  }
  hideOrderPlaced() {
    this.setState({ isOrderPlaced: false, animateOut: 'slideOutDown' })
    setTimeout(() => {this.props.cancelOrderConfirm()}, 0.1)
  }

  render() {
    return(
      <View>
        <View style={[{borderBottomColor: this.state.colors['lightGray']}, order.menuBorder]}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideOrderConfirm()}>
              <Image 
                source={require('../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[styles.mainCta, fonts.hindGunturRg]} onPress={() => this.showSearch()}>Search Stocks</Text>
            <TouchableOpacity style={[styles.rightCta]} onPress={() => {this.props.cancelOrderConfirm()}}>
              <Text style={[{color: this.state.colors['lightGray']}, styles.rightCtaTxt, fonts.hindGunturRg]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[styles.boldTitleConf, fonts.hindGunturBd]}>Confirmation</Text>
          </View>
        </View>
        <View style={[{backgroundColor: this.state.colors['contentBg']}, order.tabContent]}>
          <View style={order.confDetails}>
            <Text style={[{color: this.state.colors['darkSlate']}, order.confTxt, fonts.hindGunturLt]}>You are buying</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, order.confTxt, fonts.hindGunturLt]}>10 shares of APPL</Text>
            <Text style={order.confSpacing}></Text>
            <Text style={[{color: this.state.colors['darkSlate']}, order.confTxt, fonts.hindGunturLt]}>Each share is $153.53</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, order.confTxt, fonts.hindGunturLt]}>for a total of <Text style={styles.greentTxt}>$1,535.30</Text></Text>
            <Text style={order.confSpacing}></Text>
          </View>
          <View style={order.confirmContainer}>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>QUANTITY</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>10</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>MARKET PRICE</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>$153.53</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>COMMISSION</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>$0</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>ESTIMATED COST</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>$1,535.30</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>VALIDITY</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>Day only</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>TYPE</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>Market order</Text>
            </View>
            <Text style={order.confSpacing}></Text>
            <TouchableOpacity style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, styles.fullBtn]} onPress={() => {this.showOrderPlaced()}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.fullBtnTxt, fonts.hindGunturBd]}>CONFIRM</Text>
            </TouchableOpacity>            
          </View>   
        </View>
        <Modal 
          isVisible={this.state.isOrderPlaced}
          animationIn={'slideInRight'}
          animationOut={this.state.animateOut}
          style={order.confirmModal}>
          <OrderPlaced hideOrderPlaced={this.hideOrderPlaced}/>
        </Modal>
      </View>
    )
  }
}

export default OrderConf;
