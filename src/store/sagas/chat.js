import { all, fork, takeEvery, put, call } from "redux-saga/effects";
import {
    LOAD_MESSAGE_HISTORY_REQUEST,
    LOAD_MESSAGE_HISTORY_SUCCESS,
    LOAD_MESSAGE_HISTORY_FAILURE,
    LOAD_CURRENT_CHAT_MEMBERS_REQUEST,
    LOAD_CURRENT_CHAT_MEMBERS_SUCCESS,
    LOAD_CURRENT_CHAT_MEMBERS_FAILURE
} from "store/modules/chat";
import { http } from "utils/HttpHandler";

function loadMessageHistoryAPI(roomId) {
    return http.get(`/api/v1/chat/${roomId}/history`);
}

function loadChatMemberInfoAPI(roomId) {
    return http.get(`/api/v1/chat/${roomId}/members`);
}

function* loadMessageHistory(action) {
    try {
        const {
            data: { data }
        } = yield call(loadMessageHistoryAPI, action.data);

        // let arr = data.map(v => JSON.parse(v));
        yield put({
            type: LOAD_MESSAGE_HISTORY_SUCCESS,
            data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MESSAGE_HISTORY_FAILURE,
            error: e
        });
    }
}

function* watchLoadMessageHistory() {
    yield takeEvery(LOAD_MESSAGE_HISTORY_REQUEST, loadMessageHistory);
}

function* loadChatMemberInfo(action) {
    try {
        const {
            data: { data }
        } = yield call(loadChatMemberInfoAPI, action.data);

        yield put({
            type: LOAD_CURRENT_CHAT_MEMBERS_SUCCESS,
            data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_CURRENT_CHAT_MEMBERS_FAILURE,
            error: e
        });
    }
}

function* watchChatMemberInfo() {
    yield takeEvery(LOAD_CURRENT_CHAT_MEMBERS_REQUEST, loadChatMemberInfo);
}

export default function* memberSaga() {
    yield all([fork(watchLoadMessageHistory), fork(watchChatMemberInfo)]);
}
