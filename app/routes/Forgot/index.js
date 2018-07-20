import React from 'react';
import { observer } from 'mobx-react';
import { colorStore, authStore } from '../../mobxStores';
import Button from '../../sharedComponents/Button1';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView
} from 'react-native';

import SharedText from '../../sharedComponents/Text';
import styles from '../../style/style';
import fonts from '../../style/fonts';
import StyledTextInput from '../../sharedComponents/TextInput';

@observer
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    updateEmail(text) {
        this.setState({
            email: text
        })
    }

    submitForgotRequest() {
      let params = {
          email: this.state.email
      }
      authStore.submitForgot(params)
        .then((res) => {
            console.log('forgot res', res)
        })
        .catch((err) => {
            console.log('err', err);
        })
    }

    renderForgotError() {
      const { resetErrorMessage, resetSuccess } = authStore;
      const { theme } = colorStore;
      let height = 25;
      let color = theme.red;
      let message = resetErrorMessage;
      if( resetSuccess ) {
        color = theme.blue;
        message = 'Check your email to reset your password!';
      }

      if(resetErrorMessage) {
        return <View style={{height: height}}>
          <Text style={{ color: color}}>{message}</Text>
        </View>
      } else {
          return <View style={{height: height}}></View>
      }
    }

    render() {
        const { theme } = colorStore;
        const { resetLoading } = authStore;

        return <View style={{flex: 1, backgroundColor: theme.contentBg}}>
            <View style={styles.menuBorder}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.leftCta} onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../../images/close.png')}
                            style={styles.closeImg}
                        />
                    </TouchableOpacity>
                    <SharedText style={[{ color: theme.darkSlate }, styles.mainCta, fonts.gothamBld]}>Recover</SharedText>
                    <SharedText style={styles.rightCta}></SharedText>
                </View>
            </View>


            <KeyboardAvoidingView behavior={'height'} style={{flex: 1, paddingVertical: 60, width: '100%', alignItems: 'center', padding: 20, justifyContent: 'center'}}>
                <Text style={[{ fontSize: 30, width: '100%', color: theme.darkSlate }]}>Reset Password</Text>
                <Text style={{ width: '100%', color: theme.darkGray }}>Please enter your email address.</Text>
                <Text style={{ width: '100%', color: theme.darkGray }}>We will send you a link to reset your password.</Text>
                <StyledTextInput
                    value={this.state.email}
                    placeholder={'Email'}
                    onChangeText={(e) => this.updateEmail(e)}
                    style={{marginVertical: 20, fontSize: 25, color: theme.darkSlate}}
                />
                {this.renderForgotError()}
                <Button
                  disabled={this.state.email.length === 0 || resetLoading === true}
                  onPress={() => this.submitForgotRequest()}
                  title={resetLoading ? "LOADING..." : "RESET PASSWORD"}
                />
            </KeyboardAvoidingView>
        </View>
    }
}
