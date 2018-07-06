const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const generateHeaderStyles = (theme) => {
    return {
        headerStyle: {
            backgroundColor: theme.white,
        },
        // headerTintColor: 'red',
        headerTitleStyle: {
            fontWeight: 'normal',
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
    let hasUppercase = false;
    let hasLowercase = false;
    password.split('').every((char) => {
        if (char == char.toUpperCase() && isNaN(char)) {
            hasUppercase = true;
        }
        if (char == char.toLowerCase() && isNaN(char)){
            hasLowercase = true;
        }
        if(hasUppercase && hasLowercase) {
            return false;
        }
        return true;
    })
    if(hasUppercase && hasLowercase) {
        return true;
    } else {
        return false;
    }
}
const atLeastOneNumberValidator = (password) => {
    console.log('atLeastOneNumberValidator ', password)
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