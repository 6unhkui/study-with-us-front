import React, {useState} from "react";
import i18next from 'i18next';
import {availableLanguages} from 'i18n';
import { Menu, Dropdown } from 'antd';
import { DownOutlined, GlobalOutlined } from '@ant-design/icons';

export default function LanguageSelector() {
    const [currentLanague, setCurrentLanague] = useState(i18next.language || window.localStorage.i18nextLng || '');

    const changeLanguage = (e) => {
        i18next.changeLanguage(e.key);
        setCurrentLanague(e.key);
    };

    const lanagueDropDownMenu = (
        <Menu>
            {availableLanguages.map(v => (
                 <Menu.Item key={v} onClick={changeLanguage}>
                     {v}
                 </Menu.Item>
            ))}
        </Menu>
    );

    return (
        <Dropdown overlay={lanagueDropDownMenu} trigger={['click']}>
            <span className='language-selector-wrap'>
                <GlobalOutlined /><span className='text'>{currentLanague}</span><DownOutlined />
            </span>
        </Dropdown>
    )
}