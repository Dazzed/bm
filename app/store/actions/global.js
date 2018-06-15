import axios from 'axios';
import config from '../../config';

export const PREFIX = 'APP_GLOBAL';

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
      let authDetails = await axios.post(`${config['staging']}/api/users/login`, body);
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
      const currentUser = await axios.get(`${config['staging']}/api/users/${id}?access_token=${access_token}`);
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