import React, {useState, useEffect, useRef, useCallback} from 'react';
import styled from 'styled-components';
import { Typography, Button,  Divider, List, Input} from 'antd';

import Card from 'components/RoomCard';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_ROOMS_BY_CATEGORY_REQUEST} from "store/modules/room";
import RoomOrderSelector from "components/RoomOrderSelector";

const { Title } = Typography;
const { Search } = Input;


const RoomsByCategory = (props) => {
    const categoryId = props.match.params.id;

    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const [orderType, setOrderType] = useState(null);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState(initPagination);

    const dispatch = useDispatch();
    const { roomsByCategory, hasMoreRoomsByCategory } = useSelector(state => state.room);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination,
            categoriesId : [categoryId],
            orderType
        })
    },[pagination.page]);

    useEffect(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination : initPagination,
            categoriesId : [categoryId],
            orderType
        })
    },[orderType]);


    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleChangeOrderType = useCallback(value => {
        setOrderType(value);
    }, []);


    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination : initPagination,
            categoriesId : [categoryId],
            orderType,
            keyword
        })
    }, [dispatch, initPagination, keyword, orderType]);



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
                         (<MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
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

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`
