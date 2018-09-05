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

  render() {
    return(
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.container]}>
        <View style={[{borderBottomColor: this.state.colors['lightGray']}, order.menuBorder]}>
          <Text style={[{ color: this.state.colors['darkSlate'], top: 15, fontSize: 16 }, fonts.hindGunturBd]}>Order Placed</Text>
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
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>10 shares of APPL</Text>
            <Text style={[{color: this.state.colors['darkSlate']},order.placeTxt, fonts.hindGunturBd]}>Cheers!</Text>
            <Text style={order.confSpacing}></Text>
            <View style={order.btnWrap}>
              <TouchableHighlight style={[{borderColor: this.state.colors['darkGray']}, order.optionbtn]} onPress={() => {this.props.hideOrderPlaced()}}>
                <Text style={[{color: this.state.colors['darkGray']}, styles.touchOption, fonts.hindGunturMd]}>DONE</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, order.shareContainer]}>
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

// export default OrderPlaced;
OrderPlaced.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderPlaced);
