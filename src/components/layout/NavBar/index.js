import React, { useCallback, useState } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import Logo from "assets/image/logo.png";
import { Button, Divider, Drawer, List } from "antd";
import LanguageSeleoctor from "components/LanguageSelector";
import { ACCESS_TOKEN } from "constants/index";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "components/Avatar";
import { LOG_OUT } from "store/modules/account";
import HamburgerMenu from "react-hamburger-menu";

const NavBar = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const { name, profileImg } = useSelector(state => state.account.me);

    const handleLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT,
            meta: {
                callbackAction: () => {
                    localStorage.removeItem(ACCESS_TOKEN);
                    props.history.push("/");
                }
            }
        });
    }, []);

    const items = [
        { path: "/user/rooms", name: t("navbar.myStudyRooms") },
        { path: "/feed", name: t("navbar.newsFeed") },
        { path: "/search", name: t("navbar.searchStudyRoom") }
    ];

    const checkLogin = !!localStorage.getItem("accessToken");

    const renderLogInOutBtn = () =>
        checkLogin ? (
            <Button type="primary" ghost onClick={handleLogout}>
                {t("auth.logout")}
            </Button>
        ) : (
            <Link to="/login">
                <Button type="primary">{t("auth.login")}</Button>
            </Link>
        );

    const renderAccountInfo = (handleClick = () => {}) => {
        if (!checkLogin) return <></>;

        return (
            <span className="loginout-wrap" onClick={handleClick} aria-hidden>
                <Link to="/account">
                    <div className="user-info" style={{ display: "inline-block" }}>
                        <Avatar user={{ name, profileImg }} showName />
                    </div>
                </Link>
                <Divider type="vertical" />
            </span>
        );
    };

    return (
        <nav className="header-wrap">
            <span className="logo-wrap">
                <Link to="/">
                    <img src={Logo} className="logo" alt="logo" />
                </Link>
            </span>
            <div className="gnb-wrap">
                <ul>
                    {items.map(item => (
                        <li key={item.name}>
                            <NavLink to={item.path} activeClassName="active">
                                {item.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="user-wrap">
                {renderAccountInfo()}
                <LanguageSeleoctor />
                {renderLogInOutBtn()}
            </div>

            <div className="sidebar-wrap">
                <Drawer visible={visibleSidebar} onClose={setVisibleSidebar.bind(null, false)} placement="right" width="80%">
                    {renderAccountInfo(setVisibleSidebar.bind(null, false))}
                    <LanguageSeleoctor />
                    <Divider style={{ margin: "10px 0 20px 0" }} />
                    <List
                        dataSource={items}
                        renderItem={(item, i) => (
                            <List.Item key={i} onClick={setVisibleSidebar.bind(null, false)}>
                                <NavLink
                                    to={item.path}
                                    style={{ color: "var(--font-color-black)" }}
                                    activeStyle={{
                                        color: "var(--primary-color)",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {item.name}
                                </NavLink>
                            </List.Item>
                        )}
                    />
                </Drawer>

                <HamburgerMenu
                    isOpen={visibleSidebar}
                    menuClicked={setVisibleSidebar.bind(null, true)}
                    width={28}
                    height={16}
                    strokeWidth={2}
                    rotate={0}
                    color="black"
                    borderRadius={6}
                    animationDuration={0.5}
                    className="hamburger-btn"
                />
            </div>
        </nav>
    );
};

export default withRouter(NavBar);
