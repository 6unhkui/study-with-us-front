import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';

import { Typography, List } from 'antd';
import Card from 'components/List/RoomCard';

const { Title } = Typography;


const PopularRooms = (props) => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [pagination, setPagination] = useState({
        page : 1,
        size : 3,
        direction : 'ASC',
        totalElements : 0
    });

    useEffect(() => {
        _getRooms();
    },[]);


    const _getRooms = () => {
        const params = Object.entries(pagination).map(e => e.join('=')).join('&');

        http.get(`/api/v1/rooms?${params}`)
        .then(response => {
            const data = response.data.data;
            setRooms(rooms.concat(data.content));
            setPagination({
                ...pagination,
                totalElements : data.totalElements
            })
            setLoading(false);
        })
    }


    return (
        <ContentWrap style={{...props.style}}>
            <Title level={3} style={{marginBottom : '1rem'}}>지금, 인기 스터디방</Title>
            {!loading &&
                <List
                    grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                    // loadMore={!loading && hasMore ? (<MoreBtnWrap> <Button onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                    dataSource={rooms}
                    renderItem={item => (
                        <List.Item>
                            <Card {...item}/>
                        </List.Item>
                    )}
                />}
        </ContentWrap>
    )
}

export default PopularRooms;

const ContentWrap = styled.div`
    
`
