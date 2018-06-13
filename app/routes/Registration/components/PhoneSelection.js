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

export default class PhoneSelection extends Component {
    state = {
        showWhyWeAsk: false,
        numField: ''
    }

    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
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
        var curNums;
        if (this.state.numField == null) {
            curNums = num;
        } else {
            curNums = this.state.numField + '' + num;
            if (curNums.length > 12) {
                curNums = this.state.numField;
            }
        }
        curNums = this.formatPhone(curNums)
        this.setState({ numField: curNums });
    }

    removeNum(num) {
        if (this.state.numField) {
            var delNums = this.state.numField;
            delNums = delNums.substr(0, delNums.length - 1);
            delNums = this.formatPhone(delNums);
            this.setState({ numField: delNums })
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
            <View>
                <View style={[{ margin: 20 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '27%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '77%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        PHONE NUMBER
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg]}>
                            Why we ask
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[styles_2.registrationFormView]}>
                        <TextInput placeholder="XXX-XXX-XXXX" placeholderTextColor={this.props.colors['realWhite']} value={this.state.numField}
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]} maxLength={12} editable={false}
                        />
                    </View>
                    <View style={[{ backgroundColor: this.props.colors['white'] }, { borderTopColor: this.props.colors['borderGray'] }, styles_2.numContainer]}>
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
                </ScrollView>
                <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { marginTop: 15 }]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: -10 }]}>NEXT</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
