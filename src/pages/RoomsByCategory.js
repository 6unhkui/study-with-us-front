import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Typography, Divider, List, Input } from "antd";

import Card from "components/RoomCard";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_ROOMS_BY_CATEGORY_REQUEST } from "store/modules/room";
import RoomOrderSelector from "components/RoomOrderSelector";
import { useRoomFilter } from "hooks/useRoomFilter";
import Pagination from "utils/Pagination";

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const RoomsByCategory = props => {
    const categoryId = props.match.params.id;
    const dispatch = useDispatch();
    const [pagination, setPagination] = useState({ ...initPagination });
    const { roomsByCategory, hasMoreRoomsByCategory, loadingRoomsByCategory } = useSelector(state => state.room);
    const {
        keyword: [keyword, setKeyword],
        orderType: [orderType, setOrderType]
    } = useRoomFilter();

    useEffect(() => {
        dispatch({
            type: LOAD_ROOMS_BY_CATEGORY_REQUEST,
            pagination: initPagination,
            categoryIds: [categoryId]
        });
    }, [categoryId, dispatch]);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreRoomsByCategory && !loadingRoomsByCategory) {
                    // 리스트를 요청한다.
                    dispatch({
                        type: LOAD_ROOMS_BY_CATEGORY_REQUEST,
                        pagination: Object.assign(pagination, { page: ++pagination.page }),
                        categoryIds: [categoryId],
                        orderType,
                        keyword,
                        meta: {
                            callbackAction: changePageNumber
                        }
                    });
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [categoryId, dispatch, hasMoreRoomsByCategory, keyword, loadingRoomsByCategory, orderType, pagination]);

    const handleFilterChange = useCallback(
        (key, value) => {
            // 필터를 변경했을 때
            dispatch({
                type: LOAD_ROOMS_BY_CATEGORY_REQUEST,
                pagination: initPagination,
                categoryIds: [categoryId],
                orderType,
                keyword,
                [key]: value
            });

            // Pagination state를 초기화한다.
            setPagination({ ...initPagination });
        },
        [categoryId, dispatch, keyword, orderType]
    );

    function changePageNumber(pageNumber) {
        setPagination(pagination => ({
            ...pagination,
            page: pageNumber
        }));
    }

    return (
        <div className="container content-wrap">
            <Title>{props.location.state && props.location.state.name}</Title>
            <Divider />

            <FilterWrap>
                <RoomOrderSelector onChange={setOrderType} onSelect={orderType => handleFilterChange("orderType", orderType)} />
                <Search
                    className="search"
                    enterButton="Search"
                    placeholder="검색어를 입력하세요."
                    onSearch={keyword => handleFilterChange("keyword", keyword)}
                    onChange={setKeyword}
                    value={keyword}
                />
            </FilterWrap>

            <List
                grid={{ gutter: 20, xs: 1, sm: 2, column: 3 }}
                dataSource={roomsByCategory}
                renderItem={item => (
                    <List.Item>
                        <Card {...item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default RoomsByCategory;

const FilterWrap = styled.div`
    margin-bottom: 1.5rem;
    display: flex;

    .search {
        max-width: 300px;
        margin-left: auto;
    }
`;
