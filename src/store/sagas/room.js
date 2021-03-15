import { all, fork, takeEvery, takeLatest, put, call } from "redux-saga/effects";
import {
    CREATE_ROOM_REQUEST,
    CREATE_ROOM_SUCCESS,
    CREATE_ROOM_FAILURE,
    LOAD_MY_ROOMS_REQUEST,
    LOAD_MY_ROOMS_SUCCESS,
    LOAD_MY_ROOMS_FAILURE,
    LOAD_POPULAR_ROOMS_REQUEST,
    LOAD_POPULAR_ROOMS_SUCCESS,
    LOAD_POPULAR_ROOMS_FAILURE,
    LOAD_RECENTLY_CREATED_ROOMS_REQUEST,
    LOAD_RECENTLY_CREATED_ROOMS_SUCCESS,
    LOAD_RECENTLY_CREATED_ROOMS_FAILURE,
    LOAD_ROOMS_BY_CATEGORY_REQUEST,
    LOAD_ROOMS_BY_CATEGORY_SUCCESS,
    LOAD_ROOMS_BY_CATEGORY_FAILURE,
    LOAD_ROOM_DETAIL_REQUEST,
    LOAD_ROOM_DETAIL_SUCCESS,
    LOAD_ROOM_DETAIL_FAILURE,
    JOIN_ROOM_REQUEST,
    JOIN_ROOM_SUCCESS,
    JOIN_ROOM_FAILURE,
    DELETE_ROOM_REQUEST,
    DELETE_ROOM_SUCCESS,
    DELETE_ROOM_FAILURE,
    CHANGE_COVER_REQUEST,
    CHANGE_COVER_SUCCESS,
    CHANGE_COVER_FAILURE,
    CHANGE_CATEGORY_REQUEST,
    CHANGE_CATEGORY_SUCCESS,
    CHANGE_CATEGORY_FAILURE,
    EDIT_ROOM_REQUEST,
    EDIT_ROOM_SUCCESS,
    EDIT_ROOM_FAILURE,
    LOAD_ROOMS_REQUEST,
    LOAD_ROOMS_SUCCESS,
    LOAD_ROOMS_FAILURE
} from "store/modules/room";
import { http, makeParameter } from "utils/HttpHandler";

function uploadCoverImageAPI(file, fileGroupId) {
    return http.post(`/api/v1/files/cover${fileGroupId ? `?fileGroupId=${fileGroupId}` : ""}`, file, {
        "Content-type": "multipart/form-data;charset=utf-8"
    });
}

function createRoomAPI(data) {
    return http.post(`/api/v1/room`, data);
}

function loadRoomsAPI(pagination, orderType, categoryIds, keyword) {
    console.log(categoryIds);
    return http.get(`/api/v1/rooms?${makeParameter({ ...pagination, orderType, categoryIds, keyword })}`);
}

function loadUserRoomsAPI(pagination, orderType, categoryIds, keyword) {
    return http.get(`/api/v1/user/rooms?${makeParameter({ ...pagination, orderType, categoryIds, keyword })}`);
}

function loadRoomDetailAPI(roomId) {
    return http.get(`/api/v1/room/${roomId}`);
}

function joinRoomAPI(roomId) {
    return http.post(`/api/v1/room/${roomId}/join`);
}

function deleteRoomAPI(roomId) {
    return http.delete(`/api/v1/room/${roomId}`);
}

function changeCoverImageAPI(roomId, fileGroupId) {
    return http.put(`/api/v1/room/${roomId}/cover?coverId=${fileGroupId}`);
}

function changeCategoryAPI(roomId, categoryId) {
    return http.put(`/api/v1/room/${roomId}/category?categoryId=${categoryId}`);
}

function editRoomAPI(roomId, formData) {
    return http.put(`/api/v1/room/${roomId}`, formData);
}

// 스터디방 생성 ///////////////////////////////////
function* createRoom(action) {
    try {
        const { file, room } = action.data;
        // 썸네일이 존재하면, 썸네일 이미지를 먼저 업로드 한 후 pk 값을 받아온다.
        if (file) {
            const result = yield call(uploadCoverImageAPI, file);
            room.fileGroupId = result.data.data.fileGroupId;
        }

        const result = yield call(createRoomAPI, room);
        yield put({
            type: CREATE_ROOM_SUCCESS,
            data: result.data.data
        });

        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: CREATE_ROOM_FAILURE,
            error: e
        });
    }
}

function* watchCreateRoom() {
    yield takeLatest(CREATE_ROOM_REQUEST, createRoom);
}

// 내가 가입한 스터디방 리스트 ///////////////////////////////////
function* loadMyRooms(action) {
    try {
        const {
            data: {
                data: { content, first, last, number }
            }
        } = yield call(loadUserRoomsAPI, action.pagination, action.orderType, action.categoryIds, action.keyword);
        yield put({
            type: LOAD_MY_ROOMS_SUCCESS,
            data: content,
            first,
            last
        });

        if (action.meta) action.meta.callbackAction(number + 1);
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_MY_ROOMS_FAILURE,
            error: e
        });
    }
}

function* watchLoadMyRooms() {
    yield takeEvery(LOAD_MY_ROOMS_REQUEST, loadMyRooms);
}

// 가입 인원이 많은 스터디방 리스트 ///////////////////////////////////
function* loadPopularRooms(action) {
    try {
        const result = yield call(loadRoomsAPI, action.pagination, action.orderType, null);
        yield put({
            type: LOAD_POPULAR_ROOMS_SUCCESS,
            data: result.data.data.content
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_POPULAR_ROOMS_FAILURE,
            error: e
        });
    }
}

function* watchLoadPopularRooms() {
    yield takeEvery(LOAD_POPULAR_ROOMS_REQUEST, loadPopularRooms);
}

// 최근 생성된 스터디방 리스트 ///////////////////////////////////
function* loadRecentlyCreatedRooms(action) {
    try {
        const result = yield call(loadRoomsAPI, action.pagination, action.orderType, null);
        yield put({
            type: LOAD_RECENTLY_CREATED_ROOMS_SUCCESS,
            data: result.data.data.content
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_RECENTLY_CREATED_ROOMS_FAILURE,
            error: e
        });
    }
}

function* watchLoadRecentlyCreatedRooms() {
    yield takeEvery(LOAD_RECENTLY_CREATED_ROOMS_REQUEST, loadRecentlyCreatedRooms);
}

// 카테고리 별 스터디방 리스트 ///////////////////////////////////
function* loadRoomsByCategory(action) {
    try {
        const {
            data: {
                data: { content, first, last, number }
            }
        } = yield call(loadRoomsAPI, action.pagination, action.orderType, action.categoryIds, action.keyword);
        yield put({
            type: LOAD_ROOMS_BY_CATEGORY_SUCCESS,
            data: content,
            first,
            last
        });

        if (action.meta) action.meta.callbackAction(number + 1);
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_ROOMS_BY_CATEGORY_FAILURE,
            error: e
        });
    }
}

function* watchLoadRoomsByCategory() {
    yield takeEvery(LOAD_ROOMS_BY_CATEGORY_REQUEST, loadRoomsByCategory);
}

// 모든 스터디방 리스트
function* loadRooms(action) {
    try {
        const {
            data: {
                data: { content, first, last, number }
            }
        } = yield call(loadRoomsAPI, action.pagination, action.orderType, action.categoryIds, action.keyword);
        yield put({
            type: LOAD_ROOMS_SUCCESS,
            data: content,
            first,
            last
        });

        if (action.meta) action.meta.callbackAction(number + 1);
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_ROOMS_FAILURE,
            error: e
        });
    }
}

function* watchLoadRooms() {
    yield takeEvery(LOAD_ROOMS_REQUEST, loadRooms);
}

// 스터디방 뷰
function* loadRoomDetail(action) {
    try {
        const result = yield call(loadRoomDetailAPI, action.data);
        console.log(result);
        yield put({
            type: LOAD_ROOM_DETAIL_SUCCESS,
            data: result.data.data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_ROOM_DETAIL_FAILURE,
            error: e
        });
    }
}

function* watchLoadRoomDetail() {
    yield takeEvery(LOAD_ROOM_DETAIL_REQUEST, loadRoomDetail);
}

// 스터디방 가입
function* joinRoom(action) {
    try {
        yield call(joinRoomAPI, action.data);
        yield put({
            type: JOIN_ROOM_SUCCESS
        });
        // action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: JOIN_ROOM_FAILURE,
            error: e
        });
    }
}

function* watchJoinRoom() {
    yield takeLatest(JOIN_ROOM_REQUEST, joinRoom);
}

// 스터디방 삭제
function* deleteRoom(action) {
    try {
        yield call(deleteRoomAPI, action.data);
        yield put({
            type: DELETE_ROOM_SUCCESS
        });
        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: DELETE_ROOM_FAILURE,
            error: e
        });
    }
}

function* watchDeleteRoom() {
    yield takeLatest(DELETE_ROOM_REQUEST, deleteRoom);
}

// 커버 이미지 변경
function* changeCover(action) {
    try {
        const {
            data: {
                data: { fileGroupId, files }
            }
        } = yield call(uploadCoverImageAPI, action.file, action.fileGroupId);

        if (!action.fileGroupId) {
            yield call(changeCoverImageAPI, action.roomId, fileGroupId);
        }

        yield put({
            type: CHANGE_COVER_SUCCESS,
            cover: files[0] && files[0].saveName,
            coverGroupId: fileGroupId
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: CHANGE_COVER_FAILURE,
            error: e
        });
    }
}

function* watchChangeCover() {
    yield takeLatest(CHANGE_COVER_REQUEST, changeCover);
}

// 카테고리 변경
function* changeCategory(action) {
    try {
        const {
            data: {
                data: { categoryId, name }
            }
        } = yield call(changeCategoryAPI, action.roomId, action.categoryId);

        yield put({
            type: CHANGE_CATEGORY_SUCCESS,
            category: name,
            categoryId
        });

        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: CHANGE_CATEGORY_FAILURE,
            error: e
        });
    }
}

function* watchChangeCategory() {
    yield takeLatest(CHANGE_CATEGORY_REQUEST, changeCategory);
}

// 스터디방 정보 변경
function* editRoom(action) {
    try {
        yield call(editRoomAPI, action.roomId, action.data);

        yield put({
            type: EDIT_ROOM_SUCCESS,
            ...action.data
        });
        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: EDIT_ROOM_FAILURE,
            error: e
        });
    }
}

function* watchEditRoom() {
    yield takeLatest(EDIT_ROOM_REQUEST, editRoom);
}

export default function* roomSaga() {
    yield all([
        fork(watchCreateRoom),
        fork(watchLoadMyRooms),
        fork(watchLoadPopularRooms),
        fork(watchLoadRecentlyCreatedRooms),
        fork(watchLoadRoomsByCategory),
        fork(watchLoadRoomDetail),
        fork(watchJoinRoom),
        fork(watchDeleteRoom),
        fork(watchChangeCover),
        fork(watchChangeCategory),
        fork(watchEditRoom),
        fork(watchLoadRooms)
    ]);
}
