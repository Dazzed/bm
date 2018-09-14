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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from 'react-native-simple-radio-button';
import OrderConf from './orderconf';
import Tabs from 'react-native-tabs';
import OrderBuy from './orderbuy';
import OrderSell from './ordersell';
import OrderShort from './ordershort';
import OrderCover from './ordercover';
import styles from '../style/style';
import order from '../style/order';
import ordertypes from '../style/ordertypes';
import fonts from '../style/fonts';
import {
  setTheme,
  getTheme,
  colors
} from '../store/store';
import { buySellStore } from '../mobxStores';
import { order_type } from '../constants';
import { observer } from 'mobx-react';

@observer
class PlaceOrder extends React.Component {
  constructor(props) {
    super(props);
    this.oldSetState = this.setState;
    this.setState = (data) => {
      console.log('----- place order set state', data);
      return this.oldSetState(data);
    }
    this.state = {
      numField: null,
      isOrderTypeVisible: false,
      isConfirmVisible: false,
      isOrderPlaced: false,
      animateOut: 'slideOutRight',
      page: props.orderType,
      colors: colors(props.globalData.isDarkThemeActive)
    };

    // save order type into mobx on page load
    buySellStore.setTransactionType(this.props.orderType);

    this.hideOrderChild = this.props.hideOrder.bind(this);
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



  componentWillUnmount() {
    console.log('----- Component will unmount');
  }

  getTabView() {
    const propsToPass = {
      hideOrder: this.hideOrderChild,
      showOrderConfirm: this.showOrderConfirm
    };
    switch (this.state.page) {
      case 'Buy':
        return <OrderBuy {...propsToPass} />;
      case 'Sell':
        return <OrderSell {...propsToPass} />;
      case 'Short':
        return <OrderShort {...propsToPass} />;
      case 'Cover':
        return <OrderCover {...propsToPass} />;
    }
    throw new Error(`placeorder.js getTabView, invalid value '${this.state.page}' in this.state.page`);
  }

  setOrderValidity(value) {
    const { setOrderTypeName } = buySellStore;
    const { name: thisOrderName } = this.generateOrderTypeOptions().find(o => o.value === value);
    setOrderTypeName(thisOrderName);
    this.toggleOrderType();
  }

  toggleOrderType = () =>
    this.setState(({ isOrderTypeVisible }) => ({ isOrderTypeVisible: !isOrderTypeVisible }));

  showOrderConfirm = () => {
    this.setState({ isConfirmVisible: true })
  }

  hideOrderConfirm = () => {
    this.setState({ isConfirmVisible: false, animateOut: 'slideOutRight' })
  }

  cancelOrderConfirm = () => {
    // console.log('-======== CANCEL ORDER CONFIRM', this);
    this.hideOrderConfirm();
    // this.setState({ isConfirmVisible: false, animateOut: 'slideOutDown' })
    // setTimeout(() => { this.props.hideOrder() }, 0.1)
  }

  setPageType(el) {
    buySellStore.setTransactionType(el.props.name);
    this.setState({
      page: el.props.name
    });

  }

  generateOrderTypeOptions = () => {
    switch (this.state.page) {
      case 'Buy':
      case 'Short':
      case 'Cover':
        return order_type
          .filter(t => t.query === 'market' || t.query === 'limit')
          .map((t, i) => ({ ...t, value: i }));
      case 'Sell':
        return order_type;
    }
    throw new Error(`placeorder.js generateOrderTypeOptions, invalid value '${this.state.page}' in this.state.page`);
  };

  render() {
    const { orderTypeName } = buySellStore;
    const orderTypeOptions = this.generateOrderTypeOptions();
    let initialValueIndex = orderTypeOptions.findIndex(o => o.name === orderTypeName);
    if (initialValueIndex === -1) {
      initialValueIndex = 0;
    }
    const {
      targetStockData
    } = this.props;
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, order.accContainer]}>
        <View style={[{ backgroundColor: this.state.colors['white'] }, order.accInfoContainer]}>
          <TouchableOpacity style={order.leftCta} onPress={this.props.hideOrder}>
            <Image
              source={require('../images/close.png')}
              style={styles.closeImg}
            />
          </TouchableOpacity>
          <Text
            style={[{ color: this.state.colors['darkSlate'] }, order.mainCta]}
          >
            {this.state.page} {targetStockData.ticker || 'Ticker N/A'}
          </Text>
          <Text
            style={[{ color: this.state.colors['lightGray'] }, order.orderType, fonts.hindGunturRg]}
          >
            {orderTypeOptions[initialValueIndex].label}
          </Text>
          <Text
            style={[{ color: this.state.colors['lightGray'] }, order.rightCta]}
            onPress={this.toggleOrderType}
          >
            Edit type
          </Text>
          <Tabs selected={this.state.page} style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, order.tabBtns]}
            selectedStyle={{ color: this.state.colors['blue'] }} onSelect={el => this.setPageType(el)}>
            <Text name="Buy" style={[{ color: this.state.colors['lightGray'] }, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: colors.blue }}>Buy</Text>
            <Text name="Sell" style={[{ color: this.state.colors['lightGray'] }, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: colors.blue }}>Sell</Text>
            <Text name="Short" style={[{ color: this.state.colors['lightGray'] }, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: colors.blue }}>Short</Text>
            <Text name="Cover" style={[{ color: this.state.colors['lightGray'] }, fonts.hindGunturBd]} selectedIconStyle={{ borderBottomWidth: 1, borderBottomColor: colors.blue }}>Cover</Text>
          </Tabs>
        </View>
        <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, order.tabContainer]}>
          {this.getTabView()}
          <Modal
            isVisible={this.state.isOrderTypeVisible}
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            style={order.modal}
            onModalHide={() => false}>
            <View style={[{ backgroundColor: this.state.colors['contentBg'] }, ordertypes.tabContent]}>
              <RadioForm
                radio_props={orderTypeOptions}
                initial={initialValueIndex}
                formHorizontal={false}
                labelHorizontal={true}
                borderWidth={1}
                buttonColor={this.state.colors['blue']}
                buttonOuterColor={this.state.colors['lightGray']}
                buttonSize={22}
                buttonOuterSize={20}
                animation={false}
                labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                radioLabelActive={[{ color: this.state.colors['lightGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                onPress={(value) => { this.setOrderValidity(value) }}
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
              cancelOrderConfirm={this.cancelOrderConfirm}
              targetStockData={targetStockData}
            />
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

// export default PlaceOrder;
PlaceOrder.propTypes = {
  globalData: PropTypes.object.isRequired,
  targetStockData: PropTypes.object.isRequired,
  orderType: PropTypes.string.isRequired,
  hideOrder: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(PlaceOrder);
