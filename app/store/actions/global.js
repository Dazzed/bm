import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../../config';
import { colorStore } from '../../mobxStores';

export const PREFIX = 'APP_GLOBAL';

const THEME_KEY = '@Blu:isDarkThemeActive';

export function startLoggingIn() {
  return {
    type: `${PREFIX}_START_LOGGING_IN`
  };
}

export function loginAction({ email, password }) {
  return async (dispatch, getState) => {
    try {
      dispatch(startLoggingIn());
      const body = {
        email: email.toLowerCase(),
        password
      };
      let authDetails = await axios.post(`${API_URL}/api/users/login`, body);
      dispatch(authSuccess(authDetails.data.id, authDetails.data.userId));
    } catch (e) {
      console.log('Error in loginAction', e);
      dispatch(authFailure());
    }
  };
}

export function authSuccess(access_token, id) {
  return async (dispatch) => {
    try {
      const currentUser = await axios.get(`${API_URL}/api/users/${id}?access_token=${access_token}`);
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

      // do changes in mobx in parrallel
      colorStore.setTheme('dark');

      return dispatch({
        type: `${PREFIX}_SET_THEME_FROM_LOCAL`,
        payload: true
      });
    } else {
      // do changes in mobx in parrallel
      colorStore.setTheme('light');
    }
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