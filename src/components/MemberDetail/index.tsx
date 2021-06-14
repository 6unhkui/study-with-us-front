import React, { useCallback, useEffect, useState } from "react";
import Avatar from "@/components/Avatar";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "@/store";
import { deleteMemberAsync, getMemberAsync } from "@/store/member";
import { Bar } from "react-chartjs-2";
import moment from "moment";
import Loading from "@/components/Loading";
import Badge from "@/components/Badge";
import Emoji from "@/components/Emoji";
import { Button } from "antd";
import useModal from "@/hooks/useModal";
import { palette } from "@/styles/chartColorPalette";
import Modal from "@/components/Modal";
import styles from "./MemberDetail.module.less";

const threeMonthNames = Array.from({ length: 3 }, (_, k) => {
    return moment().subtract(k, "month").format("YYYY-MM");
});
const chart = {
    labels: threeMonthNames,
    datasets: [
        {
            label: "출석 일수",
            data: [] as number[],
            backgroundColor: palette.map(([bg]) => bg),
            borderColor: palette.map(([_, border]) => border),
            borderWidth: 1
        }
    ]
};
const chartOptions = {
    scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
    plugins: { title: { display: true, text: "최근 3개월간 멤버의 출석 그래프를 보여줍니다." } }
} as const;

interface MemberDetailProps {
    memberId: number;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId }) => {
    const { data: room } = useTypedSelector(state => state.room.room);
    const { data, loading, error } = useTypedSelector(state => state.member.member);
    const dispatch = useDispatch();
    const { onClose: closeDeleteModal, onOpen: openDeleteModal, visible: visibleDeleteModal } = useModal();

    useEffect(() => {
        dispatch(getMemberAsync.request(memberId));
    }, [dispatch, memberId]);

    useEffect(() => {
        if (data) {
            chart.datasets[0].data = threeMonthNames.map(month => {
                return data.attendanceStatistics.find(({ name }) => name === month)?.count || 0;
            });
        }
    }, [data]);

    const onMemberDelete = useCallback(() => {
        dispatch(deleteMemberAsync.request(memberId));
    }, [dispatch, memberId]);

    if (loading && !data) return <Loading type="component" />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.profileArea}>
                <Avatar name={data?.name} profileImage={data?.profileImg} size={100} />
                <h1 className={styles.name}>{data?.name}</h1>
                <span className={styles.email}>
                    <Emoji mr={8}>✉️</Emoji>
                    {data?.email}
                </span>
            </div>

            <dl className={styles.infoArea}>
                <span>
                    <dt>Role</dt>
                    <dd>
                        <Badge type={data?.role === "MANAGER" ? "primary" : "secondary"}>{data?.role}</Badge>
                    </dd>
                </span>
                <span>
                    <dt>Membership Date</dt>
                    <dd>{data?.joinDate}</dd>
                </span>
                <span>
                    <dt>Number of Posts</dt>
                    <dd>{data?.postCount}</dd>
                </span>
            </dl>

            <div className={styles.attendanceGraph}>{data && <Bar data={chart} options={chartOptions} type="bar" />}</div>

            {room?.isManager && data?.role === "MATE" && (
                <div className={styles.managingMemberArea}>
                    <Modal
                        type="confirm"
                        visible={visibleDeleteModal}
                        onClose={closeDeleteModal}
                        header="멤버 삭제"
                        onOk={onMemberDelete}
                    >
                        [{data.name}]님을 [{room.name}]방에서 삭제하시겠습니까?
                    </Modal>

                    <span className={styles.text}>
                        <Emoji mr={8}>🚨</Emoji>만약 이 멤버를 삭제하고 싶다면 [멤버 삭제하기] 버튼을 눌러주세요.
                    </span>
                    <Button type="text" className={styles.button} onClick={openDeleteModal}>
                        멤버 삭제하기
                    </Button>
                </div>
            )}
        </div>
    );
};

export default React.memo(MemberDetail);
