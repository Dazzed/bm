/*  https://github.com/react-native-community/react-native-modal
    https://github.com/oblador/react-native-animatable
    */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  ListView,
  ScrollView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../components/react-native-simple-radio-button';

import fonts from '../../style/fonts';
import navstyle from '../../style/nav';

import { setTheme, getTheme, colors } from '../../store/store';
import { selectGlobalData } from '../../selectors';

import { observer } from 'mobx-react';
import { trendingStore, watchListStore } from '../../mobxStores';

import {
  scan_props,
  sector_props,
  industry_utilities,
  industry_telecomm,
  industry_realestate,
  industry_materials,
  industry_infotech,
  industry_industrials,
  industry_health,
  industry_financials,
  industry_energy,
  industry_consumerstaples,
  industry_consumerdiscretionary
} from '../../constants';

// var scan_props = [
//   { label: 'Top volume', value: 0 },
//   { label: '% Gainers', value: 1 },
//   { label: '% Losers', value: 2 },
// ];
// 
// var sector_props = [
//   { label: 'All', value: 0 },
//   { label: 'Consumer Discretionary', value: 1 },
//   { label: 'Consumer Staples', value: 2 },
//   { label: 'Energy', value: 3 },
//   { label: 'Financials', value: 4 },
//   { label: 'Health Care', value: 5 },
//   { label: 'Industrials', value: 6 },
//   { label: 'Information Technology', value: 7 },
//   { label: 'Materials', value: 8 },
//   { label: 'Real Estate', value: 9 },
//   { label: 'Telecommunication Services', value: 10 },
//   { label: 'Utilities', value: 11 }
// ];
// 
// var industry_utilities = [
//   { label: 'All', value: 0 },
//   { label: 'Electric Utilities', value: 1 },
//   { label: 'Gas Utilities', value: 2 },
//   { label: 'Independent Power and Renewable Electricity Producers', value: 3 },
//   { label: 'Multi-Utilities', value: 4 },
//   { label: 'Water Utilities', value: 5 },
// ];
// 
// var industry_telecomm = [
//   { label: 'All', value: 0 },
//   { label: 'Diversified Telecommunication Services', value: 1 },
//   { label: 'Wireless Telecommunication Services', value: 2 },
// ];
// 
// var industry_realestate = [
//   { label: 'All', value: 0 },
//   { label: 'Equity Real Estate Investment Trusts', value: 1 },
//   { label: 'Real Estate Management & Development', value: 2 },
// ];
// 
// var industry_materials = [
//   { label: 'All', value: 0 },
//   { label: 'Chemicals', value: 1 },
//   { label: 'Construction Materials', value: 2 },
//   { label: 'Containers & Packaging', value: 3 },
//   { label: 'Metals & Mining', value: 4 },
//   { label: 'Paper & Forest Products', value: 5 },
// ];
// 
// var industry_infotech = [
//   { label: 'All', value: 0 },
//   { label: 'Communications Equipment', value: 1 },
//   { label: 'Electronic Equipment, Instruments & Components', value: 2 },
//   { label: 'IT Services', value: 3 },
//   { label: 'Internet Software & Services', value: 4 },
//   { label: 'Semiconductors & Semiconductor Equipment', value: 5 },
//   { label: 'Software', value: 6 },
//   { label: 'Technology Hardware, Storage & Peripherals', value: 7 },
// ];
// 
// var industry_industrials = [
//   { label: 'All', value: 0 },
//   { label: 'Aerospace & Defense', value: 1 },
//   { label: 'Air Freight & Logistics', value: 2 },
//   { label: 'Airlines', value: 3 },
//   { label: 'Building Products', value: 4 },
//   { label: 'Commercial Services & Supplies', value: 5 },
//   { label: 'Construction & Engineering', value: 6 },
//   { label: 'Electrical Equipment', value: 7 },
//   { label: 'Industrial Conglomerates ', value: 8 },
//   { label: 'Machinery', value: 9 },
//   { label: 'Marine', value: 10 },
//   { label: 'Professional Services', value: 11 },
//   { label: 'Road & Rail', value: 12 },
//   { label: 'Trading Companies & Distributors', value: 13 },
//   { label: 'Transportation Infrastructure', value: 14 },
// ];
// 
// var industry_health = [
//   { label: 'All', value: 0 },
//   { label: 'Biotechnology', value: 1 },
//   { label: 'Health Care Equipment & Supplies', value: 2 },
//   { label: 'Health Care Providers & Services', value: 3 },
//   { label: 'Health Care Technology', value: 4 },
//   { label: 'Life Sciences Tools & Services', value: 5 },
//   { label: 'Pharmaceuticals', value: 6 },
// ];
// 
// var industry_financials = [
//   { label: 'All', value: 0 },
//   { label: 'Banks', value: 1 },
//   { label: 'Capital Markets', value: 2 },
//   { label: 'Consumer Finance', value: 3 },
//   { label: 'Diversified Financial Services', value: 4 },
//   { label: 'Insurance', value: 5 },
//   { label: 'Mortgage REITs', value: 6 },
//   { label: 'Thrifts & Mortgage Finance ', value: 7 },
// ];
// 
// var industry_energy = [
//   { label: 'All', value: 0 },
//   { label: 'Energy Equipment & Services', value: 1 },
//   { label: 'Oil, Gas & Consumable Fuels', value: 2 },
// ];
// 
// var industry_consumerstaples = [
//   { label: 'All', value: 0 },
//   { label: 'Beverages', value: 1 },
//   { label: 'Food & Staples Retailing', value: 2 },
//   { label: 'Food Products', value: 3 },
//   { label: 'Household Products', value: 4 },
//   { label: 'Personal Products', value: 5 },
//   { label: 'Tobacco', value: 6 },
// ];
// 
// var industry_consumerdiscretionary = [
//   { label: 'All', value: 0 },
//   { label: 'Auto Components', value: 1 },
//   { label: 'Automobiles', value: 2 },
//   { label: 'Distributors', value: 3 },
//   { label: 'Diversified Consumer Services', value: 4 },
//   { label: 'Hotels, Restaurants & Leisure', value: 5 },
//   { label: 'Household Durables', value: 6 },
//   { label: 'Internet & Catalog Retail', value: 7 },
//   { label: 'Leisure Products', value: 8 },
//   { label: 'Media', value: 9 },
//   { label: 'Multiline Retail', value: 10 },
//   { label: 'Specialty Retail', value: 11 },
//   { label: 'Textiles, Apparel & Luxury Goods', value: 12 },
// ];


import Search from '../search';


import styles from '../../style/style';
import trending from '../../style/trending';
import numbers from '../../style/numbers';

var styleDefault;

class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLTVisible: false,
      isSectorVisible: false,
      isScanVisible: false,
      isIndustryVisible: false,
      // trendingOption: 0,
      sectorOption: 0,
      industryOption: null,
      currIndustryOptions: null,
      colors: colors(props.globalData.isDarkThemeActive)
    };

  }

  componentWillUnmount() {
    styleDefault = { color: this.state.colors['lightGray'] }
  }

  componentDidMount() {
    const { industryOption } = trendingStore;
    if (industryOption == null) {
      styleDefault = { color: this.state.colors['lightGray'] }
    }
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

  showScan() {
    this.setState({ isScanVisible: true })
  }

  hideTrendingOptionModal(value) {
    const { setTrendingOption } = trendingStore;
    if (value !== undefined) {
      setTrendingOption(value);
    }

    if (value) {
      this.setState({ isScanVisible: false })
    } else {
      this.setState({ isScanVisible: false })
    }
  }

  showSector() {
    this.setState({ isSectorVisible: true })
  }

  getCurrentIndustryOptions() {
    const { industryOption } = trendingStore;
    switch (industryOption) {
      case 0:
        return industry_consumerdiscretionary
        break;
      case 1:
        return industry_consumerdiscretionary
        break;
      case 2:
        return industry_consumerstaples
        break;
      case 3:
        return industry_energy
        break;
      case 4:
        return industry_financials
        break;
      case 5:
        return industry_health
        break;
      case 6:
        return industry_industrials
        break;
      case 7:
        return industry_infotech
        break;
      case 8:
        return industry_materials
        break;
      case 9:
        return industry_realestate
        break;
      case 10:
        return industry_telecomm
        break;
      case 11:
        return industry_utilities
        break;
    }
  }

  hideSector(value) {
    const { setSectorOption } = trendingStore;
    if (value === undefined) {
      this.setState({ isSectorVisible: false });
      return;
    }
    setSectorOption(value);
    this.setState({
      isSectorVisible: false
    })
  }

  showIndustry() {
    const { industryOption } = trendingStore;
    if (industryOption != null) {
      this.setState({ isIndustryVisible: true })
    }
  }

  hideIndustry(value) {
    const { setIndustryOption } = trendingStore;
    if (value === undefined) {
      this.setState({ isIndustryVisible: false })
      return;
    }
    setIndustryOption(value)
    this.setState({ isIndustryVisible: false })
  }

  render() {
    const { trendingOption, industryOption, sectorOption } = trendingStore;

    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, trending.subMenu]}>
        <View style={trending.subMenuRow}>
          <TouchableOpacity style={[{ borderBottomColor: this.state.colors['borderGray'] }, trending.subMenuFull]} onPress={() => { this.showScan() }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>TRENDING</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>{scan_props[trendingOption].label}</Text>
          </TouchableOpacity>
          
          
          {/* TRENDGING PICKER */}

          
          <Modal
            isVisible={this.state.isScanVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={trending.fullModal}
            onModalHide={() => { this.hideTrendingOptionModal() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.radio]}>
              <Image
                source={require('../../images/arrowblue.png')}
                style={[trending.downArrowOpen]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, trending.radioTitle, fonts.hindGunturBd]}>TRENDING</Text>
              <View style={trending.scanRadio}>
                <RadioForm
                  radio_props={scan_props}
                  initial={trendingOption}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={colors.blue}
                  buttonOuterColor={colors.lightGray}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                  onPress={(value) => { this.hideTrendingOptionModal(value) }}
                  style={trending.radioField}
                />
              </View>
            </View>
          </Modal>
        </View>



        {/* SECTOR PICKER */}

        <View style={trending.subMenuRow}>
          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => { this.showSector(); }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>{sector_props[sectorOption].label}</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isSectorVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={[trending.halfModal]}
            onModalHide={() => { this.hideSector() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.subMenuLeftModal]}>
              <Image
                source={require('../../images/arrowblue.png')}
                style={[trending.downArrow]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
            </View>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.lastTradeModal]}>
              <ScrollView style={trending.sectorRadio}>
                <RadioForm
                  radio_props={sector_props}
                  initial={sectorOption}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={colors.blue}
                  buttonOuterColor={colors.lightGray}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                  onPress={(value) => { this.hideSector(value) }}
                  style={trending.radioField}
                />
              </ScrollView>
            </View>
          </Modal>


          {/* INDUSTRY PICKER */}


          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => { this.showIndustry(); }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd, styleDefault]}>INDUSTRY</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>
              {industryOption == null ? 'Select a sector' : this.getCurrentIndustryOptions()[industryOption].label}
            </Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isIndustryVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={trending.halfModal}
            onModalHide={() => { this.hideIndustry() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.subMenuRightModal]}>
              <Image
                source={require('../../images/arrowblue.png')}
                style={[trending.downArrow]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>INDUSTRY</Text>
            </View>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.lastTradeModal]}>
              <ScrollView style={trending.sectorRadio}>
                <RadioForm
                  radio_props={this.getCurrentIndustryOptions()}
                  initial={industryOption}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={colors.blue}
                  buttonOuterColor={colors.lightGray}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                  onPress={(value) => { this.hideIndustry(value) }}
                  style={trending.radioField}
                />
              </ScrollView>
            </View>
          </Modal>
        </View>
      </View>
    )
  }
}

SubMenu.propTypes = {
  globalData: PropTypes.object.isRequired,
};

@observer
class Trending extends React.Component {
  static navigationOptions = {
    title: 'Trending',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/trending.png')}
        style={[navstyle.iconBig, { tintColor: tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    this.state = {
      isSearchVisible: false,
      offsetX: new Animated.Value(Dimensions.get('window').width),
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  componentDidMount() {
    const { getTrendingData } = trendingStore;
    getTrendingData()
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

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  hideSearch() {
    this.setState({ isSearchVisible: false });
  }

  addOrRemoveSymbolFromWatchlist(data, currentWatchStatus) {
    let message = ''
    let successFunction = null;
    if (currentWatchStatus) {
      message = 'Remove ' + data.ticker + ' from your watchlist.'
      successFunction = () => watchListStore.removeTickerFromWatchList(data.ticker);
    } else {
      message = 'Add ' + data.ticker + ' to your watchlist.'
      successFunction = () => watchListStore.addTickerToWatchList(data.ticker);
    }
    Alert.alert(
      '',
      message,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: successFunction },
      ],
      { cancelable: true }
    )
  }

  toggleDecimalOrPercentage() {
    const { setDecimalOrPercentage, displayDecimal } = trendingStore;
    setDecimalOrPercentage(!displayDecimal);
  }

  navigateToChart(data) {
    this.props.navigation.navigate('Chart', { data: data })
  }

  renderTrendingList() {
    const { trendingDataJS, trendingLoading, displayDecimal } = trendingStore;
    // const { watchlistDataJS } = watchListStore;

    console.info({ trendingDataJS });
    if (trendingLoading) {
      return <View>
        <Text>Loading...</Text>
      </View>
    } else if (trendingDataJS.length === 0) {
      return <View>
        <Text>No Results</Text>
      </View>
    } else {
      return <View style={{ flex: 1 }}>
        <ScrollView style={[trending.symbolsContainer, { flex: 1, padding: 0, margin: 0, width: '100%' }]}>
          {trendingDataJS.map((data, i) => {
            // console.log('each data', data)
            
            let watchListIconSrc = require('../../images/add.png');
            if (data.inWatchList) {
              watchListIconSrc = require('../../images/watchlist_added.png');
            }
            return (<View key={i} style={[{ borderBottomColor: this.state.colors['borderGray'], height: 30 }, trending.symbolsRow]}>
              <TouchableOpacity style={trending.symbolsSpacer} onPress={() => this.navigateToChart(data)}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsTxt, fonts.hindGunturRg]}>{data['ticker']}</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>{data['companyName']}</Text>
              </TouchableOpacity>
              <View style={trending.symbolsVolume}><Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsLabelTxtSM, fonts.hindGunturRg]}>VOL {data.latestVolumeFormatted}</Text></View>
              <TouchableOpacity style={trending.symbolsLabel} onPress={() => this.toggleDecimalOrPercentage(data)}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsLabelTxt, fonts.hindGunturRg]}>${data['latestPriceFormatted']}</Text>
                {!displayDecimal ? <Text style={[{ backgroundColor: data.posNegColor }, { borderColor: data.posNegColor }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['change']}</Text> : <Text style={[{ backgroundColor: data.posNegColor }, { borderColor: data.posNegColor }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['changePercent']}</Text>}
              </TouchableOpacity>
              <View style={trending.addBtn}>
                <TouchableOpacity style={trending.symbolsAdd} onPress={this.addOrRemoveSymbolFromWatchlist.bind(this, data, data.inWatchList)} >
                  <Image
                    source={watchListIconSrc} style={styles.addImg} />
                </TouchableOpacity>
              </View>
            </View>)
          })}
        </ScrollView>
      </View>
    }
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <View style={styles.leftCta}></View>
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
              <Image
                source={require('../../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <View style={styles.rightCta}></View>
          </View>
        </View>
        <SubMenu globalData={this.props.globalData} />
        <View style={[{ backgroundColor: this.state.colors['contentBg'] }, trending.scanContainer]}>
          {this.renderTrendingList()}
        </View>
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
      </View>
    );
  }
}

Trending.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Trending);


// {/*<ListView*/}
// {/*style={trending.symbolsContainer}*/}
// {/*dataSource={this.state.dataSource}*/}
// {/*renderRow={(data) =>*/}
// {/*<View style={[{ borderBottomColor: this.state.colors['borderGray'] }, trending.symbolsRow]}>*/}
// {/*<TouchableOpacity style={trending.symbolsSpacer} onPress={() => this.props.navigation.navigate('Chart', { data: data })}>*/}
// {/*<Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsTxt, fonts.hindGunturRg]}>{data['sym']}</Text>*/}
// {/*<Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>{data['name']}</Text>*/}
// {/*</TouchableOpacity>*/}
// {/*<View style={trending.symbolsVolume}><Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsLabelTxtSM, fonts.hindGunturRg]}>VOL 65.2M</Text></View>*/}
//
//
// {/*<TouchableOpacity style={trending.symbolsLabel} onPress={() => this.changeToggle(data)}>*/}
// {/*<Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsLabelTxt, fonts.hindGunturRg]}>${data['price']}</Text>*/}
// {/*{data['stockChange'] ? <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[data.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['change']}</Text> : <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[data.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['changePerc']}</Text>}*/}
// {/*</TouchableOpacity>*/}
// {/*<View style={trending.addBtn}>*/}
// {/*<TouchableOpacity style={trending.symbolsAdd} onPress={(value) => { this.addSymbol(data['sym']) }} >*/}
// {/*<Image*/}
// {/*source={data['icon']} style={styles.addImg} />*/}
// {/*</TouchableOpacity>*/}
// {/*</View>*/}
// {/*</View>*/}
// {/*}*/}
// {/*/>*/}
