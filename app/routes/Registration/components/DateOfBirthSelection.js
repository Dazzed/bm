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

import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { isDateValid } from '../validation';
import { observer } from 'mobx-react';
import { registrationStore } from '../../../mobxStores';
import NumericalSelector from '../../../sharedComponents/NumericalSelector';

@observer
export default class DateOfBirthSelection extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            showWhyWeAsk: false,
            formValidClass: styles_2.formInvalid
        }
    }

    getNumFieldClass() {
        return styles_2.registrationFormFieldInActive;
    }

    formatDate(date) {
        console.log(date);
        var numbers = date.replace(/\D/g, '');
        var char = { 2: '/', 4: '/' };
        date = '';
        for (var i = 0; i < numbers.length; i++) {
            date += (char[i] || '') + numbers[i];
        }
        return date;
    }

    addNum(num) {
        const { registrationDataJS } = registrationStore;

        if(registrationDataJS.dateField.length < 8) {
            let newDate = registrationDataJS.dateField + num;
            this.props.updateRegistrationParams({
                dateField: newDate
            });
        }
    }

    removeNum() {
        const { registrationDataJS } = registrationStore;
        if(registrationDataJS.dateField.length > 0) {
            let newVal = registrationDataJS.dateField.substr(0, registrationDataJS.dateField.length - 1)
            this.props.updateRegistrationParams({
                dateField: newVal
            });
        }
    }

    isFormValid() {
        const { registrationDataJS } = registrationStore;
        let formattedDate = this.formatDate(registrationDataJS.dateField)
        return isDateValid(formattedDate)
    }

    getFormValidClass() {
        return this.isFormValid() === true ? styles_2.formValid : styles_2.formInvalid
    }

    getDisabledList() {
        const { registrationDataJS } = registrationStore;
        let disabledList = [];
        if(registrationDataJS.dateField.length < 1) {
            // prevent first digit from being anything but 0, 1 or 2
            disabledList = [2, 3, 4, 5, 6, 7, 8, 9];
            return disabledList;
        } else if(registrationDataJS.dateField.length < 2) {
            // prevent second digit from being more than 2
            if(registrationDataJS.dateField[0] === '0') {
            disabledList = [0];
          } else if(registrationDataJS.dateField[0] === '1') {
            disabledList = [3, 4, 5, 6, 7, 8, 9];
          }
            // disabledList = [0];
            return disabledList
        } else if( registrationDataJS.dateField.length < 3) {
            // prevent third digit from being anything but 0, 1, 2 or 3
            disabledList = [4, 5, 6, 7, 8, 9];
            return disabledList;
        } else if(registrationDataJS.dateField.length < 4) {
            // prevent fourth digit (second day digit) from being greater than 1 if first day digit is three
            disabledList = [];
            if(registrationDataJS.dateField[2] == '3') {
                disabledList = [2, 3, 4, 5, 6, 7, 8, 9];
            }
            return disabledList
        } else if(registrationDataJS.dateField.length < 5) {
            // prevent 5th digit ( first year digit) from beig greater than 2
            disabledList = [0, 3, 4, 5, 6, 7, 8, 9];
            return disabledList
        } else {
            return []
        }
    }

    toggleWhyWeAsk = () => {
        this.setState(({ showWhyWeAsk }) => ({ showWhyWeAsk: !showWhyWeAsk }));
    }

    whyWeAsk = () => {
        if (this.state.showWhyWeAsk) {
            return (
                <View style={[styles_2.whyWeAskView]}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskText]}>
                        Uncle Sam requires all brokerages to collect this info for identification verification
                    </Text>
                    <Image source={this.props.colors['illustration']} style={{ width: 358, height: 150, marginRight: -52 }} />
                </View>
            );
        }
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
                <ScrollView style={{ flex: 1 }}>
                    <View style={{paddingVertical: 40}}>
                      <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>
                          DATE OF BIRTH
                      </Text>
                      <View style={[styles_2.whyWeAsk]}>
                          <Text onPress={this.toggleWhyWeAsk} style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.whyWeAskLabel]}>
                              WHY WE ASK
                          </Text>
                          <Image onPress={this.toggleWhyWeAsk} source={this.state.showWhyWeAsk ? up : down} style={{ width: 15, height: 9, marginLeft: 5, marginBottom: 1 }} />
                      </View>
                    </View>
                    {this.whyWeAsk()}
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 0, paddingVertical: 40, width: '100%' }]}>
                        <View>
                          <View style={[styles_2.registrationFormView]}>
                              <TextInput placeholder="MM/DD/YYYY" placeholderTextColor={this.props.colors['lightGray']} value={this.formatDate(registrationDataJS.dateField)}
                                  style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturRg, styles_2.registrationFormField, styles_2.registrationFormKeypadField, this.getNumFieldClass()]} maxLength={10} editable={false}
                              />
                          </View>
                          <NumericalSelector onChange={(value) => this.addNum(value)} onDelete={() => this.removeNum()} disabledList={this.getDisabledList()}/>
                        </View>
                    </View>
                </ScrollView>
  
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight disabled={!this.isFormValid()} onPress={this.props.onForwardStep} style={[styles_2.fullBtn, { height: 80 }, this.getFormValidClass()]}>
                        <Text style={[{ color: this.props.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>NEXT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}