import React from 'react';
import { View, Text, TextInput } from 'react-native';

import Button from './button';
import NumericalSelector from '../../sharedComponents/NumericalSelector';

export default class AccountSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fundingString: ''
        }
    }

    depositPressed() {
        console.log('depo')
    }

    numberChange(newValue) {
        this.setState({
            fundingString: this.state.fundingString + newValue
        })
    }

    deleteNumber() {
        this.setState({
            fundingString: this.state.fundingString.substring(0, this.state.fundingString.length - 1)
        })
    }


    render() {

        let amountStyle = {
            fontSize: 40
        }

        return <View>
            <Text>Fund Account</Text>
            <Text style={amountStyle}>${this.state.fundingString}</Text>
            <NumericalSelector onChange={(val) => this.numberChange(val)} onDelete={() => this.deleteNumber()}/>
            <Button {...this.props} title="Fund Account" onPress={() => this.depositPressed()}/>
        </View>
    }
}