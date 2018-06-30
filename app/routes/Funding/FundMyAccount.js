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
import { colorStore } from '../../mobxStores';
import { observer } from 'mobx-react';

@observer
export default class FundMyAccount extends React.Component {

    static navigationOptions = ({ navigation }) => {
        let title = 'Withdraw Funds';
        if(navigation.state.params.widthdrawDepositMode === 'deposit') {
            title = 'Fund My Account'
        }
        return {
            title: title,
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

            // calculate funds remainging error
            let displayError = false;

            if(this.props.navigation.state.params.widthdrawDepositMode === 'withdraw') {
                //
                let accountBalanceInt = parseInt(this.state.accountBalance);
                let currentEntryInt = parseInt(this.state.fundingString);
                if(currentEntryInt > accountBalanceInt) {
                    displayError = true;
                }
            }

            this.setState({
                fundingString: this.state.fundingString + newValue,
                errorRemainingFunds: displayError
            })


        }
    }

    deleteNumber() {
        this.setState({
            fundingString: this.state.fundingString.substring(0, this.state.fundingString.length - 1)
        })
    }

    clear() {
        this.setState({
            fundingString: ''
        })
    }

    renderAmountInAccount() {
        return <View>
            <Text>Ammoun</Text>
        </View>
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
        return <View style={{height: '100%'}}>
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