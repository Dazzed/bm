import { get, post } from './apiUtility';

const login = (params) => post('users/login', params);
const createUser = (params) => post('users', params);
const getUserById = (id) => get(`users/${id}`, {});
const getScannerList = (params) => get(`users/scanner`, params)

export {
    login,
    createUser,
    getUserById,
    getScannerList
}
