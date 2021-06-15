import React, { useCallback, useState } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";
import { availableLanguages, getCurrentLanguage, LanguageKeys } from "@/i18nConfig";
import i18n from "i18next";
import styles from "./LanguageSelectBox.module.less";

const DropdownMenu = React.memo(({ onChange }: { onChange: (key: LanguageKeys) => void }) => (
    <Menu>
        {Object.entries(availableLanguages).map(([key, value]) => (
            <Menu.Item key={key} onClick={() => onChange(key as LanguageKeys)}>
                {value}
            </Menu.Item>
        ))}
    </Menu>
));

interface LanguageSelectBoxProps {}

const LanguageSelectBox: React.FC<LanguageSelectBoxProps> = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(availableLanguages[getCurrentLanguage()]);

    const onChangeLanguage = useCallback((key: LanguageKeys) => {
        i18n.changeLanguage(key);
        setCurrentLanguage(availableLanguages[key]);
    }, []);

    return (
        <Dropdown overlay={<DropdownMenu onChange={onChangeLanguage} />} trigger={["click"]} className={styles.selectBox}>
            <span>
                <GlobalOutlined />
                <span className={styles.promptText}>{currentLanguage}</span>
                <DownOutlined />
            </span>
        </Dropdown>
    );
};

export default React.memo(LanguageSelectBox);
