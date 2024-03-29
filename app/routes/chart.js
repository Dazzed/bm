//  Turn back now...
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  KeyboardAvoidingView,
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Alert,
  Linking,
  AppState,
  SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import Modal from '../components/react-native-modal'
import Orientation from 'react-native-orientation';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from '../components/react-native-simple-radio-button';
import CheckBox from '../components/react-native-check-box';
import { setTheme, getTheme, colors } from '../store/store';
import ChartNews from './chartnews';
import Search from './Search';
import styles from '../style/style';
import navstyle from '../style/nav';
import chart from '../style/chart';
import chartland from '../style/chartlandscape';
import order from '../style/order';
import fonts from '../style/fonts';
import { selectGlobalData } from '../selectors';
import trending from '../style/trending';
import ChartGraph from '../sharedComponents/ChartGraph/index';
import DialIndicator from '../sharedComponents/DialIndicator';
import { numberWithCommas, numberWithCommasFixed } from '../utility';
import {
  chartStore,
  watchListStore,
  deviceSizeStore,
  colorStore
} from '../mobxStores';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';
import { millionBillionFormatter } from '../utility';
import {
  initialIndicators,
  indicatorProps,
  initialChartRangeIndicator,
  chartRangeOptions,
  statesHash
} from '../constants';

var currIndicates = [];
var indicator_props = indicatorProps;

let _000000_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_000000.png');
let _0000FF_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_0000FF.png');
let _00FF00_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_00FF00.png');
let _4A86E8_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_4A86E8.png');
let _008080_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_008080.png');
let _800080_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_800080.png');
let _A52A2A_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_A52A2A.png');
let _FF8C00_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_FF8C00.png');
let _FF1493_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_FF1493.png');
let _FFFFFF_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_FFFFFF.png');
let _008000_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_008000.png');
let _original_blue_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/_original_blue.png');
let red_blue_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/red_blue.png');
let ema_red_blue_checkbox_image = require('../images/colored_checkboxes/checkbox_source-assets/ema_red_blue.png');

@observer
class Chart extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/watchlist.png')}
        style={[navstyle.iconBig, { tintColor: tintColor }]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      isOrderVisible: false,
      isRotateVisible: false,
      isNewsVisible: false,
      offsetX: new Animated.Value(Dimensions.get('window').width),
      orientation: 'portrait',
      isSearchVisible: false,
      isIndicatorsVisible: false,
      page: initialChartRangeIndicator,
      indicators: initialIndicators,
      indicatorCnt: 0,
      isDisabled: false,
      stockChange: false,
      colors: colors(props.globalData.isDarkThemeActive),
      appState: AppState.currentState
    };

    this.smallGraphHeight = 150;
    this.largeGraphHeight = 300;
  }

  orientationDidChange = orientation => {
    if (orientation == 'LANDSCAPE') {
      this.setState({ orientation: 'landscape' })

    } else if (orientation == 'PORTRAIT') {
      this.setState({ orientation: 'portrait' })

      if (this.state.isRotateVisible) {
        this.setState({ isRotateVisible: false })
        var that = this;
        setTimeout(function () { that.showOrder(that.state.orderType) }, 500);
      }
    }
  }

  navToLink(link) {
    Linking.openURL('http://' + link)
    // Linking.canOpenURL(link)
    // .then((res) => {
    //   if(res === true) {
    //     return Linking.openURL('http://' + link)
    //   }
    // })
    // .then((res) => {
    //   console.log('success', res)
    // })
    // .catch((err) => {
    //   console.log('err', err)
    // })
  }

  addSymbol = ticker => {
    Alert.alert(
      '',
      'Add ' + ticker + ' to your watchlist?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => watchListStore.addTickerToWatchList(ticker) },
      ],
      { cancelable: true }
    )
  }

  removeSymbol = ticker => {
    Alert.alert(
      '',
      'Remove ' + ticker + ' from your watchlist?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => watchListStore.removeTickerFromWatchList(ticker) },
      ],
      { cancelable: true }
    )
  }

  forceSetToLandscape() {
    // Orientation.lockToLandscape()
    // this.setState({
    //   orientation: 'landscape'
    // })
  }

  componentDidMount() {
    const { initIndicatorsList, setRange } = chartStore;
    setRange(this.state.page)

    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);
    AppState.addEventListener('change', this._handleAppStateChange);
    initIndicatorsList();
    // setTimeout(() => {
    //   this.forceSetToLandscape();
    // }, 1000)

    getTheme()
    chartStore.getTickerDetails(this.props.navigation.state.params.data)
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      Orientation.unlockAllOrientations();
      Orientation.addOrientationListener(this.orientationDidChange);
    }
    this.setState({ appState: nextAppState });
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

  componentWillUnmount() {
    const { resetChartData } = chartStore;
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
    AppState.removeEventListener('change', this._handleAppStateChange);
    resetChartData();
  }

  showOrder = orderType => {
    // if(this.state.orientation == 'landscape') {
    //   this.setState({ isRotateVisible: true, orderType: orderType })
    // } else {
    //   Orientation.lockToPortrait();
    //   this.setState({ isOrderVisible: true, orderType: orderType })
    // }
    if (this.state.orientation == 'landscape') {
      this.setState({ isRotateVisible: true, orderType: orderType })
    }
    this.setState({
      orderType
    }, () => {
      this.props.navigation.navigate('Trade', {
        orderType,
        targetStockData: this.props.navigation.state.params.data
      });
    });
  }

  hideOrder = () => {
    Orientation.unlockAllOrientations();
    this.setState({ isOrderVisible: false })
  }
  showNews = () => {
    this.setState({ isNewsVisible: true })
    Orientation.lockToPortrait();
  }
  hideNews = () => {
    this.setState({ isNewsVisible: false })
    Orientation.unlockAllOrientations();
  }
  showSearch = () => {
    this.setState({ isSearchVisible: true });
    Orientation.lockToPortrait();
  }
  hideSearch = () => {
    this.setState({ isSearchVisible: false });
    Orientation.unlockAllOrientations();
  }
  showIndicators = () => {
    this.setState({ isIndicatorsVisible: true });
  }
  hideIndicators = () => {
    this.setState({ isIndicatorsVisible: false });
  }
  toggleCheck = value => {
    const { setIndicatorsList } = chartStore;
    var indicates = this.state.indicators;
    var exists = false;
    var indicatorCnt = this.state.indicatorCnt;
    console.log(indicates);
    for (var i = 0; i < indicates.length; i++) {
      console.log('checking', indicates[i] == value);
      //if exists in indicators array remove it
      if (indicates[i] == value) {
        console.log('exists');
        indicatorCnt--;
        indicates.splice(i, 1);
        exists = true;
        this.setState({ isDisabled: false }, () => {
          this.setState({ indicators: indicates, isDisabled: false, indicatorCnt: indicatorCnt }, () => {
            // forward data to mobx
            setIndicatorsList(indicates);
          })
        })
        return;
      }
    }

    console.log("movin on");
    //if it doesn't exists and we aren't at 5 indicators add it
    if (!exists && indicates.length < 5) {
      console.log('doesnt exist');
      indicatorCnt++;

      if (indicatorCnt < 5) {
        console.log('indicatorCnt', indicatorCnt);
        if (indicatorCnt == 4) {
          console.log('indicatorCnt', indicatorCnt);
          var arrayvar = indicates.slice()
          arrayvar.push(value)
          this.setState({ indicators: arrayvar, isDisabled: true, indicatorCnt: indicatorCnt }, () => {
            // forward data to mobx
            setIndicatorsList(arrayvar);
          })
        } else {
          var arrayvar = indicates.slice()
          arrayvar.push(value)
          this.setState({ indicators: arrayvar, isDisabled: false, indicatorCnt: indicatorCnt }, () => {
            // forward data to mobx
            setIndicatorsList(arrayvar);
          })
        }
      }
    } else if (indicates.length >= 4) {
      console.log('too many exist');
      this.setState({ isDisabled: true }, () => {
      })
    }
  }
  checkIndicators = value => {
    var indicates = this.state.indicators;
    var exister = false;
    for (var i = 0; i < indicates.length; i++) {
      if (indicates[i] == value) {
        exister = true;
      }
    }
    return exister;
  }
  goBack = tab => {
    this.props.navigation.goBack();
    var that = this;
    setTimeout(function () { that.props.navigation.navigate(tab) }, 15);
  }



  setRange = name => {
    if (this.state.page === name) {
      return;
    }
    const { setRange } = chartStore;
    this.setState({
      page: name
    }, () => {
      setRange(name)
    })
  }

  // TODO: add image to watchlist when you add

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // PORTRAIT
  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderExecutives = executives => {
    // {/* TODO: get executives list. Not in this data yet */}

    // executives = [
    //   {
    //     title: 'Timothy Donald Cook',
    //     role: 'Chief Executive Officer'
    //   },
    //   {
    //     title: 'Jeffrey E Williams',
    //     role: 'Chief Operating Officer'
    //   }
    // ]

    if (!executives || executives.length === 0) {
      return <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
    } else {
      return <View>
        {executives.map((elem, i) => {
          return <View key={`chart_executive_${i}`} style={chart.profileTxt}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTxtDrk, fonts.hindGunturRg]}>{elem.title}</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxtSm, fonts.hindGunturRg]}>{elem.role}</Text>
          </View>
        })}
      </View>
    }
  }

  renderRelatedListOrNot = list => {
    if (!list || list.length === 0) {
      return <View style={chart.profileTxt}>
        <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxtSm, fonts.hindGunturRg]}>No Results</Text>
      </View>
    } else {
      return list.map((elem, i) => {
        return <View style={chart.profileTxt} key={`chart_related_list_${i}`}>
          <Text style={[{ color: this.state.colors['blue'] }, chart.sectionTxtSymbol, fonts.hindGunturRg]}>TICKER</Text>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxtSm, fonts.hindGunturRg]}>Company Name</Text>
        </View>
      })
    }
  }

  renderRelated() {
    return null;

    {/* TODO: get related stocks. not yet in data */ }

    let relatedList = [];

    return <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
      <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>PEOPLE ALSO LOOKED AT</Text>
      {this.renderRelatedListOrNot(relatedList)}
    </View>
  }


  renderLongBar() {
    return null;
    {/* TODO: YOU ARE LONG */ }
    return <View style={[{ borderTopColor: this.state.colors['borderGray'], backgroundColor: this.state.colors['white'], }, chart.symbolPosition]}>
      <Text style={[{ color: this.state.colors['darkSlate'] }, chart.symbolColumn, chart.symbolColumnFirst, fonts.hindGunturRg]}>You are long</Text>
      <Text style={[{ color: this.state.colors['darkSlate'] }, chart.symbolColumn, chart.symbolColumnMiddle, fonts.hindGunturRg]}>2000 x $152.67</Text>
      <Text style={[{ color: this.state.colors['green'] }, chart.symbolColumnPrice, fonts.hindGunturBd]}>+265.78</Text>
    </View>
  }

  renderWatchListButton = ticker => {
    const { isTickerInWatchlist, watchlistDataJS } = watchListStore;
    let image = this.state.colors['addImage'];
    let functionToFire = this.addSymbol;
    if (isTickerInWatchlist(ticker)) {
      image = this.state.colors['watchlistAdded'];
      functionToFire = this.removeSymbol
    }
    return <TouchableOpacity style={styles.rightCta} onPress={() => functionToFire(ticker)}>
      <Image source={image} style={{ width: 23, height: 23 }} />
    </TouchableOpacity>
  }

  renderPortraitMomentum = params => {
    if (params.momentum == 'na') {
      return null
    } else {
      let momentum_label = '';
      if (params.momentum >= 0 && params.momentum < 0.2) {
        momentum_label = 'STRONG SELL'
      }
      if (params.momentum >= 0.2 && params.momentum < 0.4) {
        momentum_label = 'SELL'
      }
      if (params.momentum >= 0.4 && params.momentum < 0.6) {
        momentum_label = 'NEUTRAL'
      }
      if (params.momentum >= 0.6 && params.momentum < 0.8) {
        momentum_label = 'BUY'
      }
      if (params.momentum >= 0.8) {
        momentum_label = 'STRONG BUY'
      }
      return <View style={[chart.momentumWrapper, { width: '100%' }]}>
        <View style={[chart.momentumInfo, { flex: 1 }]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.momentumTitle, fonts.hindGunturBd]}>MOMENTUM</Text>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.momentumSubTitle, fonts.hindGunturRg]}>{momentum_label}</Text>
        </View>
        {this.state.orientation === 'portrait' ?
        <View style={{ flex: 0.25}}>
          <Image
            source={require('../images/turnphone.png')}
            style={styles.rotateImgPortrait}
          />
        </View> : null }
        <View style={{ flex: 1 }}>
          <DialIndicator showArrow={true} width={100} height={50} displayText={true} textLine1={null} textLine2={null} position={params.momentum} />
        </View>
      </View>
    }
  }

  renderTabs = () => {
    let style = {
      display: 'flex',
      alignItems: 'center',
      height: 32,
      flexDirection: 'row',
      width: '100%'
    }
    return <View style={style}>
      {chartRangeOptions.map((elem, i) => {
        let inlineStyle = {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          marginHorizontal: 2,
          marginBottom: 2,
          marginTop: 0,
          borderColor: this.state.colors['grayTwo'],
          color: this.state.colors['white'],
        }
        let selected = false;
        if (this.state.page == elem.query) {
          selected = true;
        }
        if (selected) {
          inlineStyle.backgroundColor = this.state.colors['grayTwo'];
        }
        return (
          <TouchableOpacity
            key={`chart_range_option_${i}`}
            name={elem.query}
            style={[inlineStyle, fonts.hindGunturBd, chart.timeSelected]}
            onPress={this.setRange.bind(this, elem.query)}
          >
            <Text
              name={elem.query}
              style={[{ color: this.state.colors['lightGray'] }, chartland.time, fonts.hindGunturRg]}
            >
              {elem.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>

    // return <Tabs
    //   selected={this.state.page}
    //   style={style}
    //   selectedStyle={[{backgroundColor: this.state.colors['grayTwo']},{borderColor: this.state.colors['grayTwo']},{color: this.state.colors['white']}, fonts.hindGunturBd, chart.timeSelected]}
    //   onSelect={el=> this.setRange(el)}
    // >
    //   {chartRangeOptions.map((elem, i) => {
    //     let inlineStyle = {
    //       borderWidth: 1,
    //       borderColor: 'blue',
    //     }
    //     return <View name={elem.query}>
    //       <Text name={elem.query} style={[{color: this.state.colors['lightGray'], ...inlineStyle}, chartland.time, fonts.hindGunturRg]}>{elem.title}</Text>  
    //     </View>
    //   })}
    // </Tabs>


  }

  renderPortrait = params => {
    let {
      Price,
      Volume,
      address,
      ask,
      bid,
      change,
      changePercent,
      companyName,
      exchange,
      executives,
      high,
      keyStats,
      latestUpdate,
      low,
      momentum,
      open,
      overview,
      position,
      profile,
      ticker,
      website,
      formattedTime,
      formattedVolume,
      formattedVolumeWithCommas,
      formattedPrice,
      formattedOpen,
      formattedLow,
      formattedHigh,
      formattedSharesOutstanding,
      formattedChangePercent,
      formattedChangeDecimal,
      formattedLastStockSplit,
      isPosNeg
    } = params;

    return <View>
      <View style={styles.menuBorder}>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.leftCta} onPress={() => this.props.navigation.goBack()}>
            <Image
              source={require('../images/back.png')}
              style={styles.backImg}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
            <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
            <Image
              source={require('../images/search.png')}
              style={styles.searchImg}
            />
          </TouchableOpacity>
          {this.renderWatchListButton(ticker)}
        </View>
      </View>

      {this.renderLongBar()}


      {/* Bottom Menu nav bar */}

      {/* <View style={[{ borderTopColor: this.state.colors['borderGray'] }, { backgroundColor: this.state.colors['white'] }, chart.fakeTabNav]}>
        <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Account')}>
          <View style={chart.fakeIcon}>
            <Image
              source={require('../images/accounts.png')}
              style={[navstyle.icon, { tintColor: this.state.colors['lightGray'] }]}
            />
          </View>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.fakeTabLabel]}>Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Watchlists')}>
          <View style={chart.fakeIcon}>
            <Image
              source={require('../images/watchlist.png')}
              style={[navstyle.iconBig, { tintColor: this.state.colors['lightGray'] }]}
            />
          </View>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.fakeTabLabel]}>Watchlist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Trending')}>
          <View style={chart.fakeIcon}>
            <Image
              source={require('../images/trending.png')}
              style={[navstyle.iconBig, { tintColor: this.state.colors['lightGray'] }]}
            />
          </View>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.fakeTabLabel]}>Trending</Text>
        </TouchableOpacity>
        <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Scanner')}>
          <View style={chart.fakeIcon}>
            <Image
              source={require('../images/scanner.png')}
              style={[navstyle.iconBig, { tintColor: this.state.colors['lightGray'] }]}
            />
          </View>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.fakeTabLabel]}>Scanner</Text>
        </TouchableOpacity>
        <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Settings')}>
          <View style={chart.fakeIcon}>
            <Image
              source={require('../images/settings.png')}
              style={[navstyle.icon, { tintColor: this.state.colors['lightGray'] }]}
            />
          </View>
          <Text style={[{ color: this.state.colors['lightGray'] }, chart.fakeTabLabel]}>Settings</Text>
        </TouchableOpacity>
      </View> */}


      <ScrollView style={[chart.wrapper, { backgroundColor: this.state.colors['white'] }]}>
        <View style={chart.header}>
          <View style={chart.titleContainer}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, chart.name, fonts.hindGunturBd]}>{companyName}</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.symbol, fonts.hindGunturRg]}>{ticker}: {(exchange) ? exchange.replace("CM", '').replace("GM", '').replace("GS", '') : ''}</Text>
          </View>
          <TouchableOpacity style={[{ borderColor: this.state.colors['lightGray'] }, chart.newsBtn]} onPress={() => this.showNews()}>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.newsBtnTxt, fonts.hindGunturRg]}>News</Text>
          </TouchableOpacity>
        </View>

        <View style={chart.prices}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.stockPrice, fonts.hindGunturRg]}>{formattedPrice}</Text>
          <TouchableOpacity style={chart.priceInfo} onPress={() => this.setState({ stockChange: !this.state.stockChange })}>
            <Text style={[{ color: this.state.colors['darkGray'] }, chart.priceTime, fonts.hindGunturRg]}>{formattedTime}</Text>
            {this.state.stockChange ? <Text style={[{ backgroundColor: this.state.colors[isPosNeg] }, { borderColor: this.state.colors[isPosNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedChangeDecimal}</Text> : <Text style={[{ backgroundColor: this.state.colors[isPosNeg] }, { borderColor: this.state.colors[isPosNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedChangePercent}</Text>}
          </TouchableOpacity>
        </View>

        <View style={chart.prices}>
          <View style={chart.pricePoints}>
            <View style={chart.priceOpen}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.priceLabel, fonts.hindGunturRg]}>OPEN</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.priceNum, fonts.hindGunturRg]}>{formattedOpen}</Text>
            </View>
            <View style={chart.priceHigh}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.priceLabel, fonts.hindGunturRg]}>HIGH</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.priceNum, fonts.hindGunturRg]}>{formattedHigh}</Text>
            </View>
            <View style={chart.priceLow}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.priceLabel, fonts.hindGunturRg]}>LOW</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.priceNum, fonts.hindGunturRg]}>{formattedLow}</Text>
            </View>
            <View style={chart.priceVol}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.priceLabel, fonts.hindGunturRg]}>VOLUME</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.priceNum, fonts.hindGunturRg]}>{formattedVolumeWithCommas}</Text>
            </View>
          </View>
        </View>

        <View style={chart.verticalChart}>
          {this.renderTabs()}
          <View style={chart.chartWrapper}>
            <ChartGraph height={this.smallGraphHeight} viewLargeGraph={false} />
          </View>
        </View>

        {this.renderPortraitMomentum(params)}

        <View style={[chart.profileWrapper, { borderBottomColor: this.state.colors['borderGray'] }]}>
          <View style={chart.statsRow}>
            <TouchableOpacity style={styles.sellBtn} onPress={() => { this.showOrder('Sell') }}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyBtn} onPress={() => { this.showOrder('Buy') }}>
              <Text style={[{ color: this.state.colors['realWhite'] }, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
            </TouchableOpacity>
          </View>
        </View>

        {this.renderBidAsk(params)}

        <View style={chart.statsWrapper}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>KEY STATS</Text>
          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>52-WK HIGH</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.week52high, 2)}</Text>
            </View>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>52-WK LOW</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.week52low, 2)}</Text>
            </View>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>AVG VOLUME</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.avgTotalVolume)}</Text>
            </View>
          </View>
          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>MKT CAP</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{millionBillionFormatter(keyStats.mktCap)}</Text>
            </View>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>P/E RATIO (TTM)</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.peRatio, 2)}</Text>
            </View>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>EPS (TTM)</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.eps, 2)}</Text>
            </View>
          </View>
          <View style={chart.statsRow}>

            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>DIV YIELD</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.divYield, 2)}</Text>
            </View>

            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>DIV</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.dividendRate, 2)}%</Text>
            </View>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>BETA</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{numberWithCommasFixed(keyStats.beta, 2)}</Text>
            </View>
          </View>
          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>FLOAT</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{millionBillionFormatter(keyStats.float)}</Text>
            </View>
            <View style={chart.statsColumnLong}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}></Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}></Text>
            </View>
            <View style={chart.statsColumnShort}></View>
          </View>
        </View>

        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>PROFILE</Text>
          <View style={chart.profileTxt}>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxt, fonts.hindGunturRg]}>{profile}</Text>
          </View>
        </View>

        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>ADDRESS</Text>
          <View style={chart.profileTxt}>

            {/* TODO: there is no state or country in the data.. */}

            <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxt, fonts.hindGunturRg]}>{address.hq_address1}
              {address.hq_address2 ? ", " : ""}{address.hq_address2}
            </Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxt, fonts.hindGunturRg]}>{address.hq_address_city}, {statesHash[address.hq_state]} {address.hq_address_postal_code}</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, chart.sectionTxt, fonts.hindGunturRg]}></Text>
          </View>
        </View>

        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>WEBSITE</Text>
          <TouchableOpacity onPress={() => this.navToLink(website)}>
            <View style={chart.profileTxt}>
              <Text style={[{ color: this.state.colors['blue'] }, chart.sectionTxt, fonts.hindGunturRg]}>{website ? "http://" : ""}{website}{website ? "/" : ""}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chart.sectionTitle, fonts.hindGunturBd]}>OVERVIEW</Text>
          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>SHARES OUTSTANDING</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{formattedSharesOutstanding}</Text>
            </View>
            <View style={chart.statsColumn}>

              {/* TODO: get this data, don't have anything for last stock split */}

              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>LAST STOCK SPLIT</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{formattedLastStockSplit}</Text>
            </View>
          </View>

          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chart.statsTitle, fonts.hindGunturRg]}>INSTITUTIONAL OWNERSHIP</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chart.statsNum, fonts.hindGunturRg]}>{overview.institutionPercent}%</Text>
            </View>
          </View>
        </View>

        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, chart.profileWrapper]}>
          <View style={styles.btnRow}>
            <View style={chart.statsColumn}>
              <TouchableOpacity style={styles.sellBtn} onPress={() => { this.showOrder('Sell') }}>
                <Text style={[{ color: this.state.colors['realWhite'] }, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
              </TouchableOpacity>
            </View>
            <View style={chart.statsColumn}>
              <TouchableOpacity style={styles.buyBtn} onPress={() => { this.showOrder('Buy') }}>
                <Text style={[{ color: this.state.colors['realWhite'] }, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  }

  renderBidListOrNothing = params => {
    if (params.bid.length === 0) {
      return <View style={chartland.bid}>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskPrice]}>No Bids</Text>
      </View>
    }
    return params.bid.map((elem, i) => {
      return <View style={chartland.bidaskRow} key={`chart_bid_list_${i}`}>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskNum]}>{elem.size}</Text>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskPrice]}>{elem.price}</Text>
      </View>
    })
  }

  renderAskListOrNothing = params => {
    if (params.ask.length === 0) {
      return <View style={chartland.bid}>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskPrice]}>No Asks</Text>
      </View>
    }
    return params.ask.map((elem, i) => {
      return <View style={chartland.bidaskRow} key={`chart_ask_list_${i}`}>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskNum]}>{elem.size}</Text>
        <Text style={[{ color: this.state.colors['lightGray'] }, chartland.bidaskPrice]}>{elem.price}</Text>
      </View>
    })
  }

  renderBidAsk = params => {
    return <View style={[chartland.bidAsksWrapper, { marginVertical: 10 }]}>
      <View style={chartland.bid}>
        <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.sectionTitle]}>BID</Text>
        {this.renderBidListOrNothing(params)}
      </View>
      <View style={chartland.bid}>
        <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.sectionTitle]}>ASK</Text>
        {this.renderAskListOrNothing(params)}
      </View>
    </View>
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //
  // LANDSCAPE
  //
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  renderCheckboxModalAndList = () => {
    const { themeType } = colorStore;
    let vlmImageSrc = red_blue_checkbox_image;
    return <Modal
      isVisible={this.state.isIndicatorsVisible}
      animationIn={'fadeIn'}
      animationOut={'fadeOut'}
      style={chartland.fullModal}
      onModalHide={this.hideIndicators}>
      <View style={chartland.radio}>
        <View style={chartland.radioTitleWrap}>
          <Text style={[chartland.radioTitle, fonts.hindGunturBd]}>INDICATORS</Text>
          <Text style={[chartland.radioSubTitle, fonts.hindGunturRg]}>Select up to 5</Text>
        </View>
        <ScrollView style={chartland.radioWrap}>

          <View style={styles.checkBoxWrap}>
            <CheckBox
              style={styles.checkField}
              onClick={() => this.toggleCheck('VLM')}
              isChecked={this.checkIndicators('VLM')}
              isDisabled={this.state.isDisabled}
              rightTextViewStyle={styles.checkBoxLabelWrap}
              rightText={'VLM'}
              rightTextStyle={[styles.checkBoxLabel, fonts.hindGunturBd]}
              rightSubText={'Volume'}
              rightSubTextStyle={[styles.checkBoxSubLabel, fonts.hindGunturRg]}
              checkedImage={<Image source={vlmImageSrc} style={styles.checkBox} />}
              unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox} />}
            />
          </View>

          <View style={styles.checkBoxWrap}>
            <CheckBox
              style={styles.checkField}
              onClick={() => this.toggleCheck('ICHI')}
              isChecked={this.checkIndicators('ICHI')}
              isDisabled={this.state.isDisabled}
              rightTextViewStyle={styles.checkBoxLabelWrap}
              rightText={'ICHI'}
              rightTextStyle={[styles.checkBoxLabel, fonts.hindGunturBd]}
              rightSubText={'Ichimoku Cloud'}
              rightSubTextStyle={[styles.checkBoxSubLabel, fonts.hindGunturRg]}
              checkedImage={<Image source={require('../images/checkbox_split.png')} style={styles.checkBox} />}
              unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox} />}
            />
          </View>

          <View style={styles.checkBoxWrap}>
            <CheckBox
              style={styles.checkField}
              onClick={() => this.toggleCheck('SMA')}
              isChecked={this.checkIndicators('SMA')}
              isDisabled={this.state.isDisabled}
              rightTextViewStyle={styles.checkBoxLabelWrap}
              rightText={'SMA'}
              rightTextStyle={[styles.checkBoxLabel, fonts.hindGunturBd]}
              rightSubText={'Simple Moving Average'}
              rightSubTextStyle={[styles.checkBoxSubLabel, fonts.hindGunturRg]}
              checkedImage={<Image source={_FF8C00_checkbox_image} style={styles.checkBox} />}
              unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox} />}
            />
          </View>

          <View style={styles.checkBoxWrap}>
            <CheckBox
              style={styles.checkField}
              onClick={() => this.toggleCheck('EMA')}
              isChecked={this.checkIndicators('EMA')}
              isDisabled={this.state.isDisabled}
              rightTextViewStyle={styles.checkBoxLabelWrap}
              rightText={'EMA'}
              rightTextStyle={[styles.checkBoxLabel, fonts.hindGunturBd]}
              rightSubText={'Exponential Moving Average'}
              rightSubTextStyle={[styles.checkBoxSubLabel, fonts.hindGunturRg]}
              checkedImage={<Image source={ema_red_blue_checkbox_image} style={styles.checkBox} />}
              unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox} />}
            />
          </View>

          <View style={styles.checkBoxWrap}>
            <CheckBox
              style={styles.checkField}
              onClick={() => this.toggleCheck('BOL')}
              isChecked={this.checkIndicators('BOL')}
              isDisabled={this.state.isDisabled}
              rightTextViewStyle={styles.checkBoxLabelWrap}
              rightText={'BOL'}
              rightTextStyle={[styles.checkBoxLabel, fonts.hindGunturBd]}
              rightSubText={'Bollinger Bands'}
              rightSubTextStyle={[styles.checkBoxSubLabel, fonts.hindGunturRg]}
              checkedImage={<Image source={_000000_checkbox_image} style={styles.checkBox} />}
              unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox} />}
            />
          </View>

        </ScrollView>
      </View>
    </Modal>
  }


  renderLandscape = params => {
    const {
      Price,
      Volume,
      address,
      ask,
      bid,
      change,
      changePercent,
      companyName,
      exchange,
      executives,
      high,
      keyStats,
      latestUpdate,
      low,
      momentum,
      open,
      overview,
      position,
      profile,
      ticker,
      website,
      formattedTime,
      formattedVolume,
      formattedVolumeWithCommas,
      formattedPrice,
      formattedOpen,
      formattedLow,
      formattedHigh,
      formattedSharesOutstanding,
      formattedChangePercent,
      formattedChangeDecimal,
      isPosNeg
    } = params;

    const { longSide, shortSide } = deviceSizeStore;

    let headerHeight = 58;
    let footerHeight = 45;
    let rightWidth = 220;
    if (longSide > 800) {
      rightWidth = 301;
    }

    let chartHeight = shortSide - headerHeight - footerHeight;
    let chartWidth = longSide - rightWidth;
    console.log(1049, position)
    return <View style={chartland.landscape}>
      <View style={chartland.header}>
        <TouchableOpacity style={chartland.leftCtaSpacer} onPress={() => this.props.navigation.goBack()}>
          <Image
            source={require('../images/back.png')}
            style={styles.backImg}
          />
        </TouchableOpacity>
        <View style={chartland.titleContainer}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.name, fonts.hindGunturBd]}>{companyName}</Text>
          <Text style={[{ color: this.state.colors['lightGray'] }, chartland.symbol, fonts.hindGunturRg]}>{ticker}: {(exchange) ? exchange.replace("CM", '').replace("GM", '').replace("GS", '') : ''}</Text>
        </View>
        <View style={chartland.currentPrice}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.stockPrice, fonts.hindGunturRg]}>{formattedPrice}</Text>

          <TouchableOpacity style={chartland.priceInfo} onPress={() => this.setState({ stockChange: !this.state.stockChange })}>
            <Text style={[{ color: this.state.colors['darkGray'] }, chartland.priceTime, fonts.hindGunturRg]}>{formattedTime}</Text>
            {this.state.stockChange ? <Text style={[{ backgroundColor: this.state.colors[isPosNeg] }, { borderColor: this.state.colors[isPosNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedChangeDecimal}</Text> : <Text style={[{ backgroundColor: this.state.colors[isPosNeg] }, { borderColor: this.state.colors[isPosNeg] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{formattedChangePercent}</Text>}
          </TouchableOpacity>
        </View>
        {this.renderWatchListButton(ticker)}
      </View>
      <View style={chartland.header_second}>
        <View style={chartland.prices}>
          <View style={chartland.pricePoints}>
            <View style={chartland.priceOpen}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chartland.priceLabel, fonts.hindGunturRg]}>OPEN: </Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.priceNum, fonts.hindGunturRg]}>{formattedOpen}</Text>
            </View>
            <View style={chartland.priceHigh}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chartland.priceLabel, fonts.hindGunturRg]}>HIGH: </Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.priceNum, fonts.hindGunturRg]}>{formattedHigh}</Text>
            </View>
            <View style={chartland.priceLow}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chartland.priceLabel, fonts.hindGunturRg]}>LOW: </Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.priceNum, fonts.hindGunturRg]}>{formattedLow}</Text>
            </View>
            <View style={chartland.priceVol}>
              <Text style={[{ color: this.state.colors['lightGray'] }, chartland.priceLabel, fonts.hindGunturRg]}>VOLUME: </Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.priceNum, fonts.hindGunturRg]}>{formattedVolumeWithCommas}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={chartland.chartWrapper}>
        <View style={[chartland.leftSide]}>
          <View style={[chartland.chartFPO, { height: chartHeight }]}>
            <ChartGraph height={chartHeight} width={chartWidth} viewLargeGraph={true} />
          </View>

          <View style={[chartland.options, { flex: 1 }]}>
            <TouchableOpacity style={chartland.indicatorsContainer} onPress={() => this.showIndicators()}>
              <View style={chartland.indicatorsWrap}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.indicatorsBtn, fonts.hindGunturBd]}>INDICATORS</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, chartland.indicatorsTxt, fonts.hindGunturRg]}>
                  {this.state.indicators.length < 1 ?
                    'Add to graph' : ''}
                  {
                    this.state.indicators.map(function (indicate, index) {
                      if (index < 3) {
                        return <Text key={index}>{indicate} </Text>
                      } else if (index == 3) {
                        return <Text key={index}>...</Text>
                      }
                    })
                  }
                  {currIndicates}
                </Text>
              </View>
            </TouchableOpacity>
            <View style={chartland.timePeriod}>
              {this.renderTabs()}
            </View>
          </View>


        </View>

        <View style={chartland.right}>
                
          <ScrollView>
            {this.renderPortraitMomentum(params)}
            {this.renderBidAsk(params)}
            { position.map(( posi, x ) => {
              let totalSpent = posi.totalAmountSpent;
              let currentValue = posi.shares * Price;

              let gainLoss = currentValue - totalSpent;
              let posNeg = 'green';
              if (gainLoss < 0) {
                posNeg = 'red';
              }
              let formattedGainLoss = numberWithCommasFixed(gainLoss,2);
              return <View style={[{ borderTopColor: this.state.colors['borderGray'] }, { borderBottomColor: this.state.colors['borderGray'] }, chartland.symbolPosition]}>
                <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.symbolColumn, fonts.hindGunturRg]}>You are {posi.type}</Text>
                <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.symbolColumn, fonts.hindGunturRg]}>{posi.shares} x ${formattedPrice}</Text>
                <Text style={[{ color: this.state.colors['darkSlate'] }, chartland.symbolColumnPrice, fonts.hindGunturBd, { color: this.state.colors[posNeg] }]}>{formattedGainLoss}</Text>
              </View>
            })}
            <View style={chartland.profileWrapper}>
              <View style={chartland.statsRow}>
                <View style={chartland.statsColumn}>
                  <TouchableOpacity style={styles.sellBtnShort} onPress={() => { this.showOrder('Sell') }}>
                    <Text style={[{ color: this.state.colors['realWhite'] }, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
                  </TouchableOpacity>
                </View>
                <View style={chartland.statsColumn}>
                  <TouchableOpacity style={styles.buyBtnShort} onPress={() => { this.showOrder('Buy') }}>
                    <Text style={[{ color: this.state.colors['realWhite'] }, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>


        </View>
      </View>
      {this.renderCheckboxModalAndList()}
    </View>
  }



  showOrientation = () => {
    const { chartLoading, tickerDataJS } = chartStore;

    console.log('==========================================================================')
    console.log(tickerDataJS)

    if (!tickerDataJS) {
      return null;
    }

    let {
      Price,
      Volume,
      address,
      ask,
      bid,
      change,
      changePercent,
      companyName,
      exchange,
      executives,
      high,
      keyStats,
      latestUpdate,
      low,
      momentum,
      open,
      overview,
      position,
      profile,
      ticker,
      website,
    } = tickerDataJS;

    //  formatting data
    let formattedTime = moment.unix((latestUpdate / 1000)).tz("America/New_York").format('h:mm A z');
    let formattedVolume = millionBillionFormatter(Volume);

    let formattedVolumeWithCommas = numberWithCommas(Volume);
    // add tofixed
    let formattedPrice = '' + '---';
    if (Price) {
      formattedPrice = numberWithCommasFixed(Price, 2)
    }

    let formattedOpen = '' + '---';
    if (open) {
      formattedOpen = numberWithCommasFixed(open, 2);
    }

    let formattedLow = '---';
    if (low) {
      formattedLow = numberWithCommasFixed(low, 2)
    }

    let formattedHigh = '---';
    if (high) {
      formattedHigh = numberWithCommasFixed(high, 2)
    }

    let formattedChangePercent = '---' + '%';
    if (changePercent) {
      formattedChangePercent = changePercent.toFixed(2) + '%'
    }
    if (changePercent >= 0 && typeof changePercent === 'number') {
      formattedChangePercent = '+' + changePercent.toFixed(2) + '%';
    } 

    let isPosNeg = 'green';
    let formattedChangeDecimal = '---';
    if (change) {
      formattedChangeDecimal = numberWithCommasFixed(change, 2)
    }
    if (change >= 0 && typeof change === 'number') {
      formattedChangeDecimal = '+' + numberWithCommasFixed(change, 2);
    } else if (change < 0) {
      isPosNeg = 'red';
      formattedChangeDecimal = numberWithCommasFixed(change, 2);
    }

    let formattedSharesOutstanding = millionBillionFormatter(overview.sharesOutstanding);

    let formattedLastStockSplit = 'N/A';

    if (overview.lastStockSplit) {
      if ('paymentDate' in overview.lastStockSplit && overview.lastStockSplit.paymentDate !== null) {
        formattedLastStockSplit = moment(overview.lastStockSplit.paymentDate).format('MM/DD/YYYY');
      }
    }

    const params = {
      ...tickerDataJS,
      formattedTime,
      formattedVolume,
      formattedVolumeWithCommas,
      formattedPrice,
      formattedOpen,
      formattedLow,
      formattedHigh,
      formattedSharesOutstanding,
      formattedChangePercent,
      formattedChangeDecimal,
      formattedLastStockSplit,
      isPosNeg
    }

    switch (this.state.orientation) {
      case 'portrait':
        return this.renderPortrait(params)
        break;
      case 'landscape':
        return this.renderLandscape(params)
        break;
    }
  }

  renderLoadingOrContent = () => {
    const { chartLoading, tickerDataJS } = chartStore;

    let newsTicker = null;
    let companyName = null;
    if (tickerDataJS) {
      newsTicker = tickerDataJS.ticker;
      companyName = tickerDataJS.companyName;
    }
    // alert(JSON.stringify(tickerDataJS));

    if (chartLoading) {
      return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[{ color: this.state.colors['lightGray'] }, fonts.hindGunturRg]}>Loading...</Text>
      </View>
    } else {
      return <View style={chart.container}>
        {this.showOrientation()}
        {/* {
          this.state.isOrderVisible &&
            <Modal
              isVisible
              animationIn={'slideInUp'}
              animationOut={'slideOutDown'}
              style={order.modal}>
              <PlaceOrder
                hideOrder={this.hideOrder}
                orderType={this.state.orderType} 
                targetStockData={this.props.navigation.state.params.data}
              />
            </Modal>
        } */}
        <Modal
          isVisible={this.state.isNewsVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={chart.newsModal}>
          <ChartNews
            ticker={newsTicker}
            companyName={companyName}
            hideNews={this.hideNews} />
        </Modal>
        <Modal
          isVisible={this.state.isRotateVisible}
          animationIn={'fadeIn'}
          animationOut={'fadeOut'}
          style={order.modal}>
          <View style={styles.pageContainer}>
            <View style={styles.rotateDevice}>
              <Image
                source={require('../images/turnphoneicon.png')}
                style={styles.rotateImg}
              />
              <Text style={[styles.rotateFont, fonts.hindGunturBd]}>Please rotate your phone</Text>
              <Text style={[styles.rotateFont, fonts.hindGunturBd]}>to buy {newsTicker} stocks</Text>
            </View>
          </View>
        </Modal>
      </View>
    }
  }

  render() {
    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>

        {this.renderLoadingOrContent()}

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

Chart.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Chart);
