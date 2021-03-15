import React, { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { LOAD_MY_DETAIL_REQUEST, WITHDRAWAL_REQUEST } from "store/modules/member";
import { Button, Descriptions, message, Modal } from "antd";

const MyInfo = ({ roomId }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        roomDetail: { name, isManager }
    } = useSelector(state => state.room);
    const {
        me: { joinDate, postCount, role }
    } = useSelector(state => state.member);
    const [withdrawalModalVisible, setWithdrawalModalVisible] = useState(false);

    useEffect(() => {
        dispatch({
            type: LOAD_MY_DETAIL_REQUEST,
            data: roomId
        });
    }, [dispatch, roomId]);

    const handleWithdrawal = useCallback(() => {
        if (isManager) {
            message.error("매니저는 탈퇴할 수 없습니다. 매니저를 위임하거나, 스터디방을 폐쇄해주세요.");
            return;
        }

        dispatch({
            type: WITHDRAWAL_REQUEST,
            data: roomId,
            meta: {
                callbackAction: () => {
                    history.push("/");
                }
            }
        });
    }, [dispatch, history, isManager, roomId]);

    return (
        <Descriptions title="내 정보" bordered>
            <Descriptions.Item label="가입일" span={3}>
                {joinDate}
            </Descriptions.Item>
            <Descriptions.Item label="권한" span={3}>
                {role}
            </Descriptions.Item>
            <Descriptions.Item label="작성 게시글 수" span={3}>
                {postCount}
            </Descriptions.Item>
            <Descriptions.Item label="스터디방 탈퇴" span={3}>
                <Button type="dashed" onClick={setWithdrawalModalVisible.bind(null, true)}>
                    탈퇴
                </Button>
                <Modal
                    title={name}
                    visible={withdrawalModalVisible}
                    onOk={handleWithdrawal}
                    onCancel={setWithdrawalModalVisible.bind(null, false)}
                >
                    <p>{name} 스터디방에 정말 탈퇴하시겠습니까?</p>
                </Modal>
            </Descriptions.Item>
        </Descriptions>
    );
};

export default MyInfo;
