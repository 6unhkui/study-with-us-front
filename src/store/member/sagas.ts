import { all, call, fork, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { MemeberAPI } from "@/api/member.api";
import {
    changeManagerAsync,
    CHANGE_MANAGER,
    deleteMemberAsync,
    DELETE_MEMBER,
    getMemberAsync,
    getMemberListAsync,
    getMyInfoAsync,
    GET_MEMBER,
    GET_MEMBER_LIST,
    GET_MY_INFO
} from "./actions";
import { changeManager, decreaseMemberCount } from "../room";

const getMemberListSaga = createAsyncSaga(getMemberListAsync, MemeberAPI.getAllByPage);
function* watchGetMemberList() {
    yield takeLatest(GET_MEMBER_LIST.REQUEST, getMemberListSaga);
}

const getMemberSaga = createAsyncSaga(getMemberAsync, MemeberAPI.getOne);
function* watchGetMember() {
    yield takeLatest(GET_MEMBER.REQUEST, getMemberSaga);
}

const getMyInfoSaga = createAsyncSaga(getMyInfoAsync, MemeberAPI.getMyInfo);
function* watchGetMyInfo() {
    yield takeLatest(GET_MY_INFO.REQUEST, getMyInfoSaga);
}

function* deleteMemberSaga(action: ReturnType<typeof deleteMemberAsync.request>) {
    try {
        const res: boolean = yield call(MemeberAPI.deleteOne, action.payload);
        if (res) {
            yield put(deleteMemberAsync.success(action.payload));
            yield put(decreaseMemberCount(""));
        }
    } catch (e) {
        yield put(deleteMemberAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchDeleteMember() {
    yield takeLatest(DELETE_MEMBER.REQUEST, deleteMemberSaga);
}

function* changeManagerSaga(action: ReturnType<typeof changeManagerAsync.request>) {
    try {
        const res: boolean = yield call(MemeberAPI.changeManager, action.payload);

        if (res) {
            yield put(changeManagerAsync.success(action.payload.memberId));
            yield put(changeManager(action.payload));
        }
    } catch (e) {
        yield put(changeManagerAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchChangeManager() {
    yield takeLatest(CHANGE_MANAGER.REQUEST, changeManagerSaga);
}

export function* memberSagas() {
    yield all([
        fork(watchGetMemberList),
        fork(watchGetMember),
        fork(watchGetMyInfo),
        fork(watchDeleteMember),
        fork(watchChangeManager)
    ]);
}
