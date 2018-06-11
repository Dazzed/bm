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
import illustration from '../../../images/illustration.png';
import illustrationDark from '../../../images/illustration_dark.png';
import { Label } from 'native-base';

export default class NameSelection extends Component {
    static propTypes = {
        // prop: PropTypes
    }

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    render() {
        return (
            <View>
                <ScrollView style={{ maxHeight: '85%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        NAME
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderColor: "#9a9ea8", borderWidth: 1,  width: 125, alignContent: 'center', marginLeft: '50%', left: -62.5, borderRadius: 15, paddingTop: 1, paddingLeft: 5, paddingRight:5, paddingBottom: 0 }}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg]}>
                            Why we ask
                        </Text>
                        <Image source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', alignContent: 'center', paddingTop: 2.5, paddingLeft: 2.5, paddingRight: 5, paddingBottom: 3 }}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, { margin: 25, lineHeight: 30, fontSize: 18}]}>
                            Uncle Sam requires all brokerages to collect this info for identification verification
                        </Text>
                        <Image source={illustrationDark} style={{ width: 380, height: 159, marginRight: 5 }} />
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', margin: 20 }}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, { margin: 5, lineHeight: 20, fontSize: 14 }]}>FIRST NAME</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, { height: 40, fontSize: 25, borderBottomColor: '#d3d3d8', borderBottomWidth: 1, borderTopWidth: 0 }]}
                        />
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, { margin: 5, marginTop: 20, lineHeight: 20, fontSize: 14 }]}>LAST NAME</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, { height: 40, fontSize: 25, borderBottomColor: '#d3d3d8', borderBottomWidth: 1, borderTopWidth: 0 }]}
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
