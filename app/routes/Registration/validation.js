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