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
import DialIndicator from '../../sharedComponents/DialIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../components/react-native-simple-radio-button';
import Modal from 'react-native-modal'
import SortableListView from 'react-native-sortable-listview'
import { setTheme, getTheme, colors } from '../../store/store';
import { selectGlobalData } from '../../selectors';
import {
  TabNavigator,
} from 'react-navigation';
import Swipeout from '../../components/react-native-swipeout';
import Search from './../search';
import styles from '../../style/style';
import fonts from '../../style/fonts';
import navstyle from '../../style/nav';
import watchstyle from '../../style/watchlist';
import { watchListStore } from '../../mobxStores';
import { observer } from 'mobx-react';

@observer
class Watchlists extends React.Component {
  static navigationOptions = {
    title: 'Watchlist',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/watchlist.png')}
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
      // sortVal: 0,
      colors: colorObj,
      showWatchListPercent: []
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
    this.showSort = this.showSort.bind(this);
    this.hideSort = this.hideSort.bind(this);
  }

  componentDidMount() {
    // watchListStore.getWatchlistData();
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
        colors: colorObj
      });
    }
  }

  generateSwipeOutBtn = watchListRow => {
    const colorObj = colors(this.props.globalData.isDarkThemeActive);
    return [{
      text: 'Delete',
      backgroundColor: colorObj['darkGray'],
      color: colorObj['realWhite'],
      onPress: this.deleteWatch.bind(this, watchListRow)
    }];
  }

  showEdits = () => {
    this.setState({ isListEditable: true });
  }
  hideEdits = () => {
    this.setState({ isListEditable: false });
  }
  showSearch() {
    this.setState({ isSearchVisible: true });
  }
  hideSearch() {
    this.setState({ isSearchVisible: false });
  }
  showSort = () => {
    this.setState({ isSortVisible: true })
  }

  hideSort = value => {
    const { sortBy } = watchListStore;
    this.setState({ isSortVisible: false })
    if (value !== undefined) {
      sortBy(value)
    }
  }

  // showTicker(sym) {
  //   Alert.alert(
  //     '',
  //     'You added ' + sym + ' to your watchlist.',
  //     [
  //       { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
  //       { text: 'OK', onPress: () => console.log('OK Pressed') },
  //     ],
  //     { cancelable: true }
  //   )
  // }

  deleteWatch = rowToRemove => {
    const { removeFromWatchlist } = watchListStore;
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => removeFromWatchlist(rowToRemove) },
      ],
      { cancelable: true }
    )
  }

  toggleWatchListPercent = id => {
    if (this.state.showWatchListPercent.some(p => p === id)) {
      this.setState(({showWatchListPercent}) => ({
        showWatchListPercent: showWatchListPercent.filter(p => p !== id)
      }));
    } else {
      this.setState(({showWatchListPercent}) => ({
        showWatchListPercent: showWatchListPercent.concat(id)
      }));
    }
  };
  
  navigateToChart(data) {
    this.props.navigation.navigate('Chart', { data: row })
  }

  renderRow = row => {
    if (!row) {
      return <Text></Text>;
    }
    const { deletingRecordId } = watchListStore;
    if (row.id === deletingRecordId) {
      return <Text></Text>;
    }
    console.log('rowwwwwwww', row)
    
    var thisRow = (
      <Swipeout right={this.generateSwipeOutBtn(row)} style={watchstyle.delete} buttonWidth={100} autoClose>
        <TouchableOpacity
          style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
          onPress={() => this.navigateToChart(row)}
          delayLongPress={500}>
          <View style={watchstyle.touchable}>
            <View style={watchstyle.symDetails}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symName, fonts.hindGunturRg]}>
                {row['ticker']}
              </Text>
              <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.coName, fonts.hindGunturRg]}>
                {row['companyName'].length > 23 ? `${row['companyName'].slice(0, 23)}...` : row['companyName']}
              </Text>
            </View>
            <View style={watchstyle.symMomentum}>
              <DialIndicator width={100} height={50} displayText={true} textLine1={'VOL'} textLine2={row['formattedLatestVolume']} position={.4} />
            </View>
            <TouchableOpacity
              style={watchstyle.symCost}
              onPress={this.toggleWatchListPercent.bind(this, row.id)}
            >
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symPrice, fonts.hindGunturRg]}>${row['latestPrice']}</Text>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symTime, fonts.hindGunturRg]}>{row['time'] || 'N/A'}</Text>
              {this.state.showWatchListPercent.includes(row.id) ?
                <Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>
                  {row['changePercent']}
                </Text> :
                <Text style={[{ backgroundColor: this.state.colors['green'] }, { borderColor: this.state.colors['green'] }, { color: this.state.colors['white'] }, styles.smallGrnBtn, fonts.hindGunturBd]}>
                  {row['change']}
                </Text>
              }
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
    return thisRow;
  }

  renderEditableRow = row => {
    if (!row) {
      return <Text></Text>;
    }
    const { deletingRecordId } = watchListStore;
    if (row.id === deletingRecordId) {
      return <Text></Text>;
    }
    return (
      <TouchableOpacity
        style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
        delayLongPress={500}
      >
        <View style={watchstyle.touchable}>
          <TouchableOpacity style={watchstyle.symDelete}
            onPress={this.deleteWatch.bind(this, row)}
          >
            <Image
              source={require('../../images/dragdelete.png')}
              style={[watchstyle.dragDelete]}
            />
          </TouchableOpacity>
          <View style={watchstyle.symDetails}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symName, fonts.hindGunturRg]}>
              {row['ticker']}
            </Text>
            <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.coName, fonts.hindGunturRg]}>
              {row['companyName'].length > 23 ? `${row['companyName'].slice(0, 23)}...` : row['companyName']}
            </Text>
          </View>
          <View style={watchstyle.symMomentum}></View>
          <View style={watchstyle.symCost}>
            <Image
              source={require('../../images/drag.png')}
              style={[watchstyle.drag]}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { isFetchingWatchlistData, watchlistDataJS, watchlistOrderJS, sortByIndex } = watchListStore;
    let dataSource = watchlistDataJS;
    let order = watchlistOrderJS;

    return (
      <View style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={[styles.menuContainer]}>

            {/*Header*/}

            {!this.state.isListEditable &&
              <TouchableOpacity style={styles.leftCta} onPress={this.showEdits}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.leftCtaTxt, fonts.hindGunturRg]}>
                  Edit
                </Text>
              </TouchableOpacity>
            }
            {this.state.isListEditable &&
              <TouchableOpacity style={styles.leftCta} onPress={this.hideEdits}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.leftCtaTxt, fonts.hindGunturRg]}>
                  Done
                </Text>
              </TouchableOpacity>
            }
            <TouchableOpacity style={styles.searchCta} onPress={() => this.showSearch()}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>
                {isFetchingWatchlistData ? 'Loading...' : 'Search Stocks'}
              </Text>
              <Image
                source={require('../../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightCta}>
              <Text
                style={[{ color: this.state.colors['lightGray'] }, styles.rightCtaTxt, fonts.hindGunturRg]}
                onPress={this.showSort}
              >
                Sort
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Not Editable */}

        {!isFetchingWatchlistData && !this.state.isListEditable &&
          <SortableListView
            data={dataSource}
            order={order}
            onRowMoved={e => {
              console.log('row moved in NON EDITABLE MODE')
              {/*order.splice(e.to, 0, order.splice(e.from, 1)[0]);*/ }
              {/*this.forceUpdate();*/ }
            }}
            rowHasChanged={e => {
              return true;
            }}
            disableSorting={false}
            navigation={this.props.navigation}
            renderRow={this.renderRow}
          />
        }

        {/* Editable */}

        {!isFetchingWatchlistData && this.state.isListEditable &&
          <SortableListView
            data={dataSource}
            order={order}
            onRowMoved={watchListStore.onRowMove}
            disableSorting={false}
            navigation={this.props.navigation}
            renderRow={this.renderEditableRow}
          />
        }
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
        {this.state.isSortVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
            style={watchstyle.bottomModal}
            onModalHide={this.hideSort}>
            <View style={[{ backgroundColor: this.state.colors['white'] }, styles.radio, watchstyle.bottomModal]}>
              <RadioForm
                radio_props={watchListStore.sort_props}
                initial={sortByIndex}
                value={sortByIndex}
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
                onPress={this.hideSort}
                style={styles.radioField}
              />
            </View>
          </Modal>}
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
