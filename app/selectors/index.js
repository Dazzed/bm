import { createSelector } from 'reselect';

const pluckGlobal = state => state.globalData;

export const selectGlobalData = createSelector(
  pluckGlobal,
  data => data
);
