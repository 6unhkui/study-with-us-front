import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "store/modules/post";
import PostCard from "components/PostCard";
import Pagination from "utils/pagination";
import infiniteScroll from "utils/infiniteScroll";

import { Input, List } from "antd";

const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const Index = props => {
    const roomId = props?.match.params.id;
    const dispatch = useDispatch();
    const { posts, loadingPosts, hasMorePosts } = useSelector(state => state.post);
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState({ ...initPagination });

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
            roomId,
            pagination: initPagination
        });
    }, [dispatch, roomId]);

    function changePageNumber(pageNumber) {
        setPagination(state => ({
            ...state,
            page: pageNumber
        }));
    }

    const onScroll = infiniteScroll.bind(null, () => {
        if (hasMorePosts && !loadingPosts) {
            // 리스트를 요청한다.
            dispatch({
                type: LOAD_POSTS_REQUEST,
                roomId,
                pagination: Object.assign(pagination, { page: pagination.page + 1 }),
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
    }, [hasMorePosts, loadingPosts, onScroll]);

    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
            roomId,
            pagination: initPagination,
            keyword
        });

        // Pagination state를 초기화한다.
        setPagination({ ...initPagination });
    }, [dispatch, keyword, roomId]);

    return (
        <ContentWrap>
            <Search
                className="search"
                enterButton="Search"
                placeholder="검색어를 입력하세요."
                style={{ marginBottom: "1.8rem" }}
                onSearch={handleSubmitKeyword}
                onChange={handleChangeKeyword}
                value={keyword}
            />

            <List
                grid={{ gutter: 20, column: 1 }}
                loading={loadingPosts}
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <PostCard {...item} />
                    </List.Item>
                )}
            />
        </ContentWrap>
    );
};

export default Index;

const ContentWrap = styled.div``;
