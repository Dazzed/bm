import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  AppRegistry,
  StyleSheet,
  Animated,
  Text,
  View,
  ScrollView,
  ListView,
  Image,
  TouchableOpacity,
  TabbedArea,
  TabPane,
  Alert,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../components/react-native-simple-radio-button';
import Modal from 'react-native-modal'
import SortableListView from 'react-native-sortable-listview'
import { setTheme, getTheme, colors } from '../store/store';
import { selectGlobalData } from '../selectors';

import {
  TabNavigator,
} from 'react-navigation';

import Swipeout from '../components/react-native-swipeout';
import Search from './search';

import styles from '../style/style';
import fonts from '../style/fonts';
import navstyle from '../style/nav';

import watchstyle from '../style/watchlist';
// import colors from '../style/colors';

var sort_props = [
  { label: 'A-Z', value: 0 },
  { label: 'Volume', value: 1 },
  { label: '% Change', value: 2 }
];


var dataSource = [
  { sym: 'ETH', exch: 'NYSE', name: 'Ethereum', img: require('../images/momo_watch_01.gif'), vol: '24.9M', price: '30.75', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
  { sym: 'AMID', exch: 'NYSE', name: 'American Midstream', img: require('../images/momo_watch_02.gif'), vol: '65.2M', price: '12.45', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
  { sym: 'AAPL', exch: 'NASDAQ', name: 'Apple, Inc.', img: require('../images/momo_watch_03.gif'), vol: '16.3M', price: '146.19', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
  { sym: 'TSLA', exch: 'NASDAQ', name: 'Tesla Motors, Inc.', img: require('../images/momo_watch_01.gif'), vol: '5.3M', price: '378.47', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
  { sym: 'SPH', exch: 'NYSE', name: 'Suburban Propan', img: require('../images/momo_watch_04.gif'), vol: '37.9M', price: '24.31', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
  { sym: 'NGG', exch: 'NYSE', name: 'National Grid PLC', img: require('../images/momo_watch_02.gif'), vol: '12.4M', price: '64.85', time: '12:30 PM PT', change: '+1.45', changePerc: '+10.41%', stockChange: true },
]
var order = Object.keys(dataSource);
var stockChange = true;

function deleteWatch() {
  Alert.alert(
    'Delete',
    'Are you sure you want to delete this?',
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: true }
  )
}

class Watchlists extends React.Component {
  static navigationOptions = {
    title: 'Watchlist',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/watchlist.png')}
        style={[navstyle.iconBig, { tintColor: tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    const colorObj = colors(props.globalData.isDarkThemeActive);
    this.state = {
      isListEditable: false,
      isScanVisible: false,
      isSearchVisible: false,
      isSortVisible: false,
      sortVal: 0,
      colors: colorObj,
      swipeoutBtns: [{
        text: 'Delete',
        backgroundColor: colorObj['darkGray'],
        color: colorObj['realWhite'],
        onPress: deleteWatch
      }]
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.showSort = this.showSort.bind(this);
    this.hideSort = this.hideSort.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
      const colorObj = colors(this.props.globalData.isDarkThemeActive);
      this.setState({
        colors: colorObj,
        swipeoutBtns: [{
          text: this.state.swipeoutBtns[0].text,
          backgroundColor: colorObj['darkGray'],
          color: colorObj['realWhite'],
          onPress: deleteWatch
        }]
      });
    }
  }

  showEdits() {
    this.setState({ isListEditable: true });
  }
  hideEdits() {
    this.setState({ isListEditable: false });
  }
  showSearch() {
    this.setState({ isSearchVisible: true });
  }
  hideSearch() {
    this.setState({ isSearchVisible: false });
  }
  showSort() {
    console.log('showSort');
    this.setState({ isSortVisible: true })
  }
  hideSort(value) {
    if (value) {
      this.setState({ isSortVisible: false, sortVal: value })
    } else {
      this.setState({ isSortVisible: false })
    }
  }

  showTicker(sym) {
    Alert.alert(
      '',
      'You added ' + sym + ' to your watchlist.',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    )
  }

  changeToggle(row) {
    row['stockChange'] = !row['stockChange'];
    this.setState({ stockChange: row['stockChange'] }, () => {
      return row['stockChange']
    });
  }

  renderRow(row) {
    var thisRow = (
      <Swipeout right={this.state.swipeoutBtns} style={watchstyle.delete} buttonWidth={100}>
        <TouchableOpacity
          style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
          onPress={() => this.props.navigation.navigate('Chart', { data: row })}
          delayLongPress={500}>
          <View style={watchstyle.touchable}>
            <View style={watchstyle.symDetails}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symName, fonts.hindGunturRg]}>{row['sym']}</Text>
              <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.coName, fonts.hindGunturRg]}>{row['name']}</Text>
            </View>
            <View style={watchstyle.symMomentum}>
              <Text style={watchstyle.symMomentumTxt}>
                <Image source={row['img']} style={watchstyle.momenutmImg} />
              </Text>
              <View style={watchstyle.symVolWrap}>
                <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.vol, fonts.hindGunturRg]}>VOL</Text>
                <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.vol, fonts.hindGunturRg]}>{row['vol']}</Text>
              </View>
            </View>
            <TouchableOpacity style={watchstyle.symCost} onPress={() => this.changeToggle(row)}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symPrice, fonts.hindGunturRg]}>${row['price']}</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symTime, fonts.hindGunturRg]}>{row['time']}</Text>
              {row['stockChange'] ? <Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{row['change']}</Text> : <Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['white'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>{row['changePerc']}</Text>}
            </TouchableOpacity>

          </View>
        </TouchableOpacity>
      </Swipeout>
    );

    return thisRow;

  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={[styles.menuContainer]}>
            {!this.state.isListEditable &&
              <TouchableOpacity style={styles.leftCta} onPress={() => this.showEdits()}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.leftCtaTxt, fonts.hindGunturRg]}>Edit</Text>
              </TouchableOpacity>
            }
            {this.state.isListEditable &&
              <TouchableOpacity style={styles.leftCta} onPress={() => this.hideEdits()}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.leftCtaTxt, fonts.hindGunturRg]}>Done</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
              <Image
                source={require('../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightCta}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.rightCtaTxt, fonts.hindGunturRg]} onPress={() => this.showSort()}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
        {!this.state.isListEditable &&
          <SortableListView
            data={dataSource}
            order={order}
            onRowMoved={e => {
              order.splice(e.to, 0, order.splice(e.from, 1)[0]);
              this.forceUpdate();
            }}
            rowHasChanged={e => {
              return true;
            }}
            disableSorting={false}
            navigation={this.props.navigation}
            renderRow={row => this.renderRow(row)}
          />
        }
        {this.state.isListEditable &&
          <SortableListView
            data={dataSource}
            order={order}
            onRowMoved={e => {
              order.splice(e.to, 0, order.splice(e.from, 1)[0]);
              this.forceUpdate();
            }}
            disableSorting={false}
            navigation={this.props.navigation}
            renderRow={row =>
              <TouchableOpacity
                style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
                delayLongPress={500}>
                <View style={watchstyle.touchable}>
                  <TouchableOpacity style={watchstyle.symDelete}
                    onPress={() => deleteWatch()}
                  >
                    <Image
                      source={require('../images/dragdelete.png')}
                      style={[watchstyle.dragDelete]}
                    />
                  </TouchableOpacity>
                  <View style={watchstyle.symDetails}>
                    <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symName, fonts.hindGunturRg]}>{row['sym']}</Text>
                    <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.coName, fonts.hindGunturRg]}>{row['name']}</Text>
                  </View>
                  <View style={watchstyle.symMomentum}></View>
                  <View style={watchstyle.symCost}>
                    <Image
                      source={require('../images/drag.png')}
                      style={[watchstyle.drag]}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            }
          />
        }
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
        <Modal
          isVisible={this.state.isSortVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={watchstyle.bottomModal}
          onModalHide={() => { this.hideSort() }}>
          <View style={[{ backgroundColor: this.state.colors['white'] }, styles.radio, watchstyle.bottomModal]}>
            <RadioForm
              radio_props={sort_props}
              initial={this.state.sortVal}
              formHorizontal={false}
              labelHorizontal={true}
              borderWidth={1}
              buttonColor={this.state.colors['blue']}
              buttonOuterColor={this.state.colors['lightGray']}
              buttonSize={22}
              buttonOuterSize={20}
              animation={false}
              labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
              radioLabelActive={[styles.activeRadioLabel, fonts.hindGunturBd]}
              labelWrapStyle={styles.radioLabelWrap}
              onPress={(value) => { this.hideSort(value) }}
              style={styles.radioField}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

Watchlists.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Watchlists);
