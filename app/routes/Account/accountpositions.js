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
      <Text style={[{color: this.state.colors['darkSlate']}, account.securityTitle, fonts.hindGunturBd]}>EQUITY</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>QTY</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, fonts.hindGunturRg]}>PRICE/CHG</Text>
      <Text style={[{color: this.state.colors['lightGray']}, account.titleSm, account.titleLast, fonts.hindGunturRg]}>MKT VALUE</Text>
    </View>
  }

  renderList() {
    const { positionsJS } = myAccountStore;
    // alert(JSON.stringify(positionsJS));
    if(positionsJS.length === 0) {
      return <View style={{padding: 10, alignItems: 'center'}}>
        <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>No Positions Found</Text>
      </View>
    } else {
      console.log(positionsJS, 73)
      return <View style={account.sectionFull}>
        {positionsJS.map((elem, i) => {
          if(
            (elem.priceChangePercentage === null) || 
            (elem.companyAbbreviation === null) ||
            (elem.companyName === null) ||
            (elem.priceChangeColor === null) ||
            (elem.marketChangeColor === null) ||
            (elem.quantity === null) ||
            (elem.priceChange === null) ||
            (elem.priceChangeDecimal === null) ||
            (elem.marketChangeDecimal === null) ||
            (elem.marketChangePercentage === null)
          ) {
            console.log(
              elem.priceChangePercentage,
              elem.companyAbbreviation,
              elem.companyName,
              elem.priceChangeColor,
              elem.marketChangeColor,
              elem.quantity,
              elem.priceChange,
              elem.priceChangeDecimal,
              elem.marketChangeDecimal,
              elem.marketChangePercentage
            )
            console.log(88, "NULL")
            return null;
          }
          
          let formattedPriceChangePercentage = elem.priceChangePercentage;
          if(formattedPriceChangePercentage) {
            formattedPriceChangePercentage = formattedPriceChangePercentage.toFixed(2);
          }
          
          let formattedCompanyAbbreviation = elem.companyAbbreviation;
          // if(formattedCompanyAbbreviation) {
          //   formattedCompanyAbbreviation = formattedCompanyAbbreviation.toFixed(2);
          // }
          
          let formattedCompanyName = elem.companyName;
          // if(formattedCompanyName) {
          //   formattedCompanyName = formattedCompanyName.toFixed(2);
          // }
          
          let formattedPriceChangeColor = elem.priceChangeColor;
          
          let formattedMarketChangeColor = elem.marketChangeColor;
          
          let formattedQuantity = elem.quantity;
          if(formattedQuantity) {
            formattedQuantity = formattedQuantity.toFixed(0);
          }
          
          let formattedPriceChange = '$' + elem.priceChange.toFixed(2);
          // if(formattedPriceChange) {
          //   formattedPriceChange = formattedPriceChange.toFixed(2);
          // }
          
          let formattedPriceChangeDecimal = elem.priceChangeDecimal;
          if(formattedPriceChangeDecimal) {
            formattedPriceChangeDecimal = formattedPriceChangeDecimal.toFixed(2);
          }
          
          let formattedMarketChangeDecimal = elem.marketChangeDecimal;
          if(formattedMarketChangeDecimal) {
            formattedMarketChangeDecimal = formattedMarketChangeDecimal.toFixed(2);
          }
          
          let formattedMarketChangePercentage = elem.marketChangePercentage;
          if(formattedMarketChangePercentage) {
            formattedMarketChangePercentage = formattedMarketChangePercentage.toFixed(2);
          }
                    
          return <View key={'each-position' + i} style={[{backgroundColor: this.state.colors['white']}, {borderBottomColor: this.state.colors['borderGray']}, account.symbolRow]}>
            <View style={account.symbolWrap}>
              <Text style={[{color: this.state.colors['darkSlate']}, account.symbolLabel, fonts.hindGunturRg]}>{formattedCompanyAbbreviation}</Text>
              <Text style={[{color: this.state.colors['lightGray']},account.symbolDets, fonts.hindGunturRg]}>
                {formattedCompanyName.length > 23 ? `${formattedCompanyName.slice(0, 20)}...` : formattedCompanyName}
              </Text>
            </View>
            <Text style={[{color: this.state.colors['darkSlate']}, account.symbolQty, fonts.hindGunturRg]}>{formattedQuantity}</Text>
            <TouchableOpacity style={account.priceWrapTouch} onPress={() => this.setState({applChg: !this.state.applChg})}>
              <View style={account.priceWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.priceLabel, fonts.hindGunturRg]}>{formattedPriceChange}</Text>
                {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors[formattedPriceChangeColor]}, {borderColor: this.state.colors[formattedPriceChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedPriceChangeDecimal}</Text> : <Text style={[{backgroundColor: this.state.colors[formattedPriceChangeColor]}, {borderColor: this.state.colors[formattedPriceChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedPriceChangePercentage}%</Text>}
              </View>
              <View style={account.mktWrap}>
                <Text style={[{color: this.state.colors['darkSlate']}, account.mktLabel, fonts.hindGunturRg]}>${(elem.quantity * elem.priceChange).toFixed(2)}</Text>
                {this.state.applChg ? <Text style={[{backgroundColor: this.state.colors[formattedMarketChangeColor]}, {borderColor: this.state.colors[formattedMarketChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedMarketChangeDecimal}</Text> : <Text style={[{backgroundColor: this.state.colors[formattedMarketChangeColor]}, {borderColor: this.state.colors[formattedMarketChangeColor]}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedMarketChangePercentage}%</Text>}
              </View>
            </TouchableOpacity>
          </View>
        })}
      </View>
    }
  }

  renderTotal() {
    const { positionTotalsJS, positionsJS, positionsTotal } = myAccountStore;
    if(positionsJS.length === 0) {
      return null;
    } else {
      return <View style={[{backgroundColor: this.state.colors['white']}, {borderTopColor: this.state.colors['borderGray']}, account.bottomSticky]}>
       <View style={account.section}>
         <View style={account.sectionWrap}>
           <Text style={[{color: this.state.colors['darkSlate']}, account.stickyTitle, fonts.hindGunturBd]}>TOTAL</Text>
           <View style={account.stickyWrap}>
             <Text style={[{color: this.state.colors['darkSlate']}, account.stickyDetail, fonts.hindGunturBd]}>${positionsTotal.toFixed(2)}</Text>
              <TouchableOpacity style={account.priceWrapTouch} onPress={() => this.setState({ applChg: !this.state.applChg })}>
              {this.state.applChg ? <Text style={[{ backgroundColor: this.state.colors[positionTotalsJS.decimalChangeColor] }, { borderColor: this.state.colors[positionTotalsJS.decimalChangeColor] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{positionTotalsJS.decimalChange}</Text> : <Text style={[{ backgroundColor: this.state.colors[positionTotalsJS.decimalChangeColor] }, { borderColor: this.state.colors[positionTotalsJS.decimalChangeColor] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{positionTotalsJS.decimalChangePct.toFixed(2)}%</Text>}
              </TouchableOpacity>
             
           </View>
         </View>
       </View>
      </View>
    }
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
