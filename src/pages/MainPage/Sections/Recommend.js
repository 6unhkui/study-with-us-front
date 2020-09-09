import React, {useState, useEffect, useRef} from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';

import { Typography, Button, Select, Divider, List, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from 'components/List/RoomCard';

const { Search } = Input;
const { Title } = Typography;


const Recommend = () => {
    const [loading, setLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [pagination, setPagination] = useState({
        page : 1,
        size : 6,
        direction : 'ASC',
        totalElements : 0
    });

    useEffect(() => {
        _getRooms();
    },[]);

    const _getRooms = () => {
        setLoading(true);

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
        <div className="container">
            <ContentWrap>
            <Title level={2}>원하는 주제를 선택하세요</Title>
            <Search placeholder="input search text" 
                    onSearch={value => console.log(value)} 
                    enterButton size="large" 
                    className='search-wrap'/>

            <List
                grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                loading={loading}
                // loadMore={!loading && hasMore ? (<MoreBtnWrap> <Button onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                dataSource={rooms}
                renderItem={item => (
                    <List.Item>
                        <Card {...item}/>
                    </List.Item>
                )}
            />
            </ContentWrap>
        </div>
    )
}

export default Recommend;

const ContentWrap = styled.div`
    /* text-align: center; */
    margin-top: 3rem;

    .search-wrap {
        max-width : 600px;
        margin-top : .6rem;
    }
`