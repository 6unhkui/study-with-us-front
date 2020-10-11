import {all, fork, takeEvery, put, call} from 'redux-saga/effects';
import {
    LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE,
    LOAD_MEMBER_DETAIL_REQUEST, LOAD_MEMBER_DETAIL_SUCCESS, LOAD_MEMBER_DETAIL_FAILURE,
    DELETE_MEMBER_REQUEST, DELETE_MEMBER_SUCCESS, DELETE_MEMBER_FAILURE,
    LOAD_MY_DETAIL_REQUEST, LOAD_MY_DETAIL_SUCCESS, LOAD_MY_DETAIL_FAILURE,
    WITHDRAWAL_REQUEST, WITHDRAWAL_SUCCESS, WITHDRAWAL_FAILURE,
    CHANGE_MANAGER_REQUEST, CHANGE_MANAGER_SUCCESS, CHANGE_MANAGER_FAILURE
} from 'store/modules/member';
import {
    DECREMENT_MEMBER_COUNT,
    DEPOSE_MANAGER
} from 'store/modules/room';
import {http} from 'utils/HttpHandler';


function loadMembersAPI(roomId, pagination, keyword) {
    return http.get(`/api/v1/room/${roomId}/members?${makeParamForMembers(pagination, keyword)}`)
}

function loadMemberDetailAPI(memberId) {
    return http.get(`/api/v1/member/${memberId}`)
}

function deleteMemberAPI(memberId) {
    return http.delete(`/api/v1/member/${memberId}`)
}

function loadMyDetailAPI(roomId) {
    return http.get(`/api/v1/room/${roomId}/member`)
}

function withdrawalAPI(roomId) {
    return http.delete(`/api/v1/room/${roomId}/member`)
}

function changeManagerAPI(roomId, memberId) {
    return http.put(`/api/v1/room/${roomId}/member/manager?memberId=${memberId}`)
}


function* loadMembers(action){
    try {
        const {data : {data: {content, first, last}}} = yield call(loadMembersAPI, action.roomId, action.pagination, action.keyword);
        yield put({
            type : LOAD_MEMBERS_SUCCESS,
            data : content,
            first,
            last
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MEMBERS_FAILURE,
            error : e
        })
    }
}

function* watchLoadMembers() {
    yield takeEvery(LOAD_MEMBERS_REQUEST, loadMembers)
}

function* loadMemberDetail(action){
    try {
        const {data : {data}} = yield call(loadMemberDetailAPI, action.memberId);
        yield put({
            type : LOAD_MEMBER_DETAIL_SUCCESS,
            data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MEMBER_DETAIL_FAILURE,
            error : e
        })
    }
}

function* watchLoadMemberDetail() {
    yield takeEvery(LOAD_MEMBER_DETAIL_REQUEST, loadMemberDetail)
}

function* deleteMember(action){
    try {
        yield call(deleteMemberAPI, action.memberId);
        // 멤버를 삭제하고
        yield put({
            type : DELETE_MEMBER_SUCCESS,
            memberId : action.memberId
        })
        // 스터디방 정보에서 joinCount를 -1 한다.
        yield put({
            type : DECREMENT_MEMBER_COUNT
        })

        action.meta.callbackAction();
    }catch(e) {
        yield put({
            type : DELETE_MEMBER_FAILURE,
            error : e
        })
    }
}

function* watchDeleteMember() {
    yield takeEvery(DELETE_MEMBER_REQUEST, deleteMember)
}

function* loadMyDetail(action){
    try {
        const {data : {data}} = yield call(loadMyDetailAPI, action.data);
        yield put({
            type : LOAD_MY_DETAIL_SUCCESS,
            data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MY_DETAIL_FAILURE,
            error : e
        })
    }
}

function* watchLoadMyDetail() {
    yield takeEvery(LOAD_MY_DETAIL_REQUEST, loadMyDetail)
}

function* withdrawal(action){
    try {
        yield call(withdrawalAPI, action.data);

        yield put({
            type : WITHDRAWAL_SUCCESS,
        })

        action.meta.callbackAction();
    }catch(e) {
        console.error(e);
        yield put({
            type : WITHDRAWAL_FAILURE,
            error : e
        })
    }
}

function* watchWithdrawal() {
    yield takeEvery(WITHDRAWAL_REQUEST, withdrawal)
}


function* changeManager(action){
    try {
        yield call(changeManagerAPI, action.roomId, action.memberId);
        yield put({
            type : CHANGE_MANAGER_SUCCESS,
        })

        yield put({
            type : DEPOSE_MANAGER
        })

        action.meta.callbackAction();
    }catch(e) {
        console.error(e);
        yield put({
            type : CHANGE_MANAGER_FAILURE,
            error : e
        })
    }
}

function* watchChangeManager() {
    yield takeEvery(CHANGE_MANAGER_REQUEST, changeManager)
}

export default function* memberSaga() {
    yield all([
        fork(watchLoadMembers),
        fork(watchLoadMemberDetail),
        fork(watchDeleteMember),
        fork(watchLoadMyDetail),
        fork(watchWithdrawal),
        fork(watchChangeManager)
    ]);
}


const makeParamForMembers = (pagination, keyword)  => {
    let param = Object.entries(pagination).map(e => e.join('=')).join('&');
    if(keyword) param += `&keyword=${keyword}`;
    return param;
}