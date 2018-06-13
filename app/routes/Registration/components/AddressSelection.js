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
const state_list = [
    { "label": "Alabama", "value": 0 },
    { "label": "Alaska", "value": 1 },
    { "label": "Arizona", "value": 2 },
    { "label": "Arkansas", "value": 3 },
    { "label": "California", "value": 4 },
    { "label": "Colorado", "value": 5 },
    { "label": "Connecticut", "value": 6 },
    { "label": "Delaware", "value": 7 },
    { "label": "District of Columbia", "value": 8 },
    { "label": "Florida", "value": 9 },
    { "label": "Georgia", "value": 10 },
    { "label": "Hawaii", "value": 11 },
    { "label": "Idaho", "value": 12 },
    { "label": "Illinois", "value": 13 },
    { "label": "Indiana", "value": 14 },
    { "label": "Iowa", "value": 15 },
    { "label": "Kansa", "value": 16 },
    { "label": "Kentucky", "value": 17 },
    { "label": "Lousiana", "value": 18 },
    { "label": "Maine", "value": 19 },
    { "label": "Maryland", "value": 20 },
    { "label": "Massachusetts", "value": 21 },
    { "label": "Michigan", "value": 22 },
    { "label": "Minnesota", "value": 23 },
    { "label": "Mississippi", "value": 24 },
    { "label": "Missouri", "value": 25 },
    { "label": "Montana", "value": 26 },
    { "label": "Nebraska", "value": 27 },
    { "label": "Nevada", "value": 28 },
    { "label": "New Hampshire", "value": 29 },
    { "label": "New Jersey", "value": 30 },
    { "label": "New Mexico", "value": 31 },
    { "label": "New York", "value": 32 },
    { "label": "North Carolina", "value": 33 },
    { "label": "North Dakota", "value": 34 },
    { "label": "Ohio", "value": 35 },
    { "label": "Oklahoma", "value": 36 },
    { "label": "Oregon", "value": 37 },
    { "label": "Pennsylvania", "value": 38 },
    { "label": "Rhode Island", "value": 39 },
    { "label": "South Carolina", "value": 40 },
    { "label": "South Dakota", "value": 41 },
    { "label": "Tennessee", "value": 42 },
    { "label": "Texas", "value": 43 },
    { "label": "Utah", "value": 44 },
    { "label": "Vermont", "value": 45 },
    { "label": "Virginia", "value": 46 },
    { "label": "Washington", "value": 47 },
    { "label": "West Virginia", "value": 48 },
    { "label": "Wisconsin", "value": 49 },
    { "label": "Wyoming", "value": 50 }
];

export default class AddressSelection extends Component {
    static propTypes = {
        // prop: PropTypes
    }
    constructor(props) {
        super(props);

        this.state = {
            isStateVisible: false,
            stateOption: 0
        };
    };
    hideState(value) {
        if (value) {
            this.setState({ isStateVisible: false, stateOption: value })
        } else {
            this.setState({ isStateVisible: false })
        }
    };
    showState() {
        this.setState({ isStateVisible: true })
    }

    componentWillMount() {
        // console.log(COUNTRY_LIST);
    }

    whyWeAsk = () => {
        if (showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        Uncle Sam requires all brokerages to collect this info for identification verification
                    </Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 380, height: 159, marginRight: 5 }} />
                </View>
            );
        }
    }

    render() {
        return (
            <View>
                <View style={[{ margin: 20 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: '18%', borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '77%' }}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                        ADDRESS
                    </Text>
                    <View style={[styles_2.whyWeAsk]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg]}>
                            Why we ask
                        </Text>
                        <Image source={up} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                    </View>
                    {this.whyWeAsk()}
                    <View style={[styles_2.registrationFormView]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                        />
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>HOME ADDRESS (LINE 2)</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                        />
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>CITY</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                        />
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>STATE</Text>

                        <View style={styles_2.subMenuRow}>
                            <TouchableOpacity style={[{ borderBottomColor: this.props.colors['borderGray'] }]} onPress={() => { this.showState() }}>
                                <Image
                                    source={require('../../../images/arrowblue.png')}
                                    style={[styles_2.downArrow]}
                                />
                                <TextInput value={state_list[this.state.stateOption].label} editable={false}
                                    style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                                />
                            </TouchableOpacity>
                            <Modal
                                isVisible={this.state.isStateVisible}
                                animationIn={'fadeIn'}
                                animationOut={'fadeOut'}
                                style={styles_2.fullModal}
                                onModalHide={() => { this.hideState() }}>
                                <View style={[{ backgroundColor: this.props.colors['white'] }, styles_2.subMenuFullModal]}>
                                    <Image
                                        source={require('../../../images/arrowblue.png')}
                                        style={[styles_2.downArrow]}
                                    />
                                    <Text style={[{ color: this.props.colors['darkSlate'] }, styles_2.subMenuTitle, fonts.hindGunturBd]}>STATE</Text>
                                </View>
                                <View style={[{ backgroundColor: this.props.colors['white'] }, styles_2.lastTradeModal]}>
                                    <ScrollView style={styles_2.stateRadio}>
                                        <RadioForm
                                            radio_props={state_list}
                                            initial={this.state.stateOption}
                                            formHorizontal={false}
                                            labelHorizontal={true}
                                            borderWidth={1}
                                            buttonColor={this.props.colors['blue']}
                                            buttonOuterColor={this.props.colors['lightGray']}
                                            buttonSize={22}
                                            buttonOuterSize={20}
                                            animation={false}
                                            labelStyle={[{ color: this.props.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                                            radioLabelActive={[{ color: this.props.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                                            labelWrapStyle={[{ borderBottomColor: this.props.colors['borderGray'] }, styles.radioLabelWrap]}
                                            onPress={(value) => { this.hideState(value) }}
                                            style={styles_2.radioField}
                                        />
                                    </ScrollView>
                                </View>
                            </Modal>
                        </View>
                        <Text style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturMd, styles_2.registrationFormLabel]}>ZIP CODE</Text>
                        <TextInput
                            style={[{ color: this.props.colors['realWhite'] }, fonts.hindGunturRg, styles_2.registrationFormField]}
                        />
                        
                    </View>
                </ScrollView>
                <TouchableHighlight style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { marginTop: 15 }]}>
                    <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: -10 }]}>NEXT</Text>
                </TouchableHighlight>
            </View>
        )
    }
}
