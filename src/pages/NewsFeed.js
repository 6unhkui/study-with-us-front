import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_NEWS_FEED_REQUEST} from "store/modules/post";

import PostCard from 'components/PostCard';

import {Button, Input, List, Typography} from 'antd';

const { Title } = Typography;


const NewsFeed = (props) => {
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const dispatch = useDispatch();
    const { newsFeed, loadingNewsFeed, hasMoreNewsFeed} = useSelector(state => state.post);
    const [pagination, setPagination] = useState(initPagination);

    useEffect(() => {
        dispatch({
            type : LOAD_NEWS_FEED_REQUEST,
            pagination,
        })
    },[pagination.page]);

    const handleLoadMore = useCallback(() => {
        setPagination({
            ...pagination,
            page : ++pagination.page
        })
    }, [pagination]);

    return (
        <div className="container content-wrap">
            <Title>새글 피드</Title>
            <List
                grid={{ gutter: 20, column :1}}
                loading={loadingNewsFeed}
                loadMore={hasMoreNewsFeed ?
                    (<MoreBtnWrap><Button ghost type="primary" onClick={handleLoadMore}>load more</Button></MoreBtnWrap>) : null}
                dataSource={newsFeed}
                renderItem={item => (
                    <List.Item>
                        <PostCard {...item} showRoomName={true}/>
                    </List.Item>
                )}
            />
        </div>
    )
}

export default NewsFeed;

const MoreBtnWrap = styled.div`
    text-align : center;
    margin-top : 2rem;
`
