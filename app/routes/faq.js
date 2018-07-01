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
  Dimensions
} from 'react-native';

import Modal from 'react-native-modal'

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import fonts from '../style/fonts';

import { setTheme, getTheme, colors } from '../store/store';

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
      faqs: [],
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/api/faqs`).then(res => {
      this.setState({
        faqs: res.data
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

  renderFaq() {
    return this.state.faqs.map((faq, index) => (
      <View key={index}>
        <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalTitle, fonts.hindGunturRg]}>{faq.question.replace(/<p>/g, '').replace(/<\/p>/g, '')}</Text>
        <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalTxt, fonts.hindGunturRg]}>{faq.answer.replace(/<p>/g, '').replace(/<\/p>/g, '')}</Text>
      </View>
    ));
  }
  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideFaq()}>
              <Image
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{ color: this.state.colors['darkSlate'] }, styles.legalPageTitle, fonts.hindGunturBd]}>Frequenty asked questions</Text>
            <Text style={styles.rightCta}></Text>
          </View>
        </View>
        <ScrollView style={[{ borderTopColor: this.state.colors['borderGray'] }, styles.legalContainer]}>
          {this.renderFaq()}
        </ScrollView>
      </View>
    )
  }
}

// export default Faq;
Faq.propTypes = {
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Faq);
