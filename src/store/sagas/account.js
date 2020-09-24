import {all, fork, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    CHECK_DUPLICATED_ACCOUNT_REQUEST, CHECK_DUPLICATED_ACCOUNT_SUCCESS, CHECK_DUPLICATED_ACCOUNT_FAILURE,
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOAD_ACCOUNT_REQUEST, LOAD_ACCOUNT_SUCCESS, LOAD_ACCOUNT_FAILURE,
    UPLOAD_PROFILE_REQUEST, UPLOAD_PROFILE_SUCCESS, UPLOAD_PROFILE_FAILURE,
    EDIT_ACCOUNT_REQUEST, EDIT_ACCOUNT_SUCCESS, EDIT_ACCOUNT_FAILURE,
    CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE,
    DELETE_ACCOUNT_REQUEST, DELETE_ACCOUNT_SUCCESS, DELETE_ACCOUNT_FAILURE,
} from '../modules/account';
import {ACCESS_TOKEN} from 'constants/index';
import {http} from 'utils/HttpHandler';


function registerAPI(data) {
    return http.post(`/api/v1/auth/register`, data);
}

function checkingAccountDuplicationAPI(email) {
    return http.get(`/api/v1/auth/check-email?email=${email}`);
}

function loginAPI(data) {
    return http.post(`/api/v1/auth/getToken`, data);
}

function loadAccountAPI() {
    return http.get(`/api/v1/account`);
}

function uploadProfileImageAPI(file) {
    return http.post(`/api/v1/account/profile`, file, {'Content-type': 'multipart/form-data;charset=utf-8'});
}

function changePasswordAPI(data) {
    return http.put('/api/v1/account/password', data);
}

function editAccountAPI(data) {
    return http.put('/api/v1/account', data);
}

function deleteAccountAPI(data) {
    return http.delete('/api/v1/account');
}


// 회원 가입 ///////////////////////////////////
function* register(action){
    try {
        yield call(registerAPI, action.data);
        yield put({
            type : REGISTER_SUCCESS
        })

        action.meta.callbackAction();
    }catch(e) { // loginAPI 실패
        yield put({
            type : REGISTER_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchRegister() {
    yield takeLatest(REGISTER_REQUEST, register)
}


// 계정 중복 체크 ///////////////////////////////////
function* checkingAccountDuplication(action){
    try {
        let result = yield call(checkingAccountDuplicationAPI, action.data);
        yield put({
            type : CHECK_DUPLICATED_ACCOUNT_SUCCESS,
            data : result.data.data
        })

        action.meta.callbackAction(result.data.data);
    }catch(e) { // loginAPI 실패
        yield put({
            type : CHECK_DUPLICATED_ACCOUNT_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchCheckingAccountDuplication() {
    yield takeLatest(CHECK_DUPLICATED_ACCOUNT_REQUEST, checkingAccountDuplication)
}



// 로그인 ///////////////////////////////////
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

        action.meta.callbackAction();
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


// 회원 정보 가져오기 ///////////////////////////////////
function* loadAccount(){
    try {
        let result = yield call(loadAccountAPI);
        result = result.data.data;
        yield put({
            type : LOAD_ACCOUNT_SUCCESS,
            data : {
                accountId : result.accountId,
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
    yield takeEvery(LOAD_ACCOUNT_REQUEST, loadAccount)
}


// 프로필 이미지 변경 ///////////////////////////////////
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

function* watchUploadProfileImage() {
    yield takeLatest(UPLOAD_PROFILE_REQUEST, uploadProfileImage)
}

// 계정 정보 변경 ///////////////////////////////////
function* editAccount(action){
    try {
        yield call(editAccountAPI, action.data);
        yield put({
            type : EDIT_ACCOUNT_SUCCESS,
            data : {
                name : action.data.name
            }
        })
        action.meta.callbackAction();
    }catch(e) { // loginAPI 실패
        yield put({
            type : EDIT_ACCOUNT_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchEditAccount() {
    yield takeLatest(EDIT_ACCOUNT_REQUEST, editAccount)
}

// 비밀번호 변경 ///////////////////////////////////
function* changePassword(action){
    try {
        yield call(changePasswordAPI, action.data);
        yield put({
            type : CHANGE_PASSWORD_SUCCESS,
        })
        action.meta.callbackAction();
    }catch(e) { // loginAPI 실패
        yield put({
            type : CHANGE_PASSWORD_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchChangePassword() {
    yield takeLatest(CHANGE_PASSWORD_REQUEST, changePassword)
}


// 비밀번호 변경 ///////////////////////////////////
function* deleteAccount(action){
    try {
        yield call(deleteAccountAPI, action.data);
        yield put({
            type : DELETE_ACCOUNT_SUCCESS,
        })

        action.meta.callbackAction();
    }catch(e) { // loginAPI 실패
        yield put({
            type : DELETE_ACCOUNT_FAILURE,
            error : e.response ? e.response.data.message : ''
        })
    }
}

function* watchDeleteAccount() {
    yield takeLatest(DELETE_ACCOUNT_REQUEST, deleteAccount)
}


export default function* accountSaga() {
    yield all([
        fork(watchRegister),
        fork(watchCheckingAccountDuplication),
        fork(watchLogin),
        fork(watchLoadAccount),
        fork(watchUploadProfileImage),
        fork(watchEditAccount),
        fork(watchChangePassword),
        fork(watchDeleteAccount),
    ]);
}