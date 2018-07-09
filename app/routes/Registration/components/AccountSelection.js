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

import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';

import PasswordChecklist from '../../../sharedComponents/PasswordChecklist';
import RegistrationHeader from './registrationHeader';

import {
    eightCharValidator,
    upperAndLowercasLettersValidator,
    atLeastOneNumberValidator
} from '../../../utility';

let showWhyWeAsk = false;

@observer
export default class AccountSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
        // registrationPage: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        // const {
        //     registrationPage: {
        //         email,
        //         password
        //     }
        // } = this.props;
        // const isFormValid = isPresent(email) && isPresent(password);
        this.state = {
            showWhyWeAsk: false,
            // emailClass: styles_2.registrationFormFieldInActive,
            // passwordClass: styles_2.registrationFormFieldInActive,
            // formValid: isFormValid,
            // email: email || '',
            // password: password || '',
            // formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid,
            // isAsyncValidatingEmail: false,
            // validationErrorMessage: null
        }
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAskContent = () => {
          return (
              <View style={[styles_2.whyWeAskView]}>
                  <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                      •	All of your data is 256-bit encrypted and stored securely.
                      {"\n"}{"\n"}
                      •	We do not sell your personal information, and your contact info will not be used for advertising; we will only contact you with important updates about your BluMartini trading account.
                  </Text>
              </View>
          );
    }

    getPasswordClass() {
        return styles_2.registrationFormFieldInActive
    }
    getEmailClass() {
        return styles_2.registrationFormFieldInActive
    }

    isFormValid() {
        const { registrationDataJS } = registrationStore;
        const { email, password } = registrationDataJS;
        if(email.length === 0) {
            return false;
        }
        if( eightCharValidator(password) && upperAndLowercasLettersValidator(password) && atLeastOneNumberValidator(password) ) {
            return true;
        }
        return false;
    }

    getValidFormClass() {
        return this.isFormValid() === true ? styles_2.formValid : styles_2.formInvalid;
    }

    validationErrorMessage() {
        const { registrationErrorDataJS } = registrationStore;
        console.warn('registrationDataJS', registrationErrorDataJS)
        return 'dfsdf'
        // return registrationErrorMessage
    }
    
    renderEmailErrorMessage() {
      const { registrationErrorDataJS } = registrationStore;
      console.log('=============== regis', registrationErrorDataJS)
      if(registrationErrorDataJS && 'details' in registrationErrorDataJS && 'email' in registrationErrorDataJS.details.messages && registrationErrorDataJS.details.messages.email.length > 0 ) {
        return <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}><Text style={fonts.hindGunturBd}>Error: </Text>{registrationErrorDataJS.details.messages.email[0]}</Text>
        </View>  
      } else {
        return null;
      }
    }
    
    renderPasswordErrorMessage() {
      const { registrationErrorDataJS } = registrationStore;
      if(registrationErrorDataJS && 'details' in registrationErrorDataJS && 'password' in registrationErrorDataJS.details.messages && registrationErrorDataJS.details.messages.password.length > 0 ) {
        return <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}><Text style={fonts.hindGunturBd}>Error: </Text>{registrationErrorDataJS.details.messages.password[0]}</Text>
        </View>  
      } else {
        return null;
      }  
    }
    
    renderGeneralErrorMessage() {
      const { registrationErrorDataJS } = registrationStore;
      if(registrationErrorDataJS && 'message' in registrationErrorDataJS ) {
        return <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'red' }}><Text style={fonts.hindGunturBd}>Error: </Text>{registrationErrorDataJS.message}</Text>
        </View>  
      } else {
        return null;
      }  
    }

    validationErrorMessageExists() {
        if(this.validationErrorMessage() === null) {
            return false
        } else {
            return true;
        }
    }

    onFocus = (item) => {
        this.setState({ [item]: styles_2.registrationFormFieldActive })
    }

    onBlur = (item) => {
        this.setState({ [item]: styles_2.registrationFormFieldInActive })
    }

    onEmailChange(event) {
        const { text } = event.nativeEvent;
        this.props.updateRegistrationParams({
            email: text
        });
    }
    onPasswordChange(event) {
        const { text } = event.nativeEvent;
        this.props.updateRegistrationParams({
            password: text
        });
    }

    handleForwardStep = async () => {

        const { registrationDataJS } = registrationStore;

        console.log('HANDLE FORWARD STEP ASYNC', );

        registrationStore.submitRegistration()
            .then((res) => {
                console.log('submit res', res)
                this.props.onForwardStep();
            })
            .catch((err) => {
                console.log('subimt err', err)
            })


        // this.setState({
        //     isAsyncValidatingEmail: true
        // });
        // const isEmailFormatValid = validateEmail(this.state.email);
        // const isPasswordFormatValid = validatePassword(this.state.password);
        // let errorsPresent = false;
        // if (!isEmailFormatValid) {
        //     errorsPresent = true;
        //     this.setState({
        //         validationErrorMessage: 'Invalid email format'
        //     });
        // } else if (await isEmailAlreadyInUse(this.state.email)) {
        //     errorsPresent = true;
        //     this.setState({
        //         validationErrorMessage: 'That email is already in use'
        //     });
        // } else if (!isPasswordFormatValid.valid) {
        //     errorsPresent = true;
        //     this.setState({
        //         validationErrorMessage: isPasswordFormatValid.message
        //     });
        // }
        // this.setState({
        //     isAsyncValidatingEmail: false
        // });
        // if (errorsPresent) {
        //     return;
        // } else {

        // }
    }


    render() {
        const { registrationDataJS } = registrationStore;
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: this.props.progress, borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    
                    <RegistrationHeader headerText={'ACCOUNT DETAILS'} generalText={null} whyWeAskText={null} extraContent={this.whyWeAskContent()} />

                    <View style={[{ backgroundColor: this.props.colors['white'] }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>EMAIL</Text>
                            <TextInput
                                onBlur={() => this.onBlur('emailClass')}
                                onFocus={() => this.onFocus('emailClass')}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.getEmailClass()]}
                                keyboardType="email-address"
                                autoCapitalize='none'
                                placeholder={'Email'}
                                onChange={(event) => this.onEmailChange(event, 'email')}
                                value={registrationDataJS.email}
                            />
                            
                            {this.renderEmailErrorMessage()}
                            
                            <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>PASSWORD</Text>
                            <TextInput
                                onBlur={() => this.onBlur('passwordClass')}
                                onFocus={() => this.onFocus('passwordClass')}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, this.getPasswordClass()]}
                                secureTextEntry={true}
                                placeholder={'Password'}
                                onChange={(event) => this.onPasswordChange(event, 'password')}
                                value={registrationDataJS.password}
                            />
                            
                            {this.renderPasswordErrorMessage()}
                        
                        </View>
                    </View>
                    <PasswordChecklist password={registrationDataJS.password}/>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight
                        disabled={!this.isFormValid()}
                        onPress={this.handleForwardStep}
                        style={[styles_2.fullBtn, { height: 80 }, this.getValidFormClass()]}
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
