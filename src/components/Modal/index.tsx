import React, { useCallback } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Divider from "@/components/Divider";
import { Button, Input } from "antd";
import useInput from "@/hooks/useInput";
import styles from "./Modal.module.less";

export interface ModalProps {
    type?: "alert" | "prompt" | "confirm";
    visible: boolean;
    onClose: () => void;
    onOk?: (() => void) | ((input: string) => void);
    size?: "small" | "regular";
    header?: string;
    placeholder?: string;
    inputInitialValue?: string;
}

const Modal: React.FC<ModalProps> = ({
    visible,
    type = "alert",
    size = "small",
    header,
    onClose,
    onOk,
    placeholder,
    inputInitialValue,
    children
}) => {
    const { input, onChange } = useInput(inputInitialValue);
    const onOkBtnClick = useCallback(() => {
        if (onOk) {
            onOk(input);
        }
    }, [onOk, input]);

    if (!visible) return null;

    return (
        <div className={styles.wrapper}>
            <div className={`${styles.container} ${size === "small" ? styles.small : styles.regular}`}>
                <button type="button" className={styles.closeBtn} onClick={onClose}>
                    <CloseOutlined />
                </button>

                {header && (
                    <>
                        <h1 className={styles.header}>{header}</h1>
                        <Divider />
                    </>
                )}

                <div className={styles.content}>
                    {children}
                    {type === "prompt" && (
                        <Input value={input} onChange={onChange} placeholder={placeholder} className={styles.input} />
                    )}
                </div>

                <Divider />

                <div className={styles.btnArea}>
                    {type !== "alert" && <Button onClick={onClose}>취소</Button>}

                    <Button type="primary" onClick={type === "alert" ? onClose : onOkBtnClick}>
                        확인
                    </Button>
                </div>
            </div>

            <div className={styles.overlay} onClick={onClose} />
        </div>
    );
};

export default Modal;
