const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateHeaderStyles = (theme) => {
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

const eightCharValidator = (password) => {
    if(!password) {
        return false;
    }
    // console.log('eightCharValidator ', password, password.length)
    if(password.length >= 8) {
        return true;
    } else {
        return false;
    }
}
const upperAndLowercasLettersValidator = (password) => {
    if(!password) {
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
    if(hasUppercase && hasLowercase) {
        return true;
    } else {
        return false;
    }
}
const atLeastOneNumberValidator = (password) => {
    // console.log('atLeastOneNumberValidator ', password)
    if(!password) {
        return false;
    }
    let hasOneNumber = false;
    password.split('').every((i) => {
        if(!isNaN(i)) {
            hasOneNumber = true;
            return false;
        }
        return true;
    })
    if(hasOneNumber) {
        return true;
    } else {
        return false;
    }
}

export {
    numberWithCommas,
    generateHeaderStyles,
    eightCharValidator,
    upperAndLowercasLettersValidator,
    atLeastOneNumberValidator
}
