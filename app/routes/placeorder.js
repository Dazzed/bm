/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  ScrollView,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modal'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import OrderConf from './orderconf';

import Tabs from 'react-native-tabs';
import OrderBuy from './orderbuy';
import OrderSell from './ordersell';
import OrderShort from './ordershort';

import styles from '../style/style';
import order from '../style/order';
import ordertypes from '../style/ordertypes';

import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

var validity_props = [
  {label: 'Market order', value: 0 },
  {label: 'Limit order', value: 1 },
  {label: 'Stop Loss order', value: 2 }
];

class PlaceOrder extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      numField: null,
      isValidityVisible: false,
      isConfirmVisible: false,
      isOrderPlaced: false,
      animateOut: 'slideOutRight',
      orderTypeTitle: 0,
      page:this.props.orderType,
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.hideOrderChild = this.props.hideOrder.bind(this);
    this.hideOrderValidity = this.hideOrderValidity.bind(this);
    this.showOrderConfirm = this.showOrderConfirm.bind(this);
    this.hideOrderConfirm = this.hideOrderConfirm.bind(this);
    this.cancelOrderConfirm = this.cancelOrderConfirm.bind(this);
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
      case 'Buy':
        return <OrderBuy 
                hideOrder={this.hideOrderChild} 
                showOrderConfirm={this.showOrderConfirm}/>
        break;
      case 'Sell':
        return <OrderSell 
                hideOrder={this.hideOrderChild} 
                showOrderConfirm={this.showOrderConfirm}/>
        break;
      case 'Short':
        return <OrderShort 
                hideOrder={this.hideOrderChild} 
                showOrderConfirm={this.showOrderConfirm}/>
        break;
    }
  }
  showOrderValidity(){
    this.setState({ isValidityVisible: true })
  }
  hideOrderValidity(value){ 
    if(value) {
      this.setState({ isValidityVisible: false, orderTypeTitle: value })
    } else {
      this.setState({ isValidityVisible: false})
    }
  }
  showOrderConfirm() {
    this.setState({ isConfirmVisible: true })
  }
  hideOrderConfirm() {
    this.setState({ isConfirmVisible: false, animateOut: 'slideOutRight' })
  }
  cancelOrderConfirm() {
    this.setState({ isConfirmVisible: false, animateOut: 'slideOutDown' })
    setTimeout(() => {this.props.hideOrder()}, 0.1)
  }
  render() {
    return (
      <View style={[{backgroundColor: this.state.colors['white']}, order.accContainer]}>
        <View style={[{backgroundColor: this.state.colors['white']}, order.accInfoContainer]}>
            <TouchableOpacity style={order.leftCta} onPress={() => this.props.hideOrder()}>
              <Image 
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
          <Text style={[{color: this.state.colors['darkSlate']}, order.mainCta]}>{this.state.page} APPL</Text>
          <Text style={[{color: this.state.colors['lightGray']}, order.orderType, fonts.hindGunturRg]}>{validity_props[this.state.orderTypeTitle].label}</Text>
          <Text style={[{color: this.state.colors['lightGray']}, order.rightCta]} onPress={() => this.showOrderValidity()}>Edit type</Text>
          <Tabs selected={this.state.page} style={[{backgroundColor:this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, order.tabBtns]}
                selectedStyle={{color:this.state.colors['blue']}} onSelect={el=>this.setState({page:el.props.name})}>
              <Text name="Buy" style={[{color: this.state.colors['lightGray']}, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:colors.blue}}>Buy</Text>
              <Text name="Sell" style={[{color: this.state.colors['lightGray']}, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:colors.blue}}>Sell</Text>
              <Text name="Short" style={[{color: this.state.colors['lightGray']}, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth:1,borderBottomColor:colors.blue}}>Short</Text>
          </Tabs>
        </View>
        <ScrollView style={[{backgroundColor: this.state.colors['contentBg']}, order.tabContainer]}>
          {this.getTabView()}
          <Modal 
            isVisible={this.state.isValidityVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            style={order.modal}
            onModalHide={() => {this.hideOrderValidity()}}>
            <View style={[{backgroundColor: this.state.colors['contentBg']}, ordertypes.tabContent]}>
              <RadioForm
                radio_props={validity_props}
                initial={this.state.orderTypeTitle}
                formHorizontal={false}
                labelHorizontal={true}
                borderWidth={1}
                buttonColor={this.state.colors['blue']}
                buttonOuterColor={this.state.colors['lightGray']}
                buttonSize={22}
                buttonOuterSize={20}
                animation={false}
                labelStyle={[{color: this.state.colors['lightGray']}, styles.radioLabel,fonts.hindGunturRg]}
                radioLabelActive={[{color: this.state.colors['lightGray']}, styles.activeRadioLabel,fonts.hindGunturBd]}
                labelWrapStyle={[{borderBottomColor: this.state.colors['borderGray']}, styles.radioLabelWrap]}
                onPress={(value) => {this.hideOrderValidity(value)}}
                style={ordertypes.radioField}
              />
            </View>
          </Modal>
          <Modal 
            isVisible={this.state.isConfirmVisible}
            animationIn={'slideInRight'}
            animationOut={this.state.animateOut}
            style={order.confirmModal}>
            <OrderConf 
              hideOrderConfirm={this.hideOrderConfirm}
              cancelOrderConfirm={this.cancelOrderConfirm} />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

// export default PlaceOrder;
PlaceOrder.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(PlaceOrder);
