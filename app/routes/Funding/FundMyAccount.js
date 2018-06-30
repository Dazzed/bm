import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native';

import Button from './button';
import NumericalSelector from '../../sharedComponents/NumericalSelector';
import { numberWithCommas } from '../../utility';
import { colorStore, accountStore } from '../../mobxStores';
import { observer } from 'mobx-react';
import { generateHeaderStyles } from '../../utility';


@observer
export default class FundMyAccount extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let title = 'Withdraw Funds';
        if(navigation.state.params.widthdrawDepositMode === 'deposit') {
            title = 'Fund My Account'
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

    depositPressed() {
        this.props.navigation.navigate('Success');
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
        if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
            let textStyle = {
                fontSize: 30,
                textAlign: 'center',
                color: theme.darkSlate
            }
            return <View style={{height: '100%', justifyContent: 'center'}}>
                <Text style={textStyle}>${numberWithCommas(selectedAccount.amount)}</Text>
                <Text style={textStyle}>AVAILABLE</Text>
                <View style={{marginVertical: 10}}></View>
            </View>
        } else {
            return null;
        }

    }

    renderInputAmount() {
        const { theme } = colorStore;

        let amountHeight = 100;

        let textAmountStyle = {
            fontSize: 40,
            color: theme.black
        }

        let underlineStyle = {
            height: 1,
            width: '100%',
            backgroundColor: theme.black
        }

        if(this.state.errorRemainingFunds) {
            underlineStyle.backgroundColor = 'red';
            textAmountStyle.color = 'red';
        }

        return <View style={{width: '100%', alignSelf: 'center', backgroundColor: theme.realWhite}}>
            <View style={{width: '80%', alignSelf: 'center'}}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: amountHeight,
                    margin: 5,
                    flexDirection: 'row',
                }}>
                    <Text style={textAmountStyle}>$ {numberWithCommas(this.state.fundingString)}</Text>
                    <TouchableOpacity style={{flex: 0, justifyContent: 'center', height: '100%'}} onPress={() => this.clear()}>
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
        return <View style={{height: '100%', padding: 5}}>
            <View style={{flex: 1}}>
                {this.renderAmountInAccount()}
            </View>
            <View style={{flex: 0}}>
                {this.renderInputAmount()}
                <NumericalSelector onChange={(val) => this.numberChange(val)} onDelete={() => this.deleteNumber()}/>
                <Button {...this.props} title="Fund Account" onPress={() => this.depositPressed()}/>
            </View>
        </View>
    }
}