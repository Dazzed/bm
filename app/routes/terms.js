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
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal'

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
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

  render() {
    return(
      <View style={[{backgroundColor: this.state.colors['white']}, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideTerms()}>
              <Image 
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{color: this.state.colors['darkSlate']}, styles.legalPageTitle, fonts.hindGunturBd]}>Terms & Conditions</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <ScrollView style={[{borderTopColor: this.state.colors['borderGray']}, styles.legalContainer]}>
          <Text style={[{color: this.state.colors['darkSlate']}, styles.legalTitle, fonts.hindGunturRg]}>Privacy</Text>
          <Text style={[{color: this.state.colors['darkSlate']}, styles.legalTxt, fonts.hindGunturRg]}>
Consectetur adipiscing elit. Praesent justo turpis, varius quis porttitor nec, finibus id dui. Nullam ac nulla scelerisque, pharetra justo in, tempor urna.
Integer vitae nisl venenatis, iaculis neque a, euismod massa. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. 
          </Text>
          <Text style={[{color: this.state.colors['darkSlate']}, styles.legalTitle, fonts.hindGunturRg]}>Sharing your informations</Text>
          <Text style={[{color: this.state.colors['darkSlate']}, styles.legalTxt, fonts.hindGunturRg]}>
Metus Nunc dignissim laoreet felis id pharetra. Fusce lobortis est ut dui facilisis vulputate. Suspendisse posuere urna nec dui iaculis, vel posuere augue porttitor. Aliquam ultricies mauris sed turpis laoreet ultricies          
          </Text>
        </ScrollView>
        <View style={[{borderTopColor: this.state.colors['borderGray']}, styles.legalAgree]}>
        <TouchableOpacity style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']},  styles.fullBtn]} onPress={() => this.props.hideTerms()}>
          <Text style={[{color: this.state.colors['white']}, styles.fullBtnTxt, fonts.hindGunturBd]}>AGREE</Text>
        </TouchableOpacity>            
        </View>
      </View>
    )
  }
}

// export default Terms;
Terms.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Terms);
