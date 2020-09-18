import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';

import { Typography, List } from 'antd';
import Card from 'components/List/RoomCard';

const { Title } = Typography;


const LatestRooms = (props) => {
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
        const params = Object.entries(pagination).map(e => e.join('=')).join('&') + '&orderType=CREATE_DATE';

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
            <Title level={3} style={{marginBottom : '1rem'}}>신규 스터디방</Title>
            {!loading &&
                <List
                    grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                    locale={{emptyText : '없음'}}
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

export default LatestRooms;

const ContentWrap = styled.div`
    
`
