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
import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';

let showWhyWeAsk = true;

const status_list = [
    { "label": "Married", "value": 0 },
    { "label": "Divorced", "value": 1 },
    { "label": "Separated", "value": 2 },
    { "label": "Widow", "value": 3 },
    { "label": "Single", "value": 4 }
];

@observer
export default class MaritalStatusSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
    }
    setStatus(value) {
        this.props.updateRegistrationParams({
            maritalStatus: value,
        });
    }

    render() {
        const { registrationDataJS } = registrationStore;
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <View style={[{ margin: 15 }]}>
                    <View style={{ position: 'relative', height: 3, backgroundColor: this.props.colors['progressFull'], borderRadius: 1.5 }}></View>
                    <View style={[styles_2.progressActual, { position: 'absolute', height: 3, width: this.props.progress, borderRadius: 1.5 }]}></View>
                </View>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle, {paddingTop: 25}]}>
                        MARITAL STATUS
                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 20, flex: 1, paddingTop: 0 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <View style={styles_2.subMenuRow}>
                                <RadioForm
                                    value={registrationDataJS.maritalStatus}
                                    initial={registrationDataJS.maritalStatus}
                                    radio_props={status_list}
                                    formHorizontal={false}
                                    labelHorizontal={true}
                                    borderWidth={1}
                                    buttonColor={this.props.colors['blue']}
                                    buttonOuterColor={this.props.colors['white']}
                                    buttonSize={22}
                                    buttonOuterSize={20}
                                    animation={false}
                                    labelStyle={[{ color: this.props.colors['darkSlate'] }, styles_2.radioLabel, fonts.hindGunturRg]}
                                    radioLabelActive={[{ color: this.props.colors['blue'] }, styles_2.activeRadioLabel, fonts.hindGunturBd]}
                                    labelWrapStyle={[{ borderBottomColor: this.props.colors['borderGray'] }, styles_2.radioLabelWrap]}
                                    onPress={(value) => { this.setStatus(value) }}
                                    style={styles_2.radioField}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight onPress={this.props.onForwardStep} style={[{ backgroundColor: this.props.colors['green'], borderColor: this.props.colors['green'] }, styles_2.fullBtn, { height: 80 }]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
