export const SERVER_URI = process.env.REACT_APP_API_SERVER_URI;
export const GOOGLE_AUTH_URL = process.env.REACT_APP_GOOGLE_AUTH_URL;
export const NAVER_AUTH_URL = process.env.REACT_APP_NAVER_AUTH_URL;
export const OAUTH_PROVIDER = ["GOOGLE", "NAVER"];

export const BEARER_TOKEN_PREFIX = "Bearer ";
export const ACCESS_TOKEN = "accessToken";

export const REMEMBER_ME = "rememberMe";
export const MULTI_LANG = "i18nextLng";

export const isProd = process.env.NODE_ENV === "production";
