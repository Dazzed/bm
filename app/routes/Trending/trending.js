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
import { trendingStore } from '../../mobxStores';

var scan_props = [
  { label: 'Top volume', value: 0 },
  { label: '% Gainers', value: 1 },
  { label: '% Losers', value: 2 },
];

var sector_props = [
  { label: 'All', value: 0 },
  { label: 'Consumer Discretionary', value: 1 },
  { label: 'Consumer Staples', value: 2 },
  { label: 'Energy', value: 3 },
  { label: 'Financials', value: 4 },
  { label: 'Health Care', value: 5 },
  { label: 'Industrials', value: 6 },
  { label: 'Information Technology', value: 7 },
  { label: 'Materials', value: 8 },
  { label: 'Real Estate', value: 9 },
  { label: 'Telecommunication Services', value: 10 },
  { label: 'Utilities', value: 11 }
];

var industry_utilities = [
  { label: 'All', value: 0 },
  { label: 'Electric Utilities', value: 1 },
  { label: 'Gas Utilities', value: 2 },
  { label: 'Independent Power and Renewable Electricity Producers', value: 3 },
  { label: 'Multi-Utilities', value: 4 },
  { label: 'Water Utilities', value: 5 },
];

var industry_telecomm = [
  { label: 'All', value: 0 },
  { label: 'Diversified Telecommunication Services', value: 1 },
  { label: 'Wireless Telecommunication Services', value: 2 },
];

var industry_realestate = [
  { label: 'All', value: 0 },
  { label: 'Equity Real Estate Investment Trusts', value: 1 },
  { label: 'Real Estate Management & Development', value: 2 },
];

var industry_materials = [
  { label: 'All', value: 0 },
  { label: 'Chemicals', value: 1 },
  { label: 'Construction Materials', value: 2 },
  { label: 'Containers & Packaging', value: 3 },
  { label: 'Metals & Mining', value: 4 },
  { label: 'Paper & Forest Products', value: 5 },
];

var industry_infotech = [
  { label: 'All', value: 0 },
  { label: 'Communications Equipment', value: 1 },
  { label: 'Electronic Equipment, Instruments & Components', value: 2 },
  { label: 'IT Services', value: 3 },
  { label: 'Internet Software & Services', value: 4 },
  { label: 'Semiconductors & Semiconductor Equipment', value: 5 },
  { label: 'Software', value: 6 },
  { label: 'Technology Hardware, Storage & Peripherals', value: 7 },
];

var industry_industrials = [
  { label: 'All', value: 0 },
  { label: 'Aerospace & Defense', value: 1 },
  { label: 'Air Freight & Logistics', value: 2 },
  { label: 'Airlines', value: 3 },
  { label: 'Building Products', value: 4 },
  { label: 'Commercial Services & Supplies', value: 5 },
  { label: 'Construction & Engineering', value: 6 },
  { label: 'Electrical Equipment', value: 7 },
  { label: 'Industrial Conglomerates ', value: 8 },
  { label: 'Machinery', value: 9 },
  { label: 'Marine', value: 10 },
  { label: 'Professional Services', value: 11 },
  { label: 'Road & Rail', value: 12 },
  { label: 'Trading Companies & Distributors', value: 13 },
  { label: 'Transportation Infrastructure', value: 14 },
];

var industry_health = [
  { label: 'All', value: 0 },
  { label: 'Biotechnology', value: 1 },
  { label: 'Health Care Equipment & Supplies', value: 2 },
  { label: 'Health Care Providers & Services', value: 3 },
  { label: 'Health Care Technology', value: 4 },
  { label: 'Life Sciences Tools & Services', value: 5 },
  { label: 'Pharmaceuticals', value: 6 },
];

var industry_financials = [
  { label: 'All', value: 0 },
  { label: 'Banks', value: 1 },
  { label: 'Capital Markets', value: 2 },
  { label: 'Consumer Finance', value: 3 },
  { label: 'Diversified Financial Services', value: 4 },
  { label: 'Insurance', value: 5 },
  { label: 'Mortgage REITs', value: 6 },
  { label: 'Thrifts & Mortgage Finance ', value: 7 },
];

var industry_energy = [
  { label: 'All', value: 0 },
  { label: 'Energy Equipment & Services', value: 1 },
  { label: 'Oil, Gas & Consumable Fuels', value: 2 },
];

var industry_consumerstaples = [
  { label: 'All', value: 0 },
  { label: 'Beverages', value: 1 },
  { label: 'Food & Staples Retailing', value: 2 },
  { label: 'Food Products', value: 3 },
  { label: 'Household Products', value: 4 },
  { label: 'Personal Products', value: 5 },
  { label: 'Tobacco', value: 6 },
];

var industry_consumerdiscretionary = [
  { label: 'All', value: 0 },
  { label: 'Auto Components', value: 1 },
  { label: 'Automobiles', value: 2 },
  { label: 'Distributors', value: 3 },
  { label: 'Diversified Consumer Services', value: 4 },
  { label: 'Hotels, Restaurants & Leisure', value: 5 },
  { label: 'Household Durables', value: 6 },
  { label: 'Internet & Catalog Retail', value: 7 },
  { label: 'Leisure Products', value: 8 },
  { label: 'Media', value: 9 },
  { label: 'Multiline Retail', value: 10 },
  { label: 'Specialty Retail', value: 11 },
  { label: 'Textiles, Apparel & Luxury Goods', value: 12 },
];


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
      trendingOption: 0,
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
    if (this.state.industryOption == null) {
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

  hideScan(value) {
    if (value) {
      this.setState({ isScanVisible: false, trendingOption: value })
    } else {
      this.setState({ isScanVisible: false })
    }
  }

  showSector() {
    this.setState({ isSectorVisible: true })
  }

  hideSector(value) {
    console.log('hideSector');
    switch (value) {
      case 0:
        this.setState({ currIndustryOptions: industry_consumerdiscretionary, isSectorVisible: false, sectorOption: value, industryOption: null });
        styleDefault = trending.inactive
        break;
      case 1:
        this.setState({ currIndustryOptions: industry_consumerdiscretionary, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 2:
        this.setState({ currIndustryOptions: industry_consumerstaples, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 3:
        this.setState({ currIndustryOptions: industry_energy, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 4:
        this.setState({ currIndustryOptions: industry_financials, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 5:
        this.setState({ currIndustryOptions: industry_health, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 6:
        this.setState({ currIndustryOptions: industry_industrials, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 7:
        this.setState({ currIndustryOptions: industry_infotech, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 8:
        this.setState({ currIndustryOptions: industry_materials, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 9:
        this.setState({ currIndustryOptions: industry_realestate, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 10:
        this.setState({ currIndustryOptions: industry_telecomm, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
      case 11:
        this.setState({ currIndustryOptions: industry_utilities, isSectorVisible: false, sectorOption: value, industryOption: 0 });
        styleDefault = ''
        break;
    }
  }

  showIndustry() {
    if (this.state.industryOption != null) {
      this.setState({ isIndustryVisible: true })
    }
  }

  hideIndustry(value) {
    if (value || value == 0) {
      this.setState({ isIndustryVisible: false, industryOption: value })
    } else {
      this.setState({ isIndustryVisible: false })
    }
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, trending.subMenu]}>
        <View style={trending.subMenuRow}>
          <TouchableOpacity style={[{ borderBottomColor: this.state.colors['borderGray'] }, trending.subMenuFull]} onPress={() => { this.showScan() }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>TRENDING</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>{scan_props[this.state.trendingOption].label}</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isScanVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={trending.fullModal}
            onModalHide={() => { this.hideScan() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.radio]}>
              <Image
                source={require('../../images/arrowblue.png')}
                style={[trending.downArrowOpen]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, trending.radioTitle, fonts.hindGunturBd]}>TRENDING</Text>
              <View style={trending.scanRadio}>
                <RadioForm
                  radio_props={scan_props}
                  initial={this.state.trendingOption}
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
                  onPress={(value) => { this.hideScan(value) }}
                  style={trending.radioField}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={trending.subMenuRow}>
          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => { this.showSector(); }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>{sector_props[this.state.sectorOption].label}</Text>
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
                  initial={this.state.sectorOption}
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
          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => { this.showIndustry(); }}>
            <Image
              source={require('../../images/arrow.png')}
              style={[trending.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd, styleDefault]}>INDUSTRY</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>
              {this.state.industryOption == null ? 'Select a sector' : this.state.currIndustryOptions[this.state.industryOption].label}
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
              <Text style={[{ color: this.state.colors['darkSlate'] },trending.subMenuTitle, fonts.hindGunturBd]}>INDUSTRY</Text>
            </View>
            <View style={[{ backgroundColor: this.state.colors['white'] }, trending.lastTradeModal]}>
              <ScrollView style={trending.sectorRadio}>
                <RadioForm
                  radio_props={this.state.currIndustryOptions}
                  initial={this.state.industryOption}
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
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      ds: [
        { sym: 'ETH', exch: 'NYSE', name: 'Ethereum', img: require('../../images/momentumfpowatchlist.png'), vol: '24.9M', price: '30.75', time: '12:30 PM PT', icon: require('../../images/watchlist_added.png'), posNeg: 'green', change: '+1.85', changePerc: '+10.41%', stockChange: true },
        { sym: 'AMID', exch: 'NYSE', name: 'American Midstream', img: require('../../images/momentumfpowatchlist_down01.png'), vol: '65.2M', price: '12.45', time: '12:30 PM PT', icon: require('../../images/add.png'), posNeg: 'red', change: '-3.12', changePerc: '-2.15%', stockChange: true },
        { sym: 'AAPL', exch: 'NASDAQ', name: 'Apple, Inc.', img: require('../../images/momentumfpowatchlist_01.png'), vol: '16.3M', price: '146.19', time: '12:30 PM PT', icon: require('../../images/watchlist_added.png'), posNeg: 'green', change: '+2.01', changePerc: '+2.43%', stockChange: true },
        { sym: 'TSLA', exch: 'NASDAQ', name: 'Tesla Motors, Inc.', img: require('../../images/momentumfpowatchlist_down02.png'), vol: '5.3M', price: '378.47', time: '12:30 PM PT', icon: require('../../images/add.png'), posNeg: 'green', change: '+3.10', changePerc: '+1.05%', stockChange: true },
        { sym: 'SPH', exch: 'NYSE', name: 'Suburban Propan', img: require('../../images/momentumfpowatchlist_down01.png'), vol: '37.9M', price: '24.31', time: '12:30 PM PT', icon: require('../../images/add.png'), posNeg: 'red', change: '-4.43', changePerc: '-5.64%', stockChange: true },
        { sym: 'NGG', exch: 'NYSE', name: 'National Grid PLC', img: require('../../images/momentumfpowatchlist_01.png'), vol: '12.4M', price: '64.85', time: '12:30 PM PT', icon: require('../../images/add.png'), posNeg: 'green', change: '+0.15', changePerc: '+4.04%', stockChange: true },
      ],
      dataSource: ds,
      isSearchVisible: false,
      offsetX: new Animated.Value(Dimensions.get('window').width),
      watchlistItems: ['ETH', 'AAPL'],
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  componentDidMount() {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.state.ds),
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

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  hideSearch() {
    this.setState({ isSearchVisible: false });
  }

  // addWatchItem(sym) {
  //   var watchItems = this.state.watchlistItems;
  //   var watchVar = watchItems.slice()
  //   var exists = false;
  //   var newDs = [];
  //   newDs = this.state.ds.slice();
  //
  //   for (var i = 0; i < watchItems.length; i++) {
  //     if (watchItems[i] == sym) {
  //       exists = true;
  //     }
  //   }
  //
  //   if (!exists) {
  //     watchVar.push(sym)
  //   }
  //
  //   for (var j = 0; j < watchVar.length; j++) {
  //     for (var i = 0; i < newDs.length; i++) {
  //       if (newDs[i].sym == watchVar[j]) {
  //         newDs[i] = { sym: newDs[i].sym, exch: newDs[i].exch, name: newDs[i].name, img: newDs[i].img, vol: newDs[i].vol, price: newDs[i].price, time: newDs[i].time, change: newDs[i].change, icon: require('../../images/watchlist_added.png'), posNeg: newDs[i].posNeg, changePerc: newDs[i].changePerc, stockChange: newDs[i].stockChange }
  //       }
  //     }
  //   }
  //
  //   this.setState({
  //     dataSource: this.state.dataSource.cloneWithRows(newDs),
  //     ds: newDs,
  //     watchlistItems: watchVar
  //   })
  //
  //   // console.log(watchVar);
  // }


  addWatchItem() {
    console.log('WATCH ITEM ADD')
  }
  removeWatchItem() {
    console.log('WATCH ITEM REMOVE')
  }

  addOrRemoveSymbolFromWatchlist(sym, currentWatchStatus) {
    let message = ''
    let successFunction = null;
    if(currentWatchStatus) {
      message = 'Remote ' + sym + ' from your watchlist.'
      successFunction = () => this.addWatchItem(sym);
    } else {
      message = 'Add ' + sym + ' to your watchlist.'
      successFunction = () => this.removeWatchItem(sym);
    }
    Alert.alert(
        '',
        message,
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => { successFunction() } },
        ],
        { cancelable: true }
    )
  }

  changeToggle(data) {
    data['stockChange'] = !data['stockChange'];

    var newDs = [];
    newDs = this.state.ds.slice();

    for (var i = 0; i < newDs.length; i++) {
      if (newDs[i].sym == data['sym']) {
        newDs[i] = { sym: newDs[i].sym, exch: newDs[i].exch, name: newDs[i].name, img: newDs[i].img, vol: newDs[i].vol, price: newDs[i].price, time: newDs[i].time, change: newDs[i].change, icon: newDs[i].icon, posNeg: newDs[i].posNeg, changePerc: newDs[i].changePerc, stockChange: data['stockChange'] }
      }
    }

    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(newDs),
      ds: newDs,
    });
  }

  renderTrendingList() {
    const { trendingListJS } = trendingStore;

    return <View style={{flex: 1}}>
      <ScrollView style={[trending.symbolsContainer, {flex: 1, borderWidth: 1, borderColor: 'green', padding: 0, margin: 0, width: '100%'}]}>

        <Text>Mapping this data to stores</Text>

        {trendingListJS.map((data, i) => {
          let watchListIconSrc = require('../../images/add.png');
          if(data.watching) {
            watchListIconSrc = require('../../images/watchlist_added.png');
          }
          return (<View key={i} style={[{ borderBottomColor: this.state.colors['borderGray'], height: 30 }, trending.symbolsRow]}>
              <TouchableOpacity style={trending.symbolsSpacer} onPress={() => this.props.navigation.navigate('Chart', { data: data })}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsTxt, fonts.hindGunturRg]}>{data['sym']}</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>{data['name']}</Text>
              </TouchableOpacity>
              <View style={trending.symbolsVolume}><Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsLabelTxtSM, fonts.hindGunturRg]}>VOL 65.2M</Text></View>
              <TouchableOpacity style={trending.symbolsLabel} onPress={() => this.changeToggle(data)}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsLabelTxt, fonts.hindGunturRg]}>${data['price']}</Text>
                {data['stockChange'] ? <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[elem.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['change']}</Text> : <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[data.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['changePerc']}</Text>}
              </TouchableOpacity>
              <View style={trending.addBtn}>
                <TouchableOpacity style={trending.symbolsAdd} onPress={(value) => { this.addOrRemoveSymbolFromWatchlist(data['sym'], data.watching) }} >
                  <Image
                      source={watchListIconSrc} style={styles.addImg} />
                </TouchableOpacity>
              </View>
            </View>)
          })}
      </ScrollView>
    </View>
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


          {/*<ListView*/}
            {/*style={trending.symbolsContainer}*/}
            {/*dataSource={this.state.dataSource}*/}
            {/*renderRow={(data) =>*/}
              {/*<View style={[{ borderBottomColor: this.state.colors['borderGray'] }, trending.symbolsRow]}>*/}
                {/*<TouchableOpacity style={trending.symbolsSpacer} onPress={() => this.props.navigation.navigate('Chart', { data: data })}>*/}
                  {/*<Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsTxt, fonts.hindGunturRg]}>{data['sym']}</Text>*/}
                  {/*<Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>{data['name']}</Text>*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={trending.symbolsVolume}><Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsLabelTxtSM, fonts.hindGunturRg]}>VOL 65.2M</Text></View>*/}


                {/*<TouchableOpacity style={trending.symbolsLabel} onPress={() => this.changeToggle(data)}>*/}
                  {/*<Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsLabelTxt, fonts.hindGunturRg]}>${data['price']}</Text>*/}
                  {/*{data['stockChange'] ? <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[data.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['change']}</Text> : <Text style={[{ backgroundColor: this.state.colors[data.posNeg] }, { borderColor: this.state.colors[data.posNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{data['changePerc']}</Text>}*/}
                {/*</TouchableOpacity>*/}
                {/*<View style={trending.addBtn}>*/}
                  {/*<TouchableOpacity style={trending.symbolsAdd} onPress={(value) => { this.addSymbol(data['sym']) }} >*/}
                    {/*<Image*/}
                      {/*source={data['icon']} style={styles.addImg} />*/}
                  {/*</TouchableOpacity>*/}
                {/*</View>*/}
              {/*</View>*/}
            {/*}*/}
          {/*/>*/}



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