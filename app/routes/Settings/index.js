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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { observer } from 'mobx-react';
import Faq from './components/faq';
import ReportBug from './components/reportbug';
import ContactUs from './components/contactus';
import EditPassword from './components/EditPassword';
import EditPhone from './components/EditPhone';
import EditAddress from './components/editaddress';
import EditEmail from './components/EditEmail';
import EditMaritalStatus from './components/editmaritalstatus';
import EditEmploymentStatus from './components/editemployment';
import EditExperience from './components/editexperience';
import EditDependents from './components/editdependents';
import RadioForm from '../../components/react-native-simple-radio-button';
import { colors } from '../../store/store';
import styles from '../../style/style';
import settings from '../../style/settings';
import Search from './../search';
import navstyle from '../../style/nav';
import Modal from 'react-native-modal'
import fonts from '../../style/fonts';
import * as globalActions from '../../store/actions/global';
import { selectGlobalData } from '../../selectors';
import { forceDarkTheme } from '../../devControlPanel';
import { authStore, settingsStore } from '../../mobxStores';
import { formatPhoneNumber } from '../../utility';
import { autoLogOffOptions } from '../../constants';

var sort_props = autoLogOffOptions;

@observer
class Settings extends Component {
  static navigationOptions = {
    title: 'Settings',
    header: null,
    gesturesEnabled: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../../images/settings.png')}
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
      isPhoneVisible: false,
      isEmailVisible: false,
      isPasswordModalVisible: false,

      isFaqVisible: false,
      isBugVisible: false,
      isContactVisible: false,

      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      isSearchVisible: false,
      isAutoLogVisible: false,
      // autoLog: 3,
      numField: null,
      colors: colors(props.globalData.isDarkThemeActive)
    };
  }

  toggleModal = stateProp => this.setState(({ [stateProp]: statePropVal }) => ({ [stateProp]: !statePropVal }));

  showAutoLog() {
    this.setState({ isAutoLogVisible: true });
  }

  setAutoLog = (value) => {
    const { setLogOutAfterCount } = settingsStore;
    setLogOutAfterCount(value);
    this.hideAutoLog();
  }

  hideAutoLog = () => {
    this.setState({ isAutoLogVisible: false });
  }

  handleTouch = (value) => {
    if (value) {
      this.props.initiateEnablingBioProtection();
    } else {
      this.props.initiateDisablingBioProtection();
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
      this.setState({
        colors: colors(currentGlobalData.isDarkThemeActive),
        isDarkThemeActive: currentGlobalData.isDarkThemeActive
      });
    }
    console.log('------ SETTINGS UPDATES')
  }

  navToDeposit() {
    this.props.navigation.navigate('AccountSelect', {
      widthdrawDepositMode: 'deposit'
    })
  }

  navToWithdraw() {
    this.props.navigation.navigate('AccountSelect', {
      widthdrawDepositMode: 'withdraw'
    })
  }

  renderBankingSettings() {
    const {
      globalData: currentGlobalData
    } = this.props;
    let selectedCaratImageSource = null;
    if (currentGlobalData.isDarkThemeActive) {
      selectedCaratImageSource = require('../../images/right_arrow_dark.png');
    } else {
      selectedCaratImageSource = require('../../images/right_arrow.png');
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

  renderOption(title, data, functionToFire) {
    return (
      <TouchableOpacity
        onPress={functionToFire ? functionToFire : () => { }}
        style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}
      >
        <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>
          {title}
        </Text>
        <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['lightGray'] }, settings.input, fonts.hindGunturRg]}>
          {data}
        </Text>
        <Text style={[{ color: this.state.colors['darkSlate'] }, fonts.hindGunturRg, { flex: 1, marginTop: 20, textAlign: 'right' }]} >
          {functionToFire ? <Image source={this.state.colors['rightArrow']} style={{ width: 10, height: 18 }} /> : null}
        </Text>
      </TouchableOpacity>
    );
  }

  logoutPressed() {
    // console.log('======= LOGOUT PRESSEDD')
    this.props.logoutAction()
    this.props.navigation.navigate('Login', { color: this.state.activeColor })
  }

  toggleNewsByLabel(elem) {
    const { setNewsSourceValue } = settingsStore;
    setNewsSourceValue(elem);
  }

  renderNewsList() {
    const { newsSourcesJS } = settingsStore;
    if (!newsSourcesJS || newsSourcesJS.length < 1) {
      return null;
    } else {
      return <View>
        <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>NEWS SOURCE</Text>
        {newsSourcesJS.map((elem, i) => {
          return (
            <View key={`news_${i}`} style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
              <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>{elem.name}</Text>
              <Switch style={styles.switch}
                onTintColor={this.state.colors['blue']}
                onValueChange={() => this.toggleNewsByLabel(elem)}
                value={elem.active} />
            </View>
          );
        })}
      </View>
    }
  }

  setOrderValue(value) {
    const { setOrderValue } = settingsStore;
    setOrderValue(value);
  }

  renderAutoLogOption() {
    const { autoLog } = settingsStore;
    if (autoLog !== null && autoLog !== undefined) {
      return (
        <View>
          {/* Auto Log Off */}
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>AUTO LOG OFF</Text>
          <TouchableOpacity style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]} onPress={(value) => { this.showAutoLog() }}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Log out after</Text>
            <Text style={[{ borderBottomColor: this.state.colors['borderGray'] }, { color: this.state.colors['lightGray'] }, settings.inputSelected, fonts.hindGunturRg]}>{sort_props[autoLog].label} inactivity</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    const { autoLog } = settingsStore;

    const {
      globalData
    } = this.props;

    const { orderValue } = settingsStore;

    // console.log('GLOooooooobal data', globalData)
    // {this.renderOption('Citizenship', globalData.currentUser.country)}

    return (
      <View style={[{ backgroundColor: this.state.colors['white'] }, styles.pageContainer]}>
        <View style={styles.menuBorder}>
          <View style={styles.menuContainer}>
            <View style={styles.leftCta}></View>
            <TouchableOpacity style={styles.searchCta} onPress={this.toggleModal.bind(this, 'isSearchVisible')}>
              <Text style={[{ color: this.state.colors['lightGray'] }, styles.searchCtaTxt, fonts.hindGunturRg]}>Search Stocks</Text>
              <Image
                source={require('../../images/search.png')}
                style={styles.searchImg}
              />
            </TouchableOpacity>
            <View style={styles.rightCta}></View>
          </View>
        </View>

        <ScrollView style={[{ backgroundColor: this.state.colors['contentBg'] }, settings.contentBg]}>

          {/* Banking */}

          {this.renderBankingSettings()}

          {/* Account Info */}

          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>ACCOUNT INFORMATION</Text>

          {/* TODO: need edit functions. what are we doint here? */}
          {this.renderOption('Email', globalData.currentUser.email, this.toggleModal.bind(this, 'isEmailVisible'))}
          {this.renderOption('Mobile', formatPhoneNumber(globalData.currentUser.phone, 'dot'), this.toggleModal.bind(this, 'isPhoneVisible'))}
          {this.renderOption('Password', '***********', this.toggleModal.bind(this, 'isPasswordModalVisible'))}

          {this.renderOption('Address', globalData.currentUser.address, this.toggleModal.bind(this, 'isAddressVisible'))}
          {this.renderOption('Marital status', globalData.currentUser.maritalStatus, this.toggleModal.bind(this, 'isMaritalStatusVisible'))}
          {this.renderOption('Number of dependents', globalData.currentUser.dependents, this.toggleModal.bind(this, 'isDependentsVisible'))}
          {this.renderOption('Employment status', globalData.currentUser.employment, this.toggleModal.bind(this, 'isEmploymentStatusVisible'))}
          {this.renderOption('Investment experience', globalData.currentUser.experience, this.toggleModal.bind(this, 'isExperienceVisible'))}
          {this.renderOption('Contry of citizenship', globalData.currentUser.country)}

          {/* Color Scheme */}

          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>COLOR SCHEME</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Dark Theme</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={this.props.toggleTheme}
              value={globalData.isDarkThemeActive} />
          </View>

          {/* Touch ID */}

          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>TOUCH ID</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Touch ID Log-in</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.handleTouch(value)}
              value={globalData.hasUserEnabledBioProtection || globalData.isEnablingBio} />
          </View>

          {this.renderAutoLogOption()}

          {/* Notifications */}
          <Text style={[{ color: this.state.colors['darkSlate'] }, settings.fieldTitle, fonts.hindGunturBd]}>NOTIFICATIONS</Text>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'] }, settings.field]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLabel, fonts.hindGunturRg]}>Orders</Text>
            <Switch style={styles.switch}
              onTintColor={this.state.colors['blue']}
              onValueChange={(value) => this.setOrderValue(value)}
              value={orderValue} />
          </View>

          {/* News Source */}
          {this.renderNewsList()}

          <View style={{ marginTop: 20 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={this.toggleModal.bind(this, 'isFaqVisible')}>FAQ</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]} >
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={this.toggleModal.bind(this, 'isContactVisible')}>Contact us</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <View style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]} onPress={this.toggleModal.bind(this, 'isBugVisible')}>Report a bug</Text>
          </View>
          <View style={{ marginTop: 5 }}></View>
          <TouchableOpacity style={[{ backgroundColor: this.state.colors['white'] }, { borderBottomColor: this.state.colors['borderGray'], borderTopColor: this.state.colors['borderGray'] }, settings.fieldLink]} onPress={() => this.logoutPressed()}>
            <Text style={[{ color: this.state.colors['darkSlate'] }, settings.inputLink, fonts.hindGunturRg]}>
              {globalData.isLoggingOut ? 'Loading...' : 'Logout'}
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 20 }}></View>
        </ScrollView>
        <Modal
          isVisible={this.state.isSearchVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'} >
          <Search hideSearch={this.toggleModal.bind(this, 'isSearchVisible')} navigation={this.props.navigation} />
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
              initial={autoLog}
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
              onPress={(value) => { this.setAutoLog(value) }}
              style={styles.radioField}
            />
          </View>
        </Modal>

        <Modal
          isVisible={this.state.isFaqVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <Faq hideFaq={this.toggleModal.bind(this, 'isFaqVisible')} />
        </Modal>
        <Modal
          isVisible={this.state.isBugVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ReportBug hideBug={this.toggleModal.bind(this, 'isBugVisible')} />
        </Modal>
        <Modal
          isVisible={this.state.isContactVisible}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}>
          <ContactUs hideContact={this.toggleModal.bind(this, 'isContactVisible')} />
        </Modal>

        {/* Phone Modal */}
        {
          this.state.isPhoneVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            <EditPhone
              hidePhone={this.toggleModal.bind(this, 'isPhoneVisible')}
              initiatePatchingUser={this.props.initiatePatchingUser}
              colors={this.state.colors}
            />
          </Modal>
        }

        {/* Email Modal */}
        {
          this.state.isEmailVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            <EditEmail
              hideEmail={this.toggleModal.bind(this, 'isEmailVisible')}
            />
          </Modal>
        }

        {/* Password Modal */}
        {
          this.state.isPasswordModalVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            <EditPassword
              hidePassword={this.toggleModal.bind(this, 'isPasswordModalVisible')}
              initiatePatchingUser={this.props.initiatePatchingUser}
              colors={this.state.colors}
            />
          </Modal>
        }

        {/* Address modal */}
        {
          this.state.isAddressVisible &&
          <Modal
            isVisible
            animationIn={'slideInUp'}
            animationOut={'slideOutDown'}
          >
            <EditAddress
              hideAddress={this.toggleModal.bind(this, 'isAddressVisible')}
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
              hideMaritalStatus={this.toggleModal.bind(this, 'isMaritalStatusVisible')}
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
              hideDependents={this.toggleModal.bind(this, 'isDependentsVisible')}
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
              hideEmploymentStatus={this.toggleModal.bind(this, 'isEmploymentStatusVisible')}
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
              hideExperience={this.toggleModal.bind(this, 'isExperienceVisible')}
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
  initiateEnablingBioProtection: PropTypes.func.isRequired,
  initiateDisablingBioProtection: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  globalData: selectGlobalData(state)
});
const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
