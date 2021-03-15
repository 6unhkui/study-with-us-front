import produce from "immer";

const initialState = {
    loadingNewsFeed: false, // 새글 피드 리스트 불러오기
    newsFeed: [],
    hasMoreNewsFeed: false,

    loadingPosts: false, // 포스트 리스트 불러오기
    posts: [],
    hasMorePosts: false,

    loadingPostDetail: false, // 포스트 상세 정보 불러오기
    postDetail: {},

    isCreatingPost: false, // 포스트 작성
    createPostErrorReason: "",
    postCreated: false,

    isDeletingPost: false, // 포스트 삭제
    deletePostErrorReason: "",

    isUpdatingPost: false, // 포스트 수정
    updatePostErrorReason: "",

    loadingComments: false, // 댓글 리스트 불러오기
    comments: [],
    hasMoreComments: false,

    isCreatingComment: false, // 댓글 작성
    createCommentErrorReason: "",
    commentCreated: false,

    isDeletingComment: false, // 댓글 삭제
    deleteCommentErrorReason: "",

    isUpdatingComment: false, // 댓글 수정
    updateCommentErrorReason: ""
};

// Actions
export const LOAD_NEWS_FEED_REQUEST = "LOAD_NEWS_FEED_REQUEST";
export const LOAD_NEWS_FEED_SUCCESS = "LOAD_NEWS_FEED_SUCCESS";
export const LOAD_NEWS_FEED_FAILURE = "LOAD_NEWS_FEED_FAILURE";

export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

export const LOAD_POST_DETAIL_REQUEST = "LOAD_POST_DETAIL_REQUEST";
export const LOAD_POST_DETAIL_SUCCESS = "LOAD_POST_DETAIL_SUCCESS";
export const LOAD_POST_DETAIL_FAILURE = "LOAD_POST_DETAIL_FAILURE";

export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const LOAD_COMMENTS_REQUEST = "LOAD_COMMENTS_REQUEST";
export const LOAD_COMMENTS_SUCCESS = "LOAD_COMMENTS_SUCCESS";
export const LOAD_COMMENTS_FAILURE = "LOAD_COMMENTS_FAILURE";

export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

const post = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            // 새글 피드 리스트 ////////////////////////////
            case LOAD_NEWS_FEED_REQUEST: {
                draft.newsFeed = draft.hasMoreNewsFeed ? draft.newsFeed : [];
                draft.loadingNewsFeed = true;
                break;
            }
            case LOAD_NEWS_FEED_SUCCESS: {
                if (action.first) {
                    draft.newsFeed = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.newsFeed.push(d);
                    });
                }
                draft.hasMoreNewsFeed = !action.last;
                draft.loadingNewsFeed = false;
                break;
            }
            case LOAD_NEWS_FEED_FAILURE: {
                draft.loadingNewsFeed = false;
                break;
            }

            // 포스트 리스트 ////////////////////////////
            case LOAD_POSTS_REQUEST: {
                draft.posts = draft.hasMorePosts ? draft.posts : [];
                draft.loadingPosts = true;
                break;
            }
            case LOAD_POSTS_SUCCESS: {
                if (action.first) {
                    draft.posts = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.posts.push(d);
                    });
                }
                draft.hasMorePosts = !action.last;
                draft.loadingPosts = false;
                break;
            }
            case LOAD_POSTS_FAILURE: {
                draft.loadingPosts = false;
                break;
            }

            // 포스트 상세보기 ////////////////////////////
            case LOAD_POST_DETAIL_REQUEST: {
                // draft.postDetail = {};
                draft.loadingPostDetail = true;
                break;
            }
            case LOAD_POST_DETAIL_SUCCESS: {
                draft.postDetail = action.data;
                draft.loadingPostDetail = false;
                break;
            }
            case LOAD_POST_DETAIL_FAILURE: {
                draft.loadingPostDetail = false;
                break;
            }

            // 포스트 등록 ////////////////////////////
            case CREATE_POST_REQUEST: {
                draft.isCreatingPost = true;
                draft.postCreated = false;
                draft.createPostErrorReason = "";
                break;
            }
            case CREATE_POST_SUCCESS: {
                draft.isCreatingPost = false;
                draft.postCreated = true;
                break;
            }
            case CREATE_POST_FAILURE: {
                draft.isCreatingPost = false;
                draft.postCreated = false;
                draft.createPostErrorReason = action.error;
                break;
            }

            // 포스트 삭제 ////////////////////////////
            case DELETE_POST_REQUEST: {
                draft.isDeletingPost = true;
                draft.deletePostErrorReason = "";
                break;
            }
            case DELETE_POST_SUCCESS: {
                draft.isDeletingPost = false;
                break;
            }
            case DELETE_POST_FAILURE: {
                draft.isDeletingPost = false;
                draft.deletePostErrorReason = action.error;
                break;
            }

            // 포스트 수정 ////////////////////////////
            case UPDATE_POST_REQUEST: {
                draft.isUpdatingPost = true;
                draft.updatePostErrorReason = "";
                break;
            }
            case UPDATE_POST_SUCCESS: {
                draft.isUpdatingPost = false;
                break;
            }
            case UPDATE_POST_FAILURE: {
                draft.isUpdatingPost = false;
                draft.updatePostErrorReason = action.error;
                break;
            }

            // 포스트 댓글 리스트 ////////////////////////////
            case LOAD_COMMENTS_REQUEST: {
                draft.comments = [];
                draft.loadingComments = true;
                break;
            }
            case LOAD_COMMENTS_SUCCESS: {
                draft.comments = action.data;
                // draft.hasMoreComments = !action.last;
                draft.loadingComments = false;
                break;
            }
            case LOAD_COMMENTS_FAILURE: {
                draft.loadingComments = false;
                break;
            }

            // 댓글 등록 ////////////////////////////
            case CREATE_COMMENT_REQUEST: {
                draft.isCreatingComment = true;
                draft.commentCreated = false;
                draft.createCommentErrorReason = "";
                break;
            }
            case CREATE_COMMENT_SUCCESS: {
                draft.isCreatingComment = false;
                draft.commentCreated = true;
                draft.comments.push(action.data);
                break;
            }
            case CREATE_COMMENT_FAILURE: {
                draft.isCreatingComment = false;
                draft.commentCreated = false;
                draft.createCommentErrorReason = action.error;
                break;
            }

            // 댓글 삭제 ////////////////////////////
            case DELETE_COMMENT_REQUEST: {
                draft.isDeletingComment = true;
                draft.deleteCommentErrorReason = "";
                break;
            }
            case DELETE_COMMENT_SUCCESS: {
                draft.isDeletingComment = false;
                const index = draft.comments.findIndex(v => v.commentId === action.data.commentId);
                draft.comments.splice(index, 1);
                break;
            }
            case DELETE_COMMENT_FAILURE: {
                draft.isDeletingComment = false;
                draft.deleteCommentErrorReason = action.error;
                break;
            }

            // 댓글 수정 ////////////////////////////
            case UPDATE_COMMENT_REQUEST: {
                draft.isUpdatingComment = true;
                draft.updateCommentErrorReason = "";
                break;
            }
            case UPDATE_COMMENT_SUCCESS: {
                draft.isUpdatingComment = false;
                const index = draft.comments.findIndex(v => v.commentId === action.data.commentId);
                draft.comments[index].content = action.data.content;
                break;
            }
            case UPDATE_COMMENT_FAILURE: {
                draft.isUpdatingComment = false;
                draft.updateCommentErrorReason = action.error;
                break;
            }

            default: {
                break;
            }
        }
    });

export default post;
