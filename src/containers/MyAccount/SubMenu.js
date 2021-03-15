import React, { useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ACCESS_TOKEN } from "constants/index";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Menu } from "antd";
import { CameraOutlined, SettingOutlined, LoginOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { UPLOAD_PROFILE_REQUEST, LOG_OUT } from "store/modules/account";

const SubMenuWrap = props => {
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { name, profileImg } = useSelector(state => state.account.me, []);
    const { isUploadingProfile } = useSelector(state => state.account, []);

    const handleProfileImgOnChange = useCallback(
        e => {
            e.preventDefault();
            const file = e.target.files[0];
            const data = new FormData();
            data.append("file", file);

            dispatch({
                type: UPLOAD_PROFILE_REQUEST,
                file: data
            });
        },
        [dispatch]
    );

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
        {
            component: <Link to={`${props?.match.path}/setting`}>{t("mypage.editAccountSettings.title")}</Link>,
            icon: <SettingOutlined />
        },
        {
            component: (
                <span onClick={handleLogout} aria-hidden>
                    {t("auth.logout")}
                </span>
            ),
            icon: <LoginOutlined />
        }
    ];

    return (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
            <UserWrap>
                <div className="avatar-wrap">
                    <ProfileUploadWrap>
                        <div
                            className="file-upload"
                            onClick={() => {
                                inputRef.current.click();
                            }}
                            aria-hidden
                        >
                            <CameraOutlined style={{ color: "#fff", fontSize: "1.2rem" }} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImgOnChange}
                                style={{ display: "none" }}
                                ref={inputRef}
                            />
                        </div>
                    </ProfileUploadWrap>
                    <Avatar user={{ name, profileImg }} size={100} style={{ fontSize: "2.4rem" }} loading={isUploadingProfile} />
                </div>

                <h1>{t("mypage.title", { name })}</h1>
            </UserWrap>
            <Menu defaultSelectedKeys={["0"]} mode="horizontal" style={{ textAlign: "center", border: "0" }}>
                {items.map((item, i) => (
                    <Menu.Item key={i} icon={item.icon}>
                        {item.component}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default withRouter(SubMenuWrap);

const ProfileUploadWrap = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    line-height: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99;
    text-align: center;
    margin: 0 auto;

    &:hover {
        .file-upload {
            display: block;
        }
    }

    .file-upload {
        display: none;
        width: 100%;
        cursor: pointer;
        background-color: #00000050;
    }
`;

const UserWrap = styled.div`
    margin-top: 20px;
    h1 {
        font-size: var(--font-large);
        margin: 1.2rem 0;
        line-height: 2.6rem;
    }
`;
