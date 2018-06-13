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
import Modal from 'react-native-modal';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../../components/react-native-simple-radio-button';

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { Label } from 'native-base';

let showWhyWeAsk = true;
const status_list = [
    { "label": "None", "value": 0 },
    { "label": "Some", "value": 1 },
    { "label": "I know what I’m doing", "value": 2 },
    { "label": "I’m an expert", "value": 3 }
];

export default class InvestmentExperienceSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
    }
    constructor(props) {
        super(props);

        this.state = {
            investmentStatusOption: 0
        };
    };
    hideInvestmentStatusOption(value) {
        if (value) {
            this.setState({ investmentStatusOption: value })
        } else {
            this.setState({})
        }
    };

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    render() {
        return (
            <View>
                <View style={[{ margin: 20 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '81%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '77%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        INVESTMENT EXPERIENCE
                    </Text>
                    <View style={[styles_2.registrationFormView]}>
                        <View style={styles_2.subMenuRow}>
                            <RadioForm
                                radio_props={status_list}
                                initial={this.state.statusOption}
                                formHorizontal={false}
                                labelHorizontal={true}
                                borderWidth={1}
                                buttonColor={this.props.colors['blue']}
                                buttonOuterColor={this.props.colors['lightGray']}
                                buttonSize={22}
                                buttonOuterSize={20}
                                animation={false}
                                labelStyle={[{ color: this.props.colors['realWhite'] }, styles.radioLabel, fonts.hindGunturRg]}
                                radioLabelActive={[{ color: this.props.colors['blue'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                                labelWrapStyle={[{ borderBottomColor: this.props.colors['borderGray'] }, styles_2.radioLabelWrap]}
                                onPress={(value) => { this.hideInvestmentStatusOption(value) }}
                                style={styles_2.radioField}
                            />
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
