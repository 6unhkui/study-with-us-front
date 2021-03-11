import { all, fork, takeEvery, put, call, takeLatest } from "redux-saga/effects";
import {
    LOAD_NEWS_FEED_REQUEST,
    LOAD_NEWS_FEED_SUCCESS,
    LOAD_NEWS_FEED_FAILURE,
    LOAD_POSTS_REQUEST,
    LOAD_POSTS_SUCCESS,
    LOAD_POSTS_FAILURE,
    LOAD_POST_DETAIL_REQUEST,
    LOAD_POST_DETAIL_SUCCESS,
    LOAD_POST_DETAIL_FAILURE,
    LOAD_COMMENTS_REQUEST,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    CREATE_POST_FAILURE,
    CREATE_COMMENT_REQUEST,
    CREATE_COMMENT_SUCCESS,
    CREATE_COMMENT_FAILURE,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILURE,
    UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS,
    UPDATE_POST_FAILURE,
    DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,
    UPDATE_COMMENT_REQUEST,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE
} from "store/modules/post";
import { http } from "utils/HttpHandler";

function loadNewsFeedAPI(pagination, keyword) {
    return http.get(`/api/v1/posts/new?${makeParamForPosts(pagination, keyword)}`);
}

function loadPostsAPI(roomId, pagination, keyword) {
    return http.get(`/api/v1/room/${roomId}/posts?${makeParamForPosts(pagination, keyword)}`);
}

function loadPostDetailAPI(postId) {
    return http.get(`/api/v1/post/${postId}`);
}

function addPostAPI(roomId, data) {
    return http.post(`/api/v1/room/${roomId}/post`, data);
}

function uploadAttachmentAPI(fileGroupId, fileList) {
    let param = "";
    if (fileGroupId) {
        param = `?fileGroupId=${fileGroupId}`;
    }
    return http.post(`/api/v1/files/attachment${param}`, fileList, { "Content-type": "multipart/form-data;charset=utf-8" });
}

// function uploadMoreAttachmentAPI(fileGroupId, fileList) {
//     return http.post(`/api/v1/files/attachment/${fileGroupId}`, fileList, {'Content-type': 'multipart/form-data;charset=utf-8'});
// }

function updatePostAPI(postId, data) {
    return http.put(`/api/v1/post/${postId}`, data);
}

function deletePostAPI(postId) {
    return http.delete(`/api/v1/post/${postId}`);
}

function loadCommentsAPI(postId) {
    return http.get(`/api/v1/post/${postId}/comments`);
}

function addCommentAPI(postId, data) {
    return http.post(`/api/v1/post/${postId}/comment`, data);
}

function updateCommentAPI(commentId, data) {
    return http.put(`/api/v1/comment/${commentId}`, data);
}

function deleteCommentAPI(commentId) {
    return http.delete(`/api/v1/comment/${commentId}`);
}

// 새 글 피드 리스트 /////////////////////////////
function* loadNewsFeed(action) {
    try {
        const {
            data: {
                data: { content, first, last, number }
            }
        } = yield call(loadNewsFeedAPI, action.pagination, action.keyword);
        yield put({
            type: LOAD_NEWS_FEED_SUCCESS,
            data: content,
            first,
            last
        });

        action.meta && action.meta.callbackAction(number + 1);
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_NEWS_FEED_FAILURE,
            error: e
        });
    }
}

function* watchLoadNewsFeed() {
    yield takeEvery(LOAD_NEWS_FEED_REQUEST, loadNewsFeed);
}

// 포스트 리스트 /////////////////////////////
function* loadPosts(action) {
    try {
        const {
            data: {
                data: { content, first, last, number }
            }
        } = yield call(loadPostsAPI, action.roomId, action.pagination, action.keyword);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: content,
            first: first,
            last: last
        });

        action.meta && action.meta.callbackAction(number + 1);
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: e
        });
    }
}

function* watchLoadPosts() {
    yield takeEvery(LOAD_POSTS_REQUEST, loadPosts);
}

// 포스트 상세 //////////////////////////////
function* loadPostDetail(action) {
    try {
        const {
            data: { data }
        } = yield call(loadPostDetailAPI, action.data);
        yield put({
            type: LOAD_POST_DETAIL_SUCCESS,
            data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_POST_DETAIL_FAILURE,
            error: e
        });
    }
}

function* watchLoadPostDetail() {
    yield takeEvery(LOAD_POST_DETAIL_REQUEST, loadPostDetail);
}

// 포스트 작성 ///////////////////////////////////
function* addPost(action) {
    try {
        const { files, post, roomId } = action.data;

        // 첨부 파일이 존재하면, 썸네일 이미지를 먼저 업로드 한 후 pk 값을 받아온다.
        if (files) {
            const result = yield call(uploadAttachmentAPI, null, files);
            post.fileGroupId = result.data.data.fileGroupId;
        }

        const {
            data: { data }
        } = yield call(addPostAPI, roomId, post);
        yield put({
            type: CREATE_POST_SUCCESS,
            data
        });

        action.meta.callbackAction(data);
    } catch (e) {
        console.error(e);
        yield put({
            type: CREATE_POST_FAILURE,
            error: e
        });
    }
}

function* watchAddPost() {
    yield takeLatest(CREATE_POST_REQUEST, addPost);
}

// 포스트 작성 ///////////////////////////////////
function* updatePost(action) {
    try {
        const { post, postId, fileGroupId, delFiles, files } = action.data;

        if (delFiles) {
            post.delFiles = delFiles;
            post.fileGroupId = fileGroupId;
        }

        if (files) {
            const result = yield call(uploadAttachmentAPI, fileGroupId, files);
            post.fileGroupId = result.data.data.fileGroupId;
        }

        const {
            data: { data }
        } = yield call(updatePostAPI, postId, post);
        yield put({
            type: UPDATE_POST_SUCCESS,
            data
        });

        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: UPDATE_POST_FAILURE,
            error: e
        });
    }
}

function* watchUpdatePost() {
    yield takeLatest(UPDATE_POST_REQUEST, updatePost);
}

// 포스트 삭제 //////////////////////////////
function* deletePost(action) {
    try {
        yield call(deletePostAPI, action.data);
        yield put({
            type: DELETE_POST_SUCCESS
        });

        action.meta.callbackAction();
    } catch (e) {
        console.error(e);
        yield put({
            type: DELETE_POST_FAILURE,
            error: e
        });
    }
}

function* watchDeletePost() {
    yield takeEvery(DELETE_POST_REQUEST, deletePost);
}

// 댓글 리스트 /////////////////////////////
function* loadComments(action) {
    try {
        const {
            data: { data }
        } = yield call(loadCommentsAPI, action.postId);

        yield put({
            type: LOAD_COMMENTS_SUCCESS,
            data
            // first : result.data.data.first,
            // last : result.data.data.last,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_COMMENTS_FAILURE,
            error: e
        });
    }
}

function* watchLoadComments() {
    yield takeEvery(LOAD_COMMENTS_REQUEST, loadComments);
}

// 댓글 추가 ///////////////////////////////////
function* addComment(action) {
    try {
        const {
            data: { data }
        } = yield call(addCommentAPI, action.postId, action.data);
        yield put({
            type: CREATE_COMMENT_SUCCESS,
            data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: CREATE_COMMENT_FAILURE,
            error: e
        });
    }
}

function* watchAddComment() {
    yield takeLatest(CREATE_COMMENT_REQUEST, addComment);
}

// 댓글 수정 ///////////////////////////////////
function* updateComment(action) {
    try {
        yield call(updateCommentAPI, action.commentId, action.data);
        yield put({
            type: UPDATE_COMMENT_SUCCESS,
            data: {
                commentId: action.commentId,
                content: action.data.content
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: UPDATE_COMMENT_FAILURE,
            error: e
        });
    }
}

function* watchUpdateComment() {
    yield takeLatest(UPDATE_COMMENT_REQUEST, updateComment);
}

// 댓글 삭제 //////////////////////////////
function* deleteComment(action) {
    try {
        yield call(deleteCommentAPI, action.data);
        yield put({
            type: DELETE_COMMENT_SUCCESS,
            data: {
                commentId: action.data
            }
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: DELETE_COMMENT_FAILURE,
            error: e
        });
    }
}

function* watchDeleteComment() {
    yield takeEvery(DELETE_COMMENT_REQUEST, deleteComment);
}

export default function* postSaga() {
    yield all([
        fork(watchLoadNewsFeed),
        fork(watchLoadPosts),
        fork(watchLoadPostDetail),
        fork(watchAddPost),
        fork(watchUpdatePost),
        fork(watchDeletePost),
        fork(watchLoadComments),
        fork(watchAddComment),
        fork(watchUpdateComment),
        fork(watchDeleteComment)
    ]);
}

const makeParamForPosts = (pagination, keyword) => {
    let param = Object.entries(pagination)
        .map(e => e.join("="))
        .join("&");
    if (keyword) param += `&keyword=${keyword}`;
    return param;
};
