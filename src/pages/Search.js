import React, {useCallback, useEffect, useState} from 'react';
import {Typography, Divider, Input, List, Button} from 'antd';
import RoomOrderSelector from "../components/RoomOrderSelector";
import CategoryMultiSelector from "../containers/CategoryMultiSelector";
import styled from "styled-components";
import {LOAD_ROOMS_REQUEST} from "../store/modules/room";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/RoomCard";
import {getParameter} from "../utils/HttpHandler";
import {withRouter} from "react-router-dom";

import {useRoomFilter} from 'hooks/useRoomFilter';
import MoreButton from "../components/MoreButton";
import Pagination from 'utils/Pagination';

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const SearchPage = (props) => {

    const dispatch = useDispatch();
    const query = getParameter(props.location, 'query');
    const {
        keyword : [keyword, handleChangeKeyword],
        orderType : [orderType, handleChangeOrderType],
        categoryIds : [categoryIds, handleChangeCategoryIds]
    } = useRoomFilter({keyword : query ? query : ''});
    const [pagination, setPagination] = useState({...initPagination});
    const { rooms, hasMoreRooms } = useSelector(state => state.room);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_REQUEST,
            pagination,
            categoryIds,
            orderType,
            keyword : query ? query : ''
        })
    },[categoryIds, dispatch, orderType, pagination, pagination.page, query]);


    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_REQUEST,
            pagination : {...initPagination},
            categoryIds,
            orderType
        })
    },[categoryIds, dispatch, orderType]);


    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_ROOMS_REQUEST,
            pagination : {...initPagination},
            categoryIds,
            orderType,
            keyword
        })
    }, [categoryIds, dispatch, keyword, orderType]);


    return (
        <div className="container content-wrap">
             <Title>
                 {query && keyword.length > 0 ? `검색 결과 : ${keyword}` : '스터디방 찾기'}
             </Title>
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
                loadMore={hasMoreRooms ? (<MoreButton onClick={handleLoadMore}/>) : null}
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

export default withRouter(SearchPage);


const FilterWrap = styled.div`
    margin-bottom : 1.5rem;
    display: flex;

    .search {
        max-width: 300px;
        margin-left: auto;
    }
`

