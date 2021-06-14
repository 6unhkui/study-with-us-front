import React, { useCallback, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import useInput from "@/hooks/useInput";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import styles from "./MainSearchInput.module.less";

interface MainSearchInputProps {}

const MainSearchInput: React.FC<MainSearchInputProps> = () => {
    const { t } = useTranslation();
    const { input, onChange } = useInput();
    const history = useHistory();

    const onSubmit = useCallback(() => {
        if (input.length !== 0) {
            history.push(`/search?keyword=${input}`);
        }
    }, [input, history]);

    return (
        <div className={styles.wrapper}>
            <Input
                type="text"
                placeholder={t("main.searchInput")}
                value={input}
                onChange={onChange}
                onPressEnter={onSubmit}
                className={styles.input}
            />
            <Button className={styles.searchBtn} onClick={onSubmit}>
                <SearchOutlined className={styles.searchIcon} />
            </Button>
        </div>
    );
};

export default React.memo(MainSearchInput);
