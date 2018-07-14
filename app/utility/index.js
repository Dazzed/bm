export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const generateHeaderStyles = (theme) => {
  return {
    headerStyle: {
      backgroundColor: theme.white,
    },
    headerTitleStyle: {
      fontWeight: 'bold',
      color: theme.darkSlate
    }
  }
};

export const millionBillionFormatter = (inputNumber) => {
  let formattedNumber = '';
  let stringAppend = '';
  if(!inputNumber) {
    return '';
  }
  if(isNaN(inputNumber)) {
    return 'NaN!'
  }
  if(inputNumber.length < 4) {
    // handle three digit items without modifying style
    return inputNumber;
  } else if( inputNumber > 0 && inputNumber <= 99999) {
    // format for thousands
    stringAppend = 'K';
    let dividedBy1000 = inputNumber / 1000;
    return dividedBy1000.toFixed(1) + stringAppend;
  } else if( inputNumber >= 100000 && inputNumber <= 999999999) {
    // handle millions
    stringAppend = 'M';
    let dividedBy1000000 = inputNumber / 1000000;
    return dividedBy1000000.toFixed(1) + stringAppend;
  } else if( inputNumber >= 1000000000 && inputNumber <= 999999999999) {
    // handle billions
    stringAppend = 'B';
    let dividedBy1000000000 = inputNumber / 1000000000;
    return dividedBy1000000000.toFixed(1) + stringAppend;
  } else {
    return '!!!'
  }
}

export const formatPrice = (priceInput) => {
  if(!priceInput) {
    return ''
  }
  if(isNaN(priceInput)) {
    return priceInput
  }
  // make string
  let stringifiedPrice = priceInput.toString();
  // check if decimal exists
  let hasDecimal = stringifiedPrice.indexOf('.') > 0;
  if(!hasDecimal) {
    // if it does not, add it and two 00s
    return priceInput + '.00';
  } else {
    return priceInput + '';
  }
}

export const eightCharValidator = (password) => {
  if (!password) {
    return false;
  }
  // console.log('eightCharValidator ', password, password.length)
  if (password.length >= 8) {
    return true;
  } else {
    return false;
  }
}
export const upperAndLowercasLettersValidator = (password) => {
  if (!password) {
    return false;
  }
  function hasLowerCaseSearch(str) {
    return (/[a-z]/.test(str));
  }
  function hasUpperCaseSearch(str) {
    return (/[A-Z]/.test(str));
  }
  let hasUppercase = hasUpperCaseSearch(password);
  let hasLowercase = hasLowerCaseSearch(password);
  if (hasUppercase && hasLowercase) {
    return true;
  } else {
    return false;
  }
}
export const atLeastOneNumberValidator = (password) => {
  // console.log('atLeastOneNumberValidator ', password)
  if (!password) {
    return false;
  }
  let hasOneNumber = false;
  password.split('').every((i) => {
    if (!isNaN(i)) {
      hasOneNumber = true;
      return false;
    }
    return true;
  })
  if (hasOneNumber) {
    return true;
  } else {
    return false;
  }
}

export const sortStringArrayByParam = (targetArray, param, order = 'ASC') => {
  if (order === 'ASC') {
    return targetArray.sort((obj1, obj2) => {
      if (obj1[param].toLowerCase() > obj2[param].toLowerCase()) {
        return 1;
      }
      return -1;
    });
  } else {
    return targetArray.sort((obj1, obj2) => {
      if (obj1[param].toLowerCase() < obj2[param].toLowerCase()) {
        return 1;
      }
      return -1;
    });
  }
}

export const sortNumberArrayByParam = (targetArray, param, order = 'ASC') => {
  if (order === 'ASC') {
    return targetArray.sort((obj1, obj2) => {
      if (obj1[param] > obj2[param]) {
        return 1;
      }
      return -1;
    });
  } else {
    return targetArray.sort((obj1, obj2) => {
      if (obj1[param] < obj2[param]) {
        return 1;
      }
      return -1;
    });
  }
}

export const kFormatter = num => {
  switch(String(num).length) {
    case 1:
    case 2:
    case 3:
      return num;
    case 4:
    case 5:
    case 6:
      return (num / 1000).toFixed(1) + 'K';
    case 7:
    case 8:
    case 9:
      return (num / 1000000).toFixed(1) + 'M';
    default:
      return (num / 1000000000).toFixed(1) + 'B';
  }
}

export const zacksRatingFormatter = num => {
  if (num === null || num === undefined || num === 0 || num === 'na') {
    return 0;
  }
  return num * 0.2;
}