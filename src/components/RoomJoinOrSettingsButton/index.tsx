import useModal from "@/hooks/useModal";
import { Button } from "antd";
import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { SettingOutlined, LoginOutlined } from "@ant-design/icons";
import Modal from "@/components/Modal";
import { useDispatch } from "react-redux";
import { joinRoomAsync } from "@/store/room";
import styles from "./RoomJoinOrSettingsButton.module.less";

interface RoomJoinOrSettingsButtonProps {
    name: string;
    isMember: boolean;
    roomId: number;
    disabledToJoin?: boolean;
}

const RoomJoinOrSettingsButton: React.FC<RoomJoinOrSettingsButtonProps> = ({ roomId, name, isMember, disabledToJoin }) => {
    const { visible, onOpen, onClose } = useModal();
    const dispatch = useDispatch();

    const onJoinBtnClick = useCallback(() => {
        dispatch(joinRoomAsync.request(roomId));
    }, [dispatch, roomId]);

    if (isMember) {
        return (
            <Link to={`/room/${roomId}/settings`}>
                <Button size="large" icon={<SettingOutlined />} className={styles.button}>
                    설정
                </Button>
            </Link>
        );
    }

    return (
        <>
            <Modal type="confirm" header="스터디방 가입하기" onClose={onClose} visible={visible} onOk={onJoinBtnClick}>
                [{name}] 스터디방에 가입 하시겠습니까?
            </Modal>
            <Button size="large" icon={<LoginOutlined />} onClick={onOpen} className={styles.button} disabled={disabledToJoin}>
                가입하기
            </Button>
        </>
    );
};

export default RoomJoinOrSettingsButton;
