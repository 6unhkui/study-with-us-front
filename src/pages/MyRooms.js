import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MY_ROOMS_REQUEST } from "store/modules/room";
import Card from "components/RoomCard";
import RoomOrderSelector from "components/RoomOrderSelector";
import { Typography, Button, Divider, List, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import CategoryMultiSelector from "containers/CategoryMultiSelector";
import { useRoomFilter } from "hooks/useRoomFilter";
import Pagination from "utils/pagination";
import breakpoint from "styled-components-breakpoint";
import infiniteScroll from "utils/infiniteScroll";
import SEO from "components/SEO";

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const MyStudyRoomPage = () => {
    const dispatch = useDispatch();
    const { myRooms, hasMoreMyRooms, loadingMyRooms } = useSelector(state => state.room);
    const [pagination, setPagination] = useState({ ...initPagination });
    const {
        keyword: [keyword, setKeyword],
        orderType: [orderType, setOrderType],
        categoryIds: [categoryIds, setCategoryIds]
    } = useRoomFilter();

    useEffect(() => {
        // 처음 페이지가 렌더링 될 때
        dispatch({
            type: LOAD_MY_ROOMS_REQUEST,
            pagination: initPagination
        });
    }, [dispatch]);

    function changePageNumber(pageNumber) {
        setPagination(state => ({
            ...state,
            page: pageNumber
        }));
    }

    const onScroll = infiniteScroll.bind(null, () => {
        if (hasMoreMyRooms && !loadingMyRooms) {
            // 리스트를 요청한다.
            dispatch({
                type: LOAD_MY_ROOMS_REQUEST,
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
    }, [hasMoreMyRooms, loadingMyRooms, onScroll]);

    const handleFilterChange = useCallback(
        (key, value) => {
            // 필터를 변경했을 때
            dispatch({
                type: LOAD_MY_ROOMS_REQUEST,
                pagination: initPagination,
                categoryIds,
                orderType,
                keyword,
                [key]: value
            });

            // Pagination state를 초기화한다.
            setPagination({ ...initPagination });
        },
        [categoryIds, dispatch, keyword, orderType]
    );

    return (
        <div className="container content-wrap">
            <SEO title="나의 스터디방" />
            <TitleWrap>
                <Title>나의 스터디방</Title>
                <Link to="/room/create">
                    <Button type="primary" ghost className="shadow" icon={<PlusOutlined />} size="large">
                        스터디방 만들기
                    </Button>
                </Link>
            </TitleWrap>

            <Divider />

            <FilterWrap>
                <RoomOrderSelector onChange={setOrderType} onSelect={value => handleFilterChange("orderType", value)} />
                <CategoryMultiSelector onChange={setCategoryIds} onSelect={value => handleFilterChange("categoryIds", value)} />
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
                dataSource={myRooms}
                renderItem={item => (
                    <List.Item key={item.roomId}>
                        <Card {...item} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default MyStudyRoomPage;

const TitleWrap = styled.div`
    display: flex;

    h1 {
        flex: 1;
    }
`;

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
