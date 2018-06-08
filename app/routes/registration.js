/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
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
    TouchableOpacity
} from 'react-native';

import {
    StackNavigator,
} from 'react-navigation';

import { setTheme, getTheme, colors } from '../store/store';

import styles from '../style/style';
import fonts from '../style/fonts';

class Registration extends React.Component {
    static navigationOptions = {
        title: 'Registration',
        header: null
    }
    constructor(props) {
        super(props);
        this.state = { email: '', behavior: 'padding' };
    }
    componentWillMount() {
        this.setState({ colors: colors() });
    }
    setColor(value) {
        setTheme(value);
        this.setState({ activeColor: value, colors: colors() });
    }
    onSegmentChange = (segment: String) => {
        this.setState({ behavior: segment.toLowerCase() });
    };
    _signIn() {
        Alert.alert(
            'Enable Touch ID',
            '',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: true }
        )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
                <View style={styles.menuBorder}>
                    <View style={styles.menuContainer}>
                        <TouchableOpacity style={styles.leftCta} onPress={() => { this.props.navigation.goBack() }}>
                            <Image
                                source={require('../images/close.png')}
                                style={styles.closeImg}
                            />
                        </TouchableOpacity>
                        <Text style={[{ color: this.state.colors['darkSlate'] }, styles.mainCta, fonts.gothamBld]}>Registration</Text>
                        <Text style={styles.rightCta}></Text>

                    </View>
                </View>
                <KeyboardAvoidingView
                    behavior={this.state.behavior}
                    style={styles.formcontainer}>
                    <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
                        <Text style={[{ color: this.state.colors['darkGray'] }, styles.inputLabel, fonts.hindGunturMd]}>EMAIL</Text>
                        <TextInput style={[{ color: this.state.colors['lightGray'] }, styles.input, fonts.hindGunturRg]}
                            placeholder="your@email.com"
                            onChangeText={(email) => this.setState({ email })}
                            keyboardType="email-address"
                        />
                    </View>
                    <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
                        <Text style={[{ color: this.state.colors['darkGray'] }, styles.inputLabel, fonts.hindGunturMd]}>PASSWORD</Text>
                        <TextInput style={[{ color: this.state.colors['lightGray'] }, styles.input, fonts.hindGunturRg]}
                            placeholder="password"
                            onChangeText={(password) => this.setState({ password })}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={[{ borderColor: this.state.colors['darkGray'] }, styles.optionbtn]}
                        onPress={() => this._signIn()}>
                        <Text style={[{ color: this.state.colors['darkGray'] }, styles.touchOption, fonts.hindGunturMd]}>
                            ENABLE TOUCH ID
            </Text>
                    </TouchableOpacity>
                    <Text style={[{ color: this.state.colors['lightGray'] }, styles.details, fonts.hindGunturRg]}>
                        Forgot username/password?
          </Text>
                    <TouchableOpacity
                        style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
                        onPress={() => navigate('AppNav', { color: this.state.activeColor })}>
                        <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>
                            SIGN IN
          </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

module.exports = Registration;