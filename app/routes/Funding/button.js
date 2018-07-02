import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { setTheme, getTheme, colors } from '../../store/store';

import styles from '../../style/style';
import fonts from '../../style/fonts';

export default class Deposit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: colors()
        };
    }


    render() {

        let buttonHeight = 70;

        console.log('button colors', colors().green)


        let textContainer = {
            width: '100%',
            height: '100%',
            backgroundColor: this.state.colors.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            // borderWidth: 1,
            // borderColor: 'red'
        }

        let buttonTextStyle = [styles.fullBtnTxt, fonts.hindGunturBd, {color: this.state.colors.white, marginTop: 7}];

        return <View style={{width: '100%', height: buttonHeight}}>
            <TouchableOpacity onPress={this.props.onPress} style={{width: '100%', height: '100%'}}>
                <View style={textContainer}>
                    <Text style={buttonTextStyle}>{this.props.title || Button}</Text>
                </View>
            </TouchableOpacity>
        </View>
    }
}