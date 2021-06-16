import { PageRequestDTO } from "@/api/dto/common.dto";
import { SearchPostsByPageDTO } from "@/api/dto/post.dto";
import PostListContainer from "@/components/PostListContainer";
import SEO from "@/components/SEO";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useTypedSelector } from "@/store";
import { getPostListAsync } from "@/store/post";
import { Input } from "antd";
import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import styles from "./PostsByRoom.module.less";

const initialParam: PageRequestDTO = { page: 1, size: 6, direction: "ASC" };

interface PostsByRoomProps {}

const PostsByRoom: React.FC<PostsByRoomProps> = () => {
    const intId = useGetIntIdFromUrl();
    const param = useRef<SearchPostsByPageDTO>({ ...initialParam, roomId: intId });
    const { data, loading, hasMore } = useTypedSelector(({ post: { postList } }) => postList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostListAsync.request(param.current));
    }, [dispatch]);

    const onSearchInputSubmit = useCallback(
        (input: string) => {
            param.current = { ...param.current, page: 1, keyword: input };
            dispatch(getPostListAsync.request(param.current));
        },
        [dispatch]
    );

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                param.current = { ...param.current, page: param.current.page + 1 };
                dispatch(getPostListAsync.request(param.current));
            }
        },
        [loading, dispatch, hasMore]
    );

    const { domRef: lastItemRef } = useIntersectionObserver(loadMore);

    return (
        <section>
            <SEO title="게시글 목록" />
            <Input.Search
                enterButton="검색"
                placeholder="검색어를 입력하세요."
                size="large"
                onSearch={onSearchInputSubmit}
                className={styles.searchInput}
            />
            <PostListContainer data={data} loading={loading} lastItemRef={lastItemRef} />
        </section>
    );
};

export default PostsByRoom;
