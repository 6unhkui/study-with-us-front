import { takeLatest } from "@redux-saga/core/effects";
import { AttendanceAPI } from "@/api/attendance.api";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { all, fork, takeEvery } from "redux-saga/effects";
import {
    getAttendedMemberListByDateAsync,
    getAttendingMemberListAsync,
    GET_ATTENDED_MEMBER_LIST_BY_DATE,
    GET_ATTENDING_MEMBER_LIST,
    registerAttendanceAsync,
    REGISTER_ATTENDANCE
} from "./actions";

const getAttendingMemberListSaga = createAsyncSaga(getAttendingMemberListAsync, AttendanceAPI.getAttendingMembers);
function* watchGetAttendingMemberListSaga() {
    yield takeEvery(GET_ATTENDING_MEMBER_LIST.REQUEST, getAttendingMemberListSaga);
}

const getAttendedMemberListByDateSaga = createAsyncSaga(getAttendedMemberListByDateAsync, AttendanceAPI.getAttendedMembersByDate);
function* watchGetAttendedMemberListByDateSaga() {
    yield takeEvery(GET_ATTENDED_MEMBER_LIST_BY_DATE.REQUEST, getAttendedMemberListByDateSaga);
}

const registerSaga = createAsyncSaga(registerAttendanceAsync, AttendanceAPI.register);
function* watchRegisterSaga() {
    yield takeLatest(REGISTER_ATTENDANCE.REQUEST, registerSaga);
}

export function* attendanceSagas() {
    yield all([fork(watchRegisterSaga), fork(watchGetAttendingMemberListSaga), fork(watchGetAttendedMemberListByDateSaga)]);
}
