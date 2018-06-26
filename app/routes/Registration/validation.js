import axios from 'axios';

import { API_URL } from '../../config';

const isEmpty = param => {
  if (!param) {
    return true;
  }
  if (!param.trim()) {
    return true;
  }
  return false;
};

export const isPresent = param => {
  if (typeof param === 'string') {
    return !isEmpty(param);
  } else if (typeof param === 'object') {
    const ALL_KEYS = Object.keys(param);
    return ALL_KEYS.every(k => !isEmpty(param[k]));
  }
  return false;
};

export const isPhoneValid = param => {
  if (typeof param === 'string') {
    return (param.length === 12)
  }
  return false;
}
export const isDateValid = param => {
  if (typeof param === 'string') {
    return (param.length === 10)
  }
  return false;
}

export const isSsnValid = param => {
  if (typeof param === 'string') {
    return (param.length === 11)
  }
  return false;
};

export const isDependentValid = param => {
  if (typeof param === 'string') {
    return (param.length > 0)
  }
  return false;
};

export const validateEmail = email => {
  const validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validEmail.test(email);
};

export const validatePassword = password => {
  const strongPassword = new RegExp('^(?=.*[0-9])^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})');
  const eightLettersLength = new RegExp('^(?=.{8,})');
  const oneLowerCase = new RegExp('^(?=.*[a-z])');
  const oneUpperCase = new RegExp('^(?=.*[A-Z])');
  const oneSymbol = new RegExp('^(?=.*[!@#\$%\^&\*])');
  const oneNumber = new RegExp('[0-9]', 'g');

  if (strongPassword.test(password)) {
    return { valid: true, message: '' };
  } else if (!eightLettersLength.test(password)) {
    return { valid: false, message: 'Password must be atleast 8 characters in length' };
  } else if (!oneLowerCase.test(password)) {
    return { valid: false, message: 'Your password must include at least one lower case letter' };
  } else if (!oneUpperCase.test(password)) {
    return { valid: false, message: 'Your password must include at least one upper case letter' };
  } else if (!oneSymbol.test(password)) {
    return { valid: false, message: 'Your password must include at least one symbol (!@#$%^&*)' };
  } else if (!oneNumber.test(password)) {
    return { valid: false, message: 'Your password must include at least one numeric value' };
  }
  return { valid: true, message: '' };
}

export const isEmailAlreadyInUse = async email => {
  try {
    if (typeof email !== 'string' || !email) {
      throw 'Email cannot be empty.';
    }
    const result = await axios.get(`${API_URL}/api/users/emailPresent/${email}`);
    const {
      exists
    } = result.data;
    return exists;
  } catch (error) {
    throw error;
  }
};