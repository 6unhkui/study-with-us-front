import React from "react";
import { Spin } from "antd";
import styles from "./Loading.module.less";

interface LoadingProps {
    type?: "page" | "component";
}

const Loading: React.FC<LoadingProps> = ({ type = "page" }) => {
    return (
        <div className={`${styles.wrapper} ${type === "page" ? styles.page : styles.component}`}>
            <Spin size="large" tip="Loading..." />
        </div>
    );
};

export default React.memo(Loading);
