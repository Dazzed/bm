import { PREFIX } from '../actions/global';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  currentUser: null,
  loginErrorPresent: false,
  isDarkThemeActive: false,
  isLoggingOut: false,
  isPatchingUser: false,
  // user bio related bool properties
  hasUserEnabledBioProtection: false,
  isAppLockedWithBio: false,
  isProbingToCheckBio: false,
  isEnablingBio: false,
  isDisablingBio: false,
  remindBioAfterLoggingIn: false,
    // bio for settings page
  isInititatingBioProtection: false,
  isCancellingBioProtection: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${PREFIX}_START_LOGGING_IN`:
      return {
        ...state,
        isAuthenticating: true,
        loginErrorPresent: false
      };
    case `${PREFIX}_SET_CURRENT_USER`:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        currentUser: action.payload
      };
    case `${PREFIX}_AUTH_FAILURE`:
      return {
        ...state,
        isAuthenticating: false,
        loginErrorPresent: true
      };
    case `${PREFIX}_SET_THEME_FROM_LOCAL`:
      return {
        ...state,
        isDarkThemeActive: action.payload
      };
    case `${PREFIX}_START_LOGGING_OUT`:
      return {
        ...state,
        isLoggingOut: true
      };
    case `${PREFIX}_LOGOUT_SUCCESS`:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: null,
        isLoggingOut: false
      };
    case `${PREFIX}_LOGOUT_FAILURE`:
      return {
        ...state,
        isLoggingOut: false
      };
    case `${PREFIX}_INITIATE_PATCHING_USER`:
      return {
        ...state,
        isPatchingUser: true
      };
    case `${PREFIX}_PATCH_SUCCESS`:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload
        },
        isPatchingUser: false
      };
    case `${PREFIX}_PATCH_ERROR`:
      return {
        ...state,
        isPatchingUser: false
      };
    case `${PREFIX}_LOCK_APP_WITH_BIO`:
      return {
        ...state,
        isAppLockedWithBio: true
      };
    case `${PREFIX}_UNLOCK_APP_WITH_BIO`:
      return {
        ...state,
        isAppLockedWithBio: false
      };
    case `${PREFIX}_TOGGLE_REMIND_BIO_AFTER_LOGGING_IN`:
      return {
        ...state,
        remindBioAfterLoggingIn: action.payload
      };
    case `${PREFIX}_INITIATE_PROBING_FOR_BIO`:
      return {
        ...state,
        isProbingToCheckBio: true
      };
    case `${PREFIX}_SET_BIO_PROTECTION`:
      return {
        ...state,
        isProbingToCheckBio: false,
        hasUserEnabledBioProtection: true
      };
    case `${PREFIX}_UNSET_BIO_PROTECTION`:
      return {
        ...state,
        isProbingToCheckBio: false,
        hasUserEnabledBioProtection: false,
      };
    case `${PREFIX}_IS_ENABLING_BIO_PROTECTION`:
      return {
        ...state,
        isEnablingBio: true
      };
    case `${PREFIX}_ENABLE_BIO_PROTECTION`:
      return {
        ...state,
        isEnablingBio: false,
        hasUserEnabledBioProtection: true
      };
    case `${PREFIX}_IS_DISABLING_BIO_PROTECTION`:
      return {
        ...state,
        isDisablingBio: true
      };
    case `${PREFIX}_DISABLE_BIO_PROTECTION`:
      return {
        ...state,
        isDisablingBio: false,
        hasUserEnabledBioProtection: false
      };
    case `${PREFIX}_INITIATE_ENABLING_BIO_PROTECTION`:
      return {
        ...state,
        isInititatingBioProtection: true
      };
    case `${PREFIX}_CANCEL_ENABLING_BIO_PROTECTION`:
      return {
        ...state,
        isInititatingBioProtection: false
      };
    case `${PREFIX}_INITIATE_DISABLING_BIO_PROTECTION`:
      return {
        ...state,
        isCancellingBioProtection: true
      };
    case `${PREFIX}_CANCEL_DISABLING_BIO_PROTECTION`:
      return {
        ...state,
        isCancellingBioProtection: false
      }
  }
  return state;
};