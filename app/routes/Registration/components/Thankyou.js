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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from '../../../components/react-native-simple-radio-button';
import styles from '../../../style/style';
import styles_2 from '../../../style/style_2';
import fonts from '../../../style/fonts';
import numbers from '../../../style/numbers';
import up from '../../../images/up.png';
import down from '../../../images/down.png';
import { Label } from 'native-base';
import { observer } from 'mobx-react';
import { registrationStore, deviceSizeStore } from '../../../mobxStores';
import Button from '../../../sharedComponents/Button1';

let showWhyWeAsk = false;

@observer
export default class Declaration extends Component {
    static propTypes = {
        onForwardStep: PropTypes.func.isRequired,
        updateRegistrationParams: PropTypes.func.isRequired,
        colors: PropTypes.object.isRequired,
    }

    renderIllustration() {
      const { shortSide } = deviceSizeStore;
      
      let paddingExists = 5;
      let rightSpacing = 20;
      
      let imageStyle = {
        position: 'relative',
        width: shortSide,
        right: -rightSpacing + paddingExists,
        // borderWidth: 1,
        // borderColor: 'red'
      }
      return <Image
        resizeMode={'contain'}
        source={this.props.colors['illustration']}
        style={imageStyle}
      />
    }

    render() {
        return (
            <KeyboardAvoidingView
                behavior={this.props.behavior}
                style={styles_2.section}>
                <ScrollView style={{ height: '72%' }}>
                    <Text style={[{ color: this.props.colors['darkSlate'] }, fonts.hindGunturMd, styles_2.registrationPageTitle]}>

                    </Text>
                    <View style={[{ backgroundColor: this.props.colors['white'], marginTop: 22 }]}>
                        <View style={[styles_2.registrationFormView]}>
                            <Text style={[{ color: this.props.colors['darkSlate'] }, styles.fullBtnTxt, fonts.hindGunturRg, { textAlign: 'left', fontSize: 20, marginTop: 15 }]}>
                                Check your inbox
                            </Text>
                            <Text style={[{ color: this.props.colors['darkSlate'] }, styles.fullBtnTxt, fonts.hindGunturRg, { textAlign: 'left', marginTop: 15 }]}>
                                We just sent you a verification email. Please follow the instructions in the email to continue.
                            </Text>
                        </View>
                    </View>
                    {this.renderIllustration()}
                </ScrollView>
                <View style={{ backgroundColor: this.props.colors['white'], shadowOpacity: 0.30, paddingTop: 0, shadowColor: '#10121a', height: 100 }}>
                
                    <View style={{padding: 20}}>
                      <Button title={'FINISH'} onPress={() => this.props.onForwardStep()} />
                    </View>
                    
                </View>
            </KeyboardAvoidingView>
        )
    }
}
