import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SERVER_URI } from 'constants/index';
import { http } from 'utils/HttpHandler';
import { useHistory } from "react-router-dom";

import { Row, Col, Tabs, Card, Affix } from 'antd';

import EmptyThumbnail from 'assets/image/empty-thumbnail.png';

import Loading from 'components/Loading';
import Sidebar from './Sections/Sidebar';
import AccessMemberOnly from './Sections/AccessMemberOnly';

import PostsPage from 'pages/PostsPage';
import MembersPage from 'pages/MemebersPage';


// import {RoomDetailRouter} from 'routes';


const RoomDetailPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});
    const [tabKey, setTabKey] = useState(0);
    const [initialize, setInitialize] = useState(false);

    useEffect(() => {
        _getRoom();
    }, [initialize]);

    const _getRoom = () => {
        http.get(`/api/v1/room/${props.match.params.id}`)
        .then(response => {
            const data = response.data.data;
            setRoom(data);
            setLoading(false);
        })
    }

    if(loading) {
        return (<Loading/>)
    }else {
        return (
            <div className='bg-gray'>
                <CoverWrap className='bg-gray'>
                    <img src={(room.coverImage ? `${SERVER_URI + '/resource/room/cover-image/' + room.coverImage}` : `${EmptyThumbnail}`) }
                         alt="cover_image" className={(room.coverImage && 'cover')}/>
                </CoverWrap>
        
                <div className='container'>
                    <ContentWrap>
                        <Row gutter={[16, 26]}>
                            <Col xs={24} md={8} lg={7}>
                                <Affix offsetTop={100}>
                                    <Sidebar room={room} id={props.match.params.id} location={props.location} setInitialize={setInitialize}/>
                                </Affix>
                            </Col>
                            <Col xs={24} md={16} lg={17}>
                                <Card tabList={[{key : 0, tab : 'Posts'},{ key : 1, tab : 'Members'}]} 
                                      activeTabKey={tabKey} onTabChange={(key) => setTabKey(key)}>  
                                    {room.currentAccount.member ? 
                                        [<PostsPage {...props} currentAccount={room.currentAccount} />,
                                        <MembersPage {...props} currentAccount={room.currentAccount} />][tabKey] 
                                      : <AccessMemberOnly/>}
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