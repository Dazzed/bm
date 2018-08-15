import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  ActivityIndicator
} from 'react-native';
import {
  setTheme,
  getTheme,
  colors
} from '../../store/store';
import { connect } from 'react-redux';
import styles from '../../style/style';
import account from '../../style/account';
import fonts from '../../style/fonts';
import { selectGlobalData } from '../../selectors';
import { observer } from 'mobx-react';
import { myAccountStore } from '../../mobxStores';

@observer
class AccountPos extends React.Component {
  static navigationOptions = {
    title: 'AccountPos',
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      applChg: false,
      tslaChg: false,
      colors: colors(props.globalData.isDarkThemeActive)
    }
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

  renderHeader() {
    return <View style={account.titleWrap}>
      <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>EQUITY</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>QTY</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>PRICE/CHG</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, account.titleLast, fonts.hindGunturRg]}>MKT VALUATION</Text>
    </View>
  }

  renderList() {
    const { positionsJS } = myAccountStore;
    if(positionsJS.length === 0) {
      return <View>
        <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>No Positions Found</Text>
      </View>
    } else {
      return <View style={account.sectionFull}>
        {positionsJS.map((elem, i) => {
          return <View key={'each-position' + i} style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, account.symbolRow]}>
            <View style={account.symbolWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>{elem.companyAbbreviation}</Text>
              <Text style={[{color: this.state.colors['lightGray']},account.symbolDets, fonts.hindGunturRg]}>{elem.companyName}</Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>{elem.quantity}</Text>
            <TouchableOpacity style={account.priceWrapTouch} onPress={() => this.setState({applChg: !this.state.applChg})}>
              <View style={account.priceWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>${elem.priceChange}</Text>
                {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors[elem.priceChangeColor]}, {borderColor: this.state.colors[elem.priceChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{elem.priceChangeDecimal}</Text> : <Text style={[{backgroundColor: this.state.colors[elem.priceChangeColor]}, {borderColor: this.state.colors[elem.priceChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{elem.priceChangePercentage}%</Text>}
              </View>
              <View style={account.mktWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>$1,535.30???</Text>
                {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors[elem.marketChangeColor]}, {borderColor: this.state.colors[elem.marketChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{elem.marketChangeDecimal}</Text> : <Text style={[{backgroundColor: this.state.colors[elem.marketChangeColor]}, {borderColor: this.state.colors[elem.marketChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{elem.marketChangePercentage}%</Text>}
              </View>
            </TouchableOpacity>
          </View>
        })}
      </View>
    }
  }

  renderTotal() {
    const { positionTotalsJS } = myAccountStore;
    return <View style={[{backgroundColor: this.state.colors['white']}, {borderTopColor: this.state.colors['borderGray']}, account.bottomSticky]}>
     <View style={account.section}>
       <View style={account.sectionWrap}>
         <Text style={[{color: this.state.colors['darkSlate']}, account.stickyTitle, fonts.hindGunturBd]}>TOTAL</Text>
         <View style={account.stickyWrap}>
           <Text style={[{color: this.state.colors['darkSlate']}, account.stickyDetail, fonts.hindGunturBd]}>${positionTotalsJS.total}</Text>
           <Text style={[{backgroundColor: this.state.colors[positionTotalsJS.decimalChangeColor]}, {borderColor: this.state.colors[positionTotalsJS.decimalChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{positionTotalsJS.decimalChange}</Text>
         </View>
       </View>
     </View>
    </View>
  }
  

  render() {
    return <View style={[{backgroundColor: this.state.colors['contentBg']}, account.tabContent]}>
      {this.renderHeader()}
      {this.renderList()}
      {this.renderTotal()}
    </View>
  }
}

// export default AccountPos;
AccountPos.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(AccountPos);
