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
            fontSize: 16
        }
        if(validator(input)) {
            inlineTextStyle.color = theme.green
        }
        return <View>
            <Text style={inlineTextStyle}>{textToDisplay}</Text>
        </View>
    }


    render() {
        const { theme } = colorStore;

        let password = this.props.password;

        return <View style={{width: '100%', width: 300, alignSelf: 'center', marginVertical: 20}}>
            <Text style={{marginVertical: 5, color: theme.darkSlate}}>Your password must have:</Text>
            {this.renderTest(password, '8 or more characters', this.charValidator)}
            {this.renderTest(password, 'Upper & Lowercase Letters', this.casLettersValidator)}
            {this.renderTest(password, 'At least one number', this.oneNumberValidator)}
        </View>
    }
}