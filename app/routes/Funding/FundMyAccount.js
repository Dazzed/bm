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

export default class AccountSelect extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fundingString: ''
        }
    }

    depositPressed() {
        console.log('depo', this.props);
        this.props.navigation.navigate('Success');

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

    clear() {
        this.setState({
            fundingString: ''
        })
    }


    render() {

        let amountHeight = 100;

        let amountStyle = {
            fontSize: 40,
        }

        return <View>
            <Text>Fund Account</Text>
            <View style={{ justifyContent: 'space-between', alignItems: 'center', height: amountHeight, margin: 5, flexDirection: 'row'}}>
                <Text style={amountStyle}>$ {this.state.fundingString}</Text>
                <TouchableOpacity onPress={() => this.clear()}>
                    <Image
                        style={{height: 30}}
                        resizeMode="contain"
                        source={require('../../images/searchcancel.png')}
                    />
                </TouchableOpacity>
            </View>
            <NumericalSelector onChange={(val) => this.numberChange(val)} onDelete={() => this.deleteNumber()}/>
            <Button {...this.props} title="Fund Account" onPress={() => this.depositPressed()}/>
        </View>
    }
}