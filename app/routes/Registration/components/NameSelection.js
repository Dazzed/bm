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

let showWhyWeAsk = false;
export default class NameSelection extends Component {
    state = {
        showWhyWeAsk: false
    }

    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
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
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '9%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '70%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        NAME
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                            WHY WE ASK
                        </Text>
                        <Image onPress={this.toggleWhyWeAsk} source={up} style={{ width: 11, height: 7, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 25 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>FIRST NAME</Text>
                            <TextInput
                                style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                            />
                            <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>LAST NAME</Text>
                            <TextInput
                                style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                            />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, marginTop: 15, marginBottom: 15, shadowColor: '#10121a', height: 100}}>
                    <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 75}]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </View>
        )
    }
}
