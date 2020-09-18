import React, {useEffect, useState} from "react";
import i18next from 'i18next';
import {showLanguages} from 'i18n';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';

export default function LanguageSelector() {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language || window.localStorage.i18nextLng || '');
    const [showLanague, setShowLanague] = useState(showLanguages[currentLanguage]);

    const handleChangeLanguage = (e) => {
        i18next.changeLanguage(e.key);
        setCurrentLanguage(e.key);
        setShowLanague(showLanguages[e.key]);
    };

    const lanagueDropDownMenu = (
        <Menu>
            {Object.keys(showLanguages).map(v => (
                <Menu.Item key={v} onClick={handleChangeLanguage}>
                    {showLanguages[v]}
                </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={lanagueDropDownMenu} trigger={['click']}>
            <span className='language-selector-wrap'>
                <GlobalOutlined /><span className='text'>{showLanague}</span><DownOutlined />
            </span>
        </Dropdown>
    )
}