import useModal from "@/hooks/useModal";
import { registerAttendanceAsync } from "@/store/attendance";
import { Button } from "antd";
import React, { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import Countdown from "react-countdown";
import Modal from "@/components/Modal";
import Emoji from "@/components/Emoji";
import styles from "./AttendanceRegistration.module.less";

const timeRemainingToday = () => {
    const date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setDate(date.getDate() + 1);

    return Date.now() + (Date.parse(date.toString()) - Date.now());
};

interface AttendanceRegistrationProps {
    roomId: number;
}

const AttendanceRegistration: React.FC<AttendanceRegistrationProps> = ({ roomId }) => {
    const { onClose, onOpen, visible } = useModal();
    const dispatch = useDispatch();
    const timeToTomorrow = useMemo(timeRemainingToday, []);

    const onRegister = useCallback(
        (input: string) => {
            dispatch(registerAttendanceAsync.request({ roomId, memo: input }));
        },
        [dispatch, roomId]
    );

    return (
        <div className={styles.wrapper}>
            {visible && (
                <Modal
                    onClose={onClose}
                    visible={visible}
                    type="prompt"
                    header="출석 체크"
                    onOk={onRegister}
                    inputInitialValue="출석 완료 ٩(๑>∀<๑)۶"
                >
                    출석 체크 메시지를 입력해주세요.
                </Modal>
            )}

            <Emoji size={44}>😥</Emoji>
            <h1 className={styles.title}>아직 출석 체크를 하지 않았습니다.</h1>

            <span className={styles.countdown}>
                <Countdown date={timeToTomorrow} daysInHours />
            </span>

            <Button onClick={onOpen} className={styles.btn} type="primary">
                출석 체크 하기
            </Button>
        </div>
    );
};

export default React.memo(AttendanceRegistration);
