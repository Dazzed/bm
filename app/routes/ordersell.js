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
  TabPane
} from 'react-native';

import Modal from 'react-native-modal'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {setTheme, getTheme, colors} from '../store/store';

import styles from '../style/style';
import order from '../style/order';
import ordertypes from '../style/ordertypes';
import numbers from '../style/numbers';
// import colors from '../style/colors';

import OrderTypes from './ordertypes';
import fonts from '../style/fonts';

var validity_props = [
  {label: 'Good until canceled', value: 0 },
  {label: 'Day only', value: 1 },
  {label: 'Extended hours', value: 2 }
];

class OrderSell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numField: null,
      isTypeVisible: false,
      orderValidity: 0,
      marketPrice: 153.53,
      estimatedCost: 0
    };

  }
  componentWillMount(){
    this.setState({colors: colors()});
  }

  addNum(num) {
    var curNums;
    var cost = 0;
    if(this.state.numField == null) {
     curNums = num;
    } else {
     curNums = this.state.numField + ''+num;
     cost = (this.state.marketPrice * curNums).toLocaleString();
    }
    this.setState({numField: curNums, estimatedCost: cost});
  }
  removeNum(num) {
    if(this.state.numField) {
      var delNums = this.state.numField;
      var cost = 0;
      console.log(delNums);
      delNums = delNums.substr(0, delNums.length - 1);
      cost = (delNums * this.state.marketPrice).toLocaleString()
      console.log(delNums)
      this.setState({numField: delNums, estimatedCost: cost})
    }
  }
  showOrderTypes(){
    this.setState({ isTypeVisible: true })
  }
  hideOrderTypes(value){ 
    this.setState({ isTypeVisible: false, orderValidity: value })
  }

  render() {
    return(
      <View style={[{backgroundColor: this.state.colors['contentBg']}, order.tabContent]}>
        <View style={order.details}>
          <View style={[{borderBottomColor: this.state.colors['darkSlate']}, order.detailsFirstRow]}>
            <Text style={[{color: this.state.colors['darkSlate']}, order.inputLabelQty, fonts.hindGunturRg]}>QUANTITY</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, order.inputQty, fonts.hindGunturRg]}>{this.state.numField}</Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{color: this.state.colors['lightGray']}, order.inputLabel, fonts.hindGunturRg]}>MARKET PRICE</Text>
            <Text style={[{color: this.state.colors['lightGray']}, order.input, fonts.hindGunturRg]}>${this.state.marketPrice}</Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{color: this.state.colors['lightGray']}, order.inputLabel, fonts.hindGunturRg]}>COMMISSION</Text>
            <Text style={[{color: this.state.colors['lightGray']}, order.input, fonts.hindGunturRg]}>$0</Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{color: this.state.colors['lightGray']}, order.inputLabel, fonts.hindGunturRg]}>ESTIMATED CREDIT</Text>
            <Text style={[{color: this.state.colors['lightGray']}, order.input, fonts.hindGunturRg]}>${this.state.estimatedCost}</Text>
          </View>
        </View>

        <View style={[{backgroundColor: this.state.colors['white']}, {borderTopColor: this.state.colors['borderGray']}, order.numContainer]}>        
          <View style={order.digitContainer}>
            <View style={numbers.row}>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(1); }}>1</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(2); }}>2</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(3); }}>3</Text>
            </View>
            <View style={numbers.row}>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(4); }}>4</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(5); }}>5</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(6); }}>6</Text>
            </View>
            <View style={numbers.row}>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(7); }}>7</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(8); }}>8</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(9); }}>9</Text>
            </View>
            <View style={numbers.row}>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]}></Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.addNum(0); }}>0</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, numbers.numbers, fonts.hindGunturRg]} onPress={() => {this.removeNum(); }}>
                <Text> </Text>
                <Image
                  source={this.state.colors['deleteImg']}
                  style={{ width: 40, height: 26 }}
                />
              </Text>
            </View>
          </View>
          <View style={[{borderTopColor: this.state.colors['borderGray']}, order.purchaseDetails]}>
            <View style={order.purchaseDetailsWrap}>
              <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxtLeft, fonts.hindGunturRg]}>Validity</Text>
              <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxt, fonts.hindGunturRg]}>{validity_props[this.state.orderValidity].label}</Text>
              <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxtBtn, fonts.hindGunturBd]} onPress={() => {this.showOrderTypes(); }}>EDIT</Text>
            </View>
          </View>
          <View style={order.btnRow}>
            <View style={[order.btnColumn, order.btnLeft]}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => {this.props.hideOrder()}}>
                <Text style={[{color: this.state.colors['realWhite']}, styles.cancelBtnTxt, fonts.hindGunturBd]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={[order.btnColumn, order.btnRight]}>
              <TouchableOpacity style={styles.buyBtn} onPress={() => {this.props.showOrderConfirm()}}>
                <Text style={[{color: this.state.colors['realWhite']}, styles.buyBtnTxt, fonts.hindGunturBd]}>SELL</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal 
          isVisible={this.state.isTypeVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={order.modal}
          onModalHide={() => {this.hideOrderTypes()}}>>
          <View style={ordertypes.tabContent}>
            <RadioForm
              radio_props={validity_props}
              initial={this.state.orderValidity}
              formHorizontal={false}
              labelHorizontal={true}
              borderWidth={1}
              buttonColor={this.state.colors['blue']}
              buttonOuterColor={this.state.colors['lightGray']}
              buttonSize={22}
              buttonOuterSize={20}
              animation={false}
              labelStyle={[styles.radioLabel,fonts.hindGunturRg]}
              radioLabelActive={[styles.activeRadioLabel,fonts.hindGunturBd]}
              labelWrapStyle={styles.radioLabelWrap}
              onPress={(value) => {this.hideOrderTypes(value)}}
              style={ordertypes.radioField}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

export default OrderSell;
