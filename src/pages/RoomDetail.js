import React, {useEffect, useCallback} from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_ROOM_DETAIL_REQUEST, JOIN_ROOM_REQUEST} from "store/modules/room";
import {
    Sidebar, AccessMemberOnly,
    AttendanceCheck, AttendanceRecord, MembersByRoom as Members, PostsByRoom as Posts
} from 'containers/RoomDetail';
import Loading from 'components/Loading';
import {useTabs} from "hooks/useTabs";
import {Redirect} from "react-router-dom";

import {Row, Col, Card, message} from 'antd';
import loadFile from 'utils/loadFile';

class TabItem {
    constructor(tab, content) {
        this.tab = tab;
        this.content = content;
    }
}
const RoomDetailPage = (props) => {
    const roomId = props.match.params.id;
    const dispatch = useDispatch();
    const {
        loadingRoomDetail,loadRoomDetailError, roomDetail, joinedRoom,
        roomDetail : {coverImage, isMember, unlimited, joinCount, maxCount}
    } = useSelector(state => state.room);

    const tabItems = [
        new TabItem('출석 체크', <AttendanceCheck {...props}/>),
        new TabItem('출석 기록', <AttendanceRecord {...props}/>),
        new TabItem('게시글', <Posts {...props}/>),
        new TabItem('멤버', <Members {...props}/>)
    ];
    
    const {currentItem, changeItem} = useTabs(0, tabItems);


    useEffect(() => {
        dispatch({
            type : LOAD_ROOM_DETAIL_REQUEST,
            data : roomId
        })
    }, [dispatch, roomId, joinedRoom]);


    const handleJoin = useCallback(() => {
        if(!unlimited && joinCount === maxCount) {
            message.error('인원수 초과로 더이상 가입 할 수 없는 스터디방입니다.');
            return false;
        }

        dispatch({
            type : JOIN_ROOM_REQUEST,
            data : roomId,
            meta: {
                callbackAction : () => {}
            }
        });

    }, [unlimited, joinCount, maxCount, dispatch, roomId]);


    if(loadRoomDetailError) {
        return (<Redirect to='/404'/>)
    }if(loadingRoomDetail) {
        return (<Loading/>)
    }else {
        return (
            <div className='bg-gray'>
                <CoverWrap className='bg-gray'>
                    <img src={loadFile(coverImage, 'cover')}
                         alt="cover_image" className={(coverImage && 'cover')}/>
                </CoverWrap>
        
                <div className='container'>
                    <ContentWrap>
                        <Row gutter={[16, 26]}>
                            <Col xs={24} md={8} lg={7}>
                                <Sidebar id={roomId}
                                         location={props.location}
                                         room={roomDetail}
                                         join={handleJoin}
                                />
                            </Col>
                            <Col xs={24} md={16} lg={17}>
                                <Card tabList={tabItems.map((item, i) => {return {...item, key : i}})}
                                      defaultActiveTabKey={0}
                                      onTabChange={key => changeItem(key)}
                                >
                                    {isMember ? currentItem.content : <AccessMemberOnly/>}
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
    ${breakpoint('tablet')`
        height : 22rem;
    `}
    
    ${breakpoint('mobile')`
        height : 8rem;
    `}
    
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
    ${breakpoint('tablet')`
        padding : 3rem 0;
    `}
    
    ${breakpoint('mobile')`
        padding : 1rem 0;
    `}
    
    /* margin-top: 3rem;
    padding-bottom: 3rem; */
`