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
  Linking
} from 'react-native';
import { connect } from 'react-redux';
import Modal from '../components/react-native-modal'
import Orientation from 'react-native-orientation';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from '../components/react-native-simple-radio-button';
import CheckBox from '../components/react-native-check-box'
import Tabs from 'react-native-tabs';
import ResponsiveImage from 'react-native-responsive-image';
import { setTheme, getTheme, colors } from '../store/store';
import PlaceOrder from './placeorder';
import ChartNews from './chartnews';
import AppNav from './appnav';
import Search from './search';
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
import { chartStore, watchListStore, deviceSizeStore } from '../mobxStores';
import { observer } from 'mobx-react';
import moment from 'moment-timezone';
import { millionBillionFormatter } from '../utility';


// var colors = require('../style/colors')
var currIndicates = [];

var indicator_props = [
  {label: 'VLM', info: 'Volume', value: 0 },
  {label: 'TRND', info: 'Trend Lines', value: 1 },
  {label: 'ICHI', info: 'Ichimoku Cloud', value: 2 },
  {label: 'OBV', info: 'On Balance Volume', value: 3 },
  {label: 'SMA', info: 'Simple Moving Average', value: 4 },
  {label: 'EMA', info: 'Exponential Moving Average', value: 5 },
  {label: 'MACD', info: 'Moving Average Convergence Divergence', value: 6 },
  {label: 'RSI', info: 'Relative Strength Index', value: 7 },
  {label: 'A/D Line', info: 'Accumulation/Distribution Line', value: 8 },
  {label: 'FIB', info: 'Fibonacci', value: 9 },
  {label: 'BOL', info: 'Bollinger Bands', value: 10 }
];

@observer
class Chart extends Component {

  static navigationOptions = {
    header: null,
    gesturesEnabled: true,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/watchlist.png')}
        style={[navstyle.iconBig, {tintColor: tintColor}]}
      />
    ),
  };
  constructor(props){
    super(props);
    this.state = {
      isOrderVisible: false,
      isRotateVisible: false,
      isNewsVisible: false,
      offsetX: new Animated.Value(Dimensions.get('window').width),
      orientation: 'portrait',
      isSearchVisible: false,
      isIndicatorsVisible: false,
      page: '1H',
      indicators: ['ICHI'],
      indicatorCnt: 0,
      isDisabled: false,
      stockChange: false,
      colors: colors(props.globalData.isDarkThemeActive),
    };
    this.orientationDidChange = this._orientationDidChange.bind(this);
    this.hideNews = this.hideNews.bind(this);
    this.hideOrder = this.hideOrder.bind(this);
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);

    this.smallGraphHeight = 150;
    this.largeGraphHeight = 300;
  }

  _orientationDidChange(orientation) {
    if (orientation == 'LANDSCAPE') {
      this.setState({ orientation: 'landscape' })

    } else if(orientation == 'PORTRAIT') {
      this.setState({ orientation: 'portrait' })

      if(this.state.isRotateVisible) {
        this.setState({isRotateVisible: false})
        var that = this;
        setTimeout(function(){that.showOrder(that.state.orderType)}, 500);
      }
    }
  }

  navToLink(link) {
    Linking.canOpenURL(link)
    .then((res) => {
      if(res === true) {
        return Linking.openURL('http://' + link)
      }
    })
    .then((res) => {
      console.log('success', res)
    })
    .catch((err) => {
      console.log('err', err)
    })
  }

  addSymbol(ticker){
    Alert.alert(
      '',
      'You added '+ticker+' to your watchlist.',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => watchListStore.addTickerToWatchList(ticker)},
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

  componentDidMount(){
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(this.orientationDidChange);

    // setTimeout(() => {
    //   this.forceSetToLandscape();
    // }, 1000)

    getTheme()
    chartStore.getTickerDetails(this.props.navigation.state.params.data)
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
    Orientation.lockToPortrait();
    Orientation.removeOrientationListener(this.orientationDidChange);
  }

  showOrder(orderType){
    if(this.state.orientation == 'landscape') {
      this.setState({ isRotateVisible: true, orderType: orderType })
    } else {
      Orientation.lockToPortrait();
      this.setState({ isOrderVisible: true, orderType: orderType })
    }
  }
  hideOrder(){
    Orientation.unlockAllOrientations();
    this.setState({ isOrderVisible: false })
  }
  showNews(){
    this.setState({ isNewsVisible: true })
    Orientation.lockToPortrait();
  }
  hideNews(){
    this.setState({ isNewsVisible: false })
    Orientation.unlockAllOrientations();
  }
  showSearch() {
    this.setState({isSearchVisible:true});
    Orientation.lockToPortrait();
  }
  hideSearch() {
    this.setState({isSearchVisible:false});
    Orientation.unlockAllOrientations();
  }
  showIndicators() {
    this.setState({isIndicatorsVisible:true});
  }
  hideIndicators() {
      this.setState({isIndicatorsVisible:false});
  }
  toggleCheck(value) {
    const { setIndicatorsList } = chartStore;

    var indicates = this.state.indicators;
    var exists = false;
    var indicatorCnt = this.state.indicatorCnt;
    console.log(indicates);
    for (var i = 0; i < indicates.length; i++) {
      console.log('checking', indicates[i] == value);
      //if exists in indicators array remove it
      if(indicates[i] == value) {
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
    if(!exists && indicates.length < 5) {
      console.log('doesnt exist');
      indicatorCnt++;

      if(indicatorCnt < 5) {
        console.log('indicatorCnt',indicatorCnt);
        if(indicatorCnt == 4) {
          console.log('indicatorCnt',indicatorCnt);
          var arrayvar = indicates.slice()
          arrayvar.push(value)
          this.setState({  indicators: arrayvar, isDisabled: true, indicatorCnt: indicatorCnt }, () => {
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
    } else if(indicates.length >= 4) {
      console.log('too many exist');
      this.setState({ isDisabled: true }, () => {
      })
    }
  }
  checkIndicators(value) {
    var indicates = this.state.indicators;
    var exister = false;
      for (var i = 0; i < indicates.length; i++) {
        if(indicates[i] == value) {
          exister = true;
        }
      }
    return exister;
  }
  goBack(tab) {
    this.props.navigation.goBack();
    var that = this;
    setTimeout(function(){that.props.navigation.navigate(tab)}, 15);
  }



  setRange(el) {
    let name = el.props.name;
    console.log('name', name);
    // TODO: maybe rewrite the name query here for the range picker

    const { setRange } = chartStore;
    this.setState({
        page: el.props.name
    }, () => {
      setRange(el.props.name)
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

  renderExecutives(executives) {
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

    if(!executives || executives.length === 0) {
      return <Text style={[{ color: this.state.colors['lightGray'] }, trending.symbolsTxtDetail, fonts.hindGunturRg]}>No Results</Text>
    } else {
      return <View>
        {executives.map((elem, i) => {
            return <View key={i} style={chart.profileTxt}>
              <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTxtDrk, fonts.hindGunturRg]}>{elem.title}</Text>
              <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxtSm, fonts.hindGunturRg]}>{elem.role}</Text>
            </View>
        })}
      </View>
    }
  }

  renderRelated() {
    {/* TODO: get related stocks. not yet in data */}
    return <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
        <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>PEOPLE ALSO LOOKED AT</Text>
        <View style={chart.profileTxt}>
          <Text style={[{color: this.state.colors['blue']}, chart.sectionTxtSymbol, fonts.hindGunturRg]}>MSFT</Text>
          <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxtSm, fonts.hindGunturRg]}>Microsoft Corporation</Text>
        </View>
        <View style={chart.profileTxt}>
          <Text style={[{color: this.state.colors['blue']}, chart.sectionTxtSymbol, fonts.hindGunturRg]}>DVMT</Text>
          <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxtSm, fonts.hindGunturRg]}>Dell Technologies</Text>
        </View>
        <View style={chart.profileTxt}>
          <Text style={[{color: this.state.colors['blue']}, chart.sectionTxtSymbol, fonts.hindGunturRg]}>HPE</Text>
          <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxtSm, fonts.hindGunturRg]}>Hewlett Packard Enterprise Company</Text>
        </View>
    </View>
  }


  renderPortrait(params) {
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
        profile,
        ticker,
        website,
        formattedTime,
        formattedVolume,
        formattedPrice,
        formattedOpen,
        formattedLow,
        formattedHigh,
        formattedSharesOutstanding
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
          <Text style={[{color: this.state.colors['lightGray']}, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
            <Image
              source={require('../images/search.png')}
              style={styles.searchImg}
            />
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightCta} onPress={() => this.addSymbol(ticker)}>
            <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
        </TouchableOpacity>
      </View>
    </View>

      {/* TODO: YOU ARE LONG */}

    <View style={[{borderTopColor: this.state.colors['borderGray'], backgroundColor: this.state.colors['white'],}, chart.symbolPosition]}>
      <Text style={[{color: this.state.colors['darkSlate']}, chart.symbolColumn, chart.symbolColumnFirst, fonts.hindGunturRg]}>You are long</Text>
      <Text style={[{color: this.state.colors['darkSlate']}, chart.symbolColumn, chart.symbolColumnMiddle, fonts.hindGunturRg]}>2000 x $152.67</Text>
      <Text style={[{color: this.state.colors['green']}, chart.symbolColumnPrice, fonts.hindGunturBd]}>+265.78</Text>
    </View>


    {/* Bottom Menu nav bar */}

    <View style={[{borderTopColor: this.state.colors['borderGray']}, {backgroundColor: this.state.colors['white']}, chart.fakeTabNav]}>
      <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Account')}>
          <View style={chart.fakeIcon}>
          <Image
            source={require('../images/accounts.png')}
            style={[navstyle.icon, {tintColor: this.state.colors['lightGray']}]}
          />
          </View>
          <Text style={[{color: this.state.colors['lightGray']}, chart.fakeTabLabel]}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Watchlists')}>
          <View style={chart.fakeIcon}>
          <Image
            source={require('../images/watchlist.png')}
            style={[navstyle.iconBig, {tintColor: this.state.colors['lightGray']}]}
          />
          </View>
          <Text style={[{color: this.state.colors['lightGray']}, chart.fakeTabLabel]}>Watchlist</Text>
      </TouchableOpacity>
      <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Trending')}>
          <View style={chart.fakeIcon}>
          <Image
            source={require('../images/trending.png')}
            style={[navstyle.iconBig, {tintColor: this.state.colors['lightGray']}]}
          />
          </View>
          <Text style={[{color: this.state.colors['lightGray']}, chart.fakeTabLabel]}>Trending</Text>
      </TouchableOpacity>
      <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Scanner')}>
          <View style={chart.fakeIcon}>
          <Image
            source={require('../images/scanner.png')}
            style={[navstyle.iconBig, {tintColor: this.state.colors['lightGray']}]}
          />
          </View>
          <Text style={[{color: this.state.colors['lightGray']}, chart.fakeTabLabel]}>Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity style={chart.fakeTab} onPress={() => this.goBack('Settings')}>
          <View style={chart.fakeIcon}>
          <Image
            source={require('../images/settings.png')}
            style={[navstyle.icon, {tintColor: this.state.colors['lightGray']}]}
          />
          </View>
          <Text style={[{color: this.state.colors['lightGray']}, chart.fakeTabLabel]}>Settings</Text>
      </TouchableOpacity>
    </View>






    <ScrollView style={chart.wrapper}>
      <View style={chart.header}>
        <View style={chart.titleContainer}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.name, fonts.hindGunturBd]}>{companyName}</Text>
          <Text style={[{color: this.state.colors['lightGray']}, chart.symbol, fonts.hindGunturRg]}>{ticker}: {exchange}</Text>
        </View>
        <TouchableOpacity style={[{borderColor: this.state.colors['lightGray']}, chart.newsBtn]} onPress={() => this.showNews()}>
          <Text style={[{color: this.state.colors['lightGray']}, chart.newsBtnTxt, fonts.hindGunturRg]}>News</Text>
        </TouchableOpacity>
      </View>

      <View style={chart.prices}>
        <Text style={[{color: this.state.colors['darkSlate']}, chart.stockPrice, fonts.hindGunturRg]}>{formattedPrice}</Text>
        <TouchableOpacity style={chart.priceInfo} onPress={() => this.setState({stockChange: !this.state.stockChange})}>
          <Text style={[{color: this.state.colors['darkGray']}, chart.priceTime, fonts.hindGunturRg]}>{formattedTime}</Text>
          {this.state.stockChange ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{change}</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>{changePercent}%</Text>}
        </TouchableOpacity>
      </View>

      <View style={chart.prices}>
        <View style={chart.pricePoints}>
          <View style={chart.priceOpen}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.priceLabel, fonts.hindGunturRg]}>OPEN</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.priceNum, fonts.hindGunturRg]}>{formattedOpen}</Text>
          </View>
          <View style={chart.priceHigh}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.priceLabel, fonts.hindGunturRg]}>HIGH</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.priceNum, fonts.hindGunturRg]}>{formattedHigh}</Text>
          </View>
          <View style={chart.priceLow}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.priceLabel, fonts.hindGunturRg]}>LOW</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.priceNum, fonts.hindGunturRg]}>{formattedLow}</Text>
          </View>
          <View style={chart.priceVol}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.priceLabel, fonts.hindGunturRg]}>VOLUME</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.priceNum, fonts.hindGunturRg]}>{formattedVolume}</Text>
          </View>
        </View>
      </View>

      <View style={chart.verticalChart}>
        <View style={chart.timeWrap}>
        <Tabs selected={this.state.page} style={chart.timePeriod}
              selectedStyle={[{backgroundColor: this.state.colors['grayTwo']},{borderColor: this.state.colors['grayTwo']},{color: this.state.colors['white']}, fonts.hindGunturBd, chart.timeSelected]} onSelect={el=> this.setRange(el)}>
              <Text name='1m' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>1m</Text>
              <Text name='5m' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>5m</Text>
              <Text name='30m' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>30m</Text>
              <Text name='1H' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]} selectedStyle={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturBd, chart.timeSelectedBig]}>1H</Text>
              <Text name='1D' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>1D</Text>
              <Text name='1W' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>1W</Text>
              <Text name='1M' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>1M</Text>
              <Text name='1Y' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]}>1Y</Text>
              <Text name='ALL' style={[{ color: this.state.colors['lightGray'] }, chart.time, fonts.hindGunturRg]} selectedStyle={[{ color: this.state.colors['realWhite'] }, fonts.hindGunturBd, chart.timeSelectedBig]}>ALL</Text>
        </Tabs>


        </View>
        <View style={chart.chartWrapper}>
          <ChartGraph height={this.smallGraphHeight} viewLargeGraph={false} />
        </View>

      </View>
      <View style={[chart.momentumWrapper, {width: '100%'}]}>
        <View style={[chart.momentumInfo, {flex: 1}]}>

          {/* TODO: what does this mean, momentum, how does it map to my value, 'na' */}

          <Text style={[{color: this.state.colors['darkSlate']}, chart.momentumTitle, fonts.hindGunturBd]}>MOMENTUM</Text>
          <Text style={[{color: this.state.colors['lightGray']}, chart.momentumSubTitle, fonts.hindGunturRg]}>Strong Buying Frenzy</Text>
        </View>

        {/* TODO: add value to dial indicator, where does it come from */}

        <View style={{ flex: 1}}>
          <DialIndicator showArrow={true} width={100} height={50} displayText={true} textLine1={null} textLine2={null} position={.4} />
        </View>

      </View>

      <View style={chart.profileWrapper}>
        <View style={chart.statsRow}>
            <TouchableOpacity style={styles.sellBtn} onPress={() => {this.showOrder('Sell')}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyBtn} onPress={() => {this.showOrder('Buy')}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
            </TouchableOpacity>
        </View>
      </View>

      {this.renderBidAsk()}

      <View style={chart.statsWrapper}>
        <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>KEY STATS</Text>
        <View style={chart.statsRow}>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>52WK HIGH</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>${keyStats.week52high}</Text>
          </View>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>52WK LOW</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>${keyStats.week52low}</Text>
          </View>
          <View style={chart.statsColumn}>

              {/* TODO: do we want to format with a B for billions? */}

            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>AVG VOLUME</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{millionBillionFormatter(keyStats.avgTotalVolume)}</Text>
          </View>
        </View>
        <View style={chart.statsRow}>
          <View style={chart.statsColumn}>

              {/* TODO: do we want to format with a B for billions? */}

            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>MKT CAP</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{millionBillionFormatter(keyStats.mktCap)}</Text>
          </View>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>P/E RATIO</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{keyStats.peRatio}</Text>
          </View>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>EPS</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{keyStats.eps}</Text>
          </View>
        </View>
        <View style={chart.statsRow}>
          <View style={chart.statsColumn}>

                {/* TODO: what is this referencing?? */}

            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>PRICE/EARNINGS</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>?????? 17.19</Text>
          </View>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>DIV YIELD</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{keyStats.divYield}%</Text>
          </View>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>BETA</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{keyStats.beta}</Text>
          </View>
        </View>
        <View style={chart.statsRow}>
          <View style={chart.statsColumn}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>FLOAT</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{millionBillionFormatter(keyStats.float)}</Text>
          </View>
          <View style={chart.statsColumnLong}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>NEXT EARNINGS DATE</Text>
            <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{keyStats.nextEarningsDate}</Text>
          </View>
          <View style={chart.statsColumnShort}></View>
        </View>
      </View>

      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>PROFILE</Text>
          <View style={chart.profileTxt}>
            <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>{profile}</Text>
          </View>
      </View>

      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>ADDRESS</Text>
          <View style={chart.profileTxt}>

                {/* TODO: there is no state or country in the data.. */}

            <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>{address.hq_address1}</Text>
            <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>{address.hq_address2}, STATE?? {address.hq_address_city}</Text>
              <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>{address.hq_address_city}, STATE?? {address.hq_address_postal_code}</Text>
            <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>COUNTRY??</Text>
          </View>
      </View>

      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>WEBSITE</Text>
          <TouchableOpacity onPress={() => this.navToLink(website)}>
            <View style={chart.profileTxt}>
                  {/* TODO: make this a link?? */}
              <Text style={[{color: this.state.colors['lightGray']}, chart.sectionTxt, fonts.hindGunturRg]}>{website}</Text>
            </View>
          </TouchableOpacity>
      </View>
      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>EXECUTIVES</Text>
          {this.renderExecutives(executives)}
      </View>

      {this.renderRelated()}

      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
          <Text style={[{color: this.state.colors['darkSlate']}, chart.sectionTitle, fonts.hindGunturBd]}>OVERVIEW</Text>
          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>SHARES OUTSTANDING</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{formattedSharesOutstanding}</Text>
            </View>
            <View style={chart.statsColumn}>

                {/* TODO: get this data, don't have anything for last stock split */}

              <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>LAST STOCK SPLIT</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>7 TO 1 - Jun 2014</Text>
            </View>
          </View>

          <View style={chart.statsRow}>
            <View style={chart.statsColumn}>
              <Text style={[{color: this.state.colors['lightGray']}, chart.statsTitle, fonts.hindGunturRg]}>INSTITUTIONAL OWNERSHIP</Text>
              <Text style={[{color: this.state.colors['darkSlate']}, chart.statsNum, fonts.hindGunturRg]}>{overview.institutionPercent}%</Text>
            </View>
          </View>
      </View>

      <View style={[{borderBottomColor: this.state.colors['borderGray']}, chart.profileWrapper]}>
        <View style={styles.btnRow}>
          <View style={chart.statsColumn}>
            <TouchableOpacity style={styles.sellBtn} onPress={() => {this.showOrder('Sell')}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
            </TouchableOpacity>
          </View>
          <View style={chart.statsColumn}>
            <TouchableOpacity style={styles.buyBtn} onPress={() => {this.showOrder('Buy')}}>
              <Text style={[{color: this.state.colors['realWhite']}, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  </View>
  }


  renderBidAsk() {

      // {/* TODO: BID LIST not getting this from server yet */}
     return <View style={chartland.bidAsksWrapper}>
       <View style={chartland.bid}>
         <Text style={[{color: this.state.colors['darkSlate']}, chartland.sectionTitle]}>BID</Text>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>10</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.00</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>10</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.00</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
       </View>
       <View style={chartland.bid}>
         <Text style={[{color: this.state.colors['darkSlate']}, chartland.sectionTitle]}>ASK</Text>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
         <View style={chartland.bidaskRow}>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskNum]}>100</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.bidaskPrice]}>$155.80</Text>
         </View>
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



  renderLandscape(params) {
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
        profile,
        ticker,
        website,
        formattedTime,
        formattedVolume,
        formattedPrice,
        formattedOpen,
        formattedLow,
        formattedHigh,
        formattedSharesOutstanding
    } = params;

    const { longSide, shortSide } = deviceSizeStore;

    let headerHeight = 58;
    let footerHeight = 35;
    let rightWidth = 220;

    let chartHeight = shortSide - headerHeight - footerHeight;
    let chartWidth = longSide - rightWidth;

    return <View style={chartland.landscape}>
       <View style={chartland.header}>
           <TouchableOpacity style={chartland.leftCtaSpacer} onPress={() => this.props.navigation.goBack()}>
             <Image
               source={require('../images/back.png')}
               style={styles.backImg}
             />
           </TouchableOpacity>
         <View style={chartland.titleContainer}>
           <Text style={[{color: this.state.colors['darkSlate']}, chartland.name, fonts.hindGunturBd]}>{companyName}</Text>
           <Text style={[{color: this.state.colors['lightGray']}, chartland.symbol, fonts.hindGunturRg]}>{ticker}: {exchange}</Text>
         </View>
         <View style={chartland.currentPrice}>
           <Text style={[{color: this.state.colors['darkSlate']}, chartland.stockPrice, fonts.hindGunturRg]}>{formattedPrice}</Text>

           <TouchableOpacity style={chartland.priceInfo} onPress={() => this.setState({stockChange: !this.state.stockChange})}>
             <Text style={[{color: this.state.colors['darkGray']}, chartland.priceTime, fonts.hindGunturRg]}>{formattedTime}</Text>
             {this.state.stockChange ? <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>+1.85</Text> : <Text style={[{backgroundColor: this.state.colors['green']}, {borderColor: this.state.colors['green']}, {color: this.state.colors['realWhite']}, styles.smallGrnBtn, fonts.hindGunturBd]}>9.78%</Text>}
           </TouchableOpacity>
         </View>
         <View style={chartland.prices}>
           <View style={chartland.pricePoints}>

             <View style={chartland.priceOpen}>
               <Text style={[{color: this.state.colors['lightGray']}, chartland.priceLabel, fonts.hindGunturRg]}>OPEN</Text>
               <Text style={[{color: this.state.colors['darkSlate']}, chartland.priceNum, fonts.hindGunturRg]}>{formattedOpen}</Text>
             </View>
             <View style={chartland.priceHigh}>
               <Text style={[{color: this.state.colors['lightGray']}, chartland.priceLabel, fonts.hindGunturRg]}>HIGH</Text>
               <Text style={[{color: this.state.colors['darkSlate']}, chartland.priceNum, fonts.hindGunturRg]}>{formattedHigh}</Text>
             </View>
             <View style={chartland.priceLow}>
               <Text style={[{color: this.state.colors['lightGray']}, chartland.priceLabel, fonts.hindGunturRg]}>LOW</Text>
               <Text style={[{color: this.state.colors['darkSlate']}, chartland.priceNum, fonts.hindGunturRg]}>{formattedLow}</Text>
             </View>
             <View style={chartland.priceVol}>
               <Text style={[{color: this.state.colors['lightGray']}, chartland.priceLabel, fonts.hindGunturRg]}>VOLUME</Text>
               <Text style={[{color: this.state.colors['darkSlate']}, chartland.priceNum, fonts.hindGunturRg]}>{formattedVolume}</Text>
             </View>
           </View>
         </View>
         <TouchableOpacity style={chartland.rightCta} onPress={() => this.addSymbol(ticker)}>
           <Image source={this.state.colors['addImage']} style={{ width: 23, height: 23 }} />
         </TouchableOpacity>

       </View>

       <View style={chartland.chartWrapper}>

         <View style={[chartland.leftSide]}>

           <View style={[chartland.chartFPO, {height: chartHeight}]}>
             <ChartGraph height={chartHeight} width={chartWidth} viewLargeGraph={true} />
           </View>

           <View style={[chartland.options, {flex: 1}]}>
             <TouchableOpacity style={chartland.indicatorsContainer} onPress={() => this.showIndicators()}>
               <View style={chartland.indicatorsWrap}>
                 <Text style={[{color: this.state.colors['darkSlate']}, chartland.indicatorsBtn, fonts.hindGunturBd]}>INDICATORS</Text>
                 <Text style={[{color: this.state.colors['lightGray']}, chartland.indicatorsTxt, fonts.hindGunturRg]}>
                   {this.state.indicators.length < 1 ?
                     'Add to graph' : ''}
                 {
                   this.state.indicators.map(function(indicate, index) {
                     if(index < 3) {
                       return <Text>{indicate} </Text>
                     } else if(index == 3) {
                       return <Text>...</Text>
                     }
                   })
                 }
                 {currIndicates}
                 </Text>
               </View>
             </TouchableOpacity>
             <View style={chartland.timePeriod}>
             <Tabs selected={this.state.page} style={[{borderRightColor: this.state.colors['borderGray']}, chartland.timePeriod]}
                   selectedStyle={[{backgroundColor: this.state.colors['grayTwo']}, {borderColor: this.state.colors['grayTwo']}, {color: this.state.colors['realWhite']}, fonts.hindGunturBd, chartland.timeSelected]} onSelect={el=> this.setRange(el)}>
                 <Text name='1m' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1m</Text>
                 <Text name='5m' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>5m</Text>
                 <Text name='30m' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]} selectedStyle={[ {color: this.state.colors['realWhite']},fonts.hindGunturBd, chart.timeSelectedBig]}>30m</Text>
                 <Text name='1H' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1H</Text>
                 <Text name='1D' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1D</Text>
                 <Text name='1W' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1W</Text>
                 <Text name='1M' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1M</Text>
                 <Text name='1Y' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]}>1Y</Text>
                 <Text name='ALL' style={[{color: this.state.colors['lightGray']}, chartland.time, fonts.hindGunturRg]} selectedStyle={[ {color: this.state.colors['realWhite']},fonts.hindGunturBd, chart.timeSelectedBig]}>ALL</Text>
             </Tabs>
             </View>
           </View>


         </View>

         <View style={chartland.right}>

           <View style={chartland.momentumWrapper}>

             <View style={chartland.momentumInfo}>
               <Text style={[{color: this.state.colors['darkSlate']}, chartland.sectionTitle]}>MOMENTUM</Text>
               <Text style={[{color: this.state.colors['lightGray']}, chartland.momentumSubTitle]}>Strong Buying Frenzy</Text>
             </View>

             <View style={{ flex: 1}}>
               <DialIndicator showArrow={true} width={100} height={50} displayText={true} textLine1={null} textLine2={null} position={.4} />
             </View>

           </View>

           {this.renderBidAsk()}

           <View style={[{borderTopColor: this.state.colors['borderGray']}, {borderBottomColor: this.state.colors['borderGray']}, chartland.symbolPosition]}>
             <Text style={[{color: this.state.colors['darkSlate']}, chartland.symbolColumn, fonts.hindGunturRg]}>You are long</Text>
             <Text style={[{color: this.state.colors['darkSlate']}, chartland.symbolColumn, fonts.hindGunturRg]}>2000 x $152.67</Text>
             <Text style={[{color: this.state.colors['darkSlate']}, chartland.symbolColumnPrice, fonts.hindGunturBd]}>+265.78</Text>
           </View>
           <View style={chartland.profileWrapper}>
             <View style={chartland.statsRow}>
               <View style={chartland.statsColumn}>
                 <TouchableOpacity style={styles.sellBtnShort} onPress={() => {this.showOrder('Sell')}}>
                   <Text style={[{color: this.state.colors['realWhite']}, styles.sellBtnTxt, fonts.hindGunturBd]}>SELL</Text>
                 </TouchableOpacity>
               </View>
               <View style={chartland.statsColumn}>
                 <TouchableOpacity style={styles.buyBtnShort} onPress={() => {this.showOrder('Buy')}}>
                   <Text style={[{color: this.state.colors['realWhite']}, styles.buyBtnTxt, fonts.hindGunturBd]}>BUY</Text>
                 </TouchableOpacity>
               </View>
             </View>
           </View>
         </View>
       </View>
         <Modal
           isVisible={this.state.isIndicatorsVisible}
           animationIn={'fadeIn'}
           animationOut={'fadeOut'}
           style={chartland.fullModal}
           onModalHide={() => {this.hideIndicators()}}>
           <View style={chartland.radio}>
             <View style={chartland.radioTitleWrap}>
               <Text style={[chartland.radioTitle, fonts.hindGunturBd]}>INDICATORS</Text>
               <Text style={[chartland.radioSubTitle, fonts.hindGunturRg]}>Select up to 5</Text>
             </View>
             <ScrollView style={chartland.radioWrap}>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('VLM')}
                     isChecked={this.checkIndicators('VLM')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'VLM'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Volume'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('TRND')}
                     isChecked={this.checkIndicators('TRND')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'TRND'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Trend Lines'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('ICHI')}
                     isChecked={this.checkIndicators('ICHI')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'ICHI'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Ichimoku Cloud'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_split.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('OBV')}
                     isChecked={this.checkIndicators('OBV')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'OBV'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'On Balance Volume'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('SMA')}
                     isChecked={this.checkIndicators('SMA')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'SMA'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Simple Moving Average'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('EMA')}
                     isChecked={this.checkIndicators('EMA')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'EMA'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Exponential Moving Average'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('MACD')}
                     isChecked={this.checkIndicators('MACD')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'MACD'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Moving Average Convergence Divergence'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('RSI')}
                     isChecked={this.checkIndicators('RSI')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'RSI'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Relative Strength Index'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('A/D Line')}
                     isChecked={this.checkIndicators('A/D Line')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'A/D Line'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Accumulation/Distribution Line'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('FIB')}
                     isChecked={this.checkIndicators('FIB')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'FIB'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Fibonacci'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
               <View style={styles.checkBoxWrap}>
                 <CheckBox
                     style={styles.checkField}
                     onClick={()=>this.toggleCheck('BOL')}
                     isChecked={this.checkIndicators('BOL')}
                     isDisabled={this.state.isDisabled}
                     rightTextViewStyle={styles.checkBoxLabelWrap}
                     rightText={'BOL'}
                     rightTextStyle={[styles.checkBoxLabel,fonts.hindGunturBd]}
                     rightSubText={'Bollinger Bands'}
                     rightSubTextStyle={[styles.checkBoxSubLabel,fonts.hindGunturRg]}
                     checkedImage={<Image source={require('../images/checkbox_blue.png')} style={styles.checkBox}/>}
                     unCheckedImage={<Image source={require('../images/checkbox_outline.png')} style={styles.checkBox}/>}
                 />
               </View>
             </ScrollView>
           </View>
         </Modal>
     </View>
  }

















  showOrientation(){
    const { chartLoading, tickerDataJS } = chartStore;

    console.log('==========================================================================')
    console.log(tickerDataJS)

    if(!tickerDataJS) {
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
        profile,
        ticker,
        website,
    } = tickerDataJS;


    //  formatting data

    {/* TODO: TIME don't have this yet with time zone */}

    let formattedTime = moment(latestUpdate).format('h:mm A');
    let formattedVolume = millionBillionFormatter(Volume);
    let formattedPrice = '$' + Price.toFixed(2);
    let formattedOpen = '$' + open.toFixed(2);
    let formattedLow = low.toFixed(2);
    let formattedHigh = high.toFixed(2);

    let formattedSharesOutstanding = millionBillionFormatter(overview.sharesOutstanding);

    const params = {
      ...tickerDataJS,
      formattedTime,
      formattedVolume,
      formattedPrice,
      formattedOpen,
      formattedLow,
      formattedHigh,
      formattedSharesOutstanding
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

  renderLoadingOrContent() {
    const { chartLoading, tickerDataJS } = chartStore;

      let newsTicker = null;
      if(tickerDataJS) {
         newsTicker = tickerDataJS.ticker;
      }

    if(chartLoading) {
      return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={[{color: this.state.colors['lightGray']}, fonts.hindGunturRg]}>Loading...</Text>
      </View>
    } else {
      return <View style={chart.container}>
        {this.showOrientation()}
        <Modal
          isVisible={this.state.isOrderVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={order.modal}>
          <PlaceOrder
            hideOrder={this.hideOrder}
            orderType={this.state.orderType} />
        </Modal>
        <Modal
          isVisible={this.state.isNewsVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={order.modal}>
          <ChartNews
            ticker={newsTicker}
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
              <Text style={[styles.rotateFont, fonts.hindGunturBd]}>to buy APPL stocks</Text>
            </View>
          </View>
        </Modal>
      </View>
    }
  }

  render() {
    var self = this;
    return (
      <View style={[{backgroundColor: this.state.colors['white']}, styles.pageContainer]}>

        {this.renderLoadingOrContent()}

        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation}/>
        </Modal>

      </View>
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
