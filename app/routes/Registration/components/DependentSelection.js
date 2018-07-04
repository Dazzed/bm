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
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import { isDependentValid } from '../validation';
import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';
import NumericalSelector from '../../../sharedComponents/NumericalSelector';

let showWhyWeAsk = false;

@observer
export default class DependentSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
        // registrationPage: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            numFieldClass: styles_2.registrationFormFieldInActive,
        }
    }


    isFormValid() {
        const { registrationDataJS } = registrationStore;
        return isDependentValid(registrationDataJS.dependentField);
    }

    getValidFormClass() {
        return this.isFormValid() === true ? styles_2.formValid : styles_2.formInvalid
    }

    addNum(num) {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.dependentField.length < 2) {
            let newVal = registrationDataJS.dependentField;
            this.props.updateRegistrationParams({
                dependentField: newVal + num
            });
        }
    }

    removeNum() {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.dependentField.length > 0) {
            this.props.updateRegistrationParams({
                dependentField: registrationDataJS.dependentField.substr(0, registrationDataJS.dependentField.length - 1)
            });
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
                <ScrollView style={{ flex: 1, paddingVertical: 40}}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle,{paddingTop: 20}]}>
                        NUMBER OF DEPENDENTS
                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingTop: 40 }]}>
                        <View style={[styles_2.registrationFormView, {marginTop: 45, paddingBottom: 30}]}>
                            <TextInput placeholder="XX" placeholderTextColor={this.props.colors['lightGray']} value={registrationDataJS.dependentField}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={2} editable={false}
                            />
                        </View>
                        <NumericalSelector onChange={(value) => this.addNum(value)} onDelete={() => this.removeNum()} disabledList={[]}/>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight disabled={!this.isFormValid()} onPress={this.props.onForwardStep} style={[ styles_2.fullBtn, { height: 80 }, this.getValidFormClass()]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}