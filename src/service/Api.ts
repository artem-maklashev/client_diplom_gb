import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL; // Замените на ваш URL API

// Функция для отправки запросов с токеном авторизации
export const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Интерфейс для токена авторизации
export interface AuthToken {
    token: string;
}

// Функция для установки токена авторизации
export const setAuthToken = (token: string | null): void => {
    if (typeof token === "string") {
        localStorage.setItem('authToken', token)
    }
    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('authToken')}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};


