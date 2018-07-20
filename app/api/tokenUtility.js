import { AsyncStorage } from 'react-native';
import {
  ACCESS_TOKEN_KEY
} from '../constants';

const saveToken = async (token) => {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log('saved token', token)
    return;
}

const readToken = async () => {
    return new Promise((resolve) => {
        AsyncStorage.getItem(ACCESS_TOKEN_KEY)
            .then((token) => {
                resolve(token)
            })
    })
}

const clearToken = async () => {
    await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
    return
}

export {
    saveToken,
    readToken,
    clearToken
}