import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MY_ROOMS_REQUEST} from "store/modules/room";
import {LOAD_CATEGORIES_REQUEST} from "store/modules/category";
import Card from 'components/RoomCard';
import RoomOrderSelector from 'components/RoomOrderSelector';

import { Typography, Button, Divider, List, Input, Select} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const MyStudyRoomPage = (props) => {
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const dispatch = useDispatch();
    const { myRooms, hasMoreMyRooms } = useSelector(state => state.room);
    const [orderType, setOrderType] = useState(null);
    const [categoriesId, setCategoriesId] = useState([]);
    const { categories, loadingCategories } = useSelector(state => state.category);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState(initPagination);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        })
    },[]);

    useEffect(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination,
            categoriesId,
            orderType
        })
    },[pagination.page]);

    useEffect(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination : initPagination,
            categoriesId,
            orderType
        })
    },[categoriesId, orderType]);


    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    const handleChangeOrderType = useCallback(value => {
        setOrderType(value);
    }, []);

    const handleChangeCategoriseId = useCallback(value => {
        setCategoriesId(value);
    }, []);

    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_MY_ROOMS_REQUEST,
            pagination : initPagination,
            categoriesId,
            orderType,
            keyword
        })
    }, [categoriesId, dispatch, initPagination, keyword, orderType]);
 

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
                <Select
                    mode="multiple"
                    allowClear
                    style={{minWidth: '200px', marginLeft: '10px'}}
                    placeholder="카테고리를 선택해주세요."
                    showSearch={false}
                    onChange={handleChangeCategoriseId}
                >
                    {categories.map(v => <Option key={v.categoryId}>{v.name}</Option>)}
                </Select>

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
                         (<MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                dataSource={myRooms}
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