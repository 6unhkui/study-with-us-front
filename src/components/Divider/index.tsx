import React from "react";
import { Divider as AntdDivider, DividerProps as AntdDividerProps } from "antd";
import styles from "./Divider.module.less";

interface DividerProps extends AntdDividerProps {}

const Divider: React.FC<DividerProps> = ({ type, className, ...props }) => {
    return (
        <AntdDivider
            className={`${className} ${styles.divider} ${type === "vertical" ? styles.vertical : ""}`}
            type={type}
            {...props}
        />
    );
};

export default React.memo(Divider);
