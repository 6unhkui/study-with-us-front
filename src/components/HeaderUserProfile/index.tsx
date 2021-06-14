import React from "react";
import Avatar from "@/components/Avatar";
import { Link } from "react-router-dom";
import { useMeAsync } from "@/hooks/useRedux";
import styles from "./HeaderUserProfile.module.less";

interface HeaderUserProfileProps {
    onClick?: () => void;
}

const HeaderUserProfile: React.FC<HeaderUserProfileProps> = ({ onClick }) => {
    const { data: me } = useMeAsync();

    return (
        <Link to="/mypage" className={styles.link} onClick={onClick}>
            <span className={styles.container}>
                <Avatar profileImage={me?.profileImg} name={me?.name} />
                <span className={styles.userName}>{me?.name}</span>
            </span>
        </Link>
    );
};

export default React.memo(HeaderUserProfile);
