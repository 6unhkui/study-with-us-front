import { AccountAPI } from "@/api/account.api";
import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { tokenStore } from "@/utils/tokenUtils";
import { TokenDTO, UserDTO } from "@/api/dto/account.dto";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { customHistory } from "@/app/App";
import { FileAPI } from "@/api/file.api";
import {
    loginAsync,
    LOGIN,
    meAsync,
    ME,
    registerAsync,
    REGISTER,
    CHANGE_PROFILE_IMAGE,
    changeProfileImageAsync,
    UPDATE_ACCOUNT,
    updateAccountAsync,
    changePasswordAsync,
    CHANGE_PASSWORD,
    WITHDRAW,
    withdrawAsync
} from "./actions";

function* loginSaga(action: ReturnType<typeof loginAsync.request>) {
    try {
        const history = customHistory;
        const next = decodeURIComponent(history.location.search.replace(/\?next=/g, ""));

        const { accessToken }: TokenDTO = yield call(AccountAPI.login, action.payload);
        if (accessToken) {
            yield put(loginAsync.success(true));
            tokenStore.setAccessToken(accessToken);

            yield put(meAsync.request(""));

            if (next) {
                yield history.push(next);
            }
        } else {
            throw new Error("token generation failed");
        }
    } catch (e) {
        yield put(loginAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchLoginSaga() {
    yield takeLatest(LOGIN.REQUEST, loginSaga);
}

function* meSaga() {
    try {
        if (tokenStore.getAccessToken()) {
            const myData: UserDTO = yield call(AccountAPI.me);
            yield put(meAsync.success(myData));
        } else {
            throw new Error("token does not exist browser");
        }
    } catch (e) {
        yield put(meAsync.failure(e));
    }
}
function* watchMeSaga() {
    yield takeLatest(ME.REQUEST, meSaga);
}

const registerSaga = createAsyncSaga(registerAsync, AccountAPI.register);
function* watchRegisterSaga() {
    yield takeLatest(REGISTER.REQUEST, registerSaga);
}

const changeProfileImageSaga = createAsyncSaga(changeProfileImageAsync, AccountAPI.changeProfileImage);
function* watchChangeProfileImageSaga() {
    yield takeEvery(CHANGE_PROFILE_IMAGE.REQUEST, changeProfileImageSaga);
}

function* updateAccountSaga(action: ReturnType<typeof updateAccountAsync.request>) {
    try {
        const res: boolean = yield call(AccountAPI.updateUserInfo, action.payload);

        if (res) {
            yield put(updateAccountAsync.success(action.payload));
        }
    } catch (e) {
        yield put(updateAccountAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchUpdateAccountSaga() {
    yield takeLatest(UPDATE_ACCOUNT.REQUEST, updateAccountSaga);
}

const changePasswordSaga = createAsyncSaga(changePasswordAsync, AccountAPI.changePassword);
function* watchChangePasswordSaga() {
    yield takeLatest(CHANGE_PASSWORD.REQUEST, changePasswordSaga);
}

function* withdrawMembershipSaga(action: ReturnType<typeof withdrawAsync.request>) {
    try {
        const res: boolean = yield call(AccountAPI.withdraw);

        if (res) {
            yield put(withdrawAsync.success(action.payload));

            tokenStore.removeAccessToken();
            customHistory.push("/");
        }
    } catch (e) {
        yield put(withdrawAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchWithdrawMembershipSaga() {
    yield takeLatest(WITHDRAW.REQUEST, withdrawMembershipSaga);
}

export function* accountSagas() {
    yield all([
        fork(watchLoginSaga),
        fork(watchMeSaga),
        fork(watchRegisterSaga),
        fork(watchChangeProfileImageSaga),
        fork(watchUpdateAccountSaga),
        fork(watchChangePasswordSaga),
        fork(watchWithdrawMembershipSaga)
    ]);
}
