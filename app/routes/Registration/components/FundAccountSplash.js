import React, { Component } from 'react';

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

let showWhyWeAsk = false;

import { observer } from 'mobx-react';
import { colorStore } from '../../../mobxStores';

import { generateHeaderStyles } from '../../../utility';


@observer
export default class FundAccountSplash extends Component {

    static navigationOptions = ({ navigation }) => {
        let title = 'Fund My Account';

        const { theme } = colorStore;
        let headerStyleToExtend = generateHeaderStyles(theme);

        return {
            title: title,
            ...headerStyleToExtend
        };
    };

    navToFunding() {
        this.props.navigation.navigate('AccountSelect', {
          widthdrawDepositMode: 'deposit'
        });
    }

    render() {
        const { theme } = colorStore;

        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={[styles_2.section, {backgroundColor: theme.contentBg}]}>
                <ScrollView style={{ height: '100%', flex: 1, backgroundColor: theme.contentBg }}>
                    {/*<Text style={[{ color: theme.darkSlate }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>*/}
                    {/*</Text>*/}
                    <View style={[{ backgroundColor: theme.white }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <Text style={[{ color: theme.darkSlate }, styles.fullBtnTxt, fonts.hindGunturRg, { textAlign: 'left', fontSize: 20, marginTop: 15 }]}>
                                Congratulations!
                            </Text>
                            <Text style={[{ color: theme.darkSlate }, styles.fullBtnTxt, fonts.hindGunturRg, { textAlign: 'left', marginTop: 15 }]}>
                                We are working with banking regulators to allow us to connect to real accounts. As we finalize that approval, we have created a mock account to simulate how easy this process will be.
                            </Text>
                            <Text style={[{ color: theme.darkSlate }, styles.fullBtnTxt, fonts.hindGunturRg, { textAlign: 'left', marginTop: 15 }]}>
                                Integer vitae nisl venenatis, iaculis neque a, euismod massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                            </Text>
                            <Image source={theme.illustration} style={{ width: 358, height: 150, marginRight: -52 }} />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ backgroundColor: theme.white, shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                    <TouchableHighlight onPress={() => this.navToFunding()} style={[{ backgroundColor: theme.green, borderColor: theme.green }, styles_2.fullBtn, { height: 80 }]}>
                        <Text style={[{ color: theme.realWhite }, styles.fullBtnTxt, fonts.hindGunturBd, { marginTop: 15 }]}>FUND MY ACCOUNT</Text>
                    </TouchableHighlight>
                    <Text> </Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}
