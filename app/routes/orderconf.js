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
import {
  setTheme,
  getTheme,
  colors
} from '../store/store';
import { observer } from 'mobx-react';
import { buySellStore, chartStore } from '../mobxStores';
import { numberWithCommas } from '../utility';
import {
  validity_props,
  order_type
} from '../constants';

@observer
class OrderConf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOrderPlaced: false,
      animateOut: 'slideOutLeft',
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.hideOrderPlaced = this.hideOrderPlaced.bind(this);
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

  confirmOrder = () => {
    const { makeTransaction } = buySellStore;
    console.info('======== ORDER CONFIRM PRESSED');
    makeTransaction()
      .then((res) => {
        console.info('=== order placed');
        this.setState({ isOrderPlaced: true });
      })
      .catch((err) => {
        console.info('err', err);
      })
  }

  hideOrderPlaced() {
    this.setState({ isOrderPlaced: false, animateOut: 'slideOutDown' })
    setTimeout(this.props.cancelOrderConfirm, 0.1)
  }

  render() {
    const { targetStockData } = this.props;
    const { tickerDataJS } = chartStore;
    const {
      quantity,
      price: enteredPrice,
      calculatedCostCustom,
      transactionType,
      validityIndex,
      orderTypeName
    } = buySellStore;

    let ticker = targetStockData.ticker;
    let pricePerShare = enteredPrice || tickerDataJS.Price;
    let totalPrice = calculatedCostCustom;

    let purchaseAction = transactionType + 'ing';
    let sharesOrShareText = 'shares';
    if (quantity === 1) {
      sharesOrShareText = 'share';
    }

    let validity = validity_props[validityIndex].label;
    let type = order_type.find(t => t.name === orderTypeName).label;

    return (
      <View>
        <View style={[{ borderBottomColor: this.state.colors['lightGray'], backgroundColor: this.state.colors['white'] }, order.menuBorder]}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={this.props.hideOrderConfirm}>
              <Image
                source={require('../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[styles.mainCta, fonts.hindGunturRg]} onPress={() => this.showSearch()}>Search Stocks</Text>
            <TouchableOpacity style={[styles.rightCta]} onPress={() => { this.props.cancelOrderConfirm() }}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.rightCtaTxt, fonts.hindGunturRg]}>Cancel</Text>
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.boldTitleConf, fonts.hindGunturBd]}>Confirmation</Text>
          </View>
        </View>
        <View style={[{ backgroundColor: this.state.colors['white'] }, order.tabContent]}>
          <View style={[{ backgroundColor: this.state.colors['contentBg'] }, order.confDetails]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, order.confTxt, fonts.hindGunturLt]}>You are {purchaseAction}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, order.confTxt, fonts.hindGunturLt]}>{numberWithCommas(quantity)} {sharesOrShareText} of {ticker}</Text>
            <Text style={order.confSpacing}></Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, order.confTxt, fonts.hindGunturLt]}>Each share is ${numberWithCommas(pricePerShare)}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, order.confTxt, fonts.hindGunturLt]}>for a total of <Text style={styles.greentTxt}>${numberWithCommas(totalPrice)}</Text></Text>
            <Text style={order.confSpacing}></Text>
          </View>
          <View style={order.confirmContainer}>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>QUANTITY</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>{numberWithCommas(quantity)}</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>MARKET PRICE</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>${numberWithCommas(pricePerShare)}</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>COMMISSION</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>$0</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>ESTIMATED COST</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>${numberWithCommas(totalPrice)}</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>VALIDITY</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>{validity}</Text>
            </View>
            <View style={order.confirmRow}>
              <Text style={[order.confirmColLeft, fonts.hindGunturRg]}>TYPE</Text>
              <Text style={[order.confirmColRight, fonts.hindGunturRg]}>{type}</Text>
            </View>
            <Text style={order.confSpacing}></Text>
            <TouchableOpacity style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]} onPress={this.confirmOrder}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>CONFIRM</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          isVisible={this.state.isOrderPlaced}
          animationIn={'slideInRight'}
          animationOut={this.state.animateOut}
          style={order.confirmModal}>
          <OrderPlaced
            globalData={this.props.globalData}
            hideOrderPlaced={this.hideOrderPlaced}
            quantityPurchased={quantity}
            targetStockData={targetStockData}
          />
        </Modal>
      </View>
    )
  }
}

// export default OrderConf;
OrderConf.propTypes = {
  globalData: PropTypes.object.isRequired,
  targetStockData: PropTypes.object.isRequired,
  hideOrderConfirm: PropTypes.func.isRequired,
  cancelOrderConfirm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderConf);
