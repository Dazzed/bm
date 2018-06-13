import { PREFIX } from '../actions/global';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  currentUser: null,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case `${PREFIX}_START_LOGGING_IN`:
      return {
        ...state,
        isAuthenticating: true,
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
      }
  }
  return state;
};