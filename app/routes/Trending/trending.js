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
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../components/react-native-simple-radio-button';
import fonts from '../../style/fonts';
import navstyle from '../../style/nav';
import { setTheme, getTheme, colors } from '../../store/store';
import { selectGlobalData } from '../../selectors';
import { observer } from 'mobx-react';
import { trendingStore, watchListStore, sectorIndustriesStore } from '../../mobxStores';
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
import Search from '../Search';
import styles from '../../style/style';
import trending from '../../style/trending';
import numbers from '../../style/numbers';
import Index from '../../sharedComponents/ChartGraph';
import { isScrollViewCloseToBottom, limitTextLength } from '../../utility';
var styleDefault;

@observer
class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLTVisible: false,
      isSectorVisible: false,
      isScanVisible: false,
      isIndustryVisible: false,
      currIndustryOptions: null,
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  componentWillUnmount() {
    styleDefault = { color: this.state.colors['lightGray'] }
  }

  componentDidMount() {
    const { industryOption } = trendingStore;
    const { getSectors } = sectorIndustriesStore;
    if (industryOption == null) {
      styleDefault = { color: this.state.colors['lightGray'] }
    }
    getSectors()
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

  setSector(value) {
    const { selectSectorByOption } = sectorIndustriesStore;
    selectSectorByOption(value);
    this.refreshData();
    this.hideSector();
  }

  hideSector() {
    this.setState({ isSectorVisible: false });
  }

  refreshData() {
    const { getFirstPage } = trendingStore;
    getFirstPage();
  }

  setIndustry(value) {
    const { selectIndustryByOption } = sectorIndustriesStore;
    selectIndustryByOption(value);
    this.refreshData();
    this.hideIndustry();
  }

  showIndustry() {
    this.setState({ isIndustryVisible: true })
  }

  hideIndustry(value) {
    this.setState({ isIndustryVisible: false })
  }

  getIsIndustryVisible() {
    const { sectorOption } = trendingStore;
    if(sectorOption === null) {
      return false;
    } else {
      return this.state.isIndustryVisible;
    }
  }

  renderSectorPicker() {
    const { sectorDataJS, sectorLoading, selectedSectorOption } = sectorIndustriesStore;
    const sectorOption = selectedSectorOption;

    let label = '';

    let disabled = false;
    if(sectorLoading || sectorDataJS.length === 0) {
      disabled = true;
    }
    if(sectorLoading) {
      label = 'Loading...'
    }

    if(!sectorLoading && sectorDataJS && sectorDataJS.length > 0) {
      label = sectorDataJS[sectorOption].label;
    }

    return <View style={{flex: 1}}>
      <TouchableOpacity disabled={disabled} style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => { this.showSector(); }}>
        <Image
          source={require('../../images/arrow.png')}
          style={[trending.downArrow]}
        />
        <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
        <Text style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>{label}</Text>
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
          <ScrollView
            style={trending.sectorRadio}
          >
            <RadioForm
              radio_props={sectorDataJS}
              initial={selectedSectorOption}
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
              onPress={(value) => { this.setSector(value) }}
              style={trending.radioField}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  }

  renderIndustryPicker() {
    const { selectedSectorOption, industriesLoading, selectedIndustryOption, industriesListJS, selectedIndustryJS } = sectorIndustriesStore;
    const sectorOption = selectedSectorOption;
    const industryOption = selectedIndustryOption;

    let disabled = false;
    if(industriesLoading || industriesListJS.length === 0) {
      disabled = true;
    }

    let label = selectedIndustryJS;
    if(sectorOption === 0) {
      label = 'Select a sector'
    }
    if(industriesLoading) {
      label = 'Loading...'
    }

    return <View style={{flex: 1}}>
      <TouchableOpacity disabled={disabled} style={[{ borderRightColor: this.state.colors['borderGray'] }, trending.subMenuHalf]} onPress={() => {this.showIndustry()}}>
        <Image
          source={require('../../images/arrow.png')}
          style={[trending.downArrow]}
        />
        <Text style={[{ color: this.state.colors['darkSlate'] }, trending.subMenuTitle, fonts.hindGunturBd, styleDefault]}>INDUSTRY</Text>
        <Text numberOfLines={1} ellipsizeMode={'tail'} style={[{ color: this.state.colors['lightGray'] }, trending.subMenuTxt, fonts.hindGunturRg]}>
          {label}
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={this.getIsIndustryVisible()}
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
              radio_props={industriesListJS}
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
              onPress={(value) => { sectorOption == 0 ? console.log('do nothing') : this.setIndustry(value) }}
              style={trending.radioField}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
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


        <View style={trending.subMenuRow}>
          {this.renderSectorPicker()}
          {this.renderIndustryPicker()}
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
    this.companyNameLength = 30;
  }

  componentDidMount() {
    const { getTrendingData } = trendingStore;
    getTrendingData()
  }

  getNewPage() {
    trendingStore.getNextPage()
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

  _onRefresh() {
    const { getTrendingData } = trendingStore;
    getTrendingData();
  }

  renderNoContentInList() {
    const { trendingDataJS, trendingLoading, displayDecimal } = trendingStore;
    if (trendingDataJS.length === 0) {
      return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
      </View>
    } else {
      return null;
    }
  }

  renderTrendingList() {
    const { trendingDataJS, trendingLoading, displayDecimal } = trendingStore;
    return <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={<RefreshControl
          refreshing={trendingLoading}
          onRefresh={this._onRefresh}
        />}
        onScroll={({nativeEvent}) => {
          if (isScrollViewCloseToBottom(nativeEvent)) {
            this.getNewPage();
          }
        }}
        scrollEventThrottle={1000}
        throttleScrollCallbackMS={1000}
        style={[trending.symbolsContainer, { flex: 1, padding: 0, margin: 0, width: '100%' }]}
      >
        {this.renderNoContentInList()}
        {trendingDataJS.map((data, i) => {
          let formattedDataChange = data.change
          if(data.change > 0) {
            formattedDataChange = '+' + data.change
          }
          if(data.change === 0) {
            formattedDataChange = '0.00'
          }

          let watchListIconSrc = require('../../images/add.png');
          if (data.inWatchList) {
            watchListIconSrc = require('../../images/watchlist_added.png');
          }

          let formattedChangePercent = data['changePercent'].toFixed(2) + '%';
          if(data['changePercent'] > 0) {
            formattedChangePercent = '+' + formattedChangePercent;
          }
          if(data['changePercent'] === 0) {
            formattedChangePercent = '+0.00%'
          }

          return (<View key={i} style={[{ borderBottomColor: this.state.colors['borderGray'], height: 30 }, trending.symbolsRow]}>

            <TouchableOpacity style={[trending.symbolsSpacer]} onPress={() => this.navigateToChart(data)}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, trending.symbolsTxt, fonts.hindGunturRg]}>{data['ticker']}</Text>
              <Text numberOfLines={1} ellipsizeMode={'tail'} style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>{data['companyName']}</Text>
            </TouchableOpacity>

            <View style={[trending.symbolsVolume, {width: 80}]}><Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsLabelTxtSM, fonts.hindGunturRg]}>VOL {data.latestVolumeFormatted}</Text></View>

            <TouchableOpacity style={[trending.symbolsLabel, {width: 70}]} onPress={() => this.toggleDecimalOrPercentage(data)}>
              <Text style={[{ color: this.state.colors['darkSlate'], alignSelf: 'center' }, trending.symbolsLabelTxt, fonts.hindGunturRg]}>${data['latestPriceFormatted']}</Text>
              {!displayDecimal ? <Text style={[{ backgroundColor: data.posNegColor }, { borderColor: data.posNegColor }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedDataChange}</Text> : <Text style={[{ backgroundColor: data.posNegColor }, { borderColor: data.posNegColor }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedChangePercent}</Text>}
            </TouchableOpacity>

            <View style={[trending.addBtn]}>
              <TouchableOpacity style={trending.symbolsAdd} onPress={this.addOrRemoveSymbolFromWatchlist.bind(this, data, data.inWatchList)} >
                <Image
                  source={watchListIconSrc} style={styles.addImg} />
              </TouchableOpacity>
            </View>

          </View>)
        })}
        {this.renderNewPageLoading()}
      </ScrollView>
    </View>
  }

  renderNewPageLoading() {
    const { newPageLoading, currentPage } = trendingStore;
    if(newPageLoading && currentPage >= 1) {
      return <View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    } else {
      return null;
    }
  }

  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
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
      </SafeAreaView>
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
