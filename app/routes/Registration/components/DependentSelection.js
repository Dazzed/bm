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
import { isDependentValid } from '../validation';

import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';


let showWhyWeAsk = false;

@observer
export default class DependentSelection extends Component {
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
                dependentField
            }
        } = this.props;
        const isFormValid = isDependentValid(dependentField);
        this.state = {
            numFieldClass: styles_2.registrationFormFieldInActive,
            formValid: isFormValid,
            dependentField: dependentField || '',
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        }
    }

    addNum(num) {
        var curNums;
        if (this.state.dependentField == null) {
            curNums = num;
        } else {
            curNums = this.state.dependentField + '' + num;
            if (curNums.length > 2) {
                curNums = this.state.dependentField;
            }
        }

        this.props.updateRegistrationParams({
            dependentField: curNums
        });
        this.setState({
            dependentField: curNums, numFieldClass: styles_2.registrationFormFieldActive
        });
        const isFormValid = isDependentValid(curNums);
        this.setState({
            formValid: isFormValid,
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        });
    }
    removeNum(num) {
        if (this.state.dependentField) {
            var delNums = this.state.dependentField;
            delNums = delNums.substr(0, delNums.length - 1);
            if (delNums === '') {
                this.setState({
                    numFieldClass: styles_2.registrationFormFieldInActive, formValid: false,
                    formValidClass: styles_2.formInvalid
                });
            }
            this.setState({ dependentField: delNums })
        }
        this.props.updateRegistrationParams({
            dependentField: delNums
        });
        this.setState({
            dependentField: delNums, numFieldClass: styles_2.registrationFormFieldActive
        });
        const isFormValid = isDependentValid(delNums);
        this.setState({
            formValid: isFormValid,
            formValidClass: isFormValid ? styles_2.formValid : styles_2.formInvalid
        });            
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: this.props.progress, borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle,{paddingTop: 20}]}>
                        NUMBER OF DEPENDENTS
                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingTop: 40 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <TextInput placeholder="XX" placeholderTextColor={this.props.colors['darkSlate']} value={this.state.dependentField}
                                style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.state.numFieldClass]} maxLength={2} editable={false}
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
                    <TouchableHighlight disabled={!this.state.formValid} onPress={this.props.onForwardStep} style={[ styles_2.fullBtn, { height: 80 }, this.state.formValidClass]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
