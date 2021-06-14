import { RecevieMessageDTO } from "@/api/dto/chat.dto";
import React from "react";
import getTimeDiff from "@/utils/getTimDiff";
import Avatar from "../Avatar";
import styles from "./ChatMessage.module.less";

interface ChatMessageProps extends RecevieMessageDTO {
    isSender: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ isSender, type, message, timestamp, sender }) => {
    if (type !== "TALK") {
        return <div className={styles.botMessage}>{message}</div>;
    }

    if (isSender) {
        return (
            <div className={styles.selfMessage}>
                <span className={styles.date}>{getTimeDiff(timestamp)}</span>
                <div className={styles.bubble}>{message}</div>
            </div>
        );
    }

    return (
        <div className={styles.message}>
            <Avatar name={sender?.name} profileImage={sender?.profileImg} className={styles.avatar} size={40} />
            <div className={styles.username}>{sender?.name}</div>
            <div className={styles.bubble}>{message}</div>
            <div className={styles.date}>{getTimeDiff(timestamp)}</div>
        </div>
    );
};

export default React.memo(ChatMessage);
