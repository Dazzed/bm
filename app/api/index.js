import { get, post } from './apiUtility';

const login = (params) => post('users/login', params);
const createUser = (params) => post('users', params);
const getUserById = (id) => get(`users/${id}`, {});

export {
    login,
    createUser,
    getUserById
}
