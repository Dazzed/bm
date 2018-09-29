import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Alert,
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
import Tabs from 'react-native-tabs';
import { observer } from 'mobx-react';

import { selectGlobalData } from '../../selectors';
import OrderConf from './components/orderconf';
import OrderBuy from './components/orderbuy';
import OrderSell from './components/ordersell';
import OrderShort from './components/ordershort';
import OrderCover from './components/ordercover';
import OrderPlaced from './components/orderplaced';
import styles from '../../style/style';
import order from '../../style/order';
import ordertypes from '../../style/ordertypes';
import fonts from '../../style/fonts';
import {
  colors
} from '../../store/store';
import { buySellStore } from '../../mobxStores';
import { order_type } from '../../constants';
import orderValidator from './validate';

@observer
class Trade extends React.Component {
  static navigationOptions = {
    title: 'Trade',
    header: null,
    gesturesEnabled: false,
  };

  constructor(props) {
    super(props);
    this.oldSetState = this.setState;
    this.setState = (data) => {
      console.log('----- place order set state', data);
      return this.oldSetState(data);
    }
    const { orderType } = props.navigation.state.params;
    this.state = {
      numField: null,
      isOrderTypeVisible: false,
      isOrderPlaced: false,
      animateOut: 'slideOutRight',
      page: orderType,
      colors: colors(props.globalData.isDarkThemeActive),
      activeComponent: 'trading' // can be one of (trading, orderConfirm, orderPlaced)
    };

    // save order type into mobx on page load
    buySellStore.setTransactionType(orderType);
  }

  goBack = () => {
    this.props.navigation.goBack();
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
    console.log('====== CPM{POMNE D} MOUNT')
    console.log(buySellStore)
    buySellStore.setQuantity('');
  }

  componentWillUnmount() {
    console.log('----- Component will unmount');
  }

  changeActiveComponent = nextActiveComponent => {
    if (['trading', 'orderConfirm', 'orderPlaced'].includes(nextActiveComponent)) {
      this.setState({ activeComponent: nextActiveComponent });
    } else {
      throw new Error(`${nextActiveComponent} is invalid`);
    }
  };

  renderActiveComponent = () => {
    const { activeComponent } = this.state;
    const {
      targetStockData,
    } = this.props.navigation.state.params;
    if (activeComponent === 'trading') {
      return this.getTabView();
    } else if (activeComponent === 'orderConfirm') {
      return (
        <View
          style={[
            { backgroundColor: this.state.colors['white'] },
            order.orderConfirmContainer
          ]}
        >
          <OrderConf
            hideOrderConfirm={this.changeActiveComponent.bind(this, 'trading')}
            cancelOrderConfirm={this.goBack}
            targetStockData={targetStockData}
            onOrderPlaced={this.changeActiveComponent.bind(this, 'orderPlaced')}
          />
        </View>
      );
    } else if (activeComponent === 'orderPlaced') {
      const { quantity } = buySellStore;
      return (
        <View
          style={[
            { backgroundColor: this.state.colors['white'] },
            order.orderConfirmContainer
          ]}
        >
          <OrderPlaced
            globalData={this.props.globalData}
            hideOrderPlaced={this.goBack}
            quantityPurchased={quantity}
            targetStockData={targetStockData}
          />
        </View>
      );
    }
  }

  getTabView = () => {
    const propsToPass = {
      hideOrder: this.hideOrderChild,
      showOrderConfirm: this.showOrderConfirm
    };
    const Wrapper = ({ children }) => (
      <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, order.tabContainer]}>
        {children}
        {this.renderOrderTypeModal()}
      </ScrollView>
    );
    switch (this.state.page) {
      case 'Buy':
        return <Wrapper><OrderBuy {...propsToPass} /></Wrapper>;
      case 'Sell':
        return <Wrapper><OrderSell {...propsToPass} /></Wrapper>;
      case 'Short':
        return <Wrapper><OrderShort {...propsToPass} /></Wrapper>;
      case 'Cover':
        return <Wrapper><OrderCover {...propsToPass} /></Wrapper>;
    }
    throw new Error(`placeorder.js getTabView, invalid value '${this.state.page}' in this.state.page`);
  }

  setOrderValidity = value => {
    const { setOrderTypeName } = buySellStore;
    const { name: thisOrderName } = this.generateOrderTypeOptions().find(o => o.value === value);
    setOrderTypeName(thisOrderName);
    this.toggleOrderType();
  }

  toggleOrderType = () =>
    this.setState(({ isOrderTypeVisible }) => ({ isOrderTypeVisible: !isOrderTypeVisible }));

  showOrderConfirm = () => {
    // Only transition to confirm page if the right data has been entered and validated.
    // Validate for price (If limit order and price is not manually entered), quantity
    const {
      quantity,
      price,
      orderTypeName
    } = buySellStore;
    const result = orderValidator({ quantity, price, orderTypeName });
    if (result.errorPresent) {
      Alert.alert(result.errorMessage);
    } else {
      this.setState({ activeComponent: 'orderConfirm' });
    }
  }

  setPageType = el => {
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

  renderOrderTypeModal = () => {
    const orderTypeOptions = this.generateOrderTypeOptions();
    let initialValueIndex = orderTypeOptions.findIndex(o => o.name === this.state.orderTypeName);
    if (initialValueIndex === -1) {
      initialValueIndex = 0;
    }
    return (
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
    );
  }

  render() {
    const { orderTypeName } = buySellStore;
    const orderTypeOptions = this.generateOrderTypeOptions();
    let initialValueIndex = orderTypeOptions.findIndex(o => o.name === orderTypeName);
    if (initialValueIndex === -1) {
      initialValueIndex = 0;
    }
    const {
      targetStockData,
    } = this.props.navigation.state.params;
    const {
      activeComponent
    } = this.state;
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, order.accContainer]}>
        <View
          style={[
            { backgroundColor: this.state.colors['white'], display: activeComponent === 'trading' ? 'flex' : 'none' },
            order.accInfoContainer
          ]}
        >
          <TouchableOpacity style={order.leftCta} onPress={this.goBack}>
            <Image
              source={require('../../images/close.png')}
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
        {/* <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, order.tabContainer]}>
          {this.renderActiveComponent()}
          {this.renderOrderTypeModal()}
        </ScrollView> */}
        {this.renderActiveComponent()}
      </View>
    );
  }
}

Trade.propTypes = {
  globalData: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Trade);
