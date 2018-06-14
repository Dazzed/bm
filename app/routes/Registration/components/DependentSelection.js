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

let showWhyWeAsk = false;
export default class DependentSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numField: ''
        };
    }

    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
    }

    addNum(num) {
        var curNums;
        if (this.state.numField == null) {
            curNums = num;
        } else {
            curNums = this.state.numField + '' + num;
            if (curNums.length > 2) {
                curNums = this.state.numField;
            }
        }
        this.setState({ numField: curNums });
    }
    removeNum(num) {
        if (this.state.numField) {
            var delNums = this.state.numField;
            delNums = delNums.substr(0, delNums.length - 1);
            this.setState({ numField: delNums })
        }
    }

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    render() {
        return (
            <View>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '63%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle,{paddingTop: 20}]}>
                        NUMBER OF DEPENDENTS
                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25, paddingTop: 40 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <TextInput placeholder="XX" placeholderTextColor={this.props.colors['realWhite']} value={this.state.numField}
                                style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField]} maxLength={2} editable={false}
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
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, marginBottom: 15, shadowColor: '#10121a', height: 105 }}>
                    <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 80 }]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </View>
        )
    }
}
