import React, {useState} from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Link } from "react-router-dom";
import {useSelector} from "react-redux";
import Avatar from 'components/Avatar';
import {Modal, Button, Typography, Card, Divider} from 'antd';
import { EditOutlined, UserOutlined, SettingOutlined, LoginOutlined} from '@ant-design/icons';

const { Title, Text } = Typography;

const Sidebar = (props) => {
    const { roomDetail : {
        roomId, isMember, name, description, joinCount, createDate, manager, category, maxCount, unlimited
    }} = useSelector(state => state.room);
    const [joinModalVisible, setJoinModalVisible] = useState(false);


    const writeBtn = (
        <Link to={`/room/${roomId}/post/create`}>
            <EditOutlined/> 게시글 작성
        </Link>
    )

    const settingBtn = (
        <Link to={`/room/${roomId}/setting`}>
            <SettingOutlined/> 설정
        </Link>
    )

    const joinBtn = (
        <>
            <Button type="link" onClick={setJoinModalVisible.bind(null, true)}>
                <LoginOutlined />스터디방 가입하기
            </Button>
            <Modal
                title={name}
                visible={joinModalVisible}
                onOk={props.join}
                onCancel={setJoinModalVisible.bind(null, false)}
            >
                {<p>{name} 스터디방에 가입 하시겠습니까?</p>}
            </Modal>
        </>
    )

    return (
        <SideBarWrap>
            <Card actions={isMember ? [writeBtn, settingBtn] : 
                            [!unlimited && joinCount === maxCount ? '가입 할 수 없는 스터디방입니다.' : joinBtn]}>
                <BadgeWrap>{category}</BadgeWrap>
                <Title level={2}>{name}</Title>
                <Text type="secondary">{description}</Text>

                <div>
                    <Divider style={{margin : '24px 0 0 0'}}/>
                    
                    <SectionWrap>
                        <SectionTitle>Manager</SectionTitle>
                        <Avatar user={manager} showName={true}/>
                    </SectionWrap>

                    <SectionWrap>
                        <SectionTitle>Member</SectionTitle>
                        <span>
                            <UserOutlined style={{marginRight : '8px'}}/>
                            {joinCount + (unlimited ? '' : ' / ' + maxCount) + ' member' + (joinCount > 1 ? 's' : '')}
                        </span>
                    </SectionWrap>

                    <SectionWrap>
                        <SectionTitle>Created Date</SectionTitle>
                        <span>{createDate}</span>
                    </SectionWrap>


                    {isMember &&
                        <ButtonWrap>
                            <Link to={`/room/${roomId}/chatting`}>
                                <Button type="primary" block className='shadow' style={{marginTop : '1rem'}}>
                                    Chatting
                                </Button>
                            </Link>
                        </ButtonWrap>
                    }
                </div>
            </Card>
        </SideBarWrap>
    )
}

export default Sidebar;

const SideBarWrap = styled.div`
    ${breakpoint('tablet')`
         position: sticky;
        top: 6rem;
    `}
    
  
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

const ButtonWrap = styled.div`
    margin-top : 2rem;
`