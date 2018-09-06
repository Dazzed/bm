/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGlobalData } from '../selectors';
import moment from 'moment';
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
  TouchableOpacity,
  ActivityIndicator,
  Linking
} from 'react-native';
import Modal from 'react-native-modal'
import Tabs from 'react-native-tabs';
import {setTheme, getTheme, colors} from '../store/store';
import styles from '../style/style';
import chartnews from '../style/chartnews';
import fonts from '../style/fonts';
import trending from "../style/trending";
// var colors = require('../style/colors')
import { observer } from 'mobx-react';
import { newsStore } from "../mobxStores";

@observer
class ChartNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isScanVisible: false,
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

  componentDidMount() {
    const { getNewsData } = newsStore;
    let ticker = this.props.ticker;
    let companyName = this.props.companyName;
    getNewsData({ticker: companyName})
  }

  newsPressed(elem) {
    console.log('news pressed', elem)
    if(elem) {
      if(elem.url) {
        
        Linking.canOpenURL(elem.url).then( supported => {
          if (!supported) {
            console.log('Can\'t handle url: ' + elem.url);
          } else {
            return Linking.openURL(elem.url);
          }
        }).catch((err) => {
          console.error('An error occurred', err)
        });
        
      }
    }
  }
  

  renderList() {
    const { newsDataLoading, newsArticleListJS } = newsStore;

    if(newsDataLoading) {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator />
        </View>
    } else if( newsArticleListJS.length === 0) {
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
        </View>
    } else {
        return <ScrollView style={chartnews.container}>
            {newsArticleListJS.map((elem, i) => {

                let formattedTime = '';
                let currentMoment = moment().format('X');
                let parsedTime = moment(elem.publishedAt).format('X');

                let secondsAway = currentMoment - parsedTime;
                let hoursAway = secondsAway / 3600;
                let daysAway = hoursAway / 24;

                if(hoursAway > 24 && hoursAway < 48) {
                  formattedTime = parseInt(daysAway) + ' day ago'
                } else if(hoursAway > 48) {
                  formattedTime = parseInt(daysAway) + ' days ago'
                } else {
                  formattedTime = parseInt(hoursAway) + 'h ago'
                }

                return <View key={i} style={[{borderBottomColor: this.state.colors['borderGray']}, chartnews.row]}>
                    <TouchableOpacity onPress={() => this.newsPressed(elem)} style={chartnews.rowBtn}>
                        <Image
                            source={{ uri: elem.urlToImage }}
                            style={chartnews.image}
                        />
                        <View style={chartnews.label}>
                            <Text style={[{color: this.state.colors['darkSlate']}, chartnews.txt]}>{elem.title}</Text>
                            <Text style={[{color: this.state.colors['lightGray']}, chartnews.detailTxt]}>{elem.source.name} - {formattedTime}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            })}
        </ScrollView>
    }

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
            <Text style={[{color: this.state.colors['darkSlate']}, styles.boldTitle, fonts.hindGunturBd]}>{this.state.page}{this.props.ticker} News</Text>
          </View>
        </View>
          {this.renderList()}
      </View>
    );
  }
}

// export default ChartNews;
ChartNews.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(ChartNews);
