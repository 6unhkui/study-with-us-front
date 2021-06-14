import React from "react";
import styles from "./EmptyList.module.less";

interface EmptyListProps {}

const EmptyList: React.FC<EmptyListProps> = () => {
    return (
        <div className={styles.empty}>
            <div className={styles.emoticon}>(；☉_☉)</div>
            <span>데이터가 존재하지 않습니다.</span>
        </div>
    );
};

export default React.memo(EmptyList);
