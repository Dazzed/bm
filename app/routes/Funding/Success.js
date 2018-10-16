import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import Button from '../../sharedComponents/Button1';
import { setTheme, getTheme, colors } from '../../store/store';
import { colorStore, accountStore } from '../../mobxStores';
import { generateHeaderStyles, numberWithCommas } from '../../utility';import {
    selectGlobalData
  } from '../../selectors';
import styles from '../../style/style';
import fonts from '../../style/fonts';

class Success extends React.Component {

    // static navigationOptions = ({ navigation }) => {
    //     let title = 'Funds withdrawn';
    //     if(navigation.state.params.widthdrawDepositMode === 'deposit') {
    //         title = 'Account funded'
    //     }

    //     const { theme } = colorStore;
    //     let headerStyleToExtend = generateHeaderStyles(theme);

    //     return {
    //         title: title,
    //         ...headerStyleToExtend
    //     };
    // };
    static navigationOptions = {
        title: 'AccountBal',
        header: null,
        gesturesEnabled: false
    };

    constructor(props) {
        super(props);
        this.state = {
            selectedAccountIndex: 0,
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

    navToTradingView() {
        this.props.navigation.navigate('AppNavTabs')
    }

    renderMessage() {
      const { theme } = colorStore;
      const { selectedAccount } = accountStore;

        let amount = this.props.navigation.state.params.amount;

        // TODO: map this to results
        let bankName = selectedAccount.title;
        let accountType = selectedAccount.subtitle;

        let formattedAmount = numberWithCommas(amount);

        // Withdraw message
        let message = `You just withdrew $${formattedAmount} to your ${bankName} account.`

        if(this.props.navigation.state.params.widthdrawDepositMode === 'deposit') {
          message = `You just deposited $${formattedAmount}.`
        }

        return <View style={{marginVertical: 5, backgroundColor: theme.contentBg}}>
            <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>{message}</Text>
            <Text style={{textAlign: 'center', fontSize: 20, color: theme.darkSlate}}>Cheers!</Text>
        </View>
    }

    render() {
      const { theme } = colorStore
      let circleSize = 150;
      let title = 'Funds withdrawn';
      if(this.props.navigation.state.params.widthdrawDepositMode === 'deposit') {
          title = 'Account funded'
      }
        return <SafeAreaView style={{backgroundColor: theme.contentBg, alignItems: 'center', flex: 1, padding: 15}}>
          <View style={styles.menuBorder}>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.leftCta} onPress={() => this.props.navigation.goBack()}>
                <Image
                  source={require('../../images/back.png')}
                  style={styles.backImg}
                />
              </TouchableOpacity>
              <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>{title}</Text>
              <Text style={styles.rightCta}></Text>
            </View>
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{borderWidth: 3, borderColor: theme.green, height: circleSize, width: circleSize, borderRadius: circleSize * .5, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  style={{height: circleSize * .5, width: circleSize * .5, position: 'relative', left: '5%'}}
                  resizeMode="contain"
                  source={require('../../images/money_trans_160.png')}
              />
            </View>

            {this.renderMessage()}
          </View>
          <View style={{flex: 0, width: '100%'}}>
            <Button {...this.props} title="START TRADING" onPress={() => this.navToTradingView()}/>
          </View>
        </SafeAreaView>
    }
}

const mapStateToProps = state => ({
    globalData: selectGlobalData(state)
  });

export default connect(mapStateToProps)(Success);