import React from 'react';
import { observer } from 'mobx-react';
import { colorStore, authStore } from '../../mobxStores';
import Button from '../../sharedComponents/Button1';
import {
    View,
    // TextInput,
    TouchableOpacity,
    Image
} from 'react-native';
import Text from '../../sharedComponents/Text';
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
      if( resetSuccess ) {
        color = theme.graySlate;
      }
      if(resetErrorMessage) {
        return <View style={{height: height}}>
          <Text style={{ color: color}}>{resetErrorMessage}</Text>
        </View>
      } else {
          return <View style={{height: height}}></View>
      }
    }

    render() {
        const { theme } = colorStore;
        const { resetLoading } = authStore;

        return <View style={{flex: 1}}>
            <View style={styles.menuBorder}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.leftCta} onPress={() => { this.props.navigation.goBack() }}>
                        <Image
                            source={require('../../images/close.png')}
                            style={styles.closeImg}
                        />
                    </TouchableOpacity>
                    <Text style={[{ color: theme.darkSlate }, styles.mainCta, fonts.gothamBld]}>Recover</Text>
                    <Text style={styles.rightCta}></Text>
                </View>
            </View>


            <View style={{flex: 1, paddingVertical: 40, alignItems: 'center', padding: 20, justifyContent: 'center'}}>
                <Text style={{fontSize: 30, marginVertical: 10}}>Reset Password?</Text>
                <Text>Please enter your email address.</Text>
                <Text>We will send you a link to reset your password.</Text>
                <StyledTextInput
                    value={this.state.email}
                    placeholder={'Email'}
                    onChangeText={(e) => this.updateEmail(e)}
                    style={{marginVertical: 20, fontSize: 25}}
                />
                {this.renderForgotError()}
                <Button
                  disabled={this.state.email.length === 0 || resetLoading === true}
                  onPress={() => this.submitForgotRequest()}
                  title={resetLoading ? "LOADING..." : "RESET PASSWORD"}
                />
            </View>
        </View>
    }
}
