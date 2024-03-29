import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../../config';
import { colorStore, watchListStore } from '../../mobxStores';
import { forceDarkTheme } from '../../devControlPanel';
import {
  THEME_KEY,
  ACCESS_TOKEN_KEY,
  CURRENT_USER_ID_KEY,
  TOUCH_ID_ENABLED_KEY
} from '../../constants';
export const PREFIX = 'APP_GLOBAL';

export function dummyUpdate() {
  return {
    type: `${PREFIX}_DUMMY_UPDATE`
  };
}

export function startLoggingIn() {
  return {
    type: `${PREFIX}_START_LOGGING_IN`
  };
}

export function logoutAction() {
  return async (dispatch, getState) => {
    try {
      if (getState().globalData.isLoggingOut) {
        return;
      }
      dispatch(startLoggingOut());
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      await axios.post(`${API_URL}/api/users/logout?access_token=${accessToken}`);
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
      await AsyncStorage.removeItem(CURRENT_USER_ID_KEY);
      await AsyncStorage.removeItem(TOUCH_ID_ENABLED_KEY);
      return dispatch(logoutSuccess());
    } catch (e) {
      console.log('Error in logoutAction', e);
      dispatch(logoutFailure());
    }
  };
}

export function saveUserData(userData) {
  return {
    type: `${PREFIX}_SAVE_USER_DATA`,
    payload: userData
  };
}

export function startLoggingOut() {
  return {
    type: `${PREFIX}_START_LOGGING_OUT`
  };
}

export function logoutSuccess() {
  return {
    type: `${PREFIX}_LOGOUT_SUCCESS`
  };
}

export function logoutFailure() {
  alert('There was an error logging out. Please try again');
  return {
    type: `${PREFIX}_LOGOUT_FAILURE`,
  };
}

export function authSuccess(access_token, id) {
  return async (dispatch) => {
    try {
      const currentUser = await axios.get(`${API_URL}/api/users/${id}?access_token=${access_token}`);
      currentUser.data["access_token"] = access_token;
      dispatch({
        type: `${PREFIX}_SET_CURRENT_USER`,
        payload: currentUser.data
      });
    } catch (e) {
      console.log('Error in authSuccess', e);
    }
  };
}

export function authFailure() {
  return {
    type: `${PREFIX}_AUTH_FAILURE`
  };
}

export function setThemeFromLocal() {
  return async dispatch => {
    const isDarkThemeActive = await AsyncStorage.getItem(THEME_KEY);
    let payload = false;
    if (isDarkThemeActive) {
      payload = true;
    } else {
      payload = false;
    }
    if(forceDarkTheme) {
      payload = true;
    }
    if(payload) {
      colorStore.setTheme('dark');
    } else {
      colorStore.setTheme('light');
    }
    return dispatch({
      type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
      payload: payload
    });
  };
}

export function setThemeToDark() {
  return async dispatch => {
    await AsyncStorage.setItem(THEME_KEY, 'true');
    // do changes in mobx in parrallel
    colorStore.setTheme('dark');
    return dispatch({
      type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
      payload: true
    });
  }
};

export function setThemeToLight() {
  return async dispatch => {
    await AsyncStorage.removeItem(THEME_KEY);
    // do changes in mobx in parrallel
    colorStore.setTheme('light');
    return dispatch({
      type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
      payload: false
    });
  };
}

export function toggleTheme() {
  return async dispatch => {
    const isDarkThemeActive = await AsyncStorage.getItem(THEME_KEY);
    if (isDarkThemeActive) {
      await AsyncStorage.removeItem(THEME_KEY);
      colorStore.setTheme('light');
      return dispatch({
        type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
        payload: false
      });
    } else {
      await AsyncStorage.setItem(THEME_KEY, 'true');
      colorStore.setTheme('dark');
      return dispatch({
        type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
        payload: true
      });
    }
  };
}

export function initiatePatchingUser(patchData) {
  return async dispatch => {
    try {
      dispatch({
        type: `${PREFIX}_INITIATE_PATCHING_USER`
      });
      const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
      const userId = await AsyncStorage.getItem(CURRENT_USER_ID_KEY);
      const patchResult = await axios.patch(`${API_URL}/api/users/${userId}?access_token=${accessToken}`, patchData);
      return dispatch({
        type: `${PREFIX}_PATCH_SUCCESS`,
        payload: patchResult.data
      });
    } catch (e) {
      console.log('Error in patching user', e);
      dispatch({
        type: `${PREFIX}_PATCH_ERROR`
      });
    }
  };
}

export function toggleRemindBioProtectionAfterLoggingIn(flag) {
  return {
    type: `${PREFIX}_TOGGLE_REMIND_BIO_AFTER_LOGGING_IN`,
    payload: flag
  };
}

export function initiateProbingForBio() {
  return async dispatch => {
    dispatch({
      type: `${PREFIX}_INITIATE_PROBING_FOR_BIO`
    });
    if (await AsyncStorage.getItem(TOUCH_ID_ENABLED_KEY)) {
      return dispatch({
        type: `${PREFIX}_SET_BIO_PROTECTION`
      });
    } else {
      return dispatch({
        type: `${PREFIX}_UNSET_BIO_PROTECTION`
      });
    }
  };
}

export function initiateEnablingBioProtection() {
  return {
    type: `${PREFIX}_INITIATE_ENABLING_BIO_PROTECTION`
  };
}

export function cancelEnablingBioProtection() {
  return {
    type: `${PREFIX}_CANCEL_ENABLING_BIO_PROTECTION`
  };
}

export function initiateDisablingBioProtection() {
  return {
    type: `${PREFIX}_INITIATE_DISABLING_BIO_PROTECTION`
  };
}

export function cancelDisablingBioProtection() {
  return {
    type: `${PREFIX}_CANCEL_DISABLING_BIO_PROTECTION`
  };
}

export function performEnablingBioProtection() {
  return async dispatch => {
    dispatch({
      type: `${PREFIX}_IS_ENABLING_BIO_PROTECTION`
    });
    await AsyncStorage.setItem(TOUCH_ID_ENABLED_KEY, 'true');
    return dispatch({
      type: `${PREFIX}_ENABLE_BIO_PROTECTION`
    });
  };
}

export function performDisablingBioProtection() {
  return async dispatch => {
    dispatch({
      type: `${PREFIX}_IS_DISABLING_BIO_PROTECTION`
    });
    await AsyncStorage.removeItem(TOUCH_ID_ENABLED_KEY);
    return dispatch({
      type: `${PREFIX}_DISABLE_BIO_PROTECTION`
    });
  };
}