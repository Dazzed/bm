import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import {
  setTheme,
  getTheme,
  colors
} from '../store/store';
import styles from '../style/style';
import order from '../style/order';
import ordertypes from '../style/ordertypes';
import numbers from '../style/numbers';
import fonts from '../style/fonts';
// import colors from '../style/colors';
import {
  chartStore,
  buySellStore
} from '../mobxStores';
import { validity_props } from '../constants';
import { observer } from 'mobx-react';

@observer
class OrderBuy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numField: null,
      isTypeVisible: false,
      // orderValidity: 0,
      // marketPrice: 153.53,
      // estimatedCost: 0,
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

  showOrderTypes = () => {
    this.setState({ isTypeVisible: true })
  }

  setOrderValidity = (value) => {
    const { setValidityIndex } = buySellStore;
    setValidityIndex(value);
    this.hideOrderValidity()
  }

  hideOrderValidity = () => {
    // console.log('---- hide order validity');
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
    return(
      <View style={[{backgroundColor: this.state.colors['contentBg']}, order.tabContent]}>
        <View style={order.details}>
          <View
            style={activeInputName === 'quantity' ? [order.detailsFirstRow] : [order.detailsFirstRow]}
          >
            <Text
              style={[{color: this.state.colors['darkSlate']}, order.inputLabelQty, fonts.hindGunturRg]}
              onPress={this.changeActiveInputName.bind(this, 'quantity')}
            >
              QUANTITY
            </Text>
            <Text
              style={[{color: this.state.colors['darkSlate']}, order.inputQty, fonts.hindGunturRg]}
              onPress={this.changeActiveInputName.bind(this, 'quantity')}
            >
              {quantity}
            </Text>
          </View>
          <View
            style={orderTypeName !== 'market' ? [order.detailsFirstRow]: order.detailsRow}
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
            <Text style={[{color: this.state.colors['lightGray']}, order.inputLabel, fonts.hindGunturRg]}>COMMISSION</Text>
            <Text style={[{color: this.state.colors['lightGray']}, order.input, fonts.hindGunturRg]}>$0</Text>
          </View>
          <View style={order.detailsRow}>
            <Text style={[{color: this.state.colors['lightGray']}, order.inputLabel, fonts.hindGunturRg]}>
              ESTIMATED COST
            </Text>
            <Text
              style={[{color: this.state.colors['lightGray']}, order.input, fonts.hindGunturRg]}
            >
              {
                orderTypeName === 'market' ?
                  `$${calculatedCost}` :
                    `$${calculatedCostCustom}`
              }
            </Text>
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
              {
                orderTypeName !== 'market' ? <Fragment>
                    <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxtLeft, fonts.hindGunturRg]}>Validity</Text>
                    <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxt, fonts.hindGunturRg]}>{validity_props[validityIndex].label}</Text>
                    <Text style={[{color: this.state.colors['darkGray']}, order.purchaseTxtBtn, fonts.hindGunturBd]} onPress={() => {this.showOrderTypes(); }}>EDIT</Text>
                  </Fragment> : null
              }
            </View>
          </View>
          <View style={order.btnRow}>
            <View style={[order.btnColumn, order.btnLeft]}>
              <TouchableOpacity style={styles.cancelBtn} onPress={this.props.hideOrder}>
                <Text style={[{color: this.state.colors['realWhite']}, styles.cancelBtnTxt, fonts.hindGunturBd]}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <View style={[order.btnColumn, order.btnRight]}>
              <TouchableOpacity style={styles.buyBtn} onPress={this.props.showOrderConfirm}>
                <Text style={[{color: this.state.colors['realWhite']}, styles.buyBtnTxt, fonts.hindGunturBd]}>PLACE ORDER</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Modal
          isVisible={this.state.isTypeVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={order.modal}
          onModalHide={() => {this.hideOrderValidity()}}>
          <View style={[ordertypes.tabContent, {backgroundColor: this.state.colors['contentBg']}]}>
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
              labelStyle={[{color: this.state.colors['lightGray']}, styles.radioLabel,fonts.hindGunturRg]}
              radioLabelActive={[{color: this.state.colors['darkGray']}, styles.activeRadioLabel,fonts.hindGunturBd]}
              labelWrapStyle={[{borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
              onPress={(value) => {this.setOrderValidity(value)}}
              style={ordertypes.radioField}
            />
          </View>
        </Modal>
      </View>
    )
  }
}

// export default OrderBuy;
OrderBuy.propTypes = {
  globalData: PropTypes.object.isRequired,
  showOrderConfirm: PropTypes.func.isRequired,
  hideOrder: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderBuy);
