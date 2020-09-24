import {all, fork, takeEvery, put, call} from 'redux-saga/effects';
import {LOAD_MEMBERS_REQUEST, LOAD_MEMBERS_SUCCESS, LOAD_MEMBERS_FAILURE} from '../modules/member';
import {http} from 'utils/HttpHandler';


function loadMembersAPI(roomId, pagination, keyword) {
    return http.get(`/api/v1/room/${roomId}/members?${makeParamForMembers(pagination, keyword)}`)
}

function* loadMembers(action){
    try {
        let result = yield call(loadMembersAPI, action.roomId, action.pagination, action.keyword);
        yield put({
            type : LOAD_MEMBERS_SUCCESS,
            data : result.data.data.content,
            first : result.data.data.first,
            last : result.data.data.last,
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


export default function* memberSaga() {
    yield all([
        fork(watchLoadMembers)
    ]);
}



const makeParamForMembers = (pagination, keyword)  => {
    let param = Object.entries(pagination).map(e => e.join('=')).join('&');
    if(keyword) param += `&keyword=${keyword}`;
    return param;
}