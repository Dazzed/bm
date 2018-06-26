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
import down from '../../../images/down.png';
import { Label } from 'native-base';
import { isPresent, validateEmail, validatePassword, isEmailAlreadyInUse } from '../validation';

let showWhyWeAsk = false;
export default class AccountSelection extends Component {
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
                email,
                password
            }
        } = this.props;
        const isFormValid = isPresent(email) && isPresent(password);
        this.state = {
            showWhyWeAsk: false,
            emailClass: styles_2.registrationFormFieldInActive,
            passwordClass: styles_2.registrationFormFieldInActive,
            formValid: isFormValid,
            email: email || '',
            password: password || '',
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid,
            isAsyncValidatingEmail: false,
            validationErrorMessage: null
        }
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAsk = () => {
        if (this.state.showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView]}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        •	All of your data is 256-bit encrypted and stored securely.
                        {"\n"}{"\n"}
                        •	We do not sell your personal information, and your contact info will not be used for advertising; we will only contact you with important updates about your BluMartini trading account.
                    </Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 380, height: 159, marginRight: 5 }} />
                </View>
            );
        }
    }

    onFocus = (item) => {
        this.setState({ [item]: styles_2.registrationFormFieldActive })
    }

    onBlur = (item) => {
        this.setState({ [item]: styles_2.registrationFormFieldInActive })
    }

    onTextChange = (event, field) => {
        const { text } = event.nativeEvent;
        this.props.updateRegistrationParams({
            [field]: text
        });
        this.setState({
            [field]: text,
            validationErrorMessage: null
        });
        const isFormValid = isPresent(this.state.email) && isPresent(this.state.password);
        this.setState({
            formValid: isFormValid,
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        });
    }

    handleForwardStep = async () => {
        this.setState({
            isAsyncValidatingEmail: true
        });
        const isEmailFormatValid = validateEmail(this.state.email);
        const isPasswordFormatValid = validatePassword(this.state.password);
        let errorsPresent = false;
        console.log({ isEmailFormatValid, isPasswordFormatValid });
        if (!isEmailFormatValid) {
            errorsPresent = true;
            this.setState({
                validationErrorMessage: 'Invalid email format'
            });
        } else if (await isEmailAlreadyInUse(this.state.email)) {
            errorsPresent = true;
            this.setState({
                validationErrorMessage: 'That email is already in use'
            });
        } else if (!isPasswordFormatValid.valid) {
            errorsPresent = true;
            this.setState({
                validationErrorMessage: isPasswordFormatValid.message
            });
        }
        this.setState({
            isAsyncValidatingEmail: false
        });
        if (errorsPresent) {
            return;
        } else {
            this.props.onForwardStep();
        }
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '90%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        ACCOUNT DETAILS
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                            WHY WE ASK
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>EMAIL</Text>
                            <TextInput
                                onBlur={() => this.onBlur('emailClass')}
                                onFocus={() => this.onFocus('emailClass')}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.emailClass]}
                                keyboardType="email-address"
                                autoCapitalize='none'
                                onChange={(event) => this.onTextChange(event, 'email')}
                                value={this.state.email}
                            />
                            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>PASSWORD</Text>
                            <TextInput
                                onBlur={() => this.onBlur('passwordClass')}
                                onFocus={() => this.onFocus('passwordClass')}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.state.passwordClass]}
                                secureTextEntry={true}
                                onChange={(event) => this.onTextChange(event, 'password')}
                                value={this.state.password}
                            />
                        </View>
                        <View style={{ marginTop: 10, display: this.state.validationErrorMessage ? 'flex' : 'none' }}>
                            <Text style={{ color: 'red' }}>{this.state.validationErrorMessage}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight
                        disabled={!this.state.formValid}
                        onPress={this.handleForwardStep}
                        style={[styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}
                    >
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>
                            NEXT
                        </Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
