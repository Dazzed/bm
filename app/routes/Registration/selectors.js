import { createSelector } from 'reselect';

const pluckRegistration = state => state.registration;

export const selectRegistrationPage = createSelector(
  pluckRegistration,
  registration => registration
);

export const constructRegistrationParams = object => {
  const {
    email,
    password,
    firstName,
    lastName,
    dateField: dob,
    address,
    address2,
    phoneField: phone,
    ssnField: socialSecurityNo,
    maritalStatus,
    dependentField: dependents,
    employment,
    experience,
    city,
    zip: zipCode,
    state,
  } = object;

  return {
    email,
    password,
    firstName,
    lastName,
    dob,
    address,
    address2,
    phone: phone.replace(/-/g, ''),
    socialSecurityNo,
    maritalStatus,
    dependents,
    employment,
    experience,
    city,
    zipCode,
    state
  };
};