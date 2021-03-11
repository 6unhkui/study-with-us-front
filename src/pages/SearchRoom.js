import React, { useCallback, useEffect, useState } from "react";
import { Typography, Divider, Input, List } from "antd";
import RoomOrderSelector from "../components/RoomOrderSelector";
import CategoryMultiSelector from "../containers/CategoryMultiSelector";
import styled from "styled-components";
import { LOAD_ROOMS_REQUEST } from "../store/modules/room";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/RoomCard";
import { withRouter } from "react-router-dom";

import { useRoomFilter } from "hooks/useRoomFilter";
import Pagination from "utils/Pagination";
import useQuery from "hooks/useQuery";
import breakpoint from "styled-components-breakpoint";

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const SearchPage = props => {
    const dispatch = useDispatch();
    const query = useQuery();
    const paramKeyword = query.get("keyword");
    const paramCategoryId = query.get("categoryId");
    const { rooms, hasMoreRooms, loadingRooms } = useSelector(state => state.room);
    const [pagination, setPagination] = useState({ ...initPagination });
    const {
        keyword: [keyword, setKeyword],
        orderType: [orderType, setOrderType],
        categoryIds: [categoryIds, setCategoryIds]
    } = useRoomFilter({ keyword: paramKeyword, categoryIds: paramCategoryId ? [paramCategoryId] : null });
    const [title, setTitle] = useState(() => {
        if (paramKeyword) {
            return `검색 결과 : ${paramKeyword}`;
        }
        if (paramCategoryId) {
            if (props?.location?.state?.name) return props.location.state.name;
            else return `카테고리 검색 결과`;
        }
        return `스터디방 찾기`;
    });

    useEffect(() => {
        dispatch({
            type: LOAD_ROOMS_REQUEST,
            pagination: initPagination,
            keyword: paramKeyword,
            categoryIds: paramCategoryId ? [paramCategoryId] : null
        });
    }, [dispatch, paramCategoryId, paramKeyword, props]);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreRooms && !loadingRooms) {
                    // 리스트를 요청한다.
                    dispatch({
                        type: LOAD_ROOMS_REQUEST,
                        pagination: Object.assign(pagination, { page: ++pagination.page }),
                        categoryIds,
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
    }, [categoryIds, dispatch, hasMoreRooms, keyword, loadingRooms, orderType, pagination]);

    const handleFilterChange = useCallback(
        (key, value) => {
            // 필터를 변경했을 때
            dispatch({
                type: LOAD_ROOMS_REQUEST,
                pagination: initPagination,
                categoryIds,
                orderType,
                keyword,
                [key]: value
            });

            // Pagination state를 초기화한다.
            setPagination({ ...initPagination });
            !paramCategoryId && setTitle("스터디방 찾기");
        },
        [categoryIds, dispatch, keyword, orderType, paramCategoryId]
    );

    function changePageNumber(pageNumber) {
        setPagination(pagination => ({
            ...pagination,
            page: pageNumber
        }));
    }

    return (
        <div className="container content-wrap">
            <Title>{title}</Title>
            <Divider />
            <FilterWrap>
                <RoomOrderSelector onChange={setOrderType} onSelect={orderType => handleFilterChange("orderType", orderType)} />

                {!paramCategoryId && (
                    <CategoryMultiSelector
                        onChange={setCategoryIds}
                        onSelect={categoryIds => handleFilterChange("categoryIds", categoryIds)}
                    />
                )}

                <Search
                    className="search"
                    enterButton="Search"
                    placeholder="검색어를 입력하세요."
                    onSearch={keyword => handleFilterChange("keyword", keyword)}
                    onChange={e => setKeyword(e.target.value)}
                    value={keyword}
                />
            </FilterWrap>

            <List
                grid={{ gutter: 20, xs: 1, sm: 1, md: 2, lg: 2, column: 3 }}
                dataSource={rooms}
                renderItem={item => (
                    <List.Item>
                        <Card {...item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default withRouter(SearchPage);

const FilterWrap = styled.div`
    margin-bottom: 1.5rem;
    display: block;

    .search {
        max-width: initial;
        margin-top: 12px;
    }

    ${breakpoint("desktop")`
        display: flex;

        .search {
            max-width: 300px;
            margin-left: auto;
        }
    `}
`;
