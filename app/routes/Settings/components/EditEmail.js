import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { selectGlobalData } from '../../../selectors';

import { colorStore } from '../../../mobxStores';
import Button from '../../../sharedComponents/Button1';
import styles from '../../../style/style';
import fonts from '../../../style/fonts';
import StyledTextInput from '../../../sharedComponents/TextInput';
import { validateEmail } from '../../Registration/validation';
import { patch } from '../../../api/apiUtility';
import { logoutAction } from '../../../store/actions/global';

@observer
class EditEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: props.globalData.currentUser.email,
      loading: false
    }
  }

  updateEmail = email => {
    this.setState({
      email
    });
  }

  onSubmit = async () => {
    const { email } = this.state;
    const { globalData: { currentUser } } = this.props;
    try {
      if (!validateEmail(email)) {
        return this.displayError('Invalid Email Format');
      }
      this.setState({ loading: true });
      const response = await patch(`users/${currentUser.id}`, { email });
      if (response.ok) {
        this.props.logoutAction();
      } else {
        if (response.json.error.message.includes('Email already exists')) {
          return this.displayError('Email already exists');
        }
        this.displayError(response.json.error.message);
      }
    } catch (e) {
      this.setState({ loading: false });
      this.displayError('There was an error, Please try again later');
    }

  }

  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isPatchingUser === true && currentGlobalData.isPatchingUser === false) {
      this.props.hideEmail();
    }
  }

  displayError = errorMessage => {
    this.setState({ errorMessage, loading: false }, () => {
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, 3000);
    });
  };

  renderErrors = () => {
    const { errorMessage } = this.state;
    if (errorMessage) {
      return (
        <View style={{ height: 25 }}>
          <Text style={{ color: colorStore.theme.red }}>{errorMessage}</Text>
        </View>
      );
    } else {
      return <View style={{ height: 25 }}></View>
    }
  }

  render() {
    const { theme } = colorStore;
    const { hideEmail } = this.props;
    const {
      globalData
    } = this.props;
    const {
      email,
      loading
    } = this.state;

    return (
      <View style={{ flex: 1, backgroundColor: theme.contentBg }}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={hideEmail}>
              <Image
                source={require('../../../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: theme.darkSlate }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit Email</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>


        <KeyboardAvoidingView behavior={'height'} style={{ flex: 1, paddingVertical: 60, width: '100%', alignItems: 'center', padding: 20, justifyContent: 'center' }}>
          <Text style={[{ fontSize: 30, width: '100%', color: theme.darkSlate }]}>Change Email</Text>
          <Text style={{ width: '100%', color: theme.darkGray }}>You will be logged out and we will send confirmation link to the new Email.</Text>
          <StyledTextInput
            value={email}
            placeholder=""
            onChangeText={this.updateEmail}
            style={{ marginVertical: 20, fontSize: 25, color: theme.darkSlate }}
          />
          {this.renderErrors()}
          <Button
            disabled={email.length === 0 || loading || globalData.currentUser.email === email}
            onPress={this.onSubmit}
            title={loading ? 'LOADING...' : 'CHANGE EMAIL'}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

EditEmail.propTypes = {
  hideEmail: PropTypes.func.isRequired,
  globalData: PropTypes.object.isRequired,
  logoutAction: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

const mapDispatchToProps = bindActionCreators.bind(this, { logoutAction });

export default connect(mapStateToProps, mapDispatchToProps)(EditEmail);