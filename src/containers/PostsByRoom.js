import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_POSTS_REQUEST} from "store/modules/post";

import PostCard from 'components/PostCard';

import {Button, Input, List} from 'antd';
const { Search } = Input;



const PostsByRoom = (props) => {
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const roomId = props.match.params.id;
    const dispatch = useDispatch();
    const { posts, loadingPosts, hasMorePosts} = useSelector(state => state.post);
    const [keyword, setKeyword] = useState('');
    const [pagination, setPagination] = useState(initPagination);


    useEffect(() => {
        dispatch({
            type : LOAD_POSTS_REQUEST,
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
            type : LOAD_POSTS_REQUEST,
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
                grid={{ gutter: 20, column :1}}
                loading={loadingPosts}
                loadMore={hasMorePosts ?
                         (<MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                dataSource={posts}
                renderItem={item => (
                    <List.Item>
                        <PostCard {...item}/>
                    </List.Item>
                )}
            />
        </ContentWrap>
    )
}

export default PostsByRoom;

const ContentWrap = styled.div`
`

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`
