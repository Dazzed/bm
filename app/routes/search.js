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
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Dimensions,
  Alert
} from 'react-native';

import Modal from 'react-native-modal'
import {setTheme, getTheme, colors} from '../store/store';

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import watchstyle from '../style/watchlist';
import search from '../style/search';
import fonts from '../style/fonts';

class Search extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds3 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      topTech: ds.cloneWithRows([
        {sym: 'APPL', name: 'Apple'}, 
        {sym: 'MSFT', name: 'Microsoft'},
        {sym: 'GOOGL', name: 'Alphabet'},
        {sym: 'AMZN', name: 'Amazon'},
        {sym: 'FB', name: 'Facebook'},
        {sym: 'BABA', name: 'Alibaba'},
        {sym: 'IBM', name: 'IBM'},
        {sym: 'INTC', name: 'Intel'},
        {sym: 'ORCL', name: 'Oracle'},
        {sym: 'TSLA', name: 'Tesla'},
        ]),
      bioTech: ds1.cloneWithRows([
        {sym: 'AMGN', name: 'Amgen'}, 
        {sym: 'ABBV', name: 'AbbVie'},
        {sym: 'CELG', name: 'Celgene'},
        {sym: 'GILD', name: 'Gilead Sciences'},
        {sym: 'BIIB', name: 'Biogen'},
        {sym: 'REGN', name: 'Regeneron Pharmaceuticals'},
        {sym: 'INCY', name: 'Incyte'},
        {sym: 'VRTX', name: 'Vertex Pharmaceuticals'},
        {sym: 'IONS', name: 'Ionis Pharmaceuticals'},
        {sym: 'ACAD', name: 'Acadia Pharmaceuticals'},
        ]),
      crypto: ds2.cloneWithRows([
        {sym: 'Bitcoin', name: 'Bitcoin'}, 
        {sym: 'Ethereum', name: 'Ethereum'},
        {sym: 'Ripple', name: 'Ripple'},
        {sym: 'NEM', name: 'NEM'},
        {sym: 'Litecoin', name: 'Litecoin'},
        {sym: 'Dash', name: 'Dash'},
        {sym: 'Stratis', name: 'Stratis'},
        {sym: 'Monero', name: 'Monero'},
        {sym: 'Steem', name: 'Steem'},
        {sym: 'Waves', name: 'Waves'},
        ]),
      cannabis: ds3.cloneWithRows([
        {sym: 'GW Pharmaceuticals', name: 'GWPH'}, 
        {sym: 'AbbVie', name: 'ABBV'},
        {sym: 'Scotts Miracle-Gro', name: 'SMG'},
        {sym: 'Corbus Pharmaceuticals', name: 'CRBP'},
        {sym: 'Insys Therapeutics', name: 'INSY'},
        {sym: 'Cara Therapeutics', name: 'CARA'},
        {sym: 'Arna Pharmaceuticals', name: 'ARNA'},
        {sym: 'Axim Biotechnologies', name: 'AXIM'},
        {sym: 'Canopy Growth', name: 'TWMJF'},
        {sym: 'Aphria', name: 'APHQF'},
        ]),
      page: 'presets',
      showCancel: 0,
      searchTerm: '',
      colors: colors(props.globalData.isDarkThemeActive)
    };

  }
  addSymbol(sym){
    Alert.alert(
      '',
      'You added '+sym+' to your watchlist.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true }
    )
  }
  hideSearch() {
    this.props.hideSearch();
  }
  goToChart(data) {
    setTimeout(() => {this.props.hideSearch()}, 0.1)
    this.props.navigation.navigate('Chart', {data: data})
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

  showSearchPreset(search) {
    if(search == 'toptech'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Top Tech Companies'});
    } else if(search == 'biotech'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Hot Biotech Companies'});
    } else if(search == 'crypto'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Best Cryptocurrencies'});
    } else if(search == 'cannabis'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Top Cannabis Stocks'});
    } else {
      this.setState({showCancel: 0, page: search, searchTerm: ''});
    }
  }
  getSearchView() {
    switch (this.state.page) {
      case 'presets':
        return <View style={[search.searchPresets, { backgroundColor: this.state.colors['contentBg']}]}>
          <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }]}>
            <View style={[{ backgroundColor: this.state.colors['contentBg'] }, search.presetContainer]}>
              <Text style={search.title}>Search by company or symbol</Text>
              <TouchableOpacity style={styles.bluebtn} onPress={() => {this.showSearchPreset('toptech')}}>
                <Text style={[styles.touchblueOption, fonts.hindGunturMd]}>Top Tech Companies</Text>
              </TouchableOpacity>            
              <TouchableOpacity style={styles.bluebtn} onPress={() => {this.showSearchPreset('biotech')}}>
                <Text style={[styles.touchblueOption, fonts.hindGunturMd]}>Hot Biotech Companies</Text>
              </TouchableOpacity>            
              <TouchableOpacity style={styles.bluebtn} onPress={() => {this.showSearchPreset('crypto')}}>
                <Text style={[styles.touchblueOption, fonts.hindGunturMd]}>Best Cryptocurrencies</Text>
              </TouchableOpacity>            
              <TouchableOpacity style={styles.bluebtn} onPress={() => {this.showSearchPreset('cannabis')}}>
                <Text style={[styles.touchblueOption, fonts.hindGunturMd]}>Top Cannabis Stocks</Text>
              </TouchableOpacity>            
            </View>
          </ScrollView>   
        </View>
        break;
      case 'toptech':
        return <View style={search.results}>
          <ListView
            style={watchstyle.symbolContainer}
            dataSource={this.state.topTech}
            renderRow={(data) => 
              <TouchableOpacity 
                style={watchstyle.symbol}
                onPress={() => this.goToChart(data)}>
                <View style={watchstyle.touchable}>
                  <View style={search.symDetails}>
                    <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['sym']}</Text>
                    <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>{data['name']}</Text>
                  </View>
                  <View style={watchstyle.symCost}>
                    <TouchableOpacity style={search.symbolsAdd} onPress={(value) => {this.addSymbol(data['sym'])}} >
                      <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
                    </TouchableOpacity>
                  </View>
                </View>    
              </TouchableOpacity>
              }
            />
        </View>
        break;
      case 'biotech':
        return <View style={search.results}>
          <ListView
            style={watchstyle.symbolContainer}
            dataSource={this.state.bioTech}
            renderRow={(data) => 
              <TouchableOpacity 
                style={watchstyle.symbol}
                onPress={() => this.goToChart(data)}>
                <View style={watchstyle.touchable}>
                  <View style={search.symDetails}>
                    <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['sym']}</Text>
                    <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>{data['name']}</Text>
                  </View>
                  <View style={watchstyle.symCost}>
                    <TouchableOpacity style={search.symbolsAdd} onPress={(value) => {this.addSymbol(data['sym'])}} >
                      <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
                    </TouchableOpacity>
                  </View>
                </View>    
              </TouchableOpacity>
              }
            />
        </View>
        break;
      case 'cannabis':
        return <View style={search.results}>
          <ListView
            style={watchstyle.symbolContainer}
            dataSource={this.state.cannabis}
            renderRow={(data) => 
              <TouchableOpacity 
                style={watchstyle.symbol}
                onPress={() => this.goToChart(data)}>
                <View style={watchstyle.touchable}>
                  <View style={search.symDetails}>
                    <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['sym']}</Text>
                    <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>{data['name']}</Text>
                  </View>
                  <View style={watchstyle.symCost}>
                    <TouchableOpacity style={search.symbolsAdd} onPress={(value) => {this.addSymbol(data['sym'])}} >
                      <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
                    </TouchableOpacity>
                  </View>
                </View>    
              </TouchableOpacity>
              }
            />
        </View>
        break;
      case 'crypto':
        return <View style={search.results}>
          <ListView
            style={watchstyle.symbolContainer}
            dataSource={this.state.crypto}
            renderRow={(data) => 
              <TouchableOpacity 
                style={watchstyle.symbol}
                onPress={() => this.goToChart(data)}>
                <View style={watchstyle.touchable}>
                  <View style={search.symDetails}>
                    <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['sym']}</Text>
                    <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>{data['name']}</Text>
                  </View>
                  <View style={watchstyle.symCost}>
                    <TouchableOpacity style={search.symbolsAdd} onPress={(value) => {this.addSymbol(data['sym'])}} >
                      <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
                    </TouchableOpacity>
                  </View>
                </View>    
              </TouchableOpacity>
              }
            />
        </View>
        break;
    }
  }  

  render() {
    return(
      <View style={[{backgroundColor: this.state.colors['white']}, styles.pageContainer]}>
        <View style={[{borderBottomColor: this.state.colors['borderGray']}, {backgroundColor: this.state.colors['white']}, styles.menuBorder, styles.menuBorderptions]}>
          <View style={styles.menuContainer}>
            <View style={search.leftCta}>
                <Image 
                  source={require('../images/search.png')}
                  style={search.searchingImg}
                />
                <TextInput style={[{color: this.state.colors['darkSlate']}, search.leftInput, fonts.hindGunturBd]}
                  placeholder="Search Stocks"
                  placeholderTextColor={this.state.colors['lightGray']}
                  keyboardType="default"
                  autoFocus={true}
                  value={this.state.searchTerm}
                  onChangeText={(text) => this.setState({ searchTerm: text })}
                  />
                <View style={[search.searchcancel, {opacity: this.state.showCancel}]}>
                 <TouchableOpacity onPress={() => this.showSearchPreset('presets')}>
                  <Image source={this.state.colors['searchCancelImage']} style={{ width: 23, height: 23 }} />
                </TouchableOpacity> 
                </View>     
            </View>
            <View style={[styles.rightCta2]}>
              <TouchableOpacity onPress={() => this.hideSearch()}>
                <Text style={[{color: this.state.colors['lightGray']}, styles.rightCtaTxt2, fonts.hindGunturRg]}>Cancel</Text>
              </TouchableOpacity>         
            </View>   
          </View>
        </View>
        <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }]}>
        {this.getSearchView()}
        </ScrollView>
      </View>
    )
  }
}

// export default Search;
Search.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Search);
