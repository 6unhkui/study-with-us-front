import Loading from "@/components/Loading";
import RoomInfoEdit from "@/components/RoomInfoEdit";
import PageHeader from "@/components/PageHeader";
import Wrapper from "@/components/Wrapper";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import { useTypedSelector } from "@/store";
import { getRoomAsync, leaveRoomAsync } from "@/store/room";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { getMyInfoAsync } from "@/store/member";
import Badge from "@/components/Badge";
import { Button } from "antd";
import useModal from "@/hooks/useModal";
import Modal from "@/components/Modal";
import SEO from "@/components/SEO";
import styles from "./RoomSetting.module.less";

interface RoomSettingPageProps {}

const RoomSettingPage: React.FC<RoomSettingPageProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: room, loading: roomLoading } = useTypedSelector(state => state.room.room);
    const { data: myInfo, loading: myInfoLoading } = useTypedSelector(state => state.member.myInfo);
    const { visible, onClose, onOpen } = useModal();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRoomAsync.request(intId));
        dispatch(getMyInfoAsync.request(intId));
    }, [dispatch, intId]);

    const canLeave = useMemo(() => {
        return myInfo?.role === "MATE";
    }, [myInfo]);

    const onLeaveButtonClick = useCallback(() => {
        dispatch(leaveRoomAsync.request(intId));
    }, [dispatch, intId]);

    if (roomLoading || !room || myInfoLoading) return <Loading />;

    return (
        <Wrapper type="card" size="full">
            <SEO title="스터디방 설정" />
            <PageHeader groupName={room?.name} name="설정" />

            <RoomInfoEdit {...room} />

            <section className={styles.container}>
                <h4 className={styles.sectionTitle}>내 정보</h4>
                <table>
                    <tbody>
                        <tr>
                            <th>가입 일</th>
                            <td>{myInfo?.joinDate}</td>
                        </tr>
                        <tr>
                            <th>권한</th>
                            <td>
                                <Badge type={myInfo?.role === "MANAGER" ? "primary" : "secondary"}>{myInfo?.role}</Badge>
                            </td>
                        </tr>
                        <tr>
                            <th>작성 게시글 수</th>
                            <td>{myInfo?.postCount}</td>
                        </tr>
                        <tr>
                            <th>스터디방 탈퇴</th>
                            <td>
                                <Button type="dashed" disabled={!canLeave} onClick={onOpen}>
                                    탈퇴하기
                                </Button>
                                {!canLeave && (
                                    <div className={styles.guide}>
                                        ✓ 매니저를 스터디방을 탈퇴할 수 없습니다.
                                        <br />
                                        만약 탈퇴를 원한다면 매니저 권한을 위임하거나, 스터디방을 폐쇄해주세요.
                                    </div>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
            {visible && (
                <Modal type="confirm" header="스터디방 탈퇴" visible={visible} onClose={onClose} onOk={onLeaveButtonClick}>
                    <span>[{room.name}] 스터디방을 정말 탈퇴 하시겠습니끼?</span>
                </Modal>
            )}
        </Wrapper>
    );
};

export default RoomSettingPage;
