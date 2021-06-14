import { useTypedSelector } from "@/store";
import { createPostCommentAsync, getPostCommentListAsync } from "@/store/post";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CommentEditor from "@/components/CommentEditor";
import Divider from "@/components/Divider";
import { CommentDTO } from "@/api/dto/postComment.dto";
import CommentItem from "@/components/CommentItem";
import toCommentTree, { CommentTree } from "@/utils/toCommentTree";
import Loading from "@/components/Loading";
import styles from "./PostComments.module.less";
import Emoji from "../Emoji";

const RenderCommentTree = (comments: CommentDTO[], postId: number) =>
    comments.map(comment => (
        <CommentItem key={comment.commentId} {...comment} postId={postId}>
            {comment.child && comment.child?.length > 0 && RenderCommentTree(comment.child, postId)}
        </CommentItem>
    ));

interface PostCommentsProps {
    postId: number;
}

const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
    const { data: comments, loading, size } = useTypedSelector(state => state.post.commentList);
    const [commentTree, setCommentTree] = useState<CommentTree>();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostCommentListAsync.request(postId));
    }, [dispatch, postId]);

    useEffect(() => {
        if (comments) {
            setCommentTree(toCommentTree(comments));
        }
    }, [comments, setCommentTree]);

    const onSubmit = useCallback(
        (content: string) => {
            dispatch(createPostCommentAsync.request({ postId, content }));
        },
        [dispatch, postId]
    );

    return (
        <div>
            <div className={styles.size}>
                <Emoji mr={6}>💛</Emoji> {size} commnet{size > 1 && "s"}
            </div>

            <Divider />

            <CommentEditor onSubmit={onSubmit} />

            {loading ? (
                <Loading type="component" />
            ) : (
                commentTree && commentTree.length > 0 && RenderCommentTree(commentTree, postId)
            )}
        </div>
    );
};

export default PostComments;
