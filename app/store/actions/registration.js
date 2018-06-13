import { createAction } from 'redux-act';

const PREFIX = 'APP_REGISTRATION';

export const updateRegistrationParams = createAction(
  `${PREFIX}_UPDATE_REGISTRATION_PARAMS`,
  params => params
);

export const resetRegistrationParams = createAction(
  `${PREFIX}_RESET_REGISTRATION_PARAMS`
);