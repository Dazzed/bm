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
    { title: "Terms & Conditions", value: 'tnc' },
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
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 9 }}>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 5 }]} ><Image source={this.props.colors['documentImage']} style={{ width: 21, height: 31 }} /></Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, { fontSize: 20, textAlign: 'left', flex: 8, borderBottomColor: "#fff", borderBottomWidth: 1 }]} onPress={() => { this.newWin(`${link.value}`); }}> {link.title}</Text>
                        <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 15, textAlign: 'right' }]} ><Image source={this.props.colors['rightArrow']} style={{ width: 10, height: 18 }} /></Text>
                    </View>
                    { (i < (linkList.length -1) ) && 
                    <View style={{ display: 'flex', flexDirection: 'row', margin: 9, }}>
                        <View style={{ flex: 1 }}> </View>
                        <View style={{ borderBottomColor: "#ffffff20", borderBottomWidth: 1, flex: 9 }}></View>
                    </View> }
                </View> 
            )
        })
    }
    render() {
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '100%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        I DECLARE THAT I HAVE READ AND AGREE TO THE FOLLOWING
                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 22 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            {this.renderLinks()}
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 80 }]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>I AGREE</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
