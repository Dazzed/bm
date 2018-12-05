/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import axios from 'axios';
import { API_URL } from '../config';

import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  WebView,
  ScrollView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Dimensions,
  SafeAreaView
} from 'react-native';

import Modal from 'react-native-modal'

import styles from '../style/style';
import fonts from '../style/fonts';

import {setTheme, getTheme, colors} from '../store/store';

class Terms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
      commonHtml: ``,  
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  componentDidMount() {
    // { "where": { "page": "tnc" } }
    axios.get(`${API_URL}/api/staticContents/findOne?filter={ "where": { "page": "tnc" } }`).then(res => {
      const style_tag = `<style>
              @font-face {font-family: 'HindGuntur-Regular';src: url('file:///assets/fonts/HindGuntur-Regular.ttf') format('truetype');};
               </style><body style="color: ${this.state.colors['darkSlate']}; background: ${this.state.colors['white']}">`;
      let html = res.data.content;
      html = html.replace(/<h1/g, '<h1 style="line-height: 1.1; font-family: HindGuntur-Regular; font-size: 88; font-weight:100"');
      html = html.replace(/<h2/g, '<h2 style="line-height: 1.1; font-family: HindGuntur-Regular; font-size: 72; font-weight:100"');
      html = html.replace(/<h3/g, '<h3 style="line-height: 1.1; font-family: HindGuntur-Regular; font-size: 64; font-weight:100"');
      html = html.replace(/<p/g, '<p style="white-space: pre-wrap; line-height: 1.4; font-family: HindGuntur-Regular; font-size: 48; font-weight:100"');
      html = html.replace(/<a/g, '<a style="white-space: pre-wrap;" ');
      html = html.replace(/<strong>/g, '');
      html = html.replace(/<\/strong>/g, '');
      html = style_tag + html + '</body>';
      this.setState({
        commonHtml: html
      })
    })
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
    const {height, width} = Dimensions.get('window');
    return(
      <SafeAreaView style={[{backgroundColor: this.state.colors['white']}, styles.pageContainer]}>
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
        <ScrollView style={[{borderTopColor: this.state.colors['borderGray']}, styles.legalContainer, {paddingTop: 10}]}>
         <WebView style={{width: (width - 80), height: (height - 180)}} source={{html: this.state.commonHtml}} />
        </ScrollView>
        <View style={[{borderTopColor: this.state.colors['borderGray']}, styles.legalAgree]}>
        <TouchableOpacity style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']},  styles.fullBtn]} onPress={() => this.props.hideTerms()}>
          <Text style={[{color: this.state.colors['white']}, styles.fullBtnTxt, fonts.hindGunturBd]}>AGREE</Text>
        </TouchableOpacity>            
        </View>
      </SafeAreaView>
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
