import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_NEWS_FEED_REQUEST } from "store/modules/post";
import PostCard from "components/PostCard";
import Pagination from "utils/Pagination";
import { List, Typography } from "antd";

const { Title } = Typography;

const initPagination = new Pagination();
Object.freeze(initPagination);

const NewsFeed = props => {
    const dispatch = useDispatch();
    const { newsFeed, loadingNewsFeed, hasMoreNewsFeed } = useSelector(state => state.post);
    const [pagination, setPagination] = useState({ ...initPagination });

    useEffect(() => {
        dispatch({
            type: LOAD_NEWS_FEED_REQUEST,
            pagination: initPagination
        });
    }, [dispatch]);

    useEffect(() => {
        function onScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMoreNewsFeed && !loadingNewsFeed) {
                    // 리스트를 요청한다.
                    dispatch({
                        type: LOAD_NEWS_FEED_REQUEST,
                        pagination: Object.assign(pagination, { page: ++pagination.page }),
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
    }, [dispatch, hasMoreNewsFeed, loadingNewsFeed, pagination]);

    function changePageNumber(pageNumber) {
        setPagination(pagination => ({
            ...pagination,
            page: pageNumber
        }));
    }

    return (
        <div className="container content-wrap">
            <Title>새글 피드</Title>
            <List
                grid={{ gutter: 20, column: 1 }}
                loading={loadingNewsFeed}
                dataSource={newsFeed}
                renderItem={item => (
                    <List.Item>
                        <PostCard {...item} showRoomName={true} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default NewsFeed;
