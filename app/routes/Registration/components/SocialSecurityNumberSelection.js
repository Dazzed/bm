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
import { isSsnValid } from '../validation';

export default class SocialSecurityNumberSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
        registrationPage: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        const {
            registrationPage: {
                ssnField
            }
        } = this.props;
        const isFormValid = isSsnValid(ssnField);
        this.state = {
            showWhyWeAsk: false,
            numFieldClass: styles_2.registrationFormFieldInActive,
            formValid: isFormValid,
            ssnField: ssnField || '',
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        }
    }

    formatSSN(numb) {
        var numbers = numb.replace(/\D/g, '');
        var char = { 3: '-', 5: '-' };
        numb = '';
        for (var i = 0; i < numbers.length; i++) {
            numb += (char[i] || '') + numbers[i];
        }
        return numb;
    }
    addNum(num) {
        var curNums;
        if (this.state.ssnField == null) {
            curNums = num;
        } else {
            curNums = this.state.ssnField + '' + num;
            if (curNums.length > 11) {
                curNums = this.state.ssnField;
            }
        }
        curNums = this.formatSSN(curNums)
        this.props.updateRegistrationParams({
            ssnField: curNums
        });
        this.setState({
            ssnField: curNums, numFieldClass: styles_2.registrationFormFieldActive
        });
        const isFormValid = isSsnValid(curNums);
        this.setState({
            formValid: isFormValid,
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        });
    }
    removeNum(num) {
        if (this.state.ssnField) {
            var delNums = this.state.ssnField;
            delNums = delNums.substr(0, delNums.length - 1);
            delNums = this.formatSSN(delNums);
            if (delNums === '') {
                this.setState({
                    numFieldClass: styles_2.registrationFormFieldInActive, formValid: false,
                    formValidClass: styles_2.formInvalid });
            }
            this.setState({ ssnField: delNums})
        }
        this.props.updateRegistrationParams({
            ssnField: delNums
        });
        this.setState({
            ssnField: delNums, numFieldClass: styles_2.registrationFormFieldActive
        });
        const isFormValid = isSsnValid(delNums);
        this.setState({
            formValid: isFormValid,
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        });
   
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAsk = () => {
        if (this.state.showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView]}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        All broker dealers are required by federal law (U.S. Patriot Act of 2001) to collect Social Security numbers to prevent money launderers and terrorists from accessing the stock market, as explained in detail here: <Text style={{color: "#18c3ff"}}>https://www.sec.gov/fast-answers/answersbd-persinfohtm.html</Text>
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
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '45%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        SOCIAL SECURITY NUMBER
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                            WHY WE ASK
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingTop: 40 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <TextInput placeholder="XXX-XX-XXXX" placeholderTextColor={this.props.colors['darkSlate']} value={this.state.ssnField}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={111} editable={false}
                           />
                        </View>
                        <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, borderBottomWidth: 0, borderBottomColor: this.props.colors['white'] }, styles_2.numContainer]}>
                            <View style={styles_2.digitContainer}>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(1); }}>1</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(2); }}>2</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(3); }}>3</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(4); }}>4</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(5); }}>5</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(6); }}>6</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(7); }}>7</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(8); }}>8</Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(9); }}>9</Text>
                                </View>
                                <View style={numbers.row}>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]}></Text>
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturRg]} onPress={() => { this.addNum(0); }}>0</Text>
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
                    <TouchableHighlight disabled={!this.state.formValid} onPress={this.props.onForwardStep} style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
