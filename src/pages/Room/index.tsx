import { useTypedSelector } from "@/store";
import { getRoomAsync } from "@/store/room";
import makeFileUrl from "@/utils/makeFileUrl";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useRouteMatch } from "react-router";
import Loading from "@/components/Loading";
import RoomProfile from "@/components/RoomProfile";
import RoomRouter from "@/app/RoomRouter";
import RoomContentNavBar from "@/components/RoomContentNavBar";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import AccessDenied from "@/components/AccessDenied";
import SEO from "@/components/SEO";
import styles from "./Room.module.less";

interface RoomPageProps {}

const RoomPage: React.FC<RoomPageProps> = () => {
    const { path, url } = useRouteMatch();
    const intId = useGetIntIdFromUrl();
    const { data, loading, error } = useTypedSelector(({ room: { room } }) => room);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(getRoomAsync.cancel(""));
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(getRoomAsync.request(intId));
    }, [dispatch, intId]);

    if (!loading && error) return <Redirect to="/404" />;
    if (loading || !data) return <Loading />;

    return (
        <div className={styles.container}>
            <SEO title={data.name} />
            <img src={makeFileUrl(data.coverImage, "COVER")} alt={data.name} className={styles.coverImage} />

            <div className={styles.contentWrapper}>
                <RoomProfile {...data} />

                <div className={styles.content}>
                    {data.isMember ? (
                        <>
                            <RoomContentNavBar url={url} />
                            <RoomRouter path={path} />
                        </>
                    ) : (
                        <AccessDenied type={data.joinCount === data.maxCount ? "limitNumberOfMembers" : "accessOnlyMembers"} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default RoomPage;
