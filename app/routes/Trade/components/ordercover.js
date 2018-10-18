import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
  SafeAreaView
} from 'react-native';
import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { observer } from 'mobx-react';

import { selectGlobalData } from '../../../selectors';
import { setTheme, getTheme, colors } from '../../../store/store';
import styles from '../../../style/style';
import order from '../../../style/order';
import ordertypes from '../../../style/ordertypes';
import numbers from '../../../style/numbers';
import fonts from '../../../style/fonts';
import {
  chartStore,
  buySellStore
} from '../../../mobxStores';
import { validity_props } from '../../../constants';

@observer
class OrderCover extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numField: null,
      isTypeVisible: false,
      colors: colors(props.globalData.isDarkThemeActive),
      activeInputName: 'quantity'
    };
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

  changeActiveInputName = name => {
    if (this.state.activeInputName === name) {
      return;
    }
    this.setState({ activeInputName: name });
  };

  addNum(num) {
    const { addNumber } = buySellStore;
    addNumber(num, this.state.activeInputName);
  }

  removeNum(num) {
    const { removeNumber } = buySellStore;
    removeNumber(num, this.state.activeInputName);
  }

  showOrderTypes() {
    this.setState({ isTypeVisible: true })
  }
  setOrderTypes(value) {
    const { setValidityIndex } = buySellStore;
    setValidityIndex(value);
    this.hideOrderTypes()
  }
  hideOrderTypes() {
    this.setState({ isTypeVisible: false })
  }

  render() {
    const { tickerDataJS } = chartStore;
    const {
      quantity,
      orderTypeName,
      calculatedCost,
      calculatedCostCustom,
      validityIndex,
      price
    } = buySellStore;
    const { activeInputName } = this.state;
    const activeBorderBottomStyle = { borderBottomColor: this.state.colors['darkSlate'] };

    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['contentBg'] }, order.tabContent]}>
        <View style={order.details}>
          <View
            style={activeInputName === 'quantity' ? [order.detailsFirstRow] : [order.detailsFirstRow]}
          >
            <Text
              style={[{ color: this.state.colors['darkSlate'] }, order.inputLabelQty, fonts.hindGunturRg]}
              onPress={this.changeActiveInputName.bind(this, 'quantity')}
            >
              QUANTITY
            </Text>
            <Text
              style={[{ color: this.state.colors['darkSlate'] }, order.inputQty, fonts.hindGunturRg]}
              onPress={this.changeActiveInputName.bind(this, 'quantity')}
            >
              {quantity}
            </Text>
          </View>
          <View
            style={orderTypeName !== 'market' ? [order.detailsFirstRow] : order.detailsRow}
          >
            <Text
              style={orderTypeName !== 'market' ? [{ color: this.state.colors['darkSlate'] }, order.inputLabelQty, fonts.hindGunturRg] : [{ color: this.state.colors['lightGray'] }, order.inputLabel, fonts.hindGunturRg]}
              onPress={orderTypeName !== 'market' ? this.changeActiveInputName.bind(this, 'price') : () => false}
            >
              MARKET PRICE
            </Text>
            <Text
              style={orderTypeName !== 'market' ? [{ color: this.state.colors['darkSlate'] }, order.inputQty, fonts.hindGunturRg] : [{ color: this.state.colors['lightGray'] }, order.input, fonts.hindGunturRg]}
              onPress={orderTypeName !== 'market' ? this.changeActiveInputName.bind(this, 'price') : () => false}
            >
              {
                orderTypeName === 'market' ?
                  `$${tickerDataJS.Price}` :
                  (activeInputName === 'price' ?
                    (price || tickerDataJS.Price) :
                    `$${price || tickerDataJS.Price}`)
              }
            </Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{ color: this.state.colors['lightGray'] }, order.inputLabel, fonts.hindGunturRg]}>COMMISSION</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, order.input, fonts.hindGunturRg]}>$0</Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{ color: this.state.colors['lightGray'] }, order.inputLabel, fonts.hindGunturRg]}>
              ESTIMATED CREDIT
            </Text>
            <Text
              style={[{ color: this.state.colors['lightGray'] }, order.input, fonts.hindGunturRg]}
            >
              {
                orderTypeName === 'market' ?
                  `$${calculatedCost}` :
                  `$${calculatedCostCustom}`
              }
            </Text>
          </View>
        </View>

        <View style={[{ backgroundColor: this.state.colors['white'] }, { borderTopColor: this.state.colors['borderGray'] }, order.numContainer]}>
          <View style={order.digitContainer}>
            <View style={numbers.row}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(1); }}>1</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(2); }}>2</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(3); }}>3</Text>
            </View>
            <View style={numbers.row}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(4); }}>4</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(5); }}>5</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(6); }}>6</Text>
            </View>
            <View style={numbers.row}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(7); }}>7</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(8); }}>8</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(9); }}>9</Text>
            </View>
            <View style={numbers.row}>
              {activeInputName === 'quantity' ? <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]}></Text> :
                <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum('.') }}>.</Text>}
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(0); }}>0</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.removeNum(); }}>
                <Text> </Text>
                <Image
                  source={this.state.colors['deleteImg']}
                  style={{ width: 40, height: 26 }}
                />
              </Text>
            </View>
          </View>
          <View style={[{ borderTopColor: this.state.colors['borderGray'] }, order.purchaseDetails]}>
            <View style={order.purchaseDetailsWrap}>
              {
                orderTypeName !== 'market' ? <Fragment>
                  <Text style={[{ color: this.state.colors['darkGray'] }, order.purchaseTxtLeft, fonts.hindGunturRg]}>Time in Force</Text>
                  <Text style={[{ color: this.state.colors['darkGray'] }, order.purchaseTxt, fonts.hindGunturRg]}>{validity_props[validityIndex].label}</Text>
                  <Text style={[{ color: this.state.colors['darkGray'] }, order.purchaseTxtBtn, fonts.hindGunturBd]} onPress={() => { this.showOrderTypes(); }}>EDIT</Text>
                </Fragment> : null
              }
            </View>
          </View>
          <View style={order.btnRow}>
            <View style={[order.btnColumn, order.btnLeft]}>
              <TouchableOpacity style={styles.cancelBtn} onPress={this.props.hideOrder}>
                <Text style={[{ color: this.state.colors['realWhite'] }, styles.cancelBtnTxt, fonts.hindGunturBd]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={[order.btnColumn, order.btnRight]}>
              <TouchableOpacity style={styles.buyBtn} onPress={this.props.showOrderConfirm}>
                <Text style={[{ color: this.state.colors['realWhite'] }, styles.buyBtnTxt, fonts.hindGunturBd]}>COVER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          isVisible={this.state.isTypeVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={order.modal}
          onModalHide={() => { this.hideOrderTypes() }}>
          <View style={[ordertypes.tabContent, { backgroundColor: this.state.colors['contentBg'] }]}>
            <RadioForm
              radio_props={validity_props}
              initial={validityIndex}
              formHorizontal={false}
              labelHorizontal={true}
              borderWidth={1}
              buttonColor={this.state.colors['blue']}
              buttonOuterColor={this.state.colors['lightGray']}
              buttonSize={22}
              buttonOuterSize={20}
              animation={false}
              labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
              radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
              labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
              onPress={(value) => { this.setOrderTypes(value) }}
              style={ordertypes.radioField}
            />
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

OrderCover.propTypes = {
  globalData: PropTypes.object.isRequired,
  showOrderConfirm: PropTypes.func.isRequired,
  hideOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderCover);
