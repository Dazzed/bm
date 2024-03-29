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
    Linking,
    Alert,
    TouchableOpacity,
    TouchableHighlight
} from 'react-native';
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { isSsnValid } from '../validation';
import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';
import NumericalSelector from '../../../sharedComponents/NumericalSelector';
import RegistrationHeader from './registrationHeader';
import Button from '../../../sharedComponents/Button1';

@observer
export default class SocialSecurityNumberSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            showWhyWeAsk: false,
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

    isFormValid() {
        const { registrationDataJS } = registrationStore;
        return isSsnValid(this.formatSSN(registrationDataJS.ssnField));
    }

    getValidFormStyle() {
        return this.isFormValid() ? styles_2.formValid : styles_2.formInvalid
    }

    addNum(num) {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.ssnField.length < 9) {
            let newVal = registrationDataJS.ssnField + num;
            this.props.updateRegistrationParams({
                ssnField: newVal
            });
        }
    }

    removeNum(num) {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.ssnField.length > 0) {
            this.props.updateRegistrationParams({
                ssnField: registrationDataJS.ssnField.substr(0, registrationDataJS.ssnField.length - 1)
            });
        }
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAsk = () => {
        if (this.state.showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView, {borderWidth: 1, borderColor: 'red', }]}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskTextSSN]}>
                        All broker dealers are required by federal law (U.S. Patriot Act of 2001) to collect Social Security numbers to prevent money launderers and terrorists from accessing the stock market, as explained in detail here:
                    </Text>
                    <Text style={[styles_2.whyWeAskText, fonts.hindGunturRg, {color: "#18c3ff"}]} onPress={() => Linking.openURL('https://www.sec.gov/fast-answers/answersbd-persinfohtm.html')}>https://www.sec.gov/fast-answers/answersbd-persinfohtm.html</Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 358, height: 150, marginRight: -52 }} />
                </View>
            );
        } else {
        }
    }

    getSocialSecurityLink() {
      return (<Text style={{color: "#18c3ff", fontSize: 18}} onPress={() => Linking.openURL('https://www.sec.gov/fast-answers/answersbd-persinfohtm.html')}>https://www.sec.gov/fast-answers/answersbd-persinfohtm.html</Text>);
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
                <ScrollView style={{ flex: 1 }}>
                    <RegistrationHeader isSSN={"Yes"} headerText={'SOCIAL SECURITY NUMBER'} generalText={null} whyWeAskText={'All broker dealers are required by federal law (U.S. Patriot Act of 2001) to collect Social Security numbers to prevent money launderers and terrorists from accessing the stock market, as explained in detail here:'} extraContent={this.getSocialSecurityLink()}/>
                    <View style={[{ backgroundColor: this.props.colors['white'], paddingVertical: 40 }]}>
                      <View style={[styles_2.registrationFormView]}>
                        <TextInput placeholder="XXX-XX-XXXX" placeholderTextColor={this.props.colors['lightGray']} value={this.formatSSN(registrationDataJS.ssnField)}
                            style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={111} editable={false}
                            selectionColor="#00CEEF"
                       />
                      </View>
                      <NumericalSelector hideDot={true} onChange={(value) => this.addNum(value)} onDelete={() => this.removeNum()} disabledList={['.']}/>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>

                    <View style={{padding: 20}}>
                      <Button title={'NEXT'} disabled={!this.isFormValid()} onPress={this.props.onForwardStep} />
                    </View>

                </View>
            </KeyboardAvoidingView>
        )
    }
}
