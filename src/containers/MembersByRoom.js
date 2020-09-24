import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_MEMBERS_REQUEST} from "store/modules/member";

import MemberRow from 'components/MemberRow';

import {Button, Input, List} from 'antd';
const { Search } = Input;

const MembersByRoom = (props) => {
    const roomId = props.match.params.id;
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const dispatch = useDispatch();
    const { members, loadingMembers, hasMoreMembers} = useSelector(state => state.member);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState(initPagination);


    useEffect(() => {
        dispatch({
            type : LOAD_MEMBERS_REQUEST,
            roomId,
            pagination,
        })
    },[pagination.page]);

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
            pagination : initPagination,
            keyword
        })
    }, [dispatch, initPagination, keyword]);


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
                loadMore={hasMoreMembers ?
                    (<MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                itemLayout="horizontal"
                dataSource={members}
                renderItem={item => (
                    <MemberRow currentAccount={props.currentAccount} account={item} loading={item.loading}/>
                )}
            />
        </ContentWrap>
    )
}

export default MembersByRoom;

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
