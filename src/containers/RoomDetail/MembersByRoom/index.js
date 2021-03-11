import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MEMBERS_REQUEST} from "store/modules/member";

import MemberRow from 'components/MemberRow';
import Pagination from 'utils/Pagination';

import {Button, Input, List} from 'antd';
const { Search } = Input;


const initPagination = new Pagination();
Object.freeze(initPagination);

const Index = (props) => {
    const roomId = props.match.params.id;
    const dispatch = useDispatch();
    const { members, loadingMembers, hasMoreMembers} = useSelector(state => state.member);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState({...initPagination});

    useEffect(() => {
        dispatch({
            type : LOAD_MEMBERS_REQUEST,
            roomId,
            pagination,
        })
    },[dispatch, pagination, pagination.page, roomId]);

    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);


    const handleChangeKeyword = useCallback(e => {
        setKeyword(e.target.value);
    }, []);

    const handleSubmitKeyword = useCallback(() => {
        dispatch({
            type : LOAD_MEMBERS_REQUEST,
            roomId,
            pagination : {...initPagination},
            keyword
        })
    }, [dispatch, keyword, roomId]);


    return (
        <ContentWrap>
            <Search
                className='search'
                enterButton="Search"
                placeholder="검색어를 입력하세요."
                style={{marginBottom : '1.8rem'}}
                onSearch={handleSubmitKeyword}
                onChange={handleChangeKeyword}
                value={keyword}
            />

            <List
                loading={loadingMembers}
                loadMore={hasMoreMembers &&
                        <MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>}
                itemLayout="horizontal"
                dataSource={members}
                renderItem={item => (
                    <MemberRow key={item.memberId} idx={item.memberId} member={item} loading={loadingMembers}/>
                )}
            />
        </ContentWrap>
    )
}

export default Index;

const ContentWrap = styled.div`
    /* flex : 1; */
    /* padding : 2rem; */

    img.cover {
        object-fit : cover;
        height : 200px;
    }
`

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`