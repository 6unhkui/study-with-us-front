import { takeEvery } from "redux-saga/effects";
import { PostAPI } from "@/api/post.api";
import { PostCommentAPI } from "@/api/postComment.api";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { all, call, fork, put, takeLatest } from "@redux-saga/core/effects";
import { FileAPI } from "@/api/file.api";
import { FileGroupDTO, UploadFileListByGroupIdDTO } from "@/api/dto/file.dto";
import { customHistory } from "@/app/App";
import {
    CREATE_POST_COMMENT,
    getNewsFeedAsync,
    getPostAsync,
    getPostCommentListAsync,
    getPostListAsync,
    GET_NEWS_FEED,
    GET_POST,
    GET_POST_COMMENT_LIST,
    GET_POST_LIST,
    createPostCommentAsync,
    DELETE_POST,
    deletePostAsync,
    DELETE_POST_COMMENT,
    deletePostCommentAsync,
    updatePostCommentAsync,
    UPDATE_POST_COMMENT,
    CREATE_POST,
    createPostAsync,
    UPDATE_POST,
    updatePostAsync
} from "./actions";

const getNewsFeedSaga = createAsyncSaga(getNewsFeedAsync, PostAPI.getNewsFeedByPage);
function* watchGetNewsFeedSaga() {
    yield takeLatest(GET_NEWS_FEED.REQUEST, getNewsFeedSaga);
}

const getPostListSaga = createAsyncSaga(getPostListAsync, PostAPI.getAllByPage);
function* watchGetPostListSaga() {
    yield takeLatest(GET_POST_LIST.REQUEST, getPostListSaga);
}

const getPostSaga = createAsyncSaga(getPostAsync, PostAPI.getOne);
function* watchGetPostSaga() {
    yield takeEvery(GET_POST.REQUEST, getPostSaga);
}

function* createPostSaga(action: ReturnType<typeof createPostAsync.request>) {
    try {
        if (action.payload.files) {
            const { fileGroupId }: FileGroupDTO = yield call(FileAPI.uploadAttachment, { files: action.payload.files });
            action.payload.fileGroupId = fileGroupId;
        }

        const createdPostId: number = yield call(PostAPI.create, action.payload);
        yield put(createPostAsync.success(createdPostId));

        yield customHistory.push(`/post/${createdPostId}`);
    } catch (e) {
        yield put(createPostAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchCreatePostSaga() {
    yield takeLatest(CREATE_POST.REQUEST, createPostSaga);
}

function* updatePostSaga(action: ReturnType<typeof updatePostAsync.request>) {
    try {
        if (action.payload.files) {
            const { fileGroupId }: FileGroupDTO = yield call(FileAPI.uploadAttachment, {
                files: action.payload.files,
                fileGroupId: action.payload.fileGroupId
            });
            action.payload.fileGroupId = fileGroupId;
        }

        yield call(PostAPI.updateOne, action.payload);
        yield put(updatePostAsync.success(action.payload));

        yield customHistory.push(`/post/${action.payload.postId}`);
    } catch (e) {
        yield put(updatePostAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* wawatchUpdatePostSaga() {
    yield takeLatest(UPDATE_POST.REQUEST, updatePostSaga);
}

function* deletePostSaga(action: ReturnType<typeof deletePostAsync.request>) {
    try {
        const res: boolean = yield call(PostAPI.deleteOne, action.payload);
        if (res) {
            yield put(deletePostAsync.success(action.payload));
            yield customHistory.goBack();
        }
    } catch (e) {
        yield put(deletePostAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchDeletePostSaga() {
    yield takeLatest(DELETE_POST.REQUEST, deletePostSaga);
}

const getCommentListSaga = createAsyncSaga(getPostCommentListAsync, PostCommentAPI.getAll);
function* watchGetCommentListSaga() {
    yield takeLatest(GET_POST_COMMENT_LIST.REQUEST, getCommentListSaga);
}

const createCommentSaga = createAsyncSaga(createPostCommentAsync, PostCommentAPI.create);
function* watchCreateCommentSaga() {
    yield takeLatest(CREATE_POST_COMMENT.REQUEST, createCommentSaga);
}

function* deletePostCommentSaga(action: ReturnType<typeof deletePostCommentAsync.request>) {
    try {
        const res: boolean = yield call(PostCommentAPI.delete, action.payload);
        if (res) {
            yield put(deletePostCommentAsync.success(action.payload));
        }
    } catch (e) {
        yield put(deletePostCommentAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchDeletePostCommentSaga() {
    yield takeLatest(DELETE_POST_COMMENT.REQUEST, deletePostCommentSaga);
}

function* updatePostCommentSaga(action: ReturnType<typeof updatePostCommentAsync.request>) {
    try {
        const res: boolean = yield call(PostCommentAPI.update, action.payload);
        if (res) {
            yield put(updatePostCommentAsync.success(action.payload));
        }
    } catch (e) {
        yield put(updatePostCommentAsync.failure(e.response ? e.response.data.message : e));
    }
}
function* watchUpdatePostCommentSaga() {
    yield takeLatest(UPDATE_POST_COMMENT.REQUEST, updatePostCommentSaga);
}

export function* postSagas() {
    yield all([
        fork(watchGetNewsFeedSaga),
        fork(watchGetPostListSaga),
        fork(watchGetPostSaga),
        fork(watchCreatePostSaga),
        fork(wawatchUpdatePostSaga),
        fork(watchDeletePostSaga),
        fork(watchGetCommentListSaga),
        fork(watchCreateCommentSaga),
        fork(watchUpdatePostCommentSaga),
        fork(watchDeletePostCommentSaga)
    ]);
}
