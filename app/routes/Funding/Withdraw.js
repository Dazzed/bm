import React from 'react';
import { View, Text } from 'react-native';

import Button from './button';

import AccountSelect from './AccountSelect';
import FundMyAccount from './FundMyAccount';


import {
    StackNavigator
} from 'react-navigation';

const StackNav = StackNavigator({
    AccountSelect: {
        screen: AccountSelect,
    },
    FundMyAccount: {
        screen: FundMyAccount
    }
}, {
    initialRouteName: 'AccountSelect',
    lazy: false,
    animationEnabled: false,
    mode: 'card',
    headerMode: 'none'
});

export default class Withdraw extends React.Component {

    render() {
        return <StackNav />
    }
};