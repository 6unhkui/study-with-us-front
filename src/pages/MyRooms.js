import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MY_ROOMS_REQUEST} from "store/modules/room";
import Card from 'components/RoomCard';
import RoomOrderSelector from 'components/RoomOrderSelector';
import { Typography, Button, Divider, List, Input} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import CategoryMultiSelector from "containers/CategoryMultiSelector";
import {useRoomFilter} from "hooks/useRoomFilter";
import MoreButton from "components/MoreButton";
import Pagination from 'utils/Pagination';

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const MyStudyRoomPage = (props) => {
    const dispatch = useDispatch();
    const { myRooms, hasMoreMyRooms } = useSelector(state => state.room);
    const [pagination, setPagination] = useState({...initPagination});
    const {
        keyword : [keyword, handleChangeKeyword],
        orderType : [orderType, handleChangeOrderType],
        categoryIds : [categoryIds, handleChangeCategoryIds]
    } = useRoomFilter();

    useEffect(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination,
            categoryIds,
            orderType
        })
    },[categoryIds, dispatch, orderType, pagination, pagination.page]);

    useEffect(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination : initPagination,
            categoryIds,
            orderType,
        })
    }, [categoryIds, dispatch, orderType]);


    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination : initPagination,
            categoryIds,
            orderType,
            keyword
        })
    }, [categoryIds, dispatch, keyword, orderType]);

    return (
        <div className="container content-wrap">
            <TitleWrap>
                <Title>나의 스터디방</Title>
                <Link to="/room/create">
                    <Button type="primary" ghost className="shadow"
                            icon={<PlusOutlined />}
                            size="large"
                    >
                        스터디방 만들기
                    </Button>
                </Link>
            </TitleWrap>

            <Divider/>

            <FilterWrap>
                <RoomOrderSelector onSubmit={handleChangeOrderType}/>
                <CategoryMultiSelector onChange={handleChangeCategoryIds}/>
                <Search
                    className='search'
                    enterButton="Search"
                    placeholder="검색어를 입력하세요."
                    onSearch={handleSubmitKeyword}
                    onChange={handleChangeKeyword}
                    value={keyword}
                />
             </FilterWrap>

            <List
                grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                loadMore={hasMoreMyRooms ?
                         (<MoreButton onClick={handleLoadMore}/>) : null}
                dataSource={myRooms}
                renderItem={item => (
                    <List.Item key={item.roomId}>
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
    margin-bottom : 1.5rem;
    display: flex;

    .search {
        max-width: 300px;
        margin-left: auto;
    }
`
