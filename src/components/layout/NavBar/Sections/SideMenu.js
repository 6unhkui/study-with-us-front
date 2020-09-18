import React from 'react';
import { ACCESS_TOKEN } from 'constants/index';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import LanguageSeleoctor from "./LanguageSelector";
import { useSelector } from "react-redux";
import Avatar from 'components/Avatar';


import { Button, Divider } from 'antd';

export default function SideMenu(props) {
    const { t } = useTranslation();
    const { name, profileImg } = useSelector(state => state.account, []);

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        props.history.push("/");
    };

    if(localStorage.getItem("accessToken")){
        return (
            <div className="user-wrap">
                <Link to="/account">
                    <div className="user-info">
                        <Avatar user={{name, profileImg}} showName={true}/>
                    </div>
                </Link>
                <Divider type="vertical"/>
                <LanguageSeleoctor/>

                <Button type="primary" ghost onClick={handleLogout}>{t('auth.logout')}</Button>
            </div>
        )
    }else {
        return (
            <div className="user-wrap">
                 <LanguageSeleoctor/>

                <Link to="/login"><Button type="primary" ghost>{t('auth.login')}</Button></Link>
           </div>
        )
    }
}

