import { get, post } from './apiUtility';

const login = (params) => post('login', params);
const createUser = (params) => post('users', params);

export {
    login,
    createUser
}
