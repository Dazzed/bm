import React, { Component } from 'react';

import PropTypes from 'prop-types'

import {
  Text,
  TextInput,
  View,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity
} from 'react-native';

import TouchID from 'react-native-touch-id';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Faq from './faq';
import ReportBug from './reportbug';
import ContactUs from './contactus';

import EditAddress from './editaddress';
import EditMaritalStatus from './editmaritalstatus';
import EditEmploymentStatus from './editemployment';
import EditExperience from './editexperience';
import EditDependents from './editdependents';


import RadioForm from '../components/react-native-simple-radio-button';
import { colors } from '../store/store';

import styles from '../style/style';
import settings from '../style/settings';
import Search from './search';
import navstyle from '../style/nav';

import Modal from 'react-native-modal'
import fonts from '../style/fonts';

import * as globalActions from '../store/actions/global';
import { selectGlobalData } from '../selectors';

import { forceDarkTheme } from '../devControlPanel';

import { authStore } from '../mobxStores';

var sort_props = [
  { label: '10 minutes', value: 0 },
  { label: '5 minutes', value: 1 },
  { label: '2 minutes', value: 2 },
  { label: '1 minute', value: 3 }
];

class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../images/settings.png')}
        style={[navstyle.icon, { tintColor: tintColor }]}
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      isAddressVisible: false,
      isMaritalStatusVisible: false,
      isDependentsVisible: false,
      isExperienceVisible: false,
      isEmploymentVisible: false,

      isFaqVisible: false,
      isBugVisible: false,
      isContactVisible: false,

      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      isSearchVisible: false,
      isAutoLogVisible: false,
      autoLog: 3,
      numField: null,
      colors: colors(props.globalData.isDarkThemeActive)
    };
    this.showSearch = this.showSearch.bind(this);
    this.hideSearch = this.hideSearch.bind(this);
  }

  showDependents = () => {
    this.setState({ isDependentsVisible: true })
  }

  hideDependents = () => {
    this.setState({ isDependentsVisible: false })
  }

  showExperience = () => {
    this.setState({ isExperienceVisible: true })
  }

  hideExperience = () => {
    this.setState({ isExperienceVisible: false })
  }

  showEmploymentStatus = () => {
    this.setState({ isEmploymentStatusVisible: true })
  }

  hideEmploymentStatus = () => {
    this.setState({ isEmploymentStatusVisible: false })
  }

  showMaritalStatus = () => {
    this.setState({ isMaritalStatusVisible: true })
  }

  hideMaritalStatus = () => {
    this.setState({ isMaritalStatusVisible: false })
  }

  showAddress = () => {
    this.setState({ isAddressVisible: true })
  }

  hideAddress = () => {
    this.setState({ isAddressVisible: false })
  }

  showContact = () => {
    this.setState({ isContactVisible: true })
  }

  hideContact = () => {
    this.setState({ isContactVisible: false })
  }

  showBug() {
    this.setState({ isBugVisible: true })
  }

  hideBug() {
    this.setState({ isBugVisible: false })
  }

  showFaq() {
    this.setState({ isFaqVisible: true })
  }

  hideFaq() {
    this.setState({ isFaqVisible: false })
  }

  showSearch() {
    this.setState({ isSearchVisible: true });
  }

  hideSearch() {
    this.setState({ isSearchVisible: false });
  }

  showAutoLog() {
    this.setState({ isAutoLogVisible: true });
  }

  hideAutoLog(value) {
    if (value) {
      this.setState({ isAutoLogVisible: false, autoLog: value });
    } else {
      this.setState({ isAutoLogVisible: false });
    }
  }

  handleTouch = (value) => {
    if (value) {
      TouchID.authenticate('Authenticate to access your BluMartini account.', {})
        .then(success => {
          // Success code
          console.log(success);
        })
        .catch(error => {
          // Failure code
          console.log(error)
        });
    }
    this.setState({ falseSwitchIsOn: value })
  }


  componentDidUpdate(prevProps) {
    const {
      globalData: prevGlobalData
    } = prevProps;
    const {
      globalData: currentGlobalData
    } = this.props;
    if (prevGlobalData.isDarkThemeActive !== currentGlobalData.isDarkThemeActive) {
      this.setState({
        colors: colors(currentGlobalData.isDarkThemeActive),
        isDarkThemeActive: currentGlobalData.isDarkThemeActive
      });
    }
  }

  componentDidMount() {
    if(forceDarkTheme) {
      this.props.setThemeToDark()
    } else {
      this.props.setThemeToLight()
    }
  }

  navToDeposit() {
    this.props.navigation.navigate('AccountSelect', {
      widthdrawDepositMode: 'deposit'
    })
  }

  navToWithdraw() {
    console.log('===== ', this);
    this.props.navigation.navigate('AccountSelect', {
      widthdrawDepositMode: 'withdraw'
    })
  }

  renderBankingSettings() {
    const {
        globalData: currentGlobalData
    } = this.props;


    let selectedCaratImageSource = null;
    if(currentGlobalData.isDarkThemeActive) {
      selectedCaratImageSource = require('../images/right_arrow_dark.png');
    } else {
      selectedCaratImageSource = require('../images/right_arrow.png');
    }

    return <View>
      <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>BANKING</Text>

      <TouchableOpacity onPress={() => this.navToDeposit()}>
        <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Deposit Funds</Text>
          <Image
              resizeMode={'contain'}
              source={selectedCaratImageSource}
              style={styles.caratImage}
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => this.navToWithdraw()}>
        <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Withdraw Funds</Text>
          <Image
              resizeMode={'contain'}
              source={selectedCaratImageSource}
              style={styles.caratImage}
          />
        </View>
      </TouchableOpacity>

      <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
        <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>My Accounts</Text>
        <View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>2</Text>
        </View>
      </View>

    </View>
  }

  render() {
    const { navigate } = this.props.navigation;

    const {
      globalData
    } = this.props;

    const { userData } = authStore;

    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
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
        <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, settings.contentBg]}>
          {this.renderBankingSettings()}
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>ACCOUNT INFORMATION</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Email</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]}>{userData.email}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Mobile</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]}>{userData.phone}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Password</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]}>*********</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Address</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]} onPress={() => this.showAddress()}>{userData.address}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Marital status</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]} onPress={() => this.showMaritalStatus()}>{userData.maritalStatus}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Number of dependents</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]} onPress={() => this.showDependents()}>{userData.dependents}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Employment status</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]} onPress={() => this.showEmploymentStatus()}>{userData.employment}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Investment experience</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]} onPress={() => this.showExperience()}>{userData.experience}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
              <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} />
            </Text>
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Citizenship</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['darkSlate'] }, settings.input, fonts.hindGunturRg]}>{userData.country}</Text>
            <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
            </Text>
          </View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>COLOR SCHEME</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Dark Theme</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={this.props.toggleTheme}
              value={globalData.isDarkThemeActive} />
          </View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>TOUCH ID</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Touch ID Log-in</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.handleTouch(value)}
              value={this.state.falseSwitchIsOn} />
          </View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>AUTO LOG OFF</Text>
          <TouchableOpacity style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]} onPress={(value) => { this.showAutoLog() }}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Log out after</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['lightGray'] }, settings.inputSelected, fonts.hindGunturRg]}>{sort_props[this.state.autoLog].label} inactivity</Text>
          </TouchableOpacity>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>NOTIFICATIONS</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Orders</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={this.state.trueSwitchIsOn} />
          </View>
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>NEWS SOURCE</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>CNBC</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Bloomberg</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={this.state.trueSwitchIsOn} />
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>MarketWatch</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={true} />
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Reuters</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={true} />
          </View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Morningstar</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setState({ falseSwitchIsOn: value })}
              value={true} />
          </View>
          <View style={{ marginTop: 20 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={() => this.showFaq()}>FAQ</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]} >
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={() => this.showContact()}>Contact us</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={() => this.showBug()}>Report a bug</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]} onPress={() => { console.log('am here'); this.props.navigation.navigate('Login', { color: this.state.activeColor }); }}>
            <Text onPress={this.props.logoutAction} style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]}>
              {globalData.isLoggingOut ? 'Loading...' : 'Logout'}
            </Text>
          </View>
          <View style={{ marginTop: 20 }}></View>
        </ScrollView>
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.hideSearch} navigation={this.props.navigation} />
        </Modal>
        <Modal
          isVisible={this.state.isAutoLogVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          style={styles.bottomModalTall}
          onModalHide={() => { this.hideAutoLog() }}>
          <View style={[{ backgroundColor: this.state.colors['white'] }, styles.radio, styles.bottomModalTall]}>
            <RadioForm
              radio_props={sort_props}
              initial={this.state.autoLog}
              formHorizontal={false}
              labelHorizontal={true}
              borderWidth={1}
              buttonColor={colors.blue}
              buttonOuterColor={this.state.colors['lightGray']}
              buttonSize={22}
              buttonOuterSize={20}
              animation={false}
              labelStyle={[{ color: this.state.colors['lightGray'] }, styles.radioLabel, fonts.hindGunturRg]}
              radioLabelActive={[{ color: this.state.colors['darkGray'] }, styles.activeRadioLabel, fonts.hindGunturBd]}
              labelWrapStyle={[{ borderBottomColor: this.state.colors['borderGray'] }, styles.radioLabelWrap]}
              onPress={(value) => { this.hideAutoLog(value) }}
              style={styles.radioField}
            />
          </View>
        </Modal>


        <Modal
          isVisible={this.state.isFaqVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <Faq hideFaq={() => this.hideFaq()} />
        </Modal>
        <Modal
          isVisible={this.state.isBugVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ReportBug hideBug={() => this.hideBug()} />
        </Modal>
        <Modal
          isVisible={this.state.isContactVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ContactUs hideContact={() => this.hideContact()} />
        </Modal>
        {
          this.state.isAddressVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <EditAddress
              hideAddress={this.hideAddress}
              initiatePatchingUser={this.props.initiatePatchingUser}
            />
          </Modal>
        }
        {
          this.state.isMaritalStatusVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <EditMaritalStatus
              hideMaritalStatus={this.hideMaritalStatus}
              initiatePatchingUser={this.props.initiatePatchingUser}
            />
          </Modal>
        }
        {
          this.state.isDependentsVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <EditDependents
              hideDependents={this.hideDependents}
              initiatePatchingUser={this.props.initiatePatchingUser}
            />
          </Modal>
        }
        {
          this.state.isEmploymentStatusVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <EditEmploymentStatus
              hideEmploymentStatus={this.hideEmploymentStatus}
              initiatePatchingUser={this.props.initiatePatchingUser}
            />
          </Modal>
        }
        {
          this.state.isExperienceVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}>
            <EditExperience
              hideExperience={this.hideExperience}
              initiatePatchingUser={this.props.initiatePatchingUser}
            />
          </Modal>
        }
      </View>
    );
  }
}

Settings.propTypes = {
  navigation: PropTypes.object.isRequired,
  globalData: PropTypes.object.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired,
  initiatePatchingUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});
const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
