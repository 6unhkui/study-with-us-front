import React, { useCallback } from "react";
import { menuItems } from "@/components/Header";
import { Button, Drawer } from "antd";
import { Link, NavLink } from "react-router-dom";
import HeaderUserProfile from "@/components/HeaderUserProfile";
import useIsLoggedIn from "@/hooks/useIsLoggedIn";
import LanguageSelectBox from "@/components/LanguageSelectBox";
import { useTranslation } from "react-i18next";
import { tokenStore } from "@/utils/tokenUtils";
import { useDispatch } from "react-redux";
import { logout } from "@/store/account";
import Divider from "@/components/Divider";
import styles from "./MobileSidebar.module.less";

interface MobileSidebarProps {
    visible: boolean;
    onClose: () => void;
}

const MobileSidebar: React.FC<MobileSidebarProps> = ({ visible, onClose }) => {
    const { t } = useTranslation();
    const isLoggedIn = useIsLoggedIn();
    const dispatch = useDispatch();

    const onLogout = useCallback(() => {
        tokenStore.removeAccessToken();
        dispatch(logout(""));
        onClose();
    }, [dispatch, onClose]);

    let userAreaByAuth;
    if (isLoggedIn) {
        userAreaByAuth = (
            <>
                <HeaderUserProfile onClick={onClose} />
                <Button onClick={onLogout}>Logout</Button>
            </>
        );
    } else {
        userAreaByAuth = (
            <Link to="/login" onClick={onClose}>
                <Button type="primary">Login</Button>
            </Link>
        );
    }

    return (
        <Drawer
            title={userAreaByAuth}
            width="80vw"
            placement="right"
            visible={visible}
            onClose={onClose}
            className={styles.sidebar}
        >
            <ul className={styles.menuContainer}>
                {menuItems.map(({ path, key }) => (
                    <li key={key} className={styles.menuItem}>
                        <NavLink to={path} onClick={onClose} activeClassName={styles.active}>
                            {t(key)}
                        </NavLink>
                    </li>
                ))}
            </ul>
            <Divider />
            <div className={styles.languageSelectBox}>
                <LanguageSelectBox />
            </div>
        </Drawer>
    );
};

export default React.memo(MobileSidebar);
