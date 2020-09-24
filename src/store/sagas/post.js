import {all, fork, takeEvery, put, call, takeLatest} from 'redux-saga/effects';
import {
    LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE,
    LOAD_POST_DETAIL_REQUEST, LOAD_POST_DETAIL_SUCCESS, LOAD_POST_DETAIL_FAILURE,
    LOAD_COMMENTS_REQUEST, LOAD_COMMENTS_SUCCESS, LOAD_COMMENTS_FAILURE,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE
} from '../modules/post';
import {http} from 'utils/HttpHandler';


function createPostAPI(roomId, data) {
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

function loadCommentsAPI(postId, pagination) {
    return http.get(`/api/v1/post/${postId}/comments?${makeParamForPosts(pagination)}`)
}


// 스터디방 생성 ///////////////////////////////////
function* createPost(action){
    try {
        const {files, post, roomId} = action.data;
        console.log('cre...')
        console.log(files, post);

        // 첨부 파일이 존재하면, 썸네일 이미지를 먼저 업로드 한 후 pk 값을 받아온다.
        if(files) {
            const result = yield call(uploadAttachmentAPI, files);
            post.fileGroupId = result.data.data.fileGroupId;
        }

        let result = yield call(createPostAPI, roomId, post);
        yield put({
            type : CREATE_POST_SUCCESS,
            data : result.data.data
        })

        action.meta.callbackAction();
    }catch(e) {
        console.error(e);
        yield put({
            type : CREATE_POST_FAILURE,
            error : e
        })
    }
}

function* watchCreatePost() {
    yield takeLatest(CREATE_POST_REQUEST, createPost)
}

// 포스트 리스트 /////////////////////////////
function* loadPosts(action){
    try {
        console.log(action)
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

// 댓글 리스트 /////////////////////////////
function* loadComments(action){
    try {
        let result = yield call(loadCommentsAPI, action.postId, action.pagination);
        yield put({
            type : LOAD_COMMENTS_SUCCESS,
            data : result.data.data.content,
            first : result.data.data.first,
            last : result.data.data.last,
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
        fork(watchCreatePost),
        fork(watchLoadPostDetail),
        fork(watchLoadComments)
    ]);
}



const makeParamForPosts = (pagination, keyword)  => {
    let param = Object.entries(pagination).map(e => e.join('=')).join('&');
    if(keyword) param += `&keyword=${keyword}`;
    return param;
}