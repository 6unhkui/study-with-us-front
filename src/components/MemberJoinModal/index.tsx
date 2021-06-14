import React from "react";
import Modal from "../Modal";

interface MemberJoinModalProps {
    visible: boolean;
    onClose: () => void;
}

const MemberJoinModal: React.FC<MemberJoinModalProps> = ({ visible, onClose }) => {
    return (
        <Modal visible={visible} onClose={onClose}>
            haha
        </Modal>
    );
};

export default MemberJoinModal;
