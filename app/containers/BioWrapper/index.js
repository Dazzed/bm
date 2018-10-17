import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AppState,
  Platform,
  Dimensions
} from 'react-native';
import Orientation from 'react-native-orientation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TouchID from 'react-native-touch-id';

import * as globalActions from '../../store/actions/global';

import {
  selectGlobalData
} from '../../selectors';

import LockComponent from './LockComponent';
import { autoLogOffStore } from '../../mobxStores';

export default TargetComponent => {
  class BioWrapperHOC extends Component {
    static propTypes = {
      initiateProbingForBio: PropTypes.func.isRequired,
      globalData: PropTypes.object.isRequired,
      cancelEnablingBioProtection: PropTypes.func.isRequired,
      cancelDisablingBioProtection: PropTypes.func.isRequired,
      toggleRemindBioProtectionAfterLoggingIn: PropTypes.func.isRequired,
      performEnablingBioProtection: PropTypes.func.isRequired,
      performDisablingBioProtection: PropTypes.func.isRequired,
      logoutAction: PropTypes.func.isRequired,
    };

    constructor(props) {
      super(props);
      let d = Dimensions.get('window');
      const { height, width } = d;
      this.state = {
        bioId: (Platform.OS === 'ios' && (height === 812 || width === 812)) ? 'FACE' : 'TOUCH',
        canRenderTargetComponent: false,
        appState: AppState.currentState,
        touchIdFailCount: 0,
        hasVerifiedBio: false,
        inLockedState: false
      };
    }

    componentDidMount() {
      Orientation.lockToPortrait();
      this.props.initiateProbingForBio();
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      Orientation.lockToPortrait();
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidUpdate(prevProps) {
      Orientation.lockToPortrait();
      const {
        globalData: prevGlobalData
      } = prevProps;
      const {
        globalData: thizGlobalData
      } = this.props;
      if (this.state.fromMinimize === true) {
        return;
      }
      // if user wants to enable bio after login
      if (prevGlobalData.isAuthenticated === false && thizGlobalData.isAuthenticated === true) {
        if (thizGlobalData.remindBioAfterLoggingIn) {
          if (this.state.hasVerifiedBio === false) {
            this.initiateBioAuth();
          }
        }
      }
      // if user has enabled bio already
      else if (prevGlobalData.isProbingToCheckBio === true && thizGlobalData.isProbingToCheckBio === false) {
        if (thizGlobalData.hasUserEnabledBioProtection === true) {
          if (this.state.hasVerifiedBio === false) {
            this.initiateBioAuth();
          }
        } else {
          this.setState({ canRenderTargetComponent: true });
        }
      }
      // if user toggles touch id in settings
      else if (prevGlobalData.isInititatingBioProtection === false && thizGlobalData.isInititatingBioProtection === true) {
        this.initiateBioAuth();
      }
      else if (prevGlobalData.isCancellingBioProtection === false && thizGlobalData.isCancellingBioProtection === true) {
        this.initiateBioAuth();
      }
    }

    // HACK: If the user fails touch id for 5 times, Navigate them to the login page.
    // Set the shouldNavigateToLogin state prop to true and after 100 millis set it to false
    // The child component will capture the prop in componentDidUpdate
    toggleShouldNavigateToLogin = () => {
      this.setState({ shouldNavigateToLogin: true }, () => {
        setTimeout(() => {
          this.setState({ shouldNavigateToLogin: false });
        }, 200);
      });
    }

    initiateBioAuth = () => {
      const {
        globalData: thizGlobalData
      } = this.props;
      const {
        touchIdFailCount
      } = this.state;
      TouchID.authenticate('Authenticate to access your BluMartini account.', {})
        .then(success => {
          let cb = () => false;
          if (thizGlobalData.remindBioAfterLoggingIn) {
            cb = () => {
              this.props.toggleRemindBioProtectionAfterLoggingIn(false);
              this.props.performEnablingBioProtection();
            };
          } else if (thizGlobalData.isInititatingBioProtection === true) {
            cb = () => {
              this.props.performEnablingBioProtection();
              this.props.cancelEnablingBioProtection();
            };
          } else if (thizGlobalData.isCancellingBioProtection === true) {
            cb = () => {
              this.props.performDisablingBioProtection();
              this.props.cancelDisablingBioProtection();
            };
          }
          this.setState({ hasVerifiedBio: true, canRenderTargetComponent: true, fromMinimize: false }, cb);
        })
        .catch(error => {
          // this.initiateBioAuth();
          if (thizGlobalData.remindBioAfterLoggingIn && touchIdFailCount > 5) {
            this.props.toggleRemindBioProtectionAfterLoggingIn(false);
            alert(`You have exceeded the maximum number of attempts to verify your ${this.state.bioId} ID. Please try logging out to enable touch id again`);
            this.setState({ canRenderTargetComponent: true });
          } else if (thizGlobalData.remindBioAfterLoggingIn && error.name === 'LAErrorUserCancel') {
            this.props.toggleRemindBioProtectionAfterLoggingIn(false);
            this.setState({ canRenderTargetComponent: true });
          } else if (thizGlobalData.hasUserEnabledBioProtection && error.name === 'LAErrorUserCancel') {
            // this.setState({ inLockedState: true });
            this.props.logoutAction();
            this.setState({ canRenderTargetComponent: true }, this.toggleShouldNavigateToLogin);
          } else if (thizGlobalData.isInititatingBioProtection === true) {
            this.props.cancelEnablingBioProtection();
            this.setState({ canRenderTargetComponent: true });
          } else if (thizGlobalData.isCancellingBioProtection === true) {
            this.props.cancelDisablingBioProtection();
            this.setState({ canRenderTargetComponent: true });
          } else if (this.state.fromMinimize && error.name === 'LAErrorUserCancel') {
            // this.setState({ inLockedState: true });
            this.props.logoutAction();
            this.setState({ canRenderTargetComponent: true }, this.toggleShouldNavigateToLogin);
          } else {
            this.setState(({ touchIdFailCount }) => ({ touchIdFailCount: touchIdFailCount + 1 }), this.initiateBioAuth);
          }
          console.log(error)
        });
    }

    _handleAppStateChange = (nextAppState) => {
      let statePropsToUpdate = {};
      let cb = () => false;
      if (this.state.appState.match(/background/) && nextAppState === 'active') {
        if (this.props.globalData.hasUserEnabledBioProtection) {
          statePropsToUpdate = { canRenderTargetComponent: false, hasVerifiedBio: false, fromMinimize: true };
          cb = this.initiateBioAuth;
        }
      }
      // ### BEGIN AUTO LOG OFF related logic
      if (this.state.appState === 'inactive' && nextAppState === 'background') {
        autoLogOffStore.startTimer();
      }
      if (this.state.appState === 'background' && nextAppState === 'active') {
        autoLogOffStore.stopTimer();
      }
      // ### END AUTO LOG OFF related logic
      this.setState({ appState: nextAppState, ...statePropsToUpdate }, cb);
    }

    onUnlockApp = () => {
      this.setState({ inLockedState: false }, this.initiateBioAuth);
    }

    render() {
      const {
        canRenderTargetComponent,
        inLockedState,
        shouldNavigateToLogin
      } = this.state;
      const { globalData } = this.props;
      if (globalData.isLoggingOut) {
        return <View></View>;
      } else if (inLockedState) {
        return <LockComponent onUnlockApp={this.onUnlockApp} globalData={globalData} />;
      }
      return canRenderTargetComponent ? <TargetComponent shouldNavigateToLogin={shouldNavigateToLogin} /> : <View></View>
    }
  }

  const mapStateToProps = state => ({
    globalData: selectGlobalData(state)
  });

  const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

  return connect(mapStateToProps, mapDispatchToProps)(BioWrapperHOC);
};
