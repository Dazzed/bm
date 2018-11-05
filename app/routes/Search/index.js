import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { observer } from 'mobx-react';

import { selectGlobalData } from '../../selectors';
import trending from '../../style/trending';
import fonts from '../../style/fonts';
import { colors } from '../../store/store';
import styles from '../../style/style';
import watchstyle from '../../style/watchlist';
import search from '../../style/search';
import { watchListStore, searchStore, colorStore } from '../../mobxStores';

import SearchHelper from './SearchHelper';

@observer
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'presets',
      showCancel: 0,
      searchTerm: '',
      colors: colors(props.globalData.isDarkThemeActive),
      loading: false // Fix for watchlist update
    };
  }

  componentWillUnmount() {
    searchStore.reset();
    this.setState({
      searchTerm: ''
    });
  }

  addSymbol = ticker => {
    const okCallback = () => {
      watchListStore.addTickerToWatchList(ticker);
      this.setState({
        loading: true
      }, () => this.setState({ loading: false }));
    };
    Alert.alert(
      '',
      'Add ' + ticker + ' to your watchlist?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: okCallback },
      ],
      { cancelable: true }
    )
  }

  removeSymbol = ticker => {
    const okCallback = () => {
      watchListStore.removeTickerFromWatchList(ticker);
      this.setState({
        loading: true
      }, () => this.setState({ loading: false }));
    };
    Alert.alert(
      '',
      'Remove ' + ticker + ' from your watchlist?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: okCallback },
      ],
      { cancelable: true }
    )
  }

  goToChart(data) {
    setTimeout(this.props.hideSearch, 0.5)

    console.log('============ go to chart', data);

    this.props.navigation.navigate('Chart', { data: data })
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

  fetchMoreData = evt => {
    if (evt.nativeEvent.contentOffset.y !== 0) {
      searchStore.fetchMoreData();
    }
  }

  forwardSearchTermToMobx = () => {
    searchStore.setSearchQuery(this.state.searchTerm)
  }

  textInputChanged = text => {
    console.log(101, text);
    this.setState({
      searchTerm: text,
    }, this.forwardSearchTermToMobx);
  }

  onTapSearchHelper = customList => {
    this.setState({
      searchTerm: customList.name.trim(),
    }, () => {
      searchStore.fetchCustomListTickers(customList.id);
    });
  }

  renderListElement = (data, i) => {
    return <TouchableOpacity
      key={i}
      style={[{ borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
      onPress={() => this.goToChart(data)}>
      <View style={watchstyle.touchable}>
        <View style={search.symDetails}>
          <Text style={[watchstyle.symName, fonts.hindGunturRg, { color: this.state.colors['darkSlate'] }]}>{data['ticker']}</Text>
          <Text style={[watchstyle.coName, fonts.hindGunturRg, { color: this.state.colors['lightGray'] }]}>
            {
              data['companyName'] ? (
              data['companyName'].length > 23 ?
                `${data['companyName'].slice(0, 20)}...` :
                data['companyName'] ) : 'N/A'
            }
          </Text>
        </View>
        <View style={watchstyle.symCost}>
          {this.renderAddToWatchlistTouchable(data['ticker'])}
        </View>
      </View>
    </TouchableOpacity>
  }

  renderAddToWatchlistTouchable = ticker => {
    const { isTickerInWatchlist } = watchListStore;
    let image = this.state.colors['addImage'];
    let functionToFire = this.addSymbol;
    if (isTickerInWatchlist(ticker)) {
      image = this.state.colors['watchlistAdded'];
      functionToFire = this.removeSymbol;
    }
    return <TouchableOpacity style={styles.rightCta} onPress={functionToFire.bind(this, ticker)}>
      <Image source={image} style={{ width: 23, height: 23 }} />
    </TouchableOpacity>
  }

  renderListOrSearchView = () => {
    const { searchData, searchDataJS, isFetchingMoreData } = searchStore;
    const { theme } = colorStore;
    console.log('============= render search view', searchData, searchDataJS)
    if (searchData === null) {
      return (
        <SearchHelper
          parentState={this.state}
          customLists={searchStore.customLists || []}
          onTapSearchHelper={this.onTapSearchHelper}
        />
      );
    }
    if (!searchDataJS || searchDataJS.result.length === 0) {
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 200 }}>
        <Text style={[{ color: theme.lightGray }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
      </View>
    } else {
      if (isFetchingMoreData) {
        return searchDataJS.result.map((elem, i) => {
          return this.renderListElement(elem, i)
        })
          .concat(
            <TouchableOpacity
              key={'search_list_loading'}
            style={[{ borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
              </View>
            </TouchableOpacity>
          )
      }
      return searchDataJS.result.map((elem, i) => {
        return this.renderListElement(elem, i)
      })
    }
  }

  renderLoadingWheelOrContent = () => {
    const { searchLoading } = searchStore;
    if (searchLoading || this.state.loading) {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    } else {
      return (
        <ScrollView
          style={[{ backgroundColor: this.state.colors['contentBg'] }]}
          onMomentumScrollEnd={this.fetchMoreData}
        >
          {this.renderListOrSearchView()}
        </ScrollView>
      );
    }
  }

  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, { backgroundColor: this.state.colors['white'] }, styles.menuBorder, styles.menuBorderptions]}>
          <View style={styles.menuContainer}>
            <View style={search.leftCta}>
              <Image
                source={require('../../images/search.png')}
                style={search.searchingImg}
              />
              <TextInput style={[{ color: this.state.colors['darkSlate'] }, search.leftInput, fonts.hindGunturRg]}
                placeholder="Search Stocks"
                placeholderTextColor={this.state.colors['lightGray']}
                keyboardType="default"
                autoFocus={true}
                value={this.state.searchTerm}
                onChangeText={this.textInputChanged}
              />
              <View style={[search.searchcancel, { opacity: this.state.showCancel }]}>
                <TouchableOpacity onPress={() => this.showSearchPreset('presets')}>
                  <Image source={this.state.colors['searchCancelImage']} style={{ width: 23, height: 23 }} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.rightCta2]}>
              <TouchableOpacity onPress={this.props.hideSearch}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.rightCtaTxt2, fonts.hindGunturRg]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {this.renderLoadingWheelOrContent()}
      </SafeAreaView>
    )
  }
}

Search.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  hideSearch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Search);
