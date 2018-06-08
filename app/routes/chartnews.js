/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableHighlight,
  TabbedArea,
  TabPane,
  TouchableOpacity
} from 'react-native';

import Modal from 'react-native-modal'

import Tabs from 'react-native-tabs';
import {setTheme, getTheme, colors} from '../store/store';

import styles from '../style/style';
import chartnews from '../style/chartnews';
import fonts from '../style/fonts';

// var colors = require('../style/colors')

class ChartNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isScanVisible: false
    };
  }
  componentWillMount(){
    this.setState({colors: colors()});
  }  
  render() {
    return (
      <View style={[{backgroundColor: this.state.colors['white']}, styles.container]}>
        <View style={[{borderBottomColor: this.state.colors['borderGray']}, styles.menuBorderptions]}>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.leftCta} onPress={() => this.props.hideNews()}>
              <Image 
                source={require('../images/close.png')}
                style={styles.closeImg}
              />
            </TouchableOpacity>
            <Text style={[{color: this.state.colors['darkSlate']}, styles.boldTitle, fonts.hindGunturBd]}>{this.state.page} APPL News</Text>
          </View>
        </View>
        <ScrollView style={chartnews.container}>
              <View style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                <TouchableOpacity style={chartnews.rowBtn}>
                  <Image
                    source={require('../images/new01.png')}
                    style={chartnews.image}
                  />                  
                  <View style={chartnews.label}>
                    <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>Apple Working on AI Processor Chip Called Apple Neural Engine</Text>
                    <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>CNBC - 7h ago</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                <TouchableOpacity style={chartnews.rowBtn}>
                  <Image
                    source={require('../images/new02.png')}
                    style={chartnews.image}
                  />                  
                  <View style={chartnews.label}>
                    <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>Apple Inc. (NASDAQ:AAPL) iPhone 8 Changes</Text>
                    <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>CNBC - 7h ago</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                <TouchableOpacity style={chartnews.rowBtn}>
                  <Image
                    source={require('../images/new03.png')}
                    style={chartnews.image}
                  />                  
                  <View style={chartnews.label}>
                    <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>Apple Inc. (AAPL) Is Battling Nintendo For Important Tech Components</Text>
                    <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>CNBC - 7h ago</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                <TouchableOpacity style={chartnews.rowBtn}>
                  <Image
                    source={require('../images/new04.png')}
                    style={chartnews.image}
                  />                  
                  <View style={chartnews.label}>
                    <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>Why Techs Will Fly Higher: A Technical View (FB, AAPL)</Text>
                    <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>CNBC - 7h ago</Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                <TouchableOpacity style={chartnews.rowBtn}>
                  <Image
                    source={require('../images/new05.png')}
                    style={chartnews.image}
                  />                  
                  <View style={chartnews.label}>
                    <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>Early movers: C, PPG, AAPL, HES, SPG, ZNGA & more</Text>
                    <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>CNBC - 7h ago</Text>
                  </View>
                </TouchableOpacity>
              </View>
          </ScrollView>
      </View>
    );
  }
}

export default ChartNews;
