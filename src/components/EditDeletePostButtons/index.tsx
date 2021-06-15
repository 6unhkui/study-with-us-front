import React, { useCallback } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button } from "antd";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import { useDispatch } from "react-redux";
import { deletePostAsync } from "@/store/post";
import { useTypedSelector } from "@/store";
import { useHistory } from "react-router";

interface EditDeletePostButtonsProps {
    postId: number;
}

const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({ postId }) => {
    const { onOpen, onClose, visible } = useModal();
    const { loading } = useTypedSelector(state => state.post.deletePost);
    const dispatch = useDispatch();
    const history = useHistory();

    const onDeleteBtnClick = useCallback(() => {
        dispatch(deletePostAsync.request(postId));
    }, [dispatch, postId]);

    const onEditBtnClick = useCallback(() => {
        history.push(`/post/${postId}/edit`);
    }, [history, postId]);

    return (
        <>
            <Button type="text" size="small" onClick={onEditBtnClick}>
                <EditOutlined /> 수정
            </Button>
            <Button type="text" size="small" onClick={onOpen} loading={loading}>
                <DeleteOutlined /> 삭제
            </Button>

            <Modal visible={visible} onClose={onClose} header="게시글 삭제" type="confirm" onOk={onDeleteBtnClick}>
                정말 게시글을 삭제하시겠습니까?
            </Modal>
        </>
    );
};

export default EditDeletePostButtons;
