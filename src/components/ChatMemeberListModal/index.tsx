import { useTypedSelector } from "@/store";
import { getCurrentChatMemeberListAsync } from "@/store/chat";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal, { ModalProps } from "@/components/Modal";
import MemberListContainer from "@/components/MemberListContainer";

interface ChatMemeberListModalProps extends ModalProps {
    roomId: number;
}

const ChatMemeberListModal: React.FC<ChatMemeberListModalProps> = ({ roomId, visible, onClose }) => {
    const { data, loading } = useTypedSelector(({ chat: { chatMemberList } }) => chatMemberList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCurrentChatMemeberListAsync.request(roomId));
    }, [dispatch, roomId, visible]);

    return (
        <Modal type="alert" visible={visible} onClose={onClose} header="현재 참여중인 멤버" size="regular">
            <MemberListContainer data={data} loading={loading} />
        </Modal>
    );
};

export default React.memo(ChatMemeberListModal);
