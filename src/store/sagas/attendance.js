import {all, fork, takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {
    LOAD_MONTHLY_STATISTIC_REQUEST, LOAD_MONTHLY_STATISTIC_SUCCESS, LOAD_MONTHLY_STATISTIC_FAILURE,
    LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST, LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS, LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE,
    REGISTER_ATTENDANCE_REQUEST, REGISTER_ATTENDANCE_SUCCESS, REGISTER_ATTENDANCE_FAILURE
} from 'store/modules/attendance';
import {http} from 'utils/HttpHandler';


function loadMonthlyStatisticAPI(roomId, date) {
    return http.get(`/api/v1/room/${roomId}/attendance/monthly?date=${date}`);
}

function loadMembersAttendanceTodayAPI(roomId) {
    return http.get(`/api/v1/room/${roomId}/attendance`);
}

function registerAttendanceAPI(roomId, data) {
    return http.post(`/api/v1/room/${roomId}/attendance`, data);
}


function* loadMonthlyStatistic(action){
    try {
        const {data : {data}} = yield call(loadMonthlyStatisticAPI, action.roomId, action.date);
        yield put({
            type : LOAD_MONTHLY_STATISTIC_SUCCESS,
            data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MONTHLY_STATISTIC_FAILURE,
            error : e
        })
    }
}

function* watchLoadMonthlyStatistic() {
    yield takeEvery(LOAD_MONTHLY_STATISTIC_REQUEST, loadMonthlyStatistic)
}

function* loadMembersAttendanceToday(action){
    try {
        const {data : {data : {members, isRegistered}}} = yield call(loadMembersAttendanceTodayAPI, action.roomId);
        yield put({
            type : LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS,
            members,
            isRegistered
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE,
            error : e
        })
    }
}

function* watchMembersAttendanceToday() {
    yield takeEvery(LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST, loadMembersAttendanceToday)
}

function* registerAttendance(action){
    try {
        const {data : {data : {memberId, attendance}}} = yield call(registerAttendanceAPI, action.roomId, action.data);
        yield put({
            type : REGISTER_ATTENDANCE_SUCCESS,
            memberId,
            attendance
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : REGISTER_ATTENDANCE_FAILURE,
            error : e
        })
    }
}

function* watchRegisterAttendance() {
    yield takeLatest(REGISTER_ATTENDANCE_REQUEST, registerAttendance)
}



export default function* attendanceSaga() {
    yield all([
        fork(watchLoadMonthlyStatistic),
        fork(watchMembersAttendanceToday),
        fork(watchRegisterAttendance)
    ]);
}

