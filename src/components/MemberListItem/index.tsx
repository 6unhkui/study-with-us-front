import { MemberDTO } from "@/api/dto/member.dto";
import { Button } from "antd";
import React from "react";
import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import MemberDetail from "@/components/MemberDetail";
import styles from "./MemberListItem.module.less";

export interface MemberListItemProps extends Partial<MemberDTO> {
    showDetail?: boolean;
}

const MemberListItem: React.FC<MemberListItemProps> = ({ name, profileImg, email, role, memberId, showDetail = true }) => {
    const { onClose, onOpen, visible } = useModal();

    return (
        <div className={styles.memberArea}>
            <Avatar name={name} profileImage={profileImg} size={50} className={styles.avatar} />
            {role && (
                <span className={styles.role}>
                    <Badge type={role === "MANAGER" ? "primary" : "secondary"}>{role}</Badge>
                </span>
            )}
            <span className={styles.name}>{name}</span>
            <span className={styles.email}>{email}</span>
            {memberId && showDetail && (
                <>
                    <Modal visible={visible} onClose={onClose} size="regular" header={name}>
                        <MemberDetail memberId={memberId} />
                    </Modal>
                    <Button className={styles.btn} type="text" size="middle" onClick={onOpen}>
                        자세히 보기
                    </Button>
                </>
            )}
        </div>
    );
};

export default MemberListItem;
