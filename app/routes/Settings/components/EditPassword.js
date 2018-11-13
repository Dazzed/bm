import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { observer } from 'mobx-react';

import { colorStore } from '../../../mobxStores';

import { colors } from '../../../store/store';
import styles from '../../../style/style';
import fonts from '../../../style/fonts';

import * as globalActions from '../../../store/actions/global';
import {
  selectGlobalData
} from '../../../selectors';

import { post } from '../../../api/apiUtility';
import PasswordChecklist from '../../../sharedComponents/PasswordChecklist';

@observer
class EditPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      colors: colors(props.globalData.isDarkThemeActive),
      loading: false,
      errorMessage: null
    };
  }

  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
      this.setState({ colors: colors(currentGlobalData.isDarkThemeActive) });
    }
  }

  displayError = errorMessage => {
    this.setState({ errorMessage }, () => {
      setTimeout(() => {
        this.setState({ errorMessage: null });
      }, 3000);
    });
  };

  onSubmit = async () => {
    const {
      currentPassword: oldPassword,
      newPassword,
      confirmNewPassword
    } = this.state;
    if (newPassword !== confirmNewPassword) {
      return this.displayError('Passwords do not match');
    }
    try {
      this.setState({ loading: true });
      const response = await post('users/change-password', { oldPassword, newPassword });
      this.setState({ loading: false });
      if (response.ok) {
        this.props.hidePassword();
      } else {
        console.log(response.json.error.message);
        this.displayError(response.json.error.message);
      }
    } catch (e) {
      this.setState({ loading: false });
      this.displayError('There was an error, Please try again later');
    }
  }


  render() {
    const { theme } = colorStore;
    const {
      hidePassword
    } = this.props;
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={hidePassword}>
              <Image
                source={require('../../../images/back.png')}
                style={styles.backImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Edit password</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={this.state.behavior}
          style={styles.formcontainer}
        >
          <ScrollView style={{ height: '72%' }}>
            <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, styles.inputLabel, fonts.hindGunturMd]}>CURRENT PASSWORD</Text>
              <TextInput style={[{ color: this.state.colors['darkSlate'] }, styles.input, fonts.hindGunturRg]}
                placeholder=""
                selectionColor="#00CEEF"
                placeholderTextColor={this.state.colors['lightGray']}
                value={this.state.password}
                onChangeText={currentPassword => this.setState({ currentPassword })}
                secureTextEntry={true}
              />
            </View>
            <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, styles.inputLabel, fonts.hindGunturMd]}>NEW PASSWORD</Text>
              <TextInput style={[{ color: this.state.colors['darkSlate'] }, styles.input, fonts.hindGunturRg]}
                placeholder=""
                selectionColor="#00CEEF"
                placeholderTextColor={this.state.colors['lightGray']}
                value={this.state.newPassword}
                onChangeText={newPassword => this.setState({ newPassword })}
                secureTextEntry={true}
              />
            </View>
            <View style={[{ borderBottomColor: this.state.colors['lightGray'] }, styles.inputWrap]}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, styles.inputLabel, fonts.hindGunturMd]}>CONFIRM NEW PASSWORD</Text>
              <TextInput style={[{ color: this.state.colors['darkSlate'] }, styles.input, fonts.hindGunturRg]}
                placeholder=""
                selectionColor="#00CEEF"
                placeholderTextColor={this.state.colors['lightGray']}
                value={this.state.confirmNewPassword}
                onChangeText={confirmNewPassword => this.setState({ confirmNewPassword })}
                secureTextEntry={true}
              />
            </View>
            <PasswordChecklist
              password={this.state.newPassword}
              extraLineItem={this.state.errorMessage}
            />
            <TouchableOpacity
              style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
              onPress={this.onSubmit}
              disabled={this.state.loading}
            >
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>
                {this.state.loading ? 'LOADING' : 'SAVE'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

EditPassword.propTypes = {
  globalData: PropTypes.object.isRequired,
  hidePassword: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(EditPassword);
