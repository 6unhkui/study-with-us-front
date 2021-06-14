import { asyncStateInit } from "@/utils/reducerUtils";
import { createReducer } from "typesafe-actions";
import produce from "immer";
import { PageResponseDTO } from "@/api/dto/common.dto";
import { PostDetailDTO, PostDTO } from "@/api/dto/post.dto";
import { CommentDTO, UpdateCommentDTO } from "@/api/dto/postComment.dto";
import { PostAction, PostState } from "./types";
import {
    CREATE_POST,
    CREATE_POST_COMMENT,
    DELETE_POST,
    DELETE_POST_COMMENT,
    GET_NEWS_FEED,
    GET_POST,
    GET_POST_COMMENT_LIST,
    GET_POST_LIST,
    UPDATE_POST,
    UPDATE_POST_COMMENT
} from "./actions";

const initalState: PostState = {
    newsFeed: { ...asyncStateInit, hasMore: false },
    postList: { ...asyncStateInit, hasMore: false },
    post: asyncStateInit,
    createPost: asyncStateInit,
    updatePost: asyncStateInit,
    deletePost: asyncStateInit,
    commentList: { ...asyncStateInit, size: 0 },
    createComment: asyncStateInit,
    updateComment: asyncStateInit,
    deleteComment: asyncStateInit
};

const postReducer = createReducer<PostState, PostAction>(initalState, {
    [GET_NEWS_FEED.REQUEST]: produce(({ newsFeed: state }) => {
        state.loading = true;
        state.data = state.hasMore ? state.data : [];
        state.error = null;
        state.hasMore = false;
    }),
    [GET_NEWS_FEED.SUCCESS]: produce(({ newsFeed: state }, action) => {
        const payload = action.payload as PageResponseDTO<PostDTO[]>;
        state.loading = false;
        if (payload.first) {
            state.data = payload.content;
        } else {
            payload.content.forEach(item => {
                state.data?.push(item);
            });
        }
        state.error = null;
        state.hasMore = !payload.last;
    }),
    [GET_NEWS_FEED.FAILURE]: produce(({ newsFeed: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.hasMore = false;
    }),
    [GET_POST_LIST.REQUEST]: produce(({ postList: state }) => {
        state.loading = true;
        state.data = state.hasMore ? state.data : [];
        state.error = null;
        state.hasMore = false;
    }),
    [GET_POST_LIST.SUCCESS]: produce(({ postList: state }, action) => {
        const payload = action.payload as PageResponseDTO<PostDTO[]>;
        state.loading = false;
        if (payload.first) {
            state.data = payload.content;
        } else {
            payload.content.forEach(item => {
                state.data?.push(item);
            });
        }
        state.error = null;
        state.hasMore = !payload.last;
    }),
    [GET_POST_LIST.FAILURE]: produce(({ postList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
        state.hasMore = false;
    }),
    [GET_POST.REQUEST]: produce(({ post: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_POST.SUCCESS]: produce(({ post: state }, action) => {
        state.loading = false;
        state.data = action.payload as PostDetailDTO;
        state.error = null;
    }),
    [GET_POST.FAILURE]: produce(({ post: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_POST.RESET]: produce(({ post: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [CREATE_POST.REQUEST]: produce(({ createPost: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CREATE_POST.SUCCESS]: produce(({ createPost }, action) => {
        createPost.loading = false;
        createPost.data = true;
        createPost.error = null;
    }),
    [CREATE_POST.FAILURE]: produce(({ createPost: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [UPDATE_POST.REQUEST]: produce(({ updatePost: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [UPDATE_POST.SUCCESS]: produce(({ updatePost }, action) => {
        updatePost.loading = false;
        updatePost.data = true;
        updatePost.error = null;
    }),
    [UPDATE_POST.FAILURE]: produce(({ updatePost: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [DELETE_POST.REQUEST]: produce(({ deletePost: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [DELETE_POST.SUCCESS]: produce(({ postList, post, newsFeed, deletePost }, action) => {
        deletePost.loading = false;
        deletePost.data = true;
        deletePost.error = null;

        newsFeed.data = newsFeed.data?.filter(v => v.postId !== action.payload) as PostDTO[];
        postList.data = postList.data?.filter(v => v.postId !== action.payload) as PostDTO[];
        post.data = null;
    }),
    [DELETE_POST.FAILURE]: produce(({ deletePost: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_POST_COMMENT_LIST.REQUEST]: produce(({ commentList: state }) => {
        state.loading = true;
        state.data = null;
        state.size = 0;
        state.error = null;
    }),
    [GET_POST_COMMENT_LIST.SUCCESS]: produce(({ commentList: state }, action) => {
        const payload = action.payload as CommentDTO[];

        state.loading = false;
        state.size = payload.length;
        state.data = payload;
        state.error = null;
    }),
    [GET_POST_COMMENT_LIST.FAILURE]: produce(({ commentList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.size = 0;
        state.error = action.payload;
    }),
    [CREATE_POST_COMMENT.REQUEST]: produce(({ createComment: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CREATE_POST_COMMENT.SUCCESS]: produce(({ createComment, commentList }, action) => {
        createComment.loading = false;
        createComment.data = true;
        createComment.error = null;

        commentList.data?.push(action.payload as CommentDTO);
        commentList.size += 1;
    }),
    [CREATE_POST_COMMENT.FAILURE]: produce(({ createComment: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [UPDATE_POST_COMMENT.REQUEST]: produce(({ updateComment: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [UPDATE_POST_COMMENT.SUCCESS]: produce(({ updateComment, commentList }, action) => {
        updateComment.loading = false;
        updateComment.data = true;
        updateComment.error = null;

        const payload = action.payload as UpdateCommentDTO;
        commentList.data = commentList.data?.map(comment =>
            comment.commentId === payload.commentId ? { ...comment, content: payload.content } : comment
        ) as CommentDTO[];
    }),
    [UPDATE_POST_COMMENT.FAILURE]: produce(({ updateComment: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [DELETE_POST_COMMENT.REQUEST]: produce(({ deleteComment: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [DELETE_POST_COMMENT.SUCCESS]: produce(({ deleteComment, commentList }, action) => {
        deleteComment.loading = false;
        deleteComment.data = true;
        deleteComment.error = null;

        commentList.data = commentList.data?.filter(comment => comment.commentId !== action.payload) as CommentDTO[];
        commentList.size -= 1;
    }),
    [DELETE_POST_COMMENT.FAILURE]: produce(({ deleteComment: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    })
});

export default postReducer;
