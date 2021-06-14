import React, { useEffect } from "react";
import MainBanner from "@/components/MainBanner";
import MainCategoryCarousel from "@/components/MainCategoryCarousel";
import MainSearchInput from "@/components/MainSearchInput";
import Divider from "@/components/Divider";
import RoomListContainer from "@/components/RoomListContainer";
import { useDispatch } from "react-redux";
import { getPopularRoomListAsync, getLatestRoomListAsync } from "@/store/room";
import { useTypedSelector } from "@/store";
import SEO from "@/components/SEO";
import { SearchRoomsByPageDTO } from "@/api/dto/room.dto";
import { useTranslation } from "react-i18next";
import styles from "./Main.module.less";

const popularRoomListParam: SearchRoomsByPageDTO = { page: 1, size: 3, direction: "ASC", sortBy: "JOIN_COUNT" };
const latestRoomListParam: SearchRoomsByPageDTO = { page: 1, size: 3, direction: "ASC", sortBy: "CREATED_DATE" };

interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => {
    const { t } = useTranslation();
    const {
        popularRoomList: { data: popularRoomList, loading: popularRoomListLoading },
        latestRoomList: { data: latestRoomList, loading: latestRoomListLoading }
    } = useTypedSelector(({ room }) => room);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!popularRoomList) {
            dispatch(getPopularRoomListAsync.request(popularRoomListParam));
        }
        if (!latestRoomList) {
            dispatch(getLatestRoomListAsync.request(latestRoomListParam));
        }
    }, [dispatch, popularRoomList, latestRoomList]);

    return (
        <div className={styles.container}>
            <SEO />

            <section>
                <MainBanner />
            </section>

            <section className={styles.wrapper}>
                <MainSearchInput />
            </section>

            <section className={styles.wrapper}>
                <MainCategoryCarousel />
            </section>

            <section className={styles.listWrapper}>
                <h1 className={styles.listTitle}>{t("main.popularRooms")}</h1>
                <Divider className={styles.divider} />
                <RoomListContainer data={popularRoomList} loading={popularRoomListLoading} />
            </section>

            <section className={styles.listWrapper}>
                <h1 className={styles.listTitle}>{t("main.latestStudyRooms")}</h1>
                <Divider className={styles.divider} />
                <RoomListContainer data={latestRoomList} loading={latestRoomListLoading} />
            </section>
        </div>
    );
};

export default MainPage;
