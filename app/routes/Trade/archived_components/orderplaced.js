import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
  Dimensions,
  Linking
} from 'react-native';
import {
  shareOnTwitter
} from 'react-native-social-share';

import { selectGlobalData } from '../selectors';
import OrderTypes from './ordertypes';

import styles from '../style/style';
import order from '../style/order';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

class OrderPlaced extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isScanVisible: false,
      colors: colors(props.globalData.isDarkThemeActive)
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

  tweet = () => {
    const {
      targetStockData,
      quantityPurchased
    } = this.props;
    shareOnTwitter({
        'text': `I just bought ${quantityPurchased} ${quantityPurchased < 2 ? 'share' : 'shares'} of ${targetStockData.ticker} on BluMartini - http://blumartini.com/download`,
        'link': 'http://blumartini.com/download',
      },
      (results) => {
        console.info(results);
      }
    );
  }

  render() {
    const {
      targetStockData,
      quantityPurchased
    } = this.props;
    return(
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.container]}>
        <View style={[{borderBottomColor: this.state.colors['lightGray']}, order.menuBorder]}>
          <Text style={[{ color: this.state.colors['darkSlate'], top: 15, fontSize: 16 }, fonts.hindGunturBd]}>Order placed</Text>
        </View>
        <View style={[{ backgroundColor: this.state.colors['contentBg'] }, order.tabContent]}>
          <View style={order.placeDetails}>
            <View style={styles.landingIcon}>
              <Image
                source={this.state.colors['logoImage']}
                style={styles.appIcon}
              />
            </View>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>You just bought</Text>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>{quantityPurchased} {quantityPurchased < 2 ? 'share' : 'shares'} of {targetStockData.ticker}</Text>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>Cheers!</Text>
            <Text style={order.confSpacing}></Text>
            <View style={order.btnWrap}>
              <TouchableHighlight style={[{borderColor: this.state.colors['darkGray']}, order.optionbtn]} onPress={this.props.hideOrderPlaced}>
                <Text style={[{color: this.state.colors['darkGray']}, styles.touchOption, fonts.hindGunturMd]}>DONE</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, order.shareContainer]}>
            <TouchableHighlight style={styles.fullBtnStocktwits} onPress={() => Linking.openURL(`https://stocktwits.com/symbol/${targetStockData.ticker}`)}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.fullBtnTxt, fonts.hindGunturSb]}>SHARE ON STOCKTWITS</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.fullBtnTwitter} onPress={this.tweet}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.fullBtnTxt, fonts.hindGunturSb]}>SHARE ON TWITTER</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    )
  }
}

OrderPlaced.propTypes = {
  globalData: PropTypes.object.isRequired,
  quantityPurchased: PropTypes.number.isRequired,
  targetStockData: PropTypes.object.isRequired,
  hideOrderPlaced: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderPlaced);
