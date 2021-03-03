import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Typography, Divider, List, Input} from 'antd';

import Card from 'components/RoomCard';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_ROOMS_BY_CATEGORY_REQUEST} from "store/modules/room";
import RoomOrderSelector from "components/RoomOrderSelector";
import {useRoomFilter} from "hooks/useRoomFilter";
import MoreButton from "components/MoreButton";
import Pagination from 'utils/Pagination';

const { Title } = Typography;
const { Search } = Input;


const initPagination = new Pagination();
Object.freeze(initPagination);

const RoomsByCategory = (props) => {
    const categoryId = props.match.params.id;
    const dispatch = useDispatch();
    const {
        keyword : [keyword, handleChangeKeyword],
        orderType : [orderType, handleChangeOrderType],
    } = useRoomFilter();
    const [pagination, setPagination] = useState({...initPagination});
    const { roomsByCategory, hasMoreRoomsByCategory } = useSelector(state => state.room);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination,
            categoryIds : [categoryId],
            orderType
        })
    },[categoryId, dispatch, orderType, pagination, pagination.page]);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination : {...initPagination},
            categoryIds : [categoryId],
            orderType
        })
    },[categoryId, dispatch, orderType]);


    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination : initPagination,
            categoryIds : [categoryId],
            orderType,
            keyword
        })
    }, [categoryId, dispatch, keyword, orderType]);


    return (
        <div className="container content-wrap">
            <Title>{props.location.state && props.location.state.name}</Title>
            <Divider/>

            <FilterWrap>
                <RoomOrderSelector onSubmit={handleChangeOrderType}/>
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
                loadMore={hasMoreRoomsByCategory ?
                         (<MoreButton onClick={handleLoadMore}/>) : null}
                dataSource={roomsByCategory}
                renderItem={item => (
                    <List.Item>
                        <Card {...item}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default RoomsByCategory;

const FilterWrap = styled.div`
    margin-bottom : 1.5rem;
    display: flex;

    .search {
        max-width: 300px;
        margin-left: auto;
    }
`
