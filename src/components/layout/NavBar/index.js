import React, {useCallback} from 'react';
import {Link, NavLink, withRouter} from "react-router-dom";
import Logo from "assets/image/logo.png";
import {Button, Divider} from "antd";
import LanguageSeleoctor from "components/LanguageSelector";
import {ACCESS_TOKEN} from "../../../constants";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import Avatar from 'components/Avatar';
import { LOG_OUT } from 'store/modules/account';

const NavBar = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {name, profileImg} = useSelector(state => state.account.me);
    const {isLoggedIn} = useSelector(state => state.account);

    const items = [
        {path : "/user/room", name  : "나의 스터디방"},
        {path : "/feed", name  : "새글 피드"},
        {path : "/search", name  : "스터디방 찾기"},
        {path : "/qna", name  : "문의 사항"}
    ]

    const handleLogout = useCallback(() => {
        dispatch({
            type : LOG_OUT,
            meta : {
                callbackAction : () => {
                    localStorage.removeItem(ACCESS_TOKEN);
                    props.history.push("/");
                }
            }
        })
    }, []);


    const renderAccountSection = () => {
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

    return (
        <nav className="header-wrap">
            <span className="logo-wrap">
                <Link to="/">
                    <img src={Logo} className="logo" alt="logo"/>
                </Link>
            </span>
            <div className="gnb-wrap">
                <ul>
                    {items.map((v, i) => (
                        <li key={i}><NavLink to={v.path} activeClassName="active">{v.name}</NavLink></li>
                    ))}
                </ul>
            </div>

            {renderAccountSection()}

        </nav>
    )
}

export default withRouter(NavBar);


