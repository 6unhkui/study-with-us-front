import RoomListContainer from "@/components/RoomListContainer";
import Wrapper from "@/components/Wrapper";
import { useTypedSelector } from "@/store";
import { getMyRoomListAsync } from "@/store/room";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import RoomFilters from "@/components/RoomFilters";
import Divider from "@/components/Divider";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { SearchRoomDTO, SearchRoomsByPageDTO } from "@/api/dto/room.dto";
import SEO from "@/components/SEO";
import styles from "./MyRooms.module.less";

const initialParam: SearchRoomsByPageDTO = { page: 1, size: 6, direction: "ASC", sortBy: "NAME" };

interface MyRoomsPageProps {}

const MyRoomsPage: React.FC<MyRoomsPageProps> = () => {
    const { data, loading, hasMore } = useTypedSelector(state => state.room.myRoomList);
    const dispatch = useDispatch();
    const param = useRef<SearchRoomsByPageDTO>(initialParam);

    useEffect(() => {
        dispatch(getMyRoomListAsync.request(initialParam));
    }, [dispatch]);

    const onFilterSubmit = useCallback(
        (search: SearchRoomDTO) => {
            param.current = { ...param.current, ...search, page: 1 };
            dispatch(getMyRoomListAsync.request(param.current));
        },
        [dispatch]
    );

    const loadMore = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            if (loading) return;
            if (entries[0].isIntersecting && hasMore) {
                param.current = { ...param.current, page: param.current.page + 1 };
                dispatch(getMyRoomListAsync.request(param.current));
            }
        },
        [loading, dispatch, hasMore]
    );

    const { domRef: lastItemRef } = useIntersectionObserver(loadMore);

    return (
        <Wrapper>
            <SEO title="나의 스터디방" />
            <div className={styles.pageHeaderArea}>
                <h1 className={styles.header}>나의 스터디 방</h1>
                <Link to="/room/create">
                    <Button size="large" icon={<PlusOutlined />} className={styles.createBtn}>
                        스터디방 만들기
                    </Button>
                </Link>
            </div>
            <Divider />

            <div className={styles.filterArea}>
                <RoomFilters onSubmit={onFilterSubmit} />
            </div>

            <RoomListContainer data={data} loading={loading} lastItemRef={lastItemRef} />
        </Wrapper>
    );
};

export default MyRoomsPage;
