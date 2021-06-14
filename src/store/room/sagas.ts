import { FileGroupDTO } from "@/api/dto/file.dto";
import { FileAPI } from "@/api/file.api";
import { RoomAPI } from "@/api/room.api";
import { customHistory } from "@/app/App";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { all, call, fork, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import {
    getPopularRoomListAsync,
    GET_POPULAR_ROOM_LIST,
    getLatestRoomListAsync,
    GET_MY_ROOM_LIST,
    getMyRoomListAsync,
    GET_ROOM,
    getRoomAsync,
    GET_LATEST_ROOM_LIST,
    joinRoomAsync,
    JOIN_ROOM,
    GET_ROOM_LIST,
    getRoomListAsync,
    createRoomAsync,
    CREATE_ROOM,
    changeCategoryAsync,
    CHANGE_CATEGORY,
    updateRoomAsync,
    UPDATE_ROOM,
    CHANGE_COVER_IMAGE,
    changeCoverImageAsync,
    deleteRoomAsync,
    DELETE_ROOM,
    LEAVE_ROOM,
    leaveRoomAsync,
    decreaseMemberCount
} from "./actions";

const getLatestRoomListSaga = createAsyncSaga(getLatestRoomListAsync, RoomAPI.getAllByPage);
function* watchGetLatestRoomListSaga() {
    yield takeLatest(GET_LATEST_ROOM_LIST.REQUEST, getLatestRoomListSaga);
}

const getPopularRooomListSaga = createAsyncSaga(getPopularRoomListAsync, RoomAPI.getAllByPage);
function* watchGetPopularRooomListSaga() {
    yield takeLatest(GET_POPULAR_ROOM_LIST.REQUEST, getPopularRooomListSaga);
}

const getRooomListSaga = createAsyncSaga(getRoomListAsync, RoomAPI.getAllByPage);
function* watchGetRooomListSaga() {
    yield takeLatest(GET_ROOM_LIST.REQUEST, getRooomListSaga);
}

const getMyRooomListSaga = createAsyncSaga(getMyRoomListAsync, RoomAPI.getMyRoomsByPage);
function* watchGetMyRooomListSaga() {
    yield takeLatest(GET_MY_ROOM_LIST.REQUEST, getMyRooomListSaga);
}

const getRoomSaga = createAsyncSaga(getRoomAsync, RoomAPI.getOne);
function* watchGetRoomSaga() {
    yield takeEvery(GET_ROOM.REQUEST, getRoomSaga);
}

const joinRoomSaga = createAsyncSaga(joinRoomAsync, RoomAPI.joinRoom);
function* watchJoinRoomSaga() {
    yield takeLatest(JOIN_ROOM.REQUEST, joinRoomSaga);
}

function* createRoomSaga(action: ReturnType<typeof createRoomAsync.request>) {
    try {
        if (action.payload.coverImage) {
            const { fileGroupId }: FileGroupDTO = yield call(FileAPI.uploadCoverImage, { file: action.payload.coverImage });
            action.payload.fileGroupId = fileGroupId;
        }

        const createdRoomId: number = yield call(RoomAPI.create, action.payload);
        yield put(createRoomAsync.success(!!createdRoomId));

        yield customHistory.push(`/room/${createdRoomId}`);
    } catch (e) {
        yield put(createRoomAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchCreateRoomSaga() {
    yield takeLatest(CREATE_ROOM.REQUEST, createRoomSaga);
}

const changeCategorySaga = createAsyncSaga(changeCategoryAsync, RoomAPI.changeCategoryId);
function* watchChangeCategorySaga() {
    yield takeLatest(CHANGE_CATEGORY.REQUEST, changeCategorySaga);
}

function* updateRoomSaga(action: ReturnType<typeof updateRoomAsync.request>) {
    try {
        const res: boolean = yield call(RoomAPI.updateOne, action.payload);
        if (res) {
            yield put(updateRoomAsync.success(action.payload));
        }
    } catch (e) {
        yield put(updateRoomAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchUpdateRoomSage() {
    yield takeLatest(UPDATE_ROOM.REQUEST, updateRoomSaga);
}

function* changeCoverImageSaga(action: ReturnType<typeof changeCoverImageAsync.request>) {
    try {
        const res: FileGroupDTO = yield call(FileAPI.uploadCoverImage, action.payload);

        if (!action.payload.fileGroupId) {
            yield call(RoomAPI.changeCoverId, { roomId: action.payload.roomId, coverId: res.fileGroupId });
        }

        yield put(changeCoverImageAsync.success(res));
    } catch (e) {
        yield put(changeCoverImageAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchChangeCoverImageSage() {
    yield takeLatest(CHANGE_COVER_IMAGE.REQUEST, changeCoverImageSaga);
}

function* deleteRoomSaga(action: ReturnType<typeof deleteRoomAsync.request>) {
    try {
        const res: boolean = yield call(RoomAPI.deleteOne, action.payload);

        if (res) {
            yield put(deleteRoomAsync.success(action.payload));
            customHistory.push("/myrooms");
        }
    } catch (e) {
        yield put(deleteRoomAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchDeleteRoomSage() {
    yield takeLatest(DELETE_ROOM.REQUEST, deleteRoomSaga);
}

function* leaveRoomSaga(action: ReturnType<typeof leaveRoomAsync.request>) {
    try {
        const res: boolean = yield call(RoomAPI.leaveRoom, action.payload);

        if (res) {
            yield put(leaveRoomAsync.success(action.payload));
            customHistory.push("/myrooms");
        }
    } catch (e) {
        yield put(leaveRoomAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchLeaveRoomSage() {
    yield takeLatest(LEAVE_ROOM.REQUEST, leaveRoomSaga);
}

export function* roomSagas() {
    yield all([
        fork(watchGetPopularRooomListSaga),
        fork(watchGetLatestRoomListSaga),
        fork(watchGetRooomListSaga),
        fork(watchGetMyRooomListSaga),
        fork(watchGetRoomSaga),
        fork(watchJoinRoomSaga),
        fork(watchCreateRoomSaga),
        fork(watchChangeCategorySaga),
        fork(watchUpdateRoomSage),
        fork(watchChangeCoverImageSage),
        fork(watchDeleteRoomSage),
        fork(watchLeaveRoomSage)
    ]);
}
