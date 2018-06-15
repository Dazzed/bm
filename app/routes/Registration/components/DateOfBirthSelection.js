import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    ScrollView,
    KeyboardAvoidingView,
    AppRegistry,
    StyleSheet,
    Animated,
    Text,
    TextInput,
    View,
    WebView,
    Image,
    Alert,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import numbers from '../../../style/numbers';

import down from '../../../images/down.png';
import { Label } from 'native-base';

const numberDisabled = [
    'zeroDisabled',
    'oneDisabled',
    'twoDisabled',
    'threeDisabled',
    'fourDisabled',
    'fiveDisabled',
    'sixDisabled',
    'sevenDisabled',
    'eightDisabled',
    'nineDisabled',
];

const numberClass = [
    'zeroClass',
    'oneClass',
    'twoClass',
    'threeClass',
    'fourClass',
    'fiveClass',
    'sixClass',
    'sevenClass',
    'eightClass',
    'nineClass',
];

const disabledList = {
    "0": {
       "0": [4,5,6,7,8,9] 
    },
    "1": {
        "0": [0],
        "1": [],
        "2": [],
        "3": [2, 3, 4, 5, 6, 7, 8, 9]
    },
    "2": {
        "0": [2, 3, 4, 5, 6, 7, 8, 9],
        "1": [2, 3, 4, 5, 6, 7, 8, 9],
        "2": [2, 3, 4, 5, 6, 7, 8, 9],
        "3": [2, 3, 4, 5, 6, 7, 8, 9],
        "4": [2, 3, 4, 5, 6, 7, 8, 9],
        "5": [2, 3, 4, 5, 6, 7, 8, 9],
        "6": [2, 3, 4, 5, 6, 7, 8, 9],
        "7": [2, 3, 4, 5, 6, 7, 8, 9],
        "8": [2, 3, 4, 5, 6, 7, 8, 9],
        "9": [2, 3, 4, 5, 6, 7, 8, 9]
    },
    "3": {
        "/": [2,3,4,5,6,7,8,9]
    },
    "4": {
        "0": [0],
        "1": [3,4,5,6,7,8,9]
    }
}
export default class DateOfBirthSelection extends Component {
    state = {
        showWhyWeAsk: false,
        numField: '',
        numFieldClass: styles_2.registrationFormFieldInActive,

        oneClass: styles_2.activeNumber,
        oneDisabled: false,

        twoClass: styles_2.activeNumber,
        twoDisabled: false,

        threeClass: styles_2.activeNumber,
        threeDisabled: false,

        fourClass: styles_2.inactiveNumber,
        fourDisabled: true,

        fiveClass: styles_2.inactiveNumber,
        fiveDisabled: true,

        sixClass: styles_2.inactiveNumber,
        sixDisabled: true,

        sevenClass: styles_2.inactiveNumber,
        sevenDisabled: true,

        eightClass: styles_2.inactiveNumber,
        eightDisabled: true,

        nineClass: styles_2.inactiveNumber,
        nineDisabled: true,

        zeroClass: styles_2.activeNumber,
        zeroDisabled: false      
    }

    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
    }

    formatDate(numb) {
        var numbers = numb.replace(/\D/g, '');
        var char = { 2: '/', 4: '/' };
        numb = '';
        for (var i = 0; i < numbers.length; i++) {
            numb += (char[i] || '') + numbers[i];
        }
        return numb;
    }
    async addNum(num) {
        if (!this.state[numberDisabled[num]]) {
            var curNums;
            if (this.state.numField == null) {
                curNums = num;
            } else {
                curNums = this.state.numField + '' + num;
                if (curNums.length > 10) {
                    curNums = this.state.numField;
                }
            }
            curNums = this.formatDate(curNums)
            await this.setState({ numField: curNums, numFieldClass: styles_2.registrationFormFieldActive });
            this.setNumbersState()
        }
    }
    async removeNum() {
        if (this.state.numField) {
            var delNums = this.state.numField;
            delNums = delNums.substr(0, delNums.length - 1);
            delNums = this.formatDate(delNums);
            if (delNums === '') {
                await this.setState({ numFieldClass: styles_2.registrationFormFieldInActive });
            }
            await this.setState({ numField: delNums })
        }
        this.setNumbersState()
    }

    setNumbersState = () => {
        if (this.state.numField === null || this.state.numField === '') {
            this.setState({
                oneClass: styles_2.activeNumber,
                oneDisabled: false,

                twoClass: styles_2.activeNumber,
                twoDisabled: false,

                threeClass: styles_2.activeNumber,
                threeDisabled: false,

                fourClass: styles_2.inactiveNumber,
                fourDisabled: true,

                fiveClass: styles_2.inactiveNumber,
                fiveDisabled: true,

                sixClass: styles_2.inactiveNumber,
                sixDisabled: true,

                sevenClass: styles_2.inactiveNumber,
                sevenDisabled: true,

                eightClass: styles_2.inactiveNumber,
                eightDisabled: true,

                nineClass: styles_2.inactiveNumber,
                nineDisabled: true,

                zeroClass: styles_2.activeNumber,
                zeroDisabled: false      
            })
        } else {
            this.updateState(this.state.numField.length, this.state.numField[this.state.numField.length -1])
        }
    }

    updateState = (len, numb) => {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (item) => {
            await this.setState({
                [numberDisabled[item]]: false,
                [numberClass[item]]: styles_2.activeNumber
            });
        });

        if (len < 5) {
            disabledList[len][numb].map(async (item) => {
                await this.setState({
                    [numberDisabled[item]]: true,
                    [numberClass[item]]: styles_2.inactiveNumber
                });
            });
        }
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAsk = () => {
        if (this.state.showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        Uncle Sam requires all brokerages to collect this info for identification verification
                                </Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 380, height: 159, marginRight: 5 }} />
                </View>
            );
        } else {
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '36%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        DATE OF BIRTH
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                            WHY WE ASK
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingTop: 40 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <TextInput placeholder="dd/mm/yyyy" placeholderTextColor={this.props.colors['realWhite']} value={this.state.numField}
                                style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={10} editable={false}
                            />
                        </View>
                        <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, borderBottomWidth: 0, borderBottomColor: this.props.colors['white'] }, styles_2.numContainer]}>
                            <View style={styles_2.digitContainer}>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.oneClass]} onPress={() => { this.addNum(1); }}>1</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.twoClass]} onPress={() => { this.addNum(2); }}>2</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.threeClass]} onPress={() => { this.addNum(3); }}>3</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.fourClass]} onPress={() => { this.addNum(4); }}>4</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.fiveClass]} onPress={() => { this.addNum(5); }}>5</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.sixClass]} onPress={() => { this.addNum(6); }}>6</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.sevenClass]} onPress={() => { this.addNum(7); }}>7</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.eightClass]} onPress={() => { this.addNum(8); }}>8</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.nineClass]} onPress={() => { this.addNum(9); }}>9</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]}></Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg, this.state.zeroClass]} onPress={() => { this.addNum(0); }}>0</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers_right, fonts.hindGunturRg]} onPress={() => { this.removeNum(); }}>
                                        <Text> </Text>
                                        <Image
                                            source={this.props.colors['deleteImg']}
                                            style={{ width: 40, height: 26 }}
                                        />
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 80 }]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
