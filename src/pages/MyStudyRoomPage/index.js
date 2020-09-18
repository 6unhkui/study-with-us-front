import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import { Typography, Button, Select, Divider, List, Input} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import Card from 'components/List/RoomCard';
import RoomOrderSelect from 'components/Filter/RoomOrderSelect';

import CategorySelect from 'components/Filter/CategorySelect';

const { Title } = Typography;
const { Search } = Input;

const MyStudyRoomPage = () => {
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [rooms, setRooms] = useState([]);

    const [orderType, setOrderType] = useState('NAME');
    const [categoriesId, setCategoriesId] = useState([]);
    const [keyword, setKeyword] = useState('');
    
    const [pagination, setPagination] = useState({
        page : 1,
        size : 6,
        direction : 'ASC',
        totalElements : 0
    });

    const [initialize, setInitialize] = useState(false);
    

    useEffect(() => {
        _getRooms();
    },[initialize]);


    const _getRooms = () => {
        setHasMore(false);
        setLoading(true);

        const params = Object.entries(pagination).map(e => e.join('=')).join('&') 
                       + `&keyword=${keyword}&orderType=${orderType}&categoriesId=${categoriesId.join(",")}`;

        http.get(`/api/v1/user/rooms?${params}`)
        .then(response => {
            const data = response.data.data;
            setRooms(rooms.concat(data.content));
            setPagination({
                ...pagination,
                totalElements : data.totalElements
            })

            if(!data.last) setHasMore(true);
        
            setLoading(false);
        })
    }

    const handleLoadMore = () => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
        _getRooms();
    }


    // Filter Change - s ////////////////////////////////////
    const onChangeOrderType = val => {
        setOrderType(val);
        handleChangeFilter();
    }

    const onChangeCategoriseId = val => {
        setCategoriesId(val);
        handleChangeFilter();
    }

    const handleChangeFilter = () => {
        initList();
    }

    function initList() {
        // setState로 state를 변경했을 때, 비동기로 값이 변경됨
        // initialize 값을 따로 두고, 그 값에 따라 리스트 데이터를 불러오는 _getRooms() 함수를 실행하도록 함
        setRooms([]);
        setPagination({
            page : 1,
            size : 6,
            direction : 'ASC',
            totalElements : 0
        });
        setInitialize(!initialize)
    }
    // Filter Change - e ////////////////////////////////////


    return (
        <div className="container content-wrap">
            <TitleWrap>
                <Title>나의 스터디방</Title>
                <Link to="/room/create">
                    <Button type="primary" ghost className="shadow" icon={<PlusOutlined />}>스터디방 만들기</Button>
                </Link>
            </TitleWrap>

            <Divider/>

            <FilterWrap>
                
                <RoomOrderSelect onChange={onChangeOrderType}/>
                <CategorySelect onChange={onChangeCategoriseId} style={{marginLeft : '10px'}}/>

                <Search
                    className='search'
                    placeholder="검색어를 입력하세요."
                    onSearch={handleChangeFilter}
                    onChange={(e) => {setKeyword(e.target.value)}}
                    value={keyword}
                />
             </FilterWrap>

            <List
                grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                loading={loading}
                loadMore={!loading && hasMore ? (<MoreBtnWrap> <Button onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                dataSource={rooms}
                renderItem={item => (
                    <List.Item>
                        <Card {...item}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default MyStudyRoomPage;

const TitleWrap = styled.div`
    display : flex;

    h1 {
        flex : 1;
    }
`

const FilterWrap = styled.div`
    margin-bottom : 1rem;
    display: flex;

    .search {
        max-width: 300px;
        margin-left: auto;
    }
`

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`