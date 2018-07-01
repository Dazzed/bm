import { PREFIX } from '../actions/global';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  currentUser: null,
  loginErrorPresent: false,
  isDarkThemeActive: false,
  isLoggingOut: false,
  isPatchingUser: false
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
  }
  return state;
};