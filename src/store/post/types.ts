import { CommentDTO } from "@/api/dto/postComment.dto";
import { PostDetailDTO, PostDTO } from "@/api/dto/post.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import {
    getNewsFeedAsync,
    getPostAsync,
    getPostListAsync,
    getPostCommentListAsync,
    deletePostAsync,
    createPostAsync,
    updatePostAsync,
    createPostCommentAsync,
    updatePostCommentAsync,
    deletePostCommentAsync
} from "./actions";

export type PostAction = ActionType<
    | typeof getNewsFeedAsync
    | typeof getPostListAsync
    | typeof getPostAsync
    | typeof createPostAsync
    | typeof updatePostAsync
    | typeof deletePostAsync
    | typeof getPostCommentListAsync
    | typeof createPostCommentAsync
    | typeof updatePostCommentAsync
    | typeof deletePostCommentAsync
>;

export interface PostState {
    newsFeed: AsyncState<PostDTO[]> & { hasMore: boolean };
    postList: AsyncState<PostDTO[]> & { hasMore: boolean };
    post: AsyncState<PostDetailDTO>;
    createPost: AsyncState<boolean>;
    updatePost: AsyncState<boolean>;
    deletePost: AsyncState<boolean>;
    commentList: AsyncState<CommentDTO[]> & { size: number };
    createComment: AsyncState<boolean>;
    updateComment: AsyncState<boolean>;
    deleteComment: AsyncState<boolean>;
}
