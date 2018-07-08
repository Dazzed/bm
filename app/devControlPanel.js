// Master production override
// before deploying anything, set this to true

const productionMode = false;
// const productionMode = true;


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//
// Play with these settings while developing
//
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// show or hide preview button on front of app
// app requires real data so this is now unuseable
const displayPreviewButtonOnHome = false;


// force dark theme all the time
// const forceDarkTheme = false;
const forceDarkTheme = true;

// force navigation on top level navigator
// const firstNavDefaultRoute = 'Home';
const firstNavDefaultRoute = 'Login';
// AppNav
// Login
// Home

const registrationInitialStep = 0;

const fillRegistrationWithFakeData = true;

// force navigation on app nav footer control
// const appNavDefaultTabRoute = 'Settings';
const appNavDefaultTabRoute = 'Trending';

// Account
// Watchlists
// Trending
// Scanner
// Settings

const stackNavDefaultRoute = 'AppNavTabs';
// const stackNavDefaultRoute = 'AccountSelect';

// AppNavTabs
// Chart
// Deposit
// Withdraw

const showConsole = true;

// const autoLogin = false;
const autoLogin = true;


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//
// Set all these settings back to production standard before deploying
//
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// set it even if I forget to set it for production
if (!__DEV__) {
    productionMode = true;
}

if(productionMode) {
    displayPreviewButtonOnHome = false;
    forceDarkTheme = false;
    firstNavDefaultRoute = 'Home';
    appNavDefaultTabRoute = 'Account';
    stackNavDefaultRoute = 'AppNavTabs';
    autoLogin = false;
    showConsole = false;
    registrationInitialStep = 0;
    fillRegistrationWithFakeData = false;
}

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


export {
    displayPreviewButtonOnHome,
    forceDarkTheme,
    firstNavDefaultRoute,
    appNavDefaultTabRoute,
    stackNavDefaultRoute,
    autoLogin,
    showConsole,
    registrationInitialStep,
    fillRegistrationWithFakeData
};
