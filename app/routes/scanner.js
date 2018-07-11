/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
  TouchableWithoutFeedback,
  TabbedArea,
  TabPane,
  SegmentedControlIOS
} from 'react-native';
import { connect } from 'react-redux';

import Modal from 'react-native-modal'
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../components/react-native-simple-radio-button';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import { colors } from '../store/store';

import { selectGlobalData } from '../selectors';

import fonts from '../style/fonts';
import navstyle from '../style/nav';


var scan_props = [
  { label: 'Change from open', value: 0 },
  { label: 'Increasing volume', value: 1 },
  { label: 'Uptrend & oversold', value: 2 },
  { label: 'Over 750k volume', value: 3 },
  { label: 'Over 10% short float', value: 4 }
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

var scan_options = [
  "Greater Than",
  "Less Than"
];

var scan_operators = [
  ">",
  "<"
];


import styles from '../style/style';
import scanner from '../style/scanner';
import trending from '../style/trending';
import numbers from '../style/numbers';

import Search from './search';


class NumPad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numField: this.props.currPrice,
      lastTrade: null,
      selectedOption: this.props.currOperator,
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

  renderOption(option, selected, onSelect, index) {
    const style = selected ? {} : { color: colors.blue };
    return (
      <TouchableWithoutFeedback onPress={onSelect} key={index}>
        <View><Text style={[{ color: this.state.colors['realWhite'] }, numbers.selectTxt, fonts.hindGunturRg, style]}>{option}</Text></View>
      </TouchableWithoutFeedback>
    );
  }

  renderContainer(optionNodes) {
    return <View>{optionNodes}</View>;
  }

  addNum(num) {
    var curNums;
    if (this.state.numField == null) {
      curNums = num;
    } else {
      curNums = this.state.numField + '' + num;
    }
    this.setState({ numField: curNums });
    this.props.setPrice(curNums);
  }

  removeNum(num) {
    if (this.state.numField !== null) {
      var delNums = this.state.numField.toString();
      var newNums = delNums.substr(0, delNums.length - 1);
      console.log('delete', newNums)
      this.setState({ numField: newNums })
      this.props.setPrice(newNums);
    }
  }

  render() {
    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, numbers.container]}>
        <SegmentedControlIOS
          values={scan_options}
          selectedIndex={this.state.selectedOption}
          tintColor={this.state.colors['blue']}
          onChange={(event) => {
            this.setState({ selectedIndex: event.nativeEvent.selectedSegmentIndex });
            this.props.setOperator(event.nativeEvent.selectedSegmentIndex);
          }}
        />
        <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, numbers.rowLabel]}>
          <Text style={[{ color: this.state.colors['lightGray'] }, numbers.inputLabel, fonts.hindGunturRg]}>STOCK PRICE</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.input, fonts.hindGunturRg]}>{this.state.numField}</Text>
        </View>
        <View style={numbers.row}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(1); }}>1</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(2); }}>2</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(3); }}>3</Text>
        </View>
        <View style={numbers.row}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(4); }}>4</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(5); }}>5</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(6); }}>6</Text>
        </View>
        <View style={numbers.row}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(7); }}>7</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(8); }}>8</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(9); }}>9</Text>
        </View>
        <View style={numbers.row}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]}></Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.addNum(0); }}>0</Text>
          <Text style={[{ color: this.state.colors['darkSlate'] }, numbers.numbers, fonts.hindGunturLt]} onPress={() => { this.removeNum(); }}>
            <Text> </Text>
            <Image
              source={this.state.colors['deleteImg']}
              style={{ width: 40, height: 26 }}
            />
          </Text>
        </View>
      </View>
    )
  }
}

NumPad.propTypes = {
  globalData: PropTypes.object.isRequired,
};




class SubMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLTVisible: false,
      isSectorVisible: false,
      isScanVisible: false,
      ltValue: 10,
      scanOption: 0,
      sectorOption: 0,
      operator: 0,
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  populateWithData() {
    scannerStore.getScannerData()
  }
  
  componentDidMount() {
    this.populateWithData()
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

  showLT() {
    this.setState({ isLTVisible: true })
  }

  showSector() {
    this.setState({ isSectorVisible: true })
  }

  hideSector(value) {
    if (value) {
      this.setState({ isSectorVisible: false, sectorOption: value })
    } else {
      this.setState({ isSectorVisible: false })
    }
  }
  setPrice(value) {
    this.setState({ ltValue: value })
  }
  setOperator(value) {
    this.setState({ operator: value })
  }
  hideSub() {
    this.setState({ isLTVisible: false })
  }
  showScan() {
    this.setState({ isScanVisible: true })
  }

  hideScan(value) {
    if (value) {
      this.setState({ isScanVisible: false, scanOption: value })
    } else {
      this.setState({ isScanVisible: false })
    }
  }

  render() {
    return (
      <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, { backgroundColor: this.state.colors['white'] }, scanner.subMenu]}>
        <View style={scanner.subMenuRow}>
          <TouchableOpacity style={[{ borderBottomColor: this.state.colors['borderGray'] }, scanner.subMenuFull]} onPress={() => { this.showScan() }}>
            <Image
              source={require('../images/arrow.png')}
              style={[scanner.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.subMenuTitle, fonts.hindGunturBd]}>SCAN</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, scanner.subMenuTxt, fonts.hindGunturRg]}>{scan_props[this.state.scanOption].label}</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isScanVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={scanner.fullModal}
            onModalHide={() => { this.hideScan() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, scanner.radio]}>
              <Image
                source={require('../images/arrowblue.png')}
                style={[scanner.downArrowOpen]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.radioTitle, fonts.hindGunturBd]}>SCAN</Text>
              <View style={scanner.scanRadio}>
                <RadioForm
                  radio_props={scan_props}
                  initial={this.state.scanOption}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={this.state.colors['blue']}
                  buttonOuterColor={this.state.colors['lightGray']}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                  onPress={(value) => { this.hideScan(value) }}
                  style={styles.radioField}
                />
              </View>
            </View>
          </Modal>
        </View>
        <View style={scanner.subMenuRow}>
          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, scanner.subMenuHalf]} onPress={() => { this.showLT(); }}>
            <Image
              source={require('../images/arrow.png')}
              style={[scanner.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.subMenuTitle, fonts.hindGunturBd]}>LAST TRADE</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, scanner.subMenuTxt, fonts.hindGunturRg]}>{scan_operators[this.state.operator]}${this.state.ltValue}</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isLTVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={scanner.halfModal}
            onModalHide={() => { this.hideSub() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, scanner.subMenuLeftModal]}>
              <Image
                source={require('../images/arrowblue.png')}
                style={[scanner.downArrow]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.leftMenuText, fonts.hindGunturBd]}>LAST TRADE</Text>
            </View>
            <View style={[{ backgroundColor: this.state.colors['white'] }, scanner.lastTradeModal]}>
              <NumPad
                setPrice={(value) => { this.setPrice(value); }}
                setOperator={(value) => { this.setOperator(value); }}
                currOperator={this.state.operator}
                currPrice={this.state.ltValue}
                globalData={this.props.globalData}
              />
              <View style={scanner.confirmBtn}>
                <TouchableOpacity
                  style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, styles.fullBtn]}
                  onPress={() => { this.hideSub(); }}>
                  <Text style={[{ color: this.state.colors['realWhite'] }, styles.fullBtnTxt, fonts.hindGunturBd]}>
                    CONFIRM
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity style={[{ borderRightColor: this.state.colors['borderGray'] }, scanner.subMenuHalf]} onPress={() => { this.showSector(); }}>
            <Image
              source={require('../images/arrow.png')}
              style={[scanner.downArrow]}
            />
            <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, scanner.subMenuTxt, fonts.hindGunturRg]}>{sector_props[this.state.sectorOption].label}</Text>
          </TouchableOpacity>
          <Modal
            isVisible={this.state.isSectorVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            style={scanner.halfModal}
            onModalHide={() => { this.hideSector() }}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, scanner.subMenuRightModal]}>
              <Image
                source={require('../images/arrowblue.png')}
                style={[scanner.downArrow]}
              />
              <Text style={[{ color: this.state.colors['darkSlate'] }, scanner.subMenuTitle, fonts.hindGunturBd]}>SECTOR</Text>
            </View>
            <View style={[{ backgroundColor: this.state.colors['white'] }, scanner.lastTradeModal]}>
              <ScrollView style={scanner.sectorRadio}>
                <RadioForm
                  radio_props={sector_props}
                  initial={this.state.sectorOption}
                  formHorizontal={false}
                  labelHorizontal={true}
                  borderWidth={1}
                  buttonColor={this.state.colors['blue']}
                  buttonOuterColor={this.state.colors['lightGray']}
                  buttonSize={22}
                  buttonOuterSize={20}
                  animation={false}
                  labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
                  radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
                  labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
                  onPress={(value) => { this.hideSector(value) }}
                  style={scanner.radioField}
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


import { scannerStore } from '../mobxStores';
import { observer } from 'mobx-react';

@observer
class Scanner extends React.Component {
  static navigationOptions = {
    title: 'Scanner',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/scanner.png')}
        style={[navstyle.iconBig, { tintColor: tintColor }]}
      />
    ),
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([
        { sym: 'ETH', exch: 'NYSE', name: 'Ethereum', img: require('../images/momentumfpowatchlist.png'), vol: '24.9M', price: '30.75', time: '12:30 PM PT', change: '+1.45' },
        { sym: 'AMID', exch: 'NYSE', name: 'American Midstream', img: require('../images/momentumfpowatchlist_down01.png'), vol: '65.2M', price: '12.45', time: '12:30 PM PT', change: '+1.45' },
        { sym: 'AAPL', exch: 'NASDAQ', name: 'Apple, Inc.', img: require('../images/momentumfpowatchlist_01.png'), vol: '16.3M', price: '146.19', time: '12:30 PM PT', change: '+1.45' },
        { sym: 'TSLA', exch: 'NASDAQ', name: 'Tesla Motors, Inc.', img: require('../images/momentumfpowatchlist_down02.png'), vol: '5.3M', price: '378.47', time: '12:30 PM PT', change: '+1.45' },
        { sym: 'SPH', exch: 'NYSE', name: 'Suburban Propan', img: require('../images/momentumfpowatchlist_down01.png'), vol: '37.9M', price: '24.31', time: '12:30 PM PT', change: '+1.45' },
        { sym: 'NGG', exch: 'NYSE', name: 'National Grid PLC', img: require('../images/momentumfpowatchlist_01.png'), vol: '12.4M', price: '64.85', time: '12:30 PM PT', change: '+1.45' },
      ]),
      isSearchVisible: false,
      colors: colors(props.globalData.isDarkThemeActive),
      isUpdatingState: false
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
      this.setState({ isUpdatingState: true }, () => {
        this.setState({
          colors: colors(currentGlobalData.isDarkThemeActive), isUpdatingState: false
        });
      });
    }
  }

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  hideSearch() {
    this.setState({ isSearchVisible: false });
  }
  
  // {
  //   !this.state.isUpdatingState &&
  //   <ListView
  //     style={scanner.symbolsContainer}
  //     dataSource={this.state.dataSource}
  //     renderRow={(data) =>
  //       <View style={[{ borderBottomColor: this.state.colors['borderGray'] }, scanner.symbolsRow]}>
  //         <TouchableOpacity style={scanner.symbolsSpacer} onPress={() => this.props.navigation.navigate('Chart', { data: data })}>
  //           <Text style={[{ color: this.state.colors['blue'] }, scanner.symbolsTxt, fonts.hindGunturRg]}>{data['sym']}</Text>
  //         </TouchableOpacity>
  //         <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$12.40</Text></View>
  //         <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$23.12</Text></View>
  //         <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$22.98</Text></View>
  //       </View>
  //     }
  //   />}
  
  renderListOrLoading() {
    const { scannerDataLoading, scannerDataJS } = scannerStore;
    if(scannerDataLoading) {
      return <View>
        <Text>Loading...</Text>
      </View>
    } else if( scannerDataJS.length === 0) {
      return <View>
        <Text>No results found</Text>
      </View>
    } else {
      return <View>
        {scannerDataJS.map((data, i) => {
          console.log('-- each', data)
          return <View key={'each-scan-item' + i} style={[{ borderBottomColor: this.state.colors['borderGray'] }, scanner.symbolsRow]}>
            <TouchableOpacity style={scanner.symbolsSpacer} onPress={() => this.props.navigation.navigate('Chart', { data: data })}>
              <Text style={[{ color: this.state.colors['blue'] }, scanner.symbolsTxt, fonts.hindGunturRg]}>{data['ticker']}</Text>
            </TouchableOpacity>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$12.40</Text></View>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$23.12</Text></View>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['darkSlate'] }, scanner.symbolsLabelTxt, fonts.hindGunturRg]}>$22.98</Text></View>
          </View>
        })}
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
                source={require('../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <View style={styles.rightCta}></View>
          </View>
        </View>
        <SubMenu globalData={this.props.globalData} />
        <View style={[{ backgroundColor: this.state.colors['contentBg'] }, scanner.scanContainer]}>
          <View style={scanner.symbolsRowFirst}>
            <View style={scanner.symbolsSpacer}></View>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['lightGray'] }, scanner.symbolsTitle, fonts.hindGunturRg]}>OPEN</Text></View>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['lightGray'] }, scanner.symbolsTitle, fonts.hindGunturRg]}>HIGH</Text></View>
            <View style={scanner.symbolsLabel}><Text style={[{ color: this.state.colors['lightGray'] }, scanner.symbolsTitle, fonts.hindGunturRg]}>CURRENT</Text></View>
          </View>
          
          <ScrollView style={scanner.symbolsContainer}>
            {this.renderListOrLoading()}
          </ScrollView>
        
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

Scanner.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

export default connect(mapStateToProps, null)(Scanner);
