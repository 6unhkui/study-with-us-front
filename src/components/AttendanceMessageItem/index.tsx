import { AttendanceMemberDTO } from "@/api/dto/attendance.dto";
import React from "react";
import moment from "moment";
import Emoji from "@/components/Emoji";
import Avatar from "@/components/Avatar";
import styles from "./AttendanceMessageItem.module.less";

interface AttendanceMessageItemProps extends AttendanceMemberDTO {}

const AttendanceMessageItem: React.FC<AttendanceMessageItemProps> = ({ name, profileImg, attendance }) => {
    return (
        <li className={styles.item}>
            <div className={styles.time}>
                <Emoji mr={8}>⏱️</Emoji>
                <time>{moment(attendance?.time, "HH:mm:ss").format("A hh:mm:ss")}</time>
            </div>
            <div className={styles.message}>{attendance?.memo}</div>
            <div>
                <span className={styles.by}>by. </span>
                <Avatar name={name} profileImage={profileImg} size={22} />
                <span className={styles.username}>{name}</span>
            </div>
        </li>
    );
};

export default React.memo(AttendanceMessageItem);
