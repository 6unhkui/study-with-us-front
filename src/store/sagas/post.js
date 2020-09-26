import {all, fork, takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    LOAD_POST_DETAIL_REQUEST, LOAD_POST_DETAIL_SUCCESS, LOAD_POST_DETAIL_FAILURE,
    LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
    WRITE_POST_REQUEST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE,
    WRITE_COMMENT_REQUEST, WRITE_COMMENT_SUCCESS, WRITE_COMMENT_FAILURE
} from '../modules/post';
import {http} from 'utils/HttpHandler';


function writePostAPI(roomId, data) {
    return http.post(`/api/v1/room/${roomId}/post`, data);
}

function uploadAttachmentAPI(fileList) {
    console.log(fileList);
    return http.post(`/api/v1/files/attachment`, fileList, {'Content-type': 'multipart/form-data;charset=utf-8'});
}

function loadPostsAPI(roomId, pagination, keyword) {
    return http.get(`/api/v1/room/${roomId}/posts?${makeParamForPosts(pagination, keyword)}`)
}

function loadPostDetailAPI(postId) {
    return http.get(`/api/v1/post/${postId}`);
}

function writeCommentAPI(postId, data) {
    return http.post(`/api/v1/post/${postId}/comment`, data);
}

function loadCommentsAPI(postId) {
    return http.get(`/api/v1/post/${postId}/comments`)
}


// 포스트 작성 ///////////////////////////////////
function* writePost(action){
    try {
        const {files, post, roomId} = action.data;

        // 첨부 파일이 존재하면, 썸네일 이미지를 먼저 업로드 한 후 pk 값을 받아온다.
        if(files) {
            const result = yield call(uploadAttachmentAPI, files);
            post.fileGroupId = result.data.data.fileGroupId;
        }

        let result = yield call(writePostAPI, roomId, post);
        yield put({
            type : WRITE_POST_SUCCESS,
            data : result.data.data
        })

        action.meta.callbackAction();
    }catch(e) {
        console.error(e);
        yield put({
            type : WRITE_POST_FAILURE,
            error : e
        })
    }
}

function* watchWritePost() {
    yield takeLatest(WRITE_POST_REQUEST, writePost)
}

// 포스트 리스트 /////////////////////////////
function* loadPosts(action){
    try {
        let result = yield call(loadPostsAPI, action.roomId, action.pagination, action.keyword);
        yield put({
            type : LOAD_POSTS_SUCCESS,
            data : result.data.data.content,
            first : result.data.data.first,
            last : result.data.data.last,
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_POSTS_FAILURE,
            error : e
        })
    }
}

function* watchLoadPosts() {
    yield takeEvery(LOAD_POSTS_REQUEST, loadPosts)
}


// 게시글 상세 //////////////////////////////
function* loadPostDetail(action){
    try {
        let result = yield call(loadPostDetailAPI, action.data);
        yield put({
            type : LOAD_POST_DETAIL_SUCCESS,
            data : result.data.data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_POST_DETAIL_FAILURE,
            error : e
        })
    }
}

function* watchLoadPostDetail() {
    yield takeEvery(LOAD_POST_DETAIL_REQUEST, loadPostDetail)
}


// 댓글 작성 ///////////////////////////////////
function* writeComment(action){
    try {
        let result = yield call(writeCommentAPI, action.postId, action.data);
        yield put({
            type : WRITE_COMMENT_SUCCESS,
            data : result.data.data
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : WRITE_COMMENT_FAILURE,
            error : e
        })
    }
}

function* watchWriteComment() {
    yield takeLatest(WRITE_COMMENT_REQUEST, writeComment)
}

// 댓글 리스트 /////////////////////////////
function* loadComments(action){
    try {
        let result = yield call(loadCommentsAPI, action.postId);

        yield put({
            type : LOAD_COMMENTS_SUCCESS,
            data : result.data.data,
            // first : result.data.data.first,
            // last : result.data.data.last,
        })
    }catch(e) {
        console.error(e);
        yield put({
            type : LOAD_COMMENTS_FAILURE,
            error : e
        })
    }
}

function* watchLoadComments() {
    yield takeEvery(LOAD_COMMENTS_REQUEST, loadComments)
}



export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchWritePost),
        fork(watchLoadPostDetail),
        fork(watchWriteComment),
        fork(watchLoadComments)
    ]);
}



const makeParamForPosts = (pagination, keyword)  => {
    let param = Object.entries(pagination).map(e => e.join('=')).join('&');
    if(keyword) param += `&keyword=${keyword}`;
    return param;
}