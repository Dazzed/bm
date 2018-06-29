import React from 'react';
import { View, Text } from 'react-native';

import Button from './button';

export default class Deposit extends React.Component {
    depositPressed() {
        console.log('depo')
    }

    render() {
        return <View>
            <Text>Deposit</Text>
            <Button {...this.props} title="Title" onPress={() => this.depositPressed()}/>
        </View>
    }
}