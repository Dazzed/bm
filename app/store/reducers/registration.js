import { createReducer } from 'redux-act';

import {
  updateRegistrationParams,
  resetRegistrationParams
} from '../actions/registration';

const initialState = {
  country: null
};

const reducer = {
  [updateRegistrationParams]: (state, params) => ({
    ...state,
    ...params
  }),
  [resetRegistrationParams]: state => ({
    ...state,
    ...initialState
  })
};

export default createReducer(reducer, initialState);
