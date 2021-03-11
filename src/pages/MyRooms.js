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
import Pagination from "utils/Pagination";
import breakpoint from "styled-components-breakpoint";

const { Title } = Typography;
const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const MyStudyRoomPage = props => {
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

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreMyRooms && !loadingMyRooms) {
                    // 리스트를 요청한다.
                    dispatch({
                        type: LOAD_MY_ROOMS_REQUEST,
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
    }, [categoryIds, dispatch, hasMoreMyRooms, keyword, loadingMyRooms, orderType, pagination]);

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

    function changePageNumber(pageNumber) {
        setPagination(pagination => ({
            ...pagination,
            page: pageNumber
        }));
    }

    return (
        <div className="container content-wrap">
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
                <RoomOrderSelector onChange={setOrderType} onSelect={orderType => handleFilterChange("orderType", orderType)} />
                <CategoryMultiSelector
                    onChange={setCategoryIds}
                    onSelect={categoryIds => handleFilterChange("categoryIds", categoryIds)}
                />
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
