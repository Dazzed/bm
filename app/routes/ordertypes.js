/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import Modal from 'react-native-modal'

import styles from '../style/style';
import order from '../style/ordertypes';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

var type_props = [
  {label: 'Good until canceled', value: 0 },
  {label: 'Day only', value: 0 },
  {label: 'Extended hours', value: 1 }
];


class OrderTypes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numField: null,
      colors: colors(props.globalData.isDarkThemeActive)
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

  showModal(){
    this.setState({ isScanVisible: true })
  }

  hideModal(){ 
    this.setState({ isScanVisible: false })
  }
  addNum(num) {
    var curNums;
    if(this.state.numField == null) {
     curNums = num;
    } else {
     curNums = this.state.numField + ''+num;
    }
    this.setState({numField: curNums});
  }
  removeNum(num) {
    var delNums = this.state.numField;
    delNums = delNums.substr(0, delNums.length - 1);
    console.log(delNums)
    this.setState({numField: delNums})
  }
  render() {
    return(
      <View style={[order.tabContent, {backgroundColor: this.state.colors['contentBg']}]}>
        <RadioForm
          radio_props={type_props}
          initial={0}
          formHorizontal={false}
          labelHorizontal={true}
          borderWidth={1}
          buttonColor={colors.blue}
          buttonOuterColor={colors.lightGray}
          buttonSize={22}
          buttonOuterSize={20}
          animation={false}
          labelStyle={[styles.radioLabel,fonts.hindGunturRg]}
          radioLabelActive={[styles.activeRadioLabel,fonts.hindGunturBd]}
          labelWrapStyle={styles.radioLabelWrap}
          onPress={(value) => {this.props.hideOrderTypes()}}
          style={order.radioField}
        />
      </View>
    )
  }
}

// export default OrderTypes;
OrderTypes.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(OrderTypes);
