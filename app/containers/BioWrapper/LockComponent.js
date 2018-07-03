import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Text,
  View,
  TouchableOpacity
} from 'react-native';

import styles from '../../style/style';
import fonts from '../../style/fonts';
import { colors } from '../../store/store';

export default class LockComponent extends Component {
  static propTypes = {
    onUnlockApp: PropTypes.func.isRequired,
    globalData: PropTypes.object.isRequired
  };

  state = {
    colors: colors(this.props.globalData.isDarkThemeActive)
  };

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalAgree]}>
          <TouchableOpacity style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]} onPress={this.props.onUnlockApp}>
            <Text style={[{ color: this.state.colors['white'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>UNLOCK</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}