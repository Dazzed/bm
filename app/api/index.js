import { get, post } from './apiUtility';

const login = (params) => post('users/login', params);
const createUser = (params) => post('users', params);
const resetPassword = (params) => post('users/reset', params);
const getUserById = (id) => get(`users/${id}`, {});
const getScannerList = (params) => get(`users/scanner`, params)
const getTickerDetails = (params) => get('tickerLists/stockDetails', params)

export {
    login,
    createUser,
    resetPassword,
    getUserById,
    getScannerList,
    getTickerDetails
}
