import React from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { http } from 'utils/HttpHandler';
import Avatar from 'components/Avatar';

import { Button, Typography, Card, Divider, Popconfirm, message} from 'antd';
import { EditOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'

const { Title, Text } = Typography;

const Sidebar = (props) => {
    const {room} = props;

    const join = () => {
        if(!room.unlimited && room.joinCount === room.maxCount) {
            message.error('인원수 초과로 더이상 가입 할 수 없는 스터디방입니다.');
            return false;
        }

        http.post(`/api/v1/room/${room.id}/join`)
        .then(response => {
            props.setInitialize(true);
            // window.location.reload(); 
        })
    }


    const cardActionItems = () => {
        if(room.currentAccount.member) {
            return [
                <Link to={{pathname : `/room/${props.id}/post/create`, 
                           state : {from: props.location, name : room.name, currentAccount : room.currentAccount}}}>
                    <EditOutlined/>
                </Link>,
                <Link to={{pathname : `/room/${props.id}/edit`, 
                          state : {from: props.location, name : room.name, currentAccount : room.currentAccount}}}>
                    <SettingOutlined/>
                </Link>
            ]
        }else {
            return [ 
                <Popconfirm placement="top" title={`${room.name} 스터디방에 가입 하시겠습니까?`} onConfirm={join} okText="Yes" cancelText="No">
                    <Button type="link"><FontAwesomeIcon icon={faSignInAlt} style={{marginRight : '6px'}}/> 스터디방 가입하기</Button>
                </Popconfirm>
            ];
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
    /* flex : 1; */
    /* max-width : 300px; */
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