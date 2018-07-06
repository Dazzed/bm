import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { setTheme, getTheme, colors } from '../store/store';
import styles from '../style/style';
import fonts from '../style/fonts';
import { observer } from 'mobx-react';
import { colorStore } from '../mobxStores';

import {
    eightCharValidator,
    upperAndLowercasLettersValidator,
    atLeastOneNumberValidator
} from '../utility';

@observer
export default class PasswordChecklist extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: colors()
        };
    }

    charValidator(input) {
        return eightCharValidator(input)
    }

    casLettersValidator(input) {
        return upperAndLowercasLettersValidator(input)
    }

    oneNumberValidator(input) {
        return atLeastOneNumberValidator(input)
    }

    renderTest(input, textToDisplay, validator) {
        const { theme } = colorStore;

        let inlineTextStyle = {
            color: theme.darkSlate,
        }

        console.log('validator input', validator(input))

        if(!validator(input)) {
            inlineTextStyle.color = theme.red
        }

        return <View>
            <Text style={inlineTextStyle}>{textToDisplay}</Text>
        </View>
    }


    render() {
        let buttonHeight = 70;

        const { theme } = colorStore;

        let textContainer = {
            width: '100%',
            height: '100%',
            backgroundColor: theme.green,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            // borderWidth: 1,
            // borderColor: 'red'
        }

        let password = this.props.password;

        return <View style={{width: '100%', height: buttonHeight, width: 300, alignSelf: 'center', marginVertical: 20}}>
            <Text>Your password must have:</Text>
            {this.renderTest(password, '8 or more characters', this.charValidator)}
            {this.renderTest(password, 'Upper & Lowercase Letters', this.casLettersValidator)}
            {this.renderTest(password, 'At least one number', this.oneNumberValidator)}
        </View>
    }
}