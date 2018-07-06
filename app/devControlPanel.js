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
const firstNavDefaultRoute = 'Registration';
// AppNav
// Login
// Home


// force navigation on app nav footer control
// const appNavDefaultTabRoute = 'Settings';
const appNavDefaultTabRoute = 'Account';

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


const autoLogin = false;

const registrationInitialStep = 11;

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////
//
// Set all these settings back to production standard before deploying
//
///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

if(productionMode) {
    displayPreviewButtonOnHome = false;
    forceDarkTheme = false;
    firstNavDefaultRoute = 'Home';
    appNavDefaultTabRoute = 'Account';
    stackNavDefaultRoute = 'AppNavTabs';
    autoLogin = false;
    showConsole = false;
    registrationInitialStep = 0;
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
    registrationInitialStep
};
