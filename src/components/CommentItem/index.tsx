import { CommentDTO } from "@/api/dto/postComment.dto";
import useToggle from "@/hooks/useToggle";
import { Button, Comment, message } from "antd";
import React, { useCallback } from "react";
import Avatar from "@/components/Avatar";
import CommentEditor from "@/components/CommentEditor";
import { useDispatch } from "react-redux";
import { createPostCommentAsync, deletePostCommentAsync, updatePostCommentAsync } from "@/store/post";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import styles from "./CommentItem.module.less";

interface ActionBtnProps {
    text: string;
    onClick: () => void;
}

const ActionBtn = React.memo(({ text, onClick }: ActionBtnProps) => {
    return (
        <Button type="text" size="small" onClick={onClick} className={styles.actionBtn}>
            {text}
        </Button>
    );
});

interface CommentItemProps extends CommentDTO {
    postId: number;
}

const CommentItem: React.FC<CommentItemProps> = ({ commentId, content, writer, createdDate, children, postId, isWriter }) => {
    const { isOn: replyBtnIsOn, onToggle: toggleReplyBtn } = useToggle();
    const { isOn: editBtnIsOn, onToggle: toggleEditBtn } = useToggle();
    const { visible, onClose, onOpen } = useModal();
    const dispatch = useDispatch();

    const onReplySubmit = useCallback(
        (value: string) => {
            dispatch(createPostCommentAsync.request({ postId, parentId: commentId, content: value }));
            toggleReplyBtn();
        },
        [dispatch, commentId, postId, toggleReplyBtn]
    );

    const onEditSubmit = useCallback(
        (value: string) => {
            dispatch(
                updatePostCommentAsync.request({
                    commentId,
                    content: value
                })
            );
            toggleEditBtn();
        },
        [commentId, dispatch, toggleEditBtn]
    );

    const onDeletBtnClick = useCallback(() => {
        if (children) {
            message.error("답댓글이 달렸을 경우 삭제할 수 없습니다.");
            return;
        }

        dispatch(deletePostCommentAsync.request(commentId));
    }, [children, commentId, dispatch]);

    return (
        <>
            <Modal visible={visible} onClose={onClose} header="댓글 삭제" type="confirm" onOk={onDeletBtnClick}>
                댓글을 정말 삭제하시겠습니까?
            </Modal>

            <Comment
                key={commentId}
                actions={[
                    <ActionBtn text="Reply" onClick={toggleReplyBtn} />,
                    ...(isWriter
                        ? [<ActionBtn text="Modify" onClick={toggleEditBtn} />, <ActionBtn text="Delete" onClick={onOpen} />]
                        : [])
                ]}
                author={writer.name}
                avatar={<Avatar name={writer.name} profileImage={writer.profileImg} />}
                content={
                    editBtnIsOn ? (
                        <CommentEditor visibleAvatar={false} defaultText={content} onSubmit={onEditSubmit} submitBtnName="수정" />
                    ) : (
                        content
                    )
                }
                datetime={createdDate}
            >
                {replyBtnIsOn && <CommentEditor visibleAvatar={false} onSubmit={onReplySubmit} />}

                {children}
            </Comment>
        </>
    );
};

export default CommentItem;
