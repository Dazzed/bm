import { createSelector } from 'reselect';

const pluckRegistration = state => state.registration;

export const selectRegistrationPage = createSelector(
  pluckRegistration,
  registration => registration
);
