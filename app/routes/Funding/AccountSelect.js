import React from 'react';
import { View, Text } from 'react-native';

import Button from './button';
import NumericalSelector from '../../sharedComponents/NumericalSelector';


export default class AccountSelect extends React.Component {


    constructor(props) {
        super(props);

    }



    navToFundAccount() {
        console.log('depo', this)
        this.props.navigation.navigate('FundMyAccount')
    }

    render() {
        return <View>
            <Text>Account select</Text>
            <Button {...this.props} title="Next" onPress={() => this.navToFundAccount()}/>
        </View>
    }
}