import React from "react";
import styles from "./Wrapper.module.less";

interface WrapperProps {
    type?: "card" | "noraml";
    size?: "small" | "full";
    header?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ type = "noraml", size = "full", header, children }) => {
    const sizeClassName = size === "small" ? styles.sizeSmall : styles.sizeFull;

    if (type === "card") {
        return (
            <div className={styles.cardBackground}>
                <div className={`${styles.cardWrapper} ${sizeClassName}`}>
                    {header && <h1 className={styles.header}>{header}</h1>}
                    {children}
                </div>
            </div>
        );
    }

    return <div className={`${styles.wrapper} ${sizeClassName}`}>{children}</div>;
};

export default Wrapper;
