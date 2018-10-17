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
  Dimensions,
  SafeAreaView
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { observer } from 'mobx-react';
import Modal from 'react-native-modal'
import moment from 'moment';
import DialIndicator from '../../sharedComponents/DialIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from '../../components/react-native-simple-radio-button';
import SortableListView from 'react-native-sortable-listview'
import { setTheme, getTheme, colors } from '../../store/store';
import { selectGlobalData } from '../../selectors';
import {
  TabNavigator,
} from 'react-navigation';
import Swipeout from '../../components/react-native-swipeout';
import Search from '../Search';
import styles from '../../style/style';
import fonts from '../../style/fonts';
import navstyle from '../../style/nav';
import watchstyle from '../../style/watchlist';
import { watchListStore } from '../../mobxStores';
import { kFormatter, zacksRatingFormatter } from '../../utility';

import { dummyUpdate } from '../../store/actions/global';

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
    const { dummyUpdate } = this.props;
    Alert.alert(
      'Delete',
      'Are you sure you want to delete this?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => removeFromWatchlist(rowToRemove, dummyUpdate) },
      ],
      { cancelable: true }
    )
  }

  toggleWatchListPercent = id => {
    if (this.state.showWatchListPercent.some(p => p === id)) {
      this.setState(({ showWatchListPercent }) => ({
        showWatchListPercent: showWatchListPercent.filter(p => p !== id)
      }));
    } else {
      this.setState(({ showWatchListPercent }) => ({
        showWatchListPercent: showWatchListPercent.concat(id)
      }));
    }
  };

  navigateToChart = data => {
    this.props.navigation.navigate('Chart', { data: data })
  }

  renderRow = row => {
    if (!row) {
      return <Text style={{ display: 'none' }}></Text>;
    }
    const { deletingRecordId } = watchListStore;
    if (row.id === deletingRecordId) {
      return <Text style={{ display: 'none' }}></Text>;
    }

    var thisRow = (
      <Swipeout right={this.generateSwipeOutBtn(row)} style={watchstyle.delete} buttonWidth={100} autoClose>
        <TouchableOpacity
          style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, watchstyle.symbol]}
          onPress={this.navigateToChart.bind(this, row)}
          delayLongPress={500}>
          <View style={watchstyle.touchable}>
            <View style={watchstyle.symDetails}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symName, fonts.hindGunturRg]}>
                {row['ticker']}
              </Text>
              <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.coName, fonts.hindGunturRg]}>
                {row['companyName'].length > 23 ? `${row['companyName'].slice(0, 20)}...` : row['companyName']}
              </Text>
            </View>
            <View style={watchstyle.symMomentum}>
              <DialIndicator width={100} height={50} displayText={true} textLine1={'VOL'} textLine2={kFormatter(row['latestVolume'])} position={row['momentum']} />
            </View>
            <TouchableOpacity
              style={watchstyle.symCost}
              onPress={this.toggleWatchListPercent.bind(this, row.id)}
            >
              <Text style={[{ color: this.state.colors['darkSlate'] }, watchstyle.symPrice, fonts.hindGunturRg]}>${Number(row['latestPrice']).toFixed(2)}</Text>
              <Text style={[{ color: this.state.colors['lightGray'] }, watchstyle.symTime, fonts.hindGunturRg]}>{moment.unix(row['latestUpdate']).format('h:mm A PT')}</Text>
              {this.state.showWatchListPercent.includes(row.id) ?
                <Text
                  style={[{ backgroundColor: Number(row['changePercent']) < 0 ? this.state.colors['red'] : this.state.colors['green'] }, { borderColor: Number(row['changePercent']) < 0 ? this.state.colors['red'] : this.state.colors['green'] }, { color: this.state.colors['realWhite'] }, styles.smallGrnBtn, fonts.hindGunturBd]}
                >
                  {Number(row['changePercent']) < 0 ? '' : '+'}{`${(row['changePercent']).toFixed(2)}%`}
                </Text> :
                <Text
                  style={[{ backgroundColor: Number(row['change']) < 0 ? this.state.colors['red'] : this.state.colors['green'] }, { borderColor: Number(row['changePercent']) < 0 ? this.state.colors['red'] : this.state.colors['green'] }, { color: this.state.colors['white'] }, styles.smallGrnBtn, fonts.hindGunturBd]}
                >
                  {Number(row['change']) < 0 ? '' : '+'}{row['change'].toFixed(2)}
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
      return <Text style={{ display: 'none' }}></Text>;
    }
    const { deletingRecordId } = watchListStore;
    if (row.id === deletingRecordId) {
      return <Text style={{ display: 'none' }}></Text>;
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
              {row['companyName'].length > 23 ? `${row['companyName'].slice(0, 20)}...` : row['companyName']}
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
    const {
      isFetchingWatchlistData,
      isEditingWatchList,
      watchlistDataJS,
      sortByIndex
    } = watchListStore;
    let dataSource = watchlistDataJS;

    return (
      <SafeAreaView style={[{ backgroundColor: this.state.colors['contentBg'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={[styles.menuContainer]}>

            {/*Header*/}

            {!isEditingWatchList &&
              <TouchableOpacity style={styles.leftCta} onPress={watchListStore.toggleEditingWatchList.bind(this, true)}>
                <Text style={[{ color: this.state.colors['lightGray'] }, styles.leftCtaTxt, fonts.hindGunturRg]}>
                  Edit
                </Text>
              </TouchableOpacity>
            }
            {isEditingWatchList &&
              <TouchableOpacity style={styles.leftCta} onPress={watchListStore.toggleEditingWatchList.bind(this, false)}>
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

        {!isFetchingWatchlistData && !isEditingWatchList &&
          <SortableListView
            data={dataSource}
            // order={order}
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

        {!isFetchingWatchlistData && isEditingWatchList &&
          <SortableListView
            data={dataSource}
            // order={order}
            onRowMoved={watchListStore.onRowMove}
            disableSorting={false}
            navigation={this.props.navigation}
            renderRow={this.renderEditableRow}
            disableAnimatedScrolling
            limitScrolling
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
      </SafeAreaView>
    );
  }
}

Watchlists.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  dummyUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});

const mapDispatchToProps = bindActionCreators.bind(this, { dummyUpdate });

export default connect(mapStateToProps, mapDispatchToProps)(Watchlists);
