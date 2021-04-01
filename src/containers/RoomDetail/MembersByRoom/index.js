import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_MEMBERS_REQUEST } from "store/modules/member";
import MemberRow from "components/MemberRow";
import Pagination from "utils/pagination";
import { Input, List } from "antd";
import infiniteScroll from "utils/infiniteScroll";

const { Search } = Input;

const initPagination = new Pagination();
Object.freeze(initPagination);

const Index = props => {
    const roomId = props?.match.params.id;
    const dispatch = useDispatch();
    const { members, loadingMembers, hasMoreMembers } = useSelector(state => state.member);
    const [keyword, setKeyword] = useState("");
    const [pagination, setPagination] = useState({ ...initPagination });

    useEffect(() => {
        dispatch({
            type: LOAD_MEMBERS_REQUEST,
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
        if (hasMoreMembers && !loadingMembers) {
            // 리스트를 요청한다.
            dispatch({
                type: LOAD_MEMBERS_REQUEST,
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
    }, [hasMoreMembers, loadingMembers, onScroll]);

    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type: LOAD_MEMBERS_REQUEST,
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
                loading={loadingMembers}
                itemLayout="horizontal"
                dataSource={members}
                renderItem={item => <MemberRow key={item.memberId} idx={item.memberId} member={item} loading={loadingMembers} />}
            />
        </ContentWrap>
    );
};

export default Index;

const ContentWrap = styled.div`
    img.cover {
        object-fit: cover;
        height: 200px;
    }
`;
