import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';

import thunk from 'redux-thunk';

import registration from './reducers/registration';
import globalData from './reducers/global';

// actions.js
export const activateGeod = geod => ({
  type: 'ACTIVATE_GEOD',
  geod,
});

export const closeGeod = () => ({
  type: 'CLOSE_GEOD',
});

// reducers.js
export const geod = (state = {}, action) => {
  switch (action.type) {
    case 'ACTIVATE_GEOD':
      return action.geod;
    case 'CLOSE_GEOD':
      return {};
    default:
      return state;
  }
};

export const reducers = combineReducers({
  geod,
  // registration,
  globalData
});

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk)
  )
  return store;
}

export const store = configureStore();
