import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { SERVER_URI } from 'constants/index';

import {Row, Col, Card, Affix, message} from 'antd';

import {useDispatch, useSelector} from "react-redux";
import {LOAD_ROOM_DETAIL_REQUEST, JOIN_ROOM_REQUEST} from "store/modules/room";

import EmptyThumbnail from 'assets/image/empty-thumbnail.png';
import Loading from 'components/Loading';
import Sidebar from './Sections/Sidebar';
import AccessMemberOnly from './Sections/AccessMemberOnly';

import PostsPage from 'containers/PostsByRoom';
import MembersPage from 'containers/MembersByRoom';


const RoomDetailPage = (props) => {
    const roomId = props.match.params.id;
    const dispatch = useDispatch();
    const { loadingRoomDetail, roomDetail, joinedRoom } = useSelector(state => state.room);
    const [tabKey, setTabKey] = useState(0);

    const {coverImage, currentAccount, unlimited, joinCount, maxCount} = useSelector(state => state.room.roomDetail);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOM_DETAIL_REQUEST,
            data : roomId
        })
    }, [dispatch, roomId, joinedRoom === true]);


    const handleJoin = useCallback(() => {
        if(!unlimited && joinCount === maxCount) {
            message.error('인원수 초과로 더이상 가입 할 수 없는 스터디방입니다.');
            return false;
        }

        dispatch({
            type : JOIN_ROOM_REQUEST,
            data : roomId,
            meta: {
                callbackAction : () => {
                    // props.history.push(props.location.state ? props.location.state.from.pathname : "/");
                }
            }
        });

    }, [unlimited, joinCount, maxCount, dispatch, roomId]);


    const tabItems = [
        <PostsPage {...props} currentAccount={currentAccount} />,
        <MembersPage {...props} currentAccount={currentAccount} />
    ]

    if(loadingRoomDetail) {
        return (<Loading/>)
    }else {
        return (
            <div className='bg-gray'>
                <CoverWrap className='bg-gray'>
                    <img src={(coverImage ? `${SERVER_URI + '/api/v1/files/cover/' + coverImage}` : `${EmptyThumbnail}`) }
                         alt="cover_image" className={(coverImage && 'cover')}/>
                </CoverWrap>
        
                <div className='container'>
                    <ContentWrap>
                        <Row gutter={[16, 26]}>
                            <Col xs={24} md={8} lg={7}>
                                <Affix offsetTop={100}>
                                    <Sidebar room={roomDetail}
                                             id={roomId}
                                             location={props.location}
                                             join={handleJoin}
                                    />
                                </Affix>
                            </Col>
                            <Col xs={24} md={16} lg={17}>
                                <Card tabList={[{key : 0, tab : 'Posts'},{ key : 1, tab : 'Members'},{key : 2, tab : 'Chatting'}]}
                                      defaultActiveTabKey={tabKey} onTabChange={(key) => setTabKey(key)}>
                                    {currentAccount.member ? tabItems[tabKey] : <AccessMemberOnly/>}
                                </Card>
                            </Col>
                        </Row>
                    </ContentWrap>
                </div>
            </div>
        )
    }
}

export default RoomDetailPage;

const CoverWrap = styled.div`
    height : 22rem;
    text-align : center;

    img {
        height : 100%;
    }

    img.cover {
        object-fit: cover;
        width : 100%;
        background : #fff;
    }
`

const ContentWrap = styled.div`
    padding : 3rem 0;
    /* margin-top: 3rem;
    padding-bottom: 3rem; */
`