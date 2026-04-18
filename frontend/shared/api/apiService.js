import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './config';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

let logoutCallback = null;

export const registerLogoutCallback = (callback) => {
    logoutCallback = callback;
};

api.interceptors.request.use(
    async (config) => {
        const storedUser = await AsyncStorage.getItem('@user_session');
        if (storedUser) {
            const { token } = JSON.parse(storedUser);
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            console.warn('Авторизация просрочена или отсутствует. Выход из системы...');
            if (logoutCallback) {
                await logoutCallback();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
