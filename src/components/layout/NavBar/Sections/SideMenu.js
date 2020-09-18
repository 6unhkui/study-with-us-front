import React from 'react';
import { ACCESS_TOKEN } from 'constants/index';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import {userState} from "atom/UserState";
import { Button, Divider } from 'antd';

import {stringToColor} from 'utils/ColorGenerator';
import LanguageSeleoctor from "./LanguageSelector";
import Avatar from 'components/Avatar';

export default function SideMenu(props) {
    const { t } = useTranslation();
    
    const user = useRecoilValue(userState);

    const logoutHandler = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        props.history.push("/");
    };

    if(localStorage.getItem("accessToken")){
        return (
            <div className="user-wrap">
                <Link to="/account">
                    <div className="user-info">
                        <Avatar user={user} showName={true}/>
                    </div>
                </Link>
                <Divider type="vertical" />
                <LanguageSeleoctor/>

                <Button type="primary" ghost onClick={logoutHandler}>{t('auth.logout')}</Button>
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
