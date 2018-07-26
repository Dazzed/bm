import React from 'react';
import PropTypes from 'prop-types';
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
    static propTypes = {
        extraLineItem: PropTypes.string,
        password: PropTypes.string
    };

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
        const inlineTextStyle = {
            color: theme.darkSlate,
            fontSize: 16
        }
        if (validator(input)) {
            inlineTextStyle.color = theme.green
        }
        return (
            <View>
                <Text style={inlineTextStyle}>{textToDisplay}</Text>
            </View>
        );
    }

    renderExtraItems = () => {
        const { extraLineItem } = this.props;
        if (extraLineItem) {
            const { theme } = colorStore;
            const extraItemTextStyle = {
                color: theme.red,
                fontSize: 16
            }
            return (
                <View>
                    <Text style={extraItemTextStyle}>{extraLineItem}</Text>
                </View>
            );
        }
        return null;
    }

    render() {
        const { theme } = colorStore;
        const { password } = this.props;
        return <View style={{ width: '100%', width: 300, alignSelf: 'center', marginVertical: 20 }}>
            <Text style={{ marginVertical: 5, color: theme.darkSlate }}>Your password must have:</Text>
            {this.renderTest(password, '8 or more characters', this.charValidator)}
            {this.renderTest(password, 'Upper & lowercase letters', this.casLettersValidator)}
            {this.renderTest(password, 'At least one number', this.oneNumberValidator)}
            {this.renderExtraItems()}
        </View>
    }
}