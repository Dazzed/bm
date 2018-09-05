import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
class AccountBal extends React.Component {
  static navigationOptions = {
    title: 'AccountBal',
    header: null,
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
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
    const { balancesJS, balanceLoading } = myAccountStore;
    return (
      <View style={[{backgroundColor: this.state.colors['contentBg']}, account.tabContent]}>
        <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>INVESTMENTS</Text>
        <View style={[{backgroundColor: this.state.colors['white']}, account.section]}>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TOTAL</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>${balancesJS.investments.total}</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>SECURITIES</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>${balancesJS.investments.securities}</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>CASH</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>${balancesJS.investments.cash}</Text>
          </View>
        </View>
        <Text style={[{color: this.state.colors['darkSlate']}, account.sectionTitle, fonts.hindGunturBd]}>FUNDS AVAILABLE</Text>
        <View style={[{backgroundColor: this.state.colors['white']}, account.section]}>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TO TRADE</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>${balancesJS.fundsAvailable.toTrade}</Text>
          </View>
          <View style={account.sectionWrap}>
            <Text style={[{color: this.state.colors['lightGray']}, account.sectionLabel, fonts.hindGunturRg]}>TO WITHDRAW</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, account.sectionDetail, fonts.hindGunturRg]}>${balancesJS.fundsAvailable.toWithdraw}</Text>
          </View>
        </View>
      </View>
    );
  }
}

// export default AccountBal;
AccountBal.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(AccountBal);
