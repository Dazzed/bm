import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../../config';

export const PREFIX = 'APP_GLOBAL';

const THEME_KEY = '@Blu:isDarkThemeActive';
const ACCESS_TOKEN_KEY = '@Blu:accessToken';
const CURRENT_USER_ID_KEY = '@Blu:currentUserId';

export function startLoggingIn() {
  return {
    type: `${PREFIX}_START_LOGGING_IN`
  };
}

export function loginAction({ email, password }) {
  return async (dispatch) => {
    try {
      dispatch(startLoggingIn());
      const body = {
        email: email.toLowerCase(),
        password
      };
      let authDetails = await axios.post(`${API_URL}/api/users/login`, body);
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, authDetails.data.id);
      await AsyncStorage.setItem(CURRENT_USER_ID_KEY, authDetails.data.userId.toString());
      dispatch(authSuccess(authDetails.data.id, authDetails.data.userId));
    } catch (e) {
      console.log('Error in loginAction', e);
      dispatch(authFailure());
    }
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
      return dispatch(logoutSuccess());
    } catch (e) {
      console.log('Error in logoutAction', e);
      dispatch(logoutFailure());
    }
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
    if (isDarkThemeActive) {
      return dispatch({
        type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
        payload: true
      });
    }
  };
}

export function toggleTheme() {
  return async dispatch => {
    const isDarkThemeActive = await AsyncStorage.getItem(THEME_KEY);
    if (isDarkThemeActive) {
      await AsyncStorage.removeItem(THEME_KEY);
      return dispatch({
        type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
        payload: false
      });
    } else {
      await AsyncStorage.setItem(THEME_KEY, 'true');
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