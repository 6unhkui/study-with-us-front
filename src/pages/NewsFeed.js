import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_NEWS_FEED_REQUEST } from "store/modules/post";
import PostCard from "components/PostCard";
import Pagination from "utils/pagination";
import { List, Typography } from "antd";
import infiniteScroll from "utils/infiniteScroll";
import SEO from "components/SEO";

const { Title } = Typography;

const initPagination = new Pagination();
Object.freeze(initPagination);

const NewsFeed = () => {
    const dispatch = useDispatch();
    const { newsFeed, loadingNewsFeed, hasMoreNewsFeed } = useSelector(state => state.post);
    const [pagination, setPagination] = useState({ ...initPagination });

    useEffect(() => {
        dispatch({
            type: LOAD_NEWS_FEED_REQUEST,
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
        if (hasMoreNewsFeed && !loadingNewsFeed) {
            // 리스트를 요청한다.
            dispatch({
                type: LOAD_NEWS_FEED_REQUEST,
                pagination: Object.assign(pagination, { page: pagination.page + 1 }),
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
    }, [hasMoreNewsFeed, loadingNewsFeed, onScroll]);

    return (
        <div className="container content-wrap">
            <SEO title="새글 피드" />
            <Title>새글 피드</Title>
            <List
                grid={{ gutter: 20, column: 1 }}
                loading={loadingNewsFeed}
                dataSource={newsFeed}
                renderItem={item => (
                    <List.Item>
                        <PostCard {...item} showRoomName />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NewsFeed;
