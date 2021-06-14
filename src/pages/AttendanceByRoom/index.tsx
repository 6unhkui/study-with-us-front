import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import { useTypedSelector } from "@/store";
import { getAttendingMemberListAsync } from "@/store/attendance";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loading from "@/components/Loading";
import Avatar from "@/components/Avatar";
import { Avatar as AntdAvatar, Tooltip } from "antd";
import AttendanceMessageItem from "@/components/AttendanceMessageItem";
import AttendanceRegistration from "@/components/AttendanceRegistration";
import Divider from "@/components/Divider";
import SEO from "@/components/SEO";
import styles from "./AttendanceByRoom.module.less";

const AvatarGroup = AntdAvatar.Group;

interface AttendanceByRoomProps {}

const AttendanceByRoom: React.FC<AttendanceByRoomProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: room } = useTypedSelector(({ room: { room: roomDetail } }) => roomDetail);
    const { data, loading, error } = useTypedSelector(({ attendance: { attendingMemberList } }) => attendingMemberList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAttendingMemberListAsync.request(intId));
    }, [dispatch, intId]);

    if (loading && !data) return <Loading type="component" />;

    return (
        <section>
            <SEO title="출석" description={`${room?.name || ""} 출석 체크 페이지`} />
            {!data?.isAttended && <AttendanceRegistration roomId={intId} />}

            <ul className={styles.attendedContainer}>
                {data?.attendedMemberList.map(({ memberId, ...props }) => (
                    <AttendanceMessageItem key={memberId} memberId={memberId} {...props} />
                ))}
            </ul>

            <Divider />

            <div>
                <h3 className={styles.title}>미출석 멤버들 😥</h3>
                <AvatarGroup>
                    {data?.nonattendanceMemberList.map(({ name, memberId, profileImg }) => (
                        <Tooltip key={memberId} title={name} placement="top">
                            <Avatar name={name} profileImage={profileImg} size={44} />
                        </Tooltip>
                    ))}
                </AvatarGroup>
            </div>
        </section>
    );
};

export default AttendanceByRoom;
