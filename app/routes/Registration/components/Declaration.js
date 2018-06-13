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
import numbers from '../../../style/numbers';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import documentImage from '../../../images/document.png';
import { Label } from 'native-base';

let showWhyWeAsk = false;
let linkList = [
    { title: "Terms & Condition", value: 'tnc' },
    { title: "Privacy Policy", value: 'pp' },
    { title: "Client Agreement", value: 'ca' },
    { title: "Risk Disclosure Notice", value: 'rdn' }
]

export default class Declaration extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
    }

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    newWin(win) {
        alert("OPEN " + win);
    }

    renderLinks() {
        return linkList.map((link, i) => {
            return (
                <View key={`list_${i}`}>
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 5 }]} ><Image source={this.props.colors['documentImage']} style={{ width: 21, height: 31 }} /></Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, { textAlign: 'left', flex: 8, borderBottomColor: "#fff", borderBottomWidth: 1 }]} onPress={() => { this.newWin(`${link.value}`); }}> {link.title}</Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 15, textAlign: 'right' }]} ><Image source={this.props.colors['rightArrow']} style={{ width: 10, height: 18 }} /></Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 10, }}>
                        <View style={{ flex: 1 }}> </View>
                        <View style={{ borderBottomColor: "#ffffff20", borderBottomWidth: 1, flex: 9 }}></View>
                    </View>
                </View>
            )
        })
    }
    render() {
        return (
            <View>
                <View style={[{ margin: 20 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '100%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '77%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        I DECLARE THAT I HAVE READ AND AGREE TO THE FOLLOWING
                    </Text>
                    <View style={[styles_2.registrationFormView, {backgroundColor: this.props.colors['white'], margin: 0}]}>
                        {this.renderLinks()}
                   </View>
                </ScrollView>
                <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { marginTop: 15 }]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, {marginTop: -10}]}>I AGREE</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
