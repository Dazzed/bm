import { get, post } from './apiUtility';

const login = (params) => post('users/login', params);
const createUser = (params) => post('users', params);
const resetPassword = (params) => post('users/reset', params);
const getUserById = (id) => get(`users/${id}`, {});
const getScannerList = (params) => get(`users/scanner`, params)
const getTickerDetails = (params) => get('tickerLists/stockDetails', params)
const getTrendingData = (params) => get('users/trendingList', params);
const getNewsList = (params) => get('/tickerLists/getNews', params);
const withdraw = (params) => get('/users/withdraw', params);
const deposit = (params) => get('users/deposit', params);

export {
    login,
    createUser,
    resetPassword,
    getUserById,
    getScannerList,
    getTickerDetails,
    getTrendingData,
    getNewsList,
    withdraw,
    deposit
}
