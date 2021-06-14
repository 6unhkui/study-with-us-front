import { Button } from "antd";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { logout } from "@/store/account";
import { tokenStore } from "@/utils/tokenUtils";
import HeaderUserProfile from "@/components/HeaderUserProfile";
import LogoImage from "@/images/logo.png";
import { MenuOutlined } from "@ant-design/icons";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import MobileSidebar from "@/components/MobileSidebar";
import LanguageSelectBox from "@/components/LanguageSelectBox";
import Headroom from "react-headroom";
import useModal from "@/hooks/useModal";
import styles from "./Header.module.less";

export interface MenuItem {
    name: string;
    path: string;
    key: string;
    exact?: boolean;
}

export const menuItems: MenuItem[] = [
    { name: "나의 스터디방", path: "/myrooms", key: "navbar.item.myrooms" },
    { name: "스터디방 만들기", path: "/room/create", key: "navbar.item.createroom" },
    { name: "새 소식", path: "/newsfeed", key: "navbar.item.newsfeed" },
    { name: "검색", path: "/search", key: "navbar.item.search" }
];

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
    const { t } = useTranslation();
    const { visible, onClose, onOpen } = useModal();
    const isLoggedIn = useIsLoggedIn();
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        tokenStore.removeAccessToken();
        dispatch(logout(""));
    }, [dispatch]);

    let userAreaByAuth;
    if (isLoggedIn) {
        userAreaByAuth = (
            <>
                <span className={styles.userProfile}>
                    <HeaderUserProfile />
                </span>
                <Button onClick={onLogout}>{t("auth.logout")}</Button>
            </>
        );
    } else {
        userAreaByAuth = (
            <Link to="/login">
                <Button type="primary">{t("auth.login")}</Button>
            </Link>
        );
    }

    return (
        <Headroom>
            <header className={styles.wrapper}>
                <span className={styles.logo}>
                    <NavLink to="/">
                        <img src={LogoImage} width="140px" alt="site logo" />
                    </NavLink>
                </span>

                <nav className={styles.navbar} role="navigation">
                    <ul>
                        {menuItems.map(({ path, key }) => (
                            <li key={key} className={styles.menuItem}>
                                <NavLink to={path} activeClassName={styles.active}>
                                    {t(key)}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <span className={styles.rightSide}>
                    <LanguageSelectBox />
                    <span className={styles.userArea}>{userAreaByAuth}</span>
                </span>

                {/* Tablet & Mobile */}
                <span className={styles.hamburger} onClick={onOpen}>
                    <MenuOutlined />
                </span>
                <MobileSidebar visible={visible} onClose={onClose} />
            </header>
        </Headroom>
    );
};

export default React.memo(Header);
