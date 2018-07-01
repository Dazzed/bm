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

export {
    numberWithCommas,
    generateHeaderStyles
}