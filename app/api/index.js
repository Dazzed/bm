const { get, post } from './apiUtility';

const login = (params) => post('/login', params);
const register = (params) => post('/login', params);

export {
    login,
    register
}
