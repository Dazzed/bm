import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import Button from '../../sharedComponents/Button1';
import NumericalSelector from '../../sharedComponents/NumericalSelector';
import { numberWithCommas } from '../../utility';
import { colorStore, accountStore, depositWithdrawStore, myAccountStore, authStore } from '../../mobxStores';
import { observer } from 'mobx-react';
import { generateHeaderStyles } from '../../utility';
const SearchCancelLight = require('../../images/searchcancel.png');
const SearchCancelDark = require('../../images/searchcancel_dark.png');
import trending from '../../style/trending';
import fonts from '../../style/fonts';

@observer
export default class FundMyAccount extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let title = 'Withdraw funds';
        if(navigation.state.params.widthdrawDepositMode === 'deposit') {
            title = 'Fund my account'
        }
        const { theme } = colorStore;
        let headerStyleToExtend = generateHeaderStyles(theme);

        return {
            title: title,
            ...headerStyleToExtend
        };
    };

    constructor(props) {
        super(props)
        this.state = {
            fundingString: '',
            errorRemainingFunds: false,
            dropdownOpen: false
        }
    }

    getDisabledList = () => {
      let list = [];
      let containsDecimal = this.state.fundingString.indexOf('.') !== -1;
      if(containsDecimal) {
        list.push('.')
        let afterDecimalLength = this.state.fundingString.split('.')[1].length
        if(afterDecimalLength >= 2) {
             list = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, '.']
        }
      }
      return list;
    }

    submitPressed = () => {
        const { makeTransaction } = depositWithdrawStore;
        const { selectedAccount } = accountStore;
        const { setUserData } = authStore;

        if(this.state.fundingString == '') {
            return;
        }

        let params = {
            type: 'withdraw',
            amount: this.state.fundingString,
            account: selectedAccount
        }
        if(this.props.navigation.state.params.widthdrawDepositMode == 'deposit') {
            params.type = 'deposit'
        }
        makeTransaction(params)
        .then((res) => {
            // save user data back to user store
            setUserData(res.json.result);
            // navigate here...
            this.props.navigation.navigate('Success', {
                widthdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode,
                amount: this.state.fundingString
            });
        })
        .catch((err) => {
            console.log('err', err);
        })
    }

    numberChange = newValue => {
        if(this.state.fundingString.length >= 8) {
            return
        } else {

            this.setState({
                fundingString: this.state.fundingString + newValue,
            }, () => {
                this.calculateError()
            })
        }
    }

    calculateError = () => {
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            let displayError = false;
            const { selectedAccount } = accountStore;
            let entryValue = parseFloat(this.state.fundingString);
            let existingAmount = parseFloat(selectedAccount.amount);
            if(entryValue > existingAmount) {
                displayError = true;
            }
            this.setState({
                errorRemainingFunds: displayError
            })
        }
    }

    deleteNumber = () => {
        this.setState({
            fundingString: this.state.fundingString.substring(0, this.state.fundingString.length - 1),
        }, () => {
            this.calculateError()
        })
    }

    clear = () => {
        this.setState({
            fundingString: '',
            errorRemainingFunds: false
        }, () => {
            this.calculateError()
        })
    }

    renderAmountInAccount = () => {
        const { theme } = colorStore;
        const { selectedAccount } = accountStore;
        let textStyle = {
            fontSize: 25,
            textAlign: 'center',
            color: theme.darkSlate
        }
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            const { userDataToJs } = authStore;
            const brokerageAccountBalance = userDataToJs.brokerageAccount || 0;
            return <View style={{height: '100%', justifyContent: 'center', backgroundColor: theme.contentBg}}>
                <View style={{marginVertical: 10}}></View>
                <Text style={textStyle}>${numberWithCommas(brokerageAccountBalance)}</Text>
                <Text style={textStyle}>AVAILABLE</Text>
                <View style={{marginVertical: 0}}></View>
                {this.renderAccountDropdown()}
                {this.renderDroppedDownView()}
            </View>
        } else {
            // deposit view
            let subtitleStyle = {
              color: theme.lightGray,
              textAlign: 'center'
            }
            return <View style={{height: '100%', justifyContent: 'center', backgroundColor: theme.contentBg}}>
                <View style={{marginVertical: 5}}></View>
                <Text style={[trending.symbolsTxtDetail, fonts.hindGunturRg, textStyle]}>{selectedAccount.title}</Text>
                <Text style={[trending.symbolsTxtDetail, fonts.hindGunturRg, subtitleStyle]}>{selectedAccount.subtitle}</Text>
                <View style={{marginVertical: 5}}></View>
                {this.renderAccountDropdown()}
                {this.renderDroppedDownView()}
            </View>;
        }

    }

    renderDroppedDownView = () => {
      return null;
      if(this.state.dropdownOpen) {
        return <View>
          <Text>Dropdown open</Text>
        </View>
      } else {
        return null;
      }
    }
    
    toggleDropdown = () => {
      this.setState({
        dropdownOpen: !this.state.dropdownOpen
      })
    }

    renderAccountDropdown = () => {
        const { theme } = colorStore;
        const { selectedAccount } = accountStore;
        let height = 25;
        let style = {
            borderWidth: 1,
            borderColor: theme.inactiveDarkSlate,
            backgroundColor: theme.contentBg,
            height: height,
            flex: 0,
            borderRadius: height / 2,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            marginHorizontal: 30
        };
        let textStyle = {
            color: theme.inactiveDarkSlate,
            flex: 0
        };

        let string = ''
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            string = 'TO'
        }
        if(this.props.navigation.state.params.widthdrawDepositMode === 'deposit') {
          return null;
        }
        
        return <TouchableOpacity disabled={true} onPress={() => this.toggleDropdown()} style={style}>
          <View style={{flex: 0, height: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={textStyle}>
                {string + ''} {selectedAccount.subtitle}
            </Text>
          </View>
        </TouchableOpacity>
    }

    // <Image style={{opacity: .5}} source={this.state.dropdownOpen ? up : down} style={{ width: 11, height: 7, marginLeft: 5, marginBottom: 1 }} />


    renderErrorOrNull = () => {
      const { theme } = colorStore;
      let text = null;;
      if(this.state.errorRemainingFunds) {
        text = 'Withdraw amount exceeds funds available'
      }
      let height = 25;
      if(text) {
        return <View style={{width: '100%', alignSelf: 'center', justifyContent: 'center', height: height, flexDirection: 'row', alignItems: 'center', backgroundColor: theme.white}}>
            <View style={{flex: 0, height: '100%', alignSelf: 'center', flexDirection: 'row'}}>
              <Text style={{color: 'red', fontWeight: 'bold'}}>{'Error: '}</Text>
              <Text style={{color: 'red'}}>{text}</Text>
            </View>
        </View>
      } else {
        return <View style={{height: height, alignItems: 'center', backgroundColor: theme.white}}>
          <Text style={{color: 'red'}}>{''}</Text>
        </View>
      }

    }

    renderInputAmount = () => {
        const { theme, themeType } = colorStore;

        let amountHeight = 60;

        let textAmountStyle = {
            fontSize: 40,
            color: theme.darkSlate,
            // borderColor: 'green',
            // borderWidth: 1
        }

        let underlineStyle = {
            height: 1,
            width: '100%',
            backgroundColor: theme.darkSlate
        }

        if(this.state.errorRemainingFunds) {
            underlineStyle.backgroundColor = 'red';
            textAmountStyle.color = 'red';
        }

        let searchCancelSource = SearchCancelLight;
        if(themeType === 'dark') {
          searchCancelSource = SearchCancelDark;
        }

        return <View style={{width: '100%', alignSelf: 'center', backgroundColor: theme.white}}>
            <View style={{width: '80%', alignSelf: 'center'}}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: amountHeight,
                    marginHorizontal: 5,
                    flexDirection: 'row',
                    // borderWidth: 1,
                    // borderColor: 'red',
                    marginTop: 10
                }}>
                    <Text style={textAmountStyle}>$ {numberWithCommas(this.state.fundingString)}</Text>
                    <TouchableOpacity style={{flex: 0, justifyContent: 'center', height: '100%', opacity: .5}} onPress={() => this.clear()}>
                        <Image
                            style={{height: 30}}
                            resizeMode="contain"
                            source={searchCancelSource}
                        />
                    </TouchableOpacity>
                </View>
                <View style={underlineStyle}></View>
            </View>
        </View>
    }

    renderButton = () => {
        const { transactionLoading } = depositWithdrawStore;
        console.log('===== rendring button');
        let buttonTitle = 'FUND ACCOUNT';

        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            buttonTitle = 'MAKE WITHDRAW';
        }

        let disabled = false;

        if(transactionLoading) {
            disabled = true;
            buttonTitle = 'LOADING...'
        }
        if(this.state.fundingString == '') {
          disabled = true;
        }

        return <Button disabled={disabled} {...this.props} title={buttonTitle} onPress={this.submitPressed}/>
    }

    render() {
      const { theme } = colorStore;
        return <View style={{height: '100%', padding: 0}}>
            <View style={{flex: 1, backgroundColor: theme.contentBg}}>
                {this.renderAmountInAccount()}
            </View>
            <View style={{flex: 0}}>
                {this.renderInputAmount()}
                {this.renderErrorOrNull()}
                <NumericalSelector disabledList={this.getDisabledList()} onChange={(val) => this.numberChange(val)} onDelete={this.deleteNumber}/>
                <View style={{paddingVertical: 15, paddingHorizontal: 30, backgroundColor: theme.white}}>
                    {this.renderButton()}
                </View>
            </View>
        </View>
    }
}
