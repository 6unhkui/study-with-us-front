import axios from 'axios';
// Constants  - s ////////////////
// AP Server
export const SERVER_URI = process.env.REACT_APP_API_SERVER_URI; 
export const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL; 
export const NAVER_AUTH_URL = process.env.REACT_APP_NAVER_AUTH_URL; 

// JWT
const BEARER_TOKEN_PREFIX = 'Bearer ';
export const ACCESS_TOKEN = 'accessToken';

export const REMEMBER_ME = 'rememberMe';
const MultiLang = 'i18nextLng';
// Constants  - e ////////////////

// export const header = (contentType = 'application/json') => {
//     const accessToken = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : undefined;

//     return {
//             'Authorization': `${BEARER_TOKEN_PREFIX} ${accessToken}`,
//             'Content-Type': contentType,
//     }
// }

export const request = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : undefined;
    const multiLang = localStorage.getItem(MultiLang) ? window.localStorage.i18nextLng : 'ko';

    const headers = { 
        'Authorization': `${BEARER_TOKEN_PREFIX} ${accessToken}`,
        'Content-Type': 'application/json',
    }

    const getUrl = (uri) => SERVER_URI + uri + (uri.indexOf("?") === -1 ? "?lang=" : "&lang=") + multiLang;

    return {
        get: (url, options = {}) => axios.get(getUrl(url), {headers, ...options}),
        post: (url, data, options = {}) => axios.post(getUrl(url), data, {headers, ...options}),
        put: (url, data, options = {}) => axios.put(getUrl(url), data, {headers, ...options}),
        delete: (url, options = {}) => axios.delete(getUrl(url), {headers, ...options}),
    };
};


export const getParameter = (location, key) => {
    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};



export const setParameterForMultilingual = () => {
    return window.localStorage.i18nextLng && window.localStorage.i18nextLng !== 'ko' ? 
           "?lang=" + window.localStorage.i18nextLng : '';
}
