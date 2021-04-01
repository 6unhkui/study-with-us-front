import React, { useCallback, useEffect, useState } from "react";
import { Typography, Divider, Input, List } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { useRoomFilter } from "hooks/useRoomFilter";
import Pagination from "utils/pagination";
import useQuery from "hooks/useQuery";
import breakpoint from "styled-components-breakpoint";
import infiniteScroll from "utils/infiniteScroll";
import Card from "components/RoomCard";
import { LOAD_ROOMS_REQUEST } from "store/modules/room";
import CategoryMultiSelector from "containers/CategoryMultiSelector";
import RoomOrderSelector from "components/RoomOrderSelector";
import SEO from "components/SEO";

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
            return `카테고리 검색 결과`;
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
    }, [dispatch, paramCategoryId, paramKeyword]);

    function changePageNumber(pageNumber) {
        setPagination(state => ({
            ...state,
            page: pageNumber
        }));
    }

    const onScroll = infiniteScroll.bind(null, () => {
        if (hasMoreRooms && !loadingRooms) {
            // 리스트를 요청한다.
            dispatch({
                type: LOAD_ROOMS_REQUEST,
                pagination: Object.assign(pagination, { page: pagination.page + 1 }),
                categoryIds,
                orderType,
                keyword,
                meta: {
                    callbackAction: changePageNumber
                }
            });
        }
    });

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [hasMoreRooms, loadingRooms, onScroll]);

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

            if (!paramCategoryId) setTitle("스터디방 찾기");
        },
        [dispatch, categoryIds, keyword, orderType, paramCategoryId]
    );

    return (
        <div className="container content-wrap">
            <SEO title="스터디방 찾기" />
            <Title>{title}</Title>
            <Divider />
            <FilterWrap>
                <RoomOrderSelector onChange={setOrderType} onSelect={value => handleFilterChange("orderType", value)} />

                {!paramCategoryId && (
                    <CategoryMultiSelector
                        onChange={setCategoryIds}
                        onSelect={value => handleFilterChange("categoryIds", value)}
                    />
                )}

                <Search
                    className="search"
                    enterButton="Search"
                    placeholder="검색어를 입력하세요."
                    onSearch={value => handleFilterChange("keyword", value)}
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
