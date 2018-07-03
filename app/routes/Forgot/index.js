import React from 'react';
import { observer } from 'mobx-react';
import { colorStore, authStore } from '../../mobxStores';
import Button from '../../sharedComponents/Button1';
import { View, Text, TextInput } from 'react-native';

@observer
export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'test@gmail.com'
        }
    }
    componentDidMount() {

    }

    updateEmail(e) {
        console.log('e', e, e.nativeevent.text);
        this.setState({
            // email: e
        })
    }

    submitForgotRequest() {
        let params = {
            email: ''
        }
        authStore.submitForgot(params)
            .then((res) => {
                console.log('forgot res', res)
            })
            .catch((err) => {
                console.log('err', err);
            })
    }

    render() {

        const { theme } = colorStore;

        return <View>
            <Text>Forgot Password?</Text>
            <Text>Enter your password here and a reset email will be sent your way!</Text>
            <TextInput
                value={this.state.email}
                placeholder={'Email'}
            />
            <Button onPress={() => this.submitForgotRequest()} />
        </View>
    }
}
