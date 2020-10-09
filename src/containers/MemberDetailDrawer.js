import React, {useEffect, useCallback} from "react";
import {Drawer, Button, Descriptions } from "antd";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MEMBER_DETAIL_REQUEST, DELETE_MEMBER_REQUEST} from "store/modules/member";
import Loading from "components/Loading";
import MemberRoleBadge from "components/MemberRoleBadge";
import Avatar from "components/Avatar";

const MemberDetailDrawer = ({memberId, visible, onClose}) => {
    const dispatch = useDispatch();
    const { roomDetail : {isManager} } = useSelector(state => state.room);
    const { loadingMemberDetail, memberDetail : {name, email, role, joinDate, profileImg, postCount} } = useSelector(state => state.member);

    useEffect(() => {
        dispatch({
            type : LOAD_MEMBER_DETAIL_REQUEST,
            memberId
        })
    }, [dispatch, memberId])

    const handleDeleteMember = useCallback(() => {
        dispatch({
            type : DELETE_MEMBER_REQUEST,
            memberId
        })

        onClose();
    }, [dispatch, memberId, onClose])

    return (
        <Drawer
            title="Member Profile"
            placement="right"
            width={640}
            onClose={onClose}
            visible={visible}
        >
            {loadingMemberDetail ? <Loading/> :
                <Descriptions title={<><Avatar user={{name, profileImg}}/>{name}<MemberRoleBadge role={role}/></>}
                              extra={isManager && role === "MATE" && <Button onClick={handleDeleteMember}>멤버 삭제</Button>}
                >
                    <Descriptions.Item label="Name" span={3}>{name}</Descriptions.Item>
                    <Descriptions.Item label="Email" span={3}>{email}</Descriptions.Item>
                    <Descriptions.Item label="Role" span={3}>{role}</Descriptions.Item>
                    <Descriptions.Item label="Date of membership" span={3}>{joinDate}</Descriptions.Item>
                    <Descriptions.Item label="Number of posts written" span={3}>{postCount}</Descriptions.Item>
                </Descriptions>
            }
        </Drawer>
    )
}

export default MemberDetailDrawer;