import { PageRequestDTO, PageResponseDTO } from "@/api/dto/common.dto";
import { CreatePostDTO, PostDetailDTO, PostDTO, SearchPostsByPageDTO, UpdatePostDTO } from "@/api/dto/post.dto";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from "@/api/dto/postComment.dto";

// ---
// Action Type
const prefix = "post" as const;
export const GET_NEWS_FEED = createAsyncActionType(`${prefix}/GET_NEWS_FEED`);
export const GET_POST_LIST = createAsyncActionType(`${prefix}/GET_POST_LIST`);
export const GET_POST = createAsyncActionType(`${prefix}/GET_POST`);
export const CREATE_POST = createAsyncActionType(`${prefix}/CREATE_POST`);
export const UPDATE_POST = createAsyncActionType(`${prefix}/UPDATE_POST`);
export const DELETE_POST = createAsyncActionType(`${prefix}/DELETE_POST`);
export const GET_POST_COMMENT_LIST = createAsyncActionType(`${prefix}/POST_COMMENT_LIST`);
export const CREATE_POST_COMMENT = createAsyncActionType(`${prefix}/CREATE_POST_COMMENT`);
export const UPDATE_POST_COMMENT = createAsyncActionType(`${prefix}/UPDATE_POST_COMMENT`);
export const DELETE_POST_COMMENT = createAsyncActionType(`${prefix}/DELETE_POST_COMMENT`);

// ---
// Action Creator
export const getNewsFeedAsync = createActionEntity<PageRequestDTO, PageResponseDTO<PostDTO[]>, AxiosError>(GET_NEWS_FEED);
export const getPostListAsync = createActionEntity<SearchPostsByPageDTO, PageResponseDTO<PostDTO[]>, AxiosError>(GET_POST_LIST);
export const getPostAsync = createActionEntity<number, PostDetailDTO, AxiosError, any>(GET_POST);
export const createPostAsync = createActionEntity<CreatePostDTO, number, AxiosError>(CREATE_POST);
export const updatePostAsync = createActionEntity<UpdatePostDTO, UpdatePostDTO, AxiosError>(UPDATE_POST);
export const deletePostAsync = createActionEntity<number, number, AxiosError>(DELETE_POST);
export const getPostCommentListAsync = createActionEntity<number, CommentDTO[], AxiosError>(GET_POST_COMMENT_LIST);
export const createPostCommentAsync = createActionEntity<CreateCommentDTO, CommentDTO, AxiosError>(CREATE_POST_COMMENT);
export const updatePostCommentAsync = createActionEntity<UpdateCommentDTO, UpdateCommentDTO, AxiosError>(UPDATE_POST_COMMENT);
export const deletePostCommentAsync = createActionEntity<number, number, AxiosError>(DELETE_POST_COMMENT);
