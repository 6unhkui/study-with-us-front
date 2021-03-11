import React, { useState, useCallback } from "react";
import i18next from "i18next";
import { showLanguages } from "i18n";
import { Menu, Dropdown } from "antd";
import { DownOutlined, GlobalOutlined } from "@ant-design/icons";

export default function LanguageSelector() {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language || window.localStorage.i18nextLng || "");
    const [showLanguage, setShowLanguage] = useState(showLanguages[currentLanguage]);

    const handleChangeLanguage = useCallback(e => {
        i18next.changeLanguage(e.key);
        setCurrentLanguage(e.key);
        setShowLanguage(showLanguages[e.key]);
    }, []);

    const languageDropDownMenu = (
        <Menu>
            {Object.keys(showLanguages).map(v => (
                <Menu.Item key={v} onClick={handleChangeLanguage}>
                    {showLanguages[v]}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={languageDropDownMenu} trigger={["click"]}>
            <span className="language-selector-wrap">
                <GlobalOutlined />
                <span className="text">{showLanguage}</span>
                <DownOutlined />
            </span>
        </Dropdown>
    );
}
