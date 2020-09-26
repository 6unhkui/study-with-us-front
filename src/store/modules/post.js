import produce from 'immer';

const initialState = {
    loadingPosts : false,
    posts : [],
    hasMorePosts : false,

    loadingPostDetail : false,
    postDetail : {},

    loadingComments : false,
    comments : [],
    hasMoreComments : false,

    isWritingPost : false,
    writePostErrorReason: '',
    postWritten : false,

    isWritingComment : false,
    writeCommentErrorReason: '',
    commentWritten : false,

};


// Actions
export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LOAD_POST_DETAIL_REQUEST = 'LOAD_POST_DETAIL_REQUEST';
export const LOAD_POST_DETAIL_SUCCESS = 'LOAD_POST_DETAIL_SUCCESS';
export const LOAD_POST_DETAIL_FAILURE = 'LOAD_POST_DETAIL_FAILURE';

export const LOAD_COMMENTS_REQUEST = 'LOAD_COMMENTS_REQUEST';
export const LOAD_COMMENTS_SUCCESS = 'LOAD_COMMENTS_SUCCESS';
export const LOAD_COMMENTS_FAILURE = 'LOAD_COMMENTS_FAILURE';

export const WRITE_POST_REQUEST = 'WRITE_POST_REQUEST';
export const WRITE_POST_SUCCESS = 'WRITE_POST_SUCCESS';
export const WRITE_POST_FAILURE = 'WRITE_POST_FAILURE';

export const WRITE_COMMENT_REQUEST = 'WRITE_COMMENT_REQUEST';
export const WRITE_COMMENT_SUCCESS = 'WRITE_COMMENT_SUCCESS';
export const WRITE_COMMENT_FAILURE = 'WRITE_COMMENT_FAILURE';



const post = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            // 포스트 리스트 ////////////////////////////
            case LOAD_POSTS_REQUEST : {
                draft.posts = draft.hasMorePosts ? draft.posts : [];
                draft.loadingPosts = true;
                break;
            }
            case LOAD_POSTS_SUCCESS : {
                if(action.first) {
                    draft.posts = action.data;
                }else {
                    action.data.forEach((d) => {
                        draft.posts.push(d);
                    });
                }
                draft.hasMorePosts = !action.last;
                draft.loadingPosts = false;
                break;
            }
            case LOAD_POSTS_FAILURE : {
                draft.loadingPosts = false;
                break;
            }

            // 포스트 상세보기 ////////////////////////////
            case LOAD_POST_DETAIL_REQUEST : {
                draft.postDetail = {};
                draft.loadingPostDetail = true;
                break;
            }
            case LOAD_POST_DETAIL_SUCCESS : {
                draft.postDetail = action.data;
                draft.loadingPostDetail = false;
                break;
            }
            case LOAD_POST_DETAIL_FAILURE : {
                draft.loadingPostDetail = false;
                break;
            }

            // 포스트 댓글 리스트 ////////////////////////////
            case LOAD_COMMENTS_REQUEST : {
                draft.comments = [];
                draft.loadingComments = true;
                break;
            }
            case LOAD_COMMENTS_SUCCESS : {
                draft.comments = action.data;
                draft.hasMoreComments = !action.last;
                draft.loadingComments = false;
                break;
            }
            case LOAD_COMMENTS_FAILURE : {
                draft.loadingComments = false;
                break;
            }

            // 포스트 등록 ////////////////////////////
            case WRITE_POST_REQUEST : {
                draft.isWritingPost = true;
                draft.postWritten = false;
                draft.writePostErrorReason = '';
                break;
            }
            case WRITE_POST_SUCCESS : {
                draft.isWritingPost = false;
                draft.postWritten = true;
                break;
            }
            case WRITE_POST_FAILURE : {
                draft.isWritingPost = false;
                draft.postWritten = false;
                draft.writePostErrorReason = action.error;
                break;
            }

            // 댓글 등록 ////////////////////////////
            case WRITE_COMMENT_REQUEST : {
                draft.isWritingComment = true;
                draft.commentWritten = false;
                draft.writeCommentErrorReason = '';
                break;
            }
            case WRITE_COMMENT_SUCCESS : {
                draft.isWritingComment = false;
                draft.commentWritten = true;
                draft.comments.push(action.data)
                break;
            }
            case WRITE_COMMENT_FAILURE : {
                draft.isWritingComment = false;
                draft.commentWritten = false;
                draft.writeCommentErrorReason = action.error;
                break;
            }

            default: {
                break;
            }
        }
    });
};

export default post;