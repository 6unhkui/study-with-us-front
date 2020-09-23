import {all, fork, takeEvery, takeLatest, put, call} from 'redux-saga/effects';
import {
    CREATE_ROOM_REQUEST, CREATE_ROOM_SUCCESS, CREATE_ROOM_FAILURE,
    LOAD_MY_ROOMS_REQUEST, LOAD_MY_ROOMS_SUCCESS, LOAD_MY_ROOMS_FAILURE,
    LOAD_POPULAR_ROOMS_REQUEST, LOAD_POPULAR_ROOMS_SUCCESS, LOAD_POPULAR_ROOMS_FAILURE,
    LOAD_RECENTLY_CREATED_ROOMS_REQUEST,LOAD_RECENTLY_CREATED_ROOMS_SUCCESS, LOAD_RECENTLY_CREATED_ROOMS_FAILURE
} from '../modules/room';
import {http} from 'utils/HttpHandler';


function uploadCoverImageAPI(file) {
    return http.post(`/api/v1/files/cover`, file, {'Content-type': 'multipart/form-data;charset=utf-8'});
}

function createRoomAPI(roomData) {
    return http.post(`/api/v1/room`, roomData);
}

function loadRoomsAPI(pagination, orderType, categoriesId, keyword) {
    return http.get(`/api/v1/rooms?${makeParamForRooms(pagination, orderType, categoriesId, keyword)}`);
}

function loadUserRoomsAPI(pagination, orderType, categoriesId, keyword) {
    return http.get(`/api/v1/user/rooms?${makeParamForRooms(pagination, orderType, categoriesId, keyword)}`);
}

const makeParamForRooms = (pagination, orderType, categoriesId, keyword)  => {
    let param = Object.entries(pagination).map(e => e.join('=')).join('&');
    if(orderType) param += `&orderType=${orderType}`;
    if(categoriesId && categoriesId.length > 0) param += `&categoriesId=${categoriesId.join(",")}`;
    if(keyword) param += `&keyword=${keyword}`;
    return param;
}


function* createRoom(action){
    try {
        const {file, room} = action.data;
        // 썸네일이 존재하면, 썸네일 이미지를 먼저 업로드 한 후 pk 값을 받아온다.
        if(file) {
            const result = yield call(uploadCoverImageAPI, file);
            room.fileGroupId = result.data.data.fileGroupId;
        }

        let result = yield call(createRoomAPI, room);
        yield put({
            type : CREATE_ROOM_SUCCESS,
            data : result.data.data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : CREATE_ROOM_FAILURE,
            error : e
        })
    }
}

function* watchCreateRoom() {
    yield takeLatest(CREATE_ROOM_REQUEST, createRoom)
}


function* loadMyRooms(action){
    try {
        let result = yield call(loadUserRoomsAPI, action.pagination,  action.orderType, action.categoriesId, action.keyword);
        yield put({
            type : LOAD_MY_ROOMS_SUCCESS,
            data : result.data.data.content,
            first : result.data.data.first,
            last : result.data.data.last,
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_MY_ROOMS_FAILURE,
            error : e
        })
    }
}

function* watchLoadMyRooms() {
    yield takeEvery(LOAD_MY_ROOMS_REQUEST, loadMyRooms)
}



function* loadPopularRooms(action){
    try {
        let result = yield call(loadRoomsAPI, action.pagination, action.orderType, null);
        yield put({
            type : LOAD_POPULAR_ROOMS_SUCCESS,
            data : result.data.data.content
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_POPULAR_ROOMS_FAILURE,
            error : e
        })
    }
}

function* watchLoadPopularRooms() {
    yield takeEvery(LOAD_POPULAR_ROOMS_REQUEST, loadPopularRooms)
}


function* loadRecentlyCreatedRooms(action){
    try {
        let result = yield call(loadRoomsAPI, action.pagination, action.orderType, null);
        yield put({
            type : LOAD_RECENTLY_CREATED_ROOMS_SUCCESS,
            data : result.data.data.content
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_RECENTLY_CREATED_ROOMS_FAILURE,
            error : e
        })
    }
}

function* watchLoadRecentlyCreatedRooms() {
    yield takeEvery(LOAD_RECENTLY_CREATED_ROOMS_REQUEST, loadRecentlyCreatedRooms)
}


export default function* roomSaga() {
    yield all([
        fork(watchCreateRoom),
        fork(watchLoadMyRooms),
        fork(watchLoadPopularRooms),
        fork(watchLoadRecentlyCreatedRooms)
    ]);
}