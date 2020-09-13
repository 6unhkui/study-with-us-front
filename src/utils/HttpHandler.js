import axios from 'axios';
import { SERVER_URI, ACCESS_TOKEN, BEARER_TOKEN_PREFIX, MULTI_LANG } from 'constants/index';

/**
 * Axios Interceptor - s /////////////////////////////////////
 */
const instance = axios.create({
    baseURL:  SERVER_URI,
    timeout: 1000
});

instance.interceptors.request.use(
    function (config) {
        config.headers = {
            'Authorization': `${BEARER_TOKEN_PREFIX} ${localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : undefined}`
        };
        config.params = {...config.params, lang: localStorage.getItem(MULTI_LANG) ? window.localStorage.i18nextLng : 'ko'}
        return config;
    }, 
    function (error) {
        return Promise.reject(error);
    }
);

// Response Interceptor
instance.interceptors.response.use(
    // Http Statu가 200인 경우
    function (response) {
        return response;
    },

    // Http Statu가 200이 경우 : 에러 처리
    function (error) {
        if(error.response && error.response.status === 401) {
            localStorage.removeItem(ACCESS_TOKEN);
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const http = instance;
// Axios Interceptor - e /////////////////////////////////////



export const getParameter = (location, key) => {
    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};