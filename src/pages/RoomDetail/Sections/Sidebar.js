import React, {useState, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import Avatar from 'components/Avatar';

import { Modal, Button, Typography, Card, Divider, Popconfirm} from 'antd';
import { EditOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const { Title, Text } = Typography;

const Sidebar = (props) => {
    const {room} = props;
    const [joinModalVisible, setJoinModalVisible] = useState(false);

    const writeBtn = () => (
        <Link to={{pathname : `/room/${props.id}/post/write`,
            state : {from: props.location, name : room.name, currentAccount : room.currentAccount}}}>
            <EditOutlined/>
        </Link>
    )

    const settingBtn = () => (
        <Link to={{pathname : `/room/${props.id}/setting`,
            state : {from: props.location, name : room.name, currentAccount : room.currentAccount}}}>
            <SettingOutlined/>
        </Link>
    )

    const joinBtn = () => (
        <>
            <Button type="link" onClick={() => {setJoinModalVisible(true)}}>
                <FontAwesomeIcon icon={faSignInAlt} style={{marginRight : '6px'}}/>스터디방 가입하기
            </Button>
            <Modal
                title={room.name}
                visible={joinModalVisible}
                onOk={props.join}
                onCancel={() => {setJoinModalVisible(false)}}
            >
                {<p>{room.name} 스터디방에 가입 하시겠습니까?</p>}
            </Modal>
        </>
    )

    const cardActionItems = () => {
        if(room.currentAccount.member) {
            return [writeBtn(), settingBtn()]
        }else {
            return [joinBtn()];
        }
    }

    return (
        <SideBarWrap>
            <Card actions={cardActionItems()}>
                <BadgeWrap>{room.category}</BadgeWrap>
                <Title level={2}>{room.name}</Title>
                <Text type="secondary">{room.description}</Text>

                <div>
                    <Divider style={{margin : '24px 0 0 0'}}/>
                    
                    <SectionWrap>
                        <SectionTitle>Manager</SectionTitle>
                        <Avatar user={room.manager} showName={true}/>
                    </SectionWrap>

                    <SectionWrap>
                        <SectionTitle>Member</SectionTitle>
                        <span>
                            <UserOutlined style={{marginRight : '8px'}}/>
                            {room.joinCount + (room.unlimited ? '' : ' / ' + room.maxCount) + ' members'}
                        </span>
                    </SectionWrap>

                    <SectionWrap>
                        <SectionTitle>Created Date</SectionTitle>
                        <span>{room.createDate}</span>
                    </SectionWrap>
                </div>
            </Card>
        </SideBarWrap>
    )
}

export default Sidebar;

const SideBarWrap = styled.div`
    h2.ant-typography {
        margin: 8px 0;
    }
`

const BadgeWrap = styled.span`
    background-color: var(--primary-color);
    border-radius: 4px;
    padding: .2rem .4rem;
    color: #fff;
    font-size: .8rem;
    font-weight: 500;
`

const SectionWrap = styled.div`
    margin-top : 20px;
`

const SectionTitle = styled.div`
    font-size: .8rem;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: .2rem;
    color : var(--font-color-gray);
    opacity : .6;
`