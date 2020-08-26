/** AP Server */
export const SERVER_URI = process.env.REACT_APP_API_SERVER_URI; 
export const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL; 
export const NAVER_AUTH_URL = process.env.REACT_APP_NAVER_AUTH_URL; 

// Http Request Header
const BEARER_TOKEN_PREFIX = 'Bearer ';
export const ACCESS_TOKEN = 'accessToken';
export const REMEMBER_ME = 'rememberMe';

export const header = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN) ? localStorage.getItem(ACCESS_TOKEN) : undefined;

    return {
        headers: { 
            'Authorization': `${BEARER_TOKEN_PREFIX} ${accessToken}`,
            'Content-Type': 'application/json',
        }
    }
}


export const getParameter = (location, key) => {
    key = key.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

    var regex = new RegExp('[\\?&]' + key + '=([^&#]*)');

    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
