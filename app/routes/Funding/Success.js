import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';

import Button from './button';
import { setTheme, getTheme, colors } from '../../store/store';


export default class AccountSelect extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            colors: colors(),
            selectedAccountIndex: 0
        }
    }

    componentDidMount() {
        console.log('this', this)
    }

    navToTradingView() {
        // this.props.navigation.navigate('FundMyAccount')
    }

    renderMessage() {
        let amount = 300
        let message = `You just deposited $${amount}`

        let bankName = 'BANK MOCK'
        let accountType = 'checking'

        if(true) {
            message = `You just withdrew $${amount} from your ${bankName} ${accountType} account.`
        }

        return <View style={{marginVertical: 5}}>
            <Text style={{textAlign: 'center', fontSize: 20}}>{message}</Text>
            <Text style={{textAlign: 'center', fontSize: 20}}>Cheers!</Text>
        </View>
    }

    render() {
        return <View style={{backgroundColor: this.state.colors.white, alignItems: 'center'}}>
            <View style={{marginVertical: 5}}></View>

            <Image
                style={{height: 100, width: 100}}
                resizeMode="contain"
                source={require('../../images/success_image.png')}
            />

            <View style={{marginVertical: 5}}></View>
            {this.renderMessage()}
            <Button {...this.props} title="START TRADING" onPress={() => this.navToTradingView()}/>
        </View>
    }
}