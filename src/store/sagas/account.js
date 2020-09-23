import {all, fork, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE,
    UPLOAD_PROFILE_REQUEST, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE
} from '../modules/account';
import {ACCESS_TOKEN} from 'constants/index';
import {http} from 'utils/HttpHandler';


function uploadProfileImageAPI(file) {
    return http.post(`/api/v1/account/profile`, file, {'Content-type': 'multipart/form-data;charset=utf-8'});
}

function loginAPI(loginData) {
    return http.post(`/api/v1/auth/getToken`, loginData);
}

function loadAccountAPI() {
    return http.get(`/api/v1/account`);
}

function registerAPI(registerData) {
    return http.post(`/api/v1/auth/register`, registerData);
}

function* login(action){
    try {
        let loginResult = yield call(loginAPI, action.data);
        const {accessToken} = loginResult.data.data;
        window.localStorage.setItem(ACCESS_TOKEN, accessToken);

        yield put({
            type : LOG_IN_SUCCESS
        })

        yield put({
            type : LOAD_ACCOUNT_REQUEST
        })
    }catch(e) {
        yield put({
            type : LOG_IN_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchLogin() {
    yield takeEvery(LOG_IN_REQUEST, login)
}



function* loadAccount(){
    try {
        let result = yield call(loadAccountAPI);
        result = result.data.data;
        yield put({
            type : LOAD_ACCOUNT_SUCCESS,
            data : {
                accountId : result.id,
                name : result.name,
                profileImg : result.profileImg,
                provider : result.provider
            }
        })
    }catch(e) { // loginAPI 실패
        yield put({
            type : LOAD_ACCOUNT_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchLoadAccount() {
    yield takeLatest(LOAD_ACCOUNT_REQUEST, loadAccount)
}


function* uploadProfileImage(action){
    try {
        let result = yield call(uploadProfileImageAPI, action.file);
        result = result.data.data;
        yield put({
            type : UPLOAD_PROFILE_SUCCESS,
            data : result
        })
    }catch(e) { // loginAPI 실패
        yield put({
            type : UPLOAD_PROFILE_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchEditProfileImage() {
    yield takeLatest(UPLOAD_PROFILE_REQUEST, uploadProfileImage)
}



export default function* accountSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLoadAccount),
        fork(watchEditProfileImage)
        // fork(watchRegister)
    ]);
}