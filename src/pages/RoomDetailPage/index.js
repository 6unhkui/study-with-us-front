import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { SERVER_URI } from 'constants/index';
import { http } from 'utils/HttpHandler';
import { withRouter } from "react-router-dom";

import { Button, Avatar, Tooltip} from 'antd';
import { UserOutlined } from '@ant-design/icons';

import Loading from 'components/Loading';

const StudyRoomPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [room, setRoom] = useState({});

    useEffect(() => {
        _getRoom();
    }, []);

    const _getRoom = () => {
        http.get(`/api/v1/room/${props.match.params.idx}`)
        .then(response => {
            const data = response.data.data;
            setRoom(data);
            setLoading(false);
        })
    }

    const join = () => {
        http.post(`/api/v1/room/${props.match.params.idx}/join`)
        .then(response => {
            console.log(response)
        })
    }

    if(loading) {
        return (<Loading/>)
    }else {
        return (
            <div>
                <CoverWrap>
                    {room.coverImage &&
                        <img src={SERVER_URI + '/resource/room/cover-image/' + room.coverImage} alt="cover"/> }
                </CoverWrap>
        
                <div className='container content-wrap'>
                <Button type="primary" onClick={join}>가입</Button>
                <h1>{room.name}</h1>
                <div>{room.description}</div>
                {
                    room.members && (
                        <Avatar.Group maxCount={10} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                            {
                                room.members.map(v => (
                                    <Tooltip title={v.name} placement="top">
                                        <Avatar style={{ backgroundColor: '#87d068' }} src={v.profileImg} icon={<UserOutlined />}/>
                                    </Tooltip>
                                ))
                            }
                    </Avatar.Group>
                    )
                }
                </div>
            </div>
        )
    }
}

export default withRouter(StudyRoomPage);

const CoverWrap = styled.div`
    height : 320px;

    img {
        height : 100%;
        width : 100%;
        object-fit: cover;
    }
`