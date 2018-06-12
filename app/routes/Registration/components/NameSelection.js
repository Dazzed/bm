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

import styles_1 from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { Label } from 'native-base';

let showWhyWeAsk = false;
export default class NameSelection extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    whyWeAsk = () => {
        if (this.showWhyWeAsk) {
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
                <ScrollView style={{ height: '82%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        NAME
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg]}>
                            Why we ask
                        </Text>
                        <Image source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
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
                </ScrollView>
                <TouchableHighlight style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, {marginTop: 15}]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, styles_1.fullBtnTxt, fonts.hindGunturBd]}>NEXT</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
