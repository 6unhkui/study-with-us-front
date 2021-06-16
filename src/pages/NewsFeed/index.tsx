import React, { useCallback, useEffect, useRef } from "react";
import Wrapper from "@/components/Wrapper";
import { useDispatch } from "react-redux";
import { getNewsFeedAsync } from "@/store/post";
import { PageRequestDTO } from "@/api/dto/common.dto";
import { useTypedSelector } from "@/store";
import PostListContainer from "@/components/PostListContainer";
import Divider from "@/components/Divider";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SEO from "@/components/SEO";
import styles from "./NewsFeed.module.less";

const initialParam: PageRequestDTO = { page: 1, size: 6, direction: "ASC" };

interface NewsFeedPageProps {}

const NewsFeedPage: React.FC<NewsFeedPageProps> = () => {
    const param = useRef<PageRequestDTO>({ ...initialParam });
    const { data, loading, hasMore } = useTypedSelector(state => state.post.newsFeed);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNewsFeedAsync.request(param.current));
    }, [dispatch]);

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                param.current = { ...param.current, page: param.current.page + 1 };
                dispatch(getNewsFeedAsync.request(param.current));
            }
        },
        [loading, dispatch, hasMore]
    );

    const { domRef: lastItemRef } = useIntersectionObserver(loadMore);

    return (
        <Wrapper>
            <SEO title="새글 피드" />
            <h1 className={styles.header}>새글 피드</h1>
            <Divider />

            <PostListContainer data={data} loading={loading} lastItemRef={lastItemRef} visibleRoomName />
        </Wrapper>
    );
};

export default NewsFeedPage;
