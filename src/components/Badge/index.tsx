import React, { ReactNode } from "react";
import styles from "./Badge.module.less";

interface BadgeProps {
    type?: "primary" | "secondary";
    children?: ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ type = "primary", children }) => {
    return <span className={`${styles.badge} ${type === "primary" ? styles.primary : styles.secondary}`}>{children}</span>;
};

export default React.memo(Badge);
