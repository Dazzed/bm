import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  AppState,
  Platform,
  Dimensions
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TouchID from 'react-native-touch-id';

import * as globalActions from '../../store/actions/global';

import {
  selectGlobalData
} from '../../selectors';

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
        hasVerifiedBio: false
      };
    }

    componentDidMount() {
      this.props.initiateProbingForBio();
      AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
    }

    componentDidUpdate(prevProps) {
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
          } else if (thizGlobalData.isInititatingBioProtection === true) {
            this.props.cancelEnablingBioProtection();
          } else if (thizGlobalData.isCancellingBioProtection === true) {
            this.props.cancelDisablingBioProtection();
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
      this.setState({ appState: nextAppState, ...statePropsToUpdate }, cb);
    }

    render() {
      const { canRenderTargetComponent } = this.state;
      const { globalData } = this.props;
      if (globalData.isLoggingOut) {
        return <View></View>;
      }
      return canRenderTargetComponent ? <TargetComponent /> : <View></View>
    }
  }

  const mapStateToProps = state => ({
    globalData: selectGlobalData(state)
  });

  const mapDispatchToProps = bindActionCreators.bind(this, globalActions);

  return connect(mapStateToProps, mapDispatchToProps)(BioWrapperHOC);
};
