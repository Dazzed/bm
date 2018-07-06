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
import { isPhoneValid } from '../validation';
import NumericalSelector from '../../../sharedComponents/NumericalSelector';
import down from '../../../images/down.png';
import { Label } from 'native-base';
import { observer } from 'mobx-react';
import { registrationStore, colorStore } from '../../../mobxStores';

@observer
export default class PhoneSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            showWhyWeAsk: false,
            // numFieldClass: styles_2.registrationFormFieldInActive,
        }
    }

    formValid() {
        const { registrationDataJS } = registrationStore;
        return registrationDataJS.phoneField.length === 10
    }

    returnFormValidClass() {
        return this.formValid() ? styles_2.formValid : styles_2.formInvalid
    }

    formatPhone(numb) {
        var numbers = numb.replace(/\D/g, '');
        var char = { 3: '-', 6: '-' };
        numb = '';
        for (var i = 0; i < numbers.length; i++) {
            numb += (char[i] || '') + numbers[i];
        }
        return numb;
    }

    addNum(num) {
        const { registrationDataJS } = registrationStore;

        let inputValue = num + '';
        let updatedValue = registrationDataJS.phoneField;
        if (registrationDataJS.phoneField.length < 10) {
            updatedValue += inputValue;
        }

        this.props.updateRegistrationParams({
            phoneField: updatedValue
        });
    }

    removeNum(num) {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.phoneField.length >= 1) {
            this.props.updateRegistrationParams({
                phoneField: registrationDataJS.phoneField.substr(0, registrationDataJS.phoneField.length - 1)
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
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        Uncle Sam requires all brokerages to collect this info for identification verification
                    </Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 358, height: 150, marginRight: -52 }} />
                </View>
            );            
        }
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
                <ScrollView style={{flex: 1}}>
                  <View style={{ paddingVertical: 50 }}>
                  
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        PHONE NUMBER
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                            WHY WE ASK
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={this.state.showWhyWeAsk ? up : down} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingVertical: 40 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <TextInput placeholder="XXX-XXX-XXXX" placeholderTextColor={this.props.colors['lightGray']} value={this.formatPhone(registrationDataJS.phoneField)}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField]} maxLength={12} editable={false}
                            />
                        </View>
                        <NumericalSelector onChange={(value) => this.addNum(value)} onDelete={() => this.removeNum()} disabledList={[]}/>
                    </View>
                  </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight disabled={!this.formValid()} onPress={this.props.onForwardStep} style={[styles_2.fullBtn, { height: 80 }, this.returnFormValidClass()]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
