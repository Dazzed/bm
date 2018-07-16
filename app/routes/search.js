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
  Alert,
    ActivityIndicator
} from 'react-native';

import Modal from 'react-native-modal'
import {setTheme, getTheme, colors} from '../store/store';

import OrderTypes from './ordertypes';
import OrderPlaced from './orderplaced';

import styles from '../style/style';
import watchstyle from '../style/watchlist';
import search from '../style/search';
import fonts from '../style/fonts';
import { observer } from 'mobx-react';
import { watchListStore, searchStore } from "../mobxStores";

@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds2 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const ds3 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      topTech: ds.cloneWithRows([
        {ticker: 'APPL', companyName: 'Apple'},
        {ticker: 'MSFT', companyName: 'Microsoft'},
        {ticker: 'GOOGL', companyName: 'Alphabet'},
        {ticker: 'AMZN', companyName: 'Amazon'},
        {ticker: 'FB', companyName: 'Facebook'},
        {ticker: 'BABA', companyName: 'Alibaba'},
        {ticker: 'IBM', companyName: 'IBM'},
        {ticker: 'INTC', companyName: 'Intel'},
        {ticker: 'ORCL', companyName: 'Oracle'},
        {ticker: 'TSLA', companyName: 'Tesla'},
        ]),
      bioTech: ds1.cloneWithRows([
        {ticker: 'AMGN', companyName: 'Amgen'},
        {ticker: 'ABBV', companyName: 'AbbVie'},
        {ticker: 'CELG', companyName: 'Celgene'},
        {ticker: 'GILD', companyName: 'Gilead Sciences'},
        {ticker: 'BIIB', companyName: 'Biogen'},
        {ticker: 'REGN', companyName: 'Regeneron Pharmaceuticals'},
        {ticker: 'INCY', companyName: 'Incyte'},
        {ticker: 'VRTX', companyName: 'Vertex Pharmaceuticals'},
        {ticker: 'IONS', companyName: 'Ionis Pharmaceuticals'},
        {ticker: 'ACAD', companyName: 'Acadia Pharmaceuticals'},
        ]),
      crypto: ds2.cloneWithRows([
        {ticker: 'Bitcoin', companyName: 'Bitcoin'},
        {ticker: 'Ethereum', companyName: 'Ethereum'},
        {ticker: 'Ripple', companyName: 'Ripple'},
        {ticker: 'NEM', companyName: 'NEM'},
        {ticker: 'Litecoin', companyName: 'Litecoin'},
        {ticker: 'Dash', companyName: 'Dash'},
        {ticker: 'Stratis', companyName: 'Stratis'},
        {ticker: 'Monero', companyName: 'Monero'},
        {ticker: 'Steem', companyName: 'Steem'},
        {ticker: 'Waves', companyName: 'Waves'},
        ]),
      cannabis: ds3.cloneWithRows([
        {companyName: 'GW Pharmaceuticals', ticker: 'GWPH'},
        {companyName: 'AbbVie', ticker: 'ABBV'},
        {companyName: 'Scotts Miracle-Gro', ticker: 'SMG'},
        {companyName: 'Corbus Pharmaceuticals', ticker: 'CRBP'},
        {companyName: 'Insys Therapeutics', ticker: 'INSY'},
        {companyName: 'Cara Therapeutics', ticker: 'CARA'},
        {companyName: 'Arna Pharmaceuticals', ticker: 'ARNA'},
        {companyName: 'Axim Biotechnologies', ticker: 'AXIM'},
        {companyName: 'Canopy Growth', ticker: 'TWMJF'},
        {companyName: 'Aphria', ticker: 'APHQF'},
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
        {text: 'OK', onPress: () => watchListStore.addTickerToWatchList(sym)},
      ],
      { cancelable: true }
    )
  }
  hideSearch() {
    this.props.hideSearch();
  }
  goToChart(data) {
    setTimeout(() => {this.props.hideSearch()}, 0.5)

      console.log('============ go to chart', data);

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

    forwardSearchTermToMobx() {
      searchStore.setSearchQuery(this.state.searchTerm)
    }

    textInputChanged(text) {
        this.setState({ searchTerm: text }, () => {
          this.forwardSearchTermToMobx()
        })
    }

    showSearchPreset(search) {
    if(search == 'toptech'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Top Tech Companies'}, () => {
      });
    } else if(search == 'biotech'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Hot Biotech Companies'}, () => {
      });
    } else if(search == 'crypto'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Best Cryptocurrencies'}, () => {
      });
    } else if(search == 'cannabis'){
      this.setState({showCancel: 1, page: search, searchTerm: 'Top Cannabis Stocks'}, () => {
      });
    } else {
      this.setState({showCancel: 0, page: search, searchTerm: ''}, () => {
        this.forwardSearchTermToMobx()
      });
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
        return this.renderPreCompiledList(this.state.topTech)
        break;
      case 'biotech':
        return this.renderPreCompiledList(this.state.bioTech)
        break;
      case 'cannabis':
        return this.renderPreCompiledList(this.state.cannabis)
        break;
      case 'crypto':
        return this.renderPreCompiledList(this.state.crypto)
        break;
    }
  }

  renderListElement(data, i) {
    return <TouchableOpacity
        key={i}
        style={watchstyle.symbol}
        onPress={() => this.goToChart(data)}>
        <View style={watchstyle.touchable}>
            <View style={search.symDetails}>
                <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['ticker']}</Text>
                <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>{data['companyName'].length > 23 ? `${data['companyName'].slice(0, 20)}...` : data['companyName']}</Text>
            </View>
            <View style={watchstyle.symCost}>
                {this.renderAddToWatchlistTouchable(data['ticker'])}
            </View>
        </View>
    </TouchableOpacity>
  }

  renderPreCompiledList(dataSource) {
      return <View style={search.results}>
          <ListView
              style={watchstyle.symbolContainer}
              dataSource={dataSource}
              renderRow={(data, i) => {
                return this.renderListElement(data, i)
              }}
          />
      </View>
  }


  renderAddToWatchlistTouchable(ticker) {
    let source = this.state.colors['addImage'];
    if(false) {
      // check for watchlist presence and overwrite source here
    }
    return <TouchableOpacity style={search.symbolsAdd} onPress={(value) => {this.addSymbol(ticker)}} >
        <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
    </TouchableOpacity>
  }


    renderListOrSearchView() {
        const { searchData, searchDataJS } = searchStore;

        if(searchData === null) {
            return this.getSearchView()
        }
        if(searchDataJS.length === 0) {
          return <View>
            <Text>No results</Text>
          </View>
        } else {
          return searchDataJS.map((elem, i) => {
            return this.renderListElement(elem, i)
          })
        }
    }

    renderLoadingWheel() {
      const { searchLoading } = searchStore;
      if(searchLoading) {
        return <View>
          <ActivityIndicator />
        </View>
      } else {
        return null;
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
                  onChangeText={(text) => this.textInputChanged(text)}
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
            {this.renderLoadingWheel()}
            {this.renderListOrSearchView()}
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
