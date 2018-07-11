import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import Button from '../../sharedComponents/Button1';
import NumericalSelector from '../../sharedComponents/NumericalSelector';
import { numberWithCommas } from '../../utility';
import { colorStore, accountStore } from '../../mobxStores';
import { observer } from 'mobx-react';
import { generateHeaderStyles } from '../../utility';


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
            accountBalance: '30000',
            errorRemainingFunds: false
        }
    }

    getDisabledList() {
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

    depositPressed() {
        this.props.navigation.navigate('Success', {
            widthdrawDepositMode: this.props.navigation.state.params.widthdrawDepositMode,
            amount: this.state.fundingString
        });
    }

    numberChange(newValue) {
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

    calculateError() {
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            let displayError = false;
            let accountBalanceInt = parseInt(this.state.accountBalance);
            let currentEntryInt = parseInt(this.state.fundingString);
            if(currentEntryInt > accountBalanceInt) {
                displayError = true;
            }
            this.setState({
                errorRemainingFunds: displayError
            })
        }
    }

    deleteNumber() {
        this.setState({
            fundingString: this.state.fundingString.substring(0, this.state.fundingString.length - 1),
        }, () => {
            this.calculateError()
        })
    }

    clear() {
        this.setState({
            fundingString: '',
            errorRemainingFunds: false
        }, () => {
            this.calculateError()
        })
    }

    renderAmountInAccount() {
        const { theme } = colorStore;
        const { selectedAccount } = accountStore;
        let textStyle = {
            fontSize: 25,
            textAlign: 'center',
            color: theme.darkSlate
        }
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            return <View style={{height: '100%', justifyContent: 'center', backgroundColor: theme.contentBg}}>
                <View style={{marginVertical: 10}}></View>
                <Text style={textStyle}>${numberWithCommas(selectedAccount.amount)}</Text>
                <Text style={textStyle}>AVAILABLE</Text>
                <View style={{marginVertical: 10}}></View>
            </View>
        } else {
            return <View style={{height: '100%', justifyContent: 'center', backgroundColor: theme.contentBg}}>
                <View style={{marginVertical: 10}}></View>
                <Text style={textStyle}>{selectedAccount.title}</Text>
                <Text style={textStyle}>{selectedAccount.subtitle}</Text>
                <View style={{marginVertical: 10}}></View>
            </View>;
        }

    }

    renderErrorOrNull() {
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

    renderInputAmount() {
        const { theme } = colorStore;

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
                            source={require('../../images/searchcancel.png')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={underlineStyle}></View>
            </View>
        </View>
    }

    render() {
      const { theme } = colorStore;
        let buttonTitle = 'FUND ACCOUNT';
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
          buttonTitle = 'MAKE WITHDRAW';
        }
        return <View style={{height: '100%', padding: 0}}>
            <View style={{flex: 1, backgroundColor: theme.contentBg}}>
                {this.renderAmountInAccount()}
            </View>
            <View style={{flex: 0}}>
                {this.renderInputAmount()}
                {this.renderErrorOrNull()}
                <NumericalSelector disabledList={this.getDisabledList()} onChange={(val) => this.numberChange(val)} onDelete={() => this.deleteNumber()}/>
                <View style={{padding: 30, backgroundColor: theme.white}}>
                  <Button {...this.props} title={buttonTitle} onPress={() => this.depositPressed()}/>
                </View>
            </View>
        </View>
    }
}
