import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { setTheme, getTheme, colors } from '../../store/store';

import styles from '../../style/style';
import fonts from '../../style/fonts';

export default class Deposit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {

        console.log('button colors', colors().green)

        return <View style={{width: '100%', height: 100}}>
            <TouchableOpacity onPress={this.props.onPress} style={{width: '100%', height: '100%'}}>
                <View style={{width: '100%', height: '100%', backgroundColor: colors().green, justifyContent: 'center', borderRadius: 5}}>
                    <Text style={[styles.fullBtnTxt, fonts.hindGunturBd]}>{this.props.title || Button}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}