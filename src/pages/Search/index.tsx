import React, { useCallback, useEffect, useRef, useState } from "react";
import Wrapper from "@/components/Wrapper";
import Divider from "@/components/Divider";
import RoomFilters from "@/components/RoomFilters";
import useQuery from "@/hooks/useQuery";
import { SearchRoomDTO, SearchRoomsByPageDTO } from "@/api/dto/room.dto";
import { useDispatch } from "react-redux";
import { getRoomListAsync } from "@/store/room";
import { useTypedSelector } from "@/store";
import RoomListContainer from "@/components/RoomListContainer";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import SEO from "@/components/SEO";
import styles from "./Search.module.less";

const initialParam: SearchRoomsByPageDTO = { page: 1, size: 6, direction: "ASC", sortBy: "NAME" };

interface SearchPageProps {}

const SearchPage: React.FC<SearchPageProps> = () => {
    const query = useQuery();
    const categoryId = query.get("id");
    const keyword = query.get("keyword");

    const param = useRef<SearchRoomsByPageDTO>({
        ...initialParam,
        keyword: keyword || "",
        categoryIds: categoryId ? [+categoryId] : []
    });
    const { data, loading, hasMore } = useTypedSelector(({ room: { roomList } }) => roomList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoomListAsync.request(param.current));
    }, [dispatch]);

    const onFilterSubmit = useCallback(
        (search: SearchRoomDTO) => {
            param.current = { ...param.current, ...search, page: 1 };
            dispatch(getRoomListAsync.request(param.current));
        },
        [dispatch]
    );

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                param.current = { ...param.current, page: param.current.page + 1 };
                dispatch(getRoomListAsync.request(param.current));
            }
        },
        [loading, dispatch, hasMore]
    );

    const { domRef: lastItemRef } = useIntersectionObserver(loadMore);

    return (
        <Wrapper>
            <SEO title="스터디방 검색" />
            <h1 className={styles.header}>검색</h1>
            <Divider />

            <div className={styles.filterArea}>
                <RoomFilters onSubmit={onFilterSubmit} defaultValues={initialParam} />
            </div>

            <RoomListContainer data={data} loading={loading} lastItemRef={lastItemRef} />
        </Wrapper>
    );
};

export default SearchPage;
