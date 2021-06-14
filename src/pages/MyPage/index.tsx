import Avatar from "@/components/Avatar";
import Wrapper from "@/components/Wrapper";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Divider from "@/components/Divider";
import { Tabs } from "antd";
import { CameraOutlined } from "@ant-design/icons";
import AuthProviderBadge from "@/components/AuthProviderBadge";
import SEO from "@/components/SEO";
import { useMeAsync } from "@/hooks/useRedux";
import Emoji from "@/components/Emoji";
import { useDispatch } from "react-redux";
import { changeProfileImageAsync, meAsync } from "@/store/account";
import MyProfileEditForm from "@/components/MyProfileEditForm";
import PasswordEditForm from "@/components/PasswordEditForm";
import WithdrawMembership from "@/components/WithdrawMembership";
import Loading from "@/components/Loading";
import styles from "./MyPage.module.less";

const { TabPane } = Tabs;

interface TabItem {
    key: string;
    component: React.FC;
    name: string;
}

const tabItems: TabItem[] = [
    { key: "1", component: MyProfileEditForm, name: "회원 정보 변경" },
    { key: "2", component: PasswordEditForm, name: "비밀번호 변경" },
    { key: "3", component: WithdrawMembership, name: "회원 탈퇴" }
];

interface MyPagePageProps {}

const MyPagePage: React.FC<MyPagePageProps> = () => {
    const { data: me, loading, error } = useMeAsync();
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [selectedKey, setSelectedKey] = useState("1");

    useEffect(() => {
        if (!me) dispatch(meAsync.request(""));
    }, [dispatch, me]);

    const onProfileClick = useCallback(() => {
        inputRef.current?.click();
    }, []);

    const uploadProfileImage = useCallback(
        ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
            if (files && files[0]) {
                const formData = new FormData();
                formData.append("file", files[0]);
                dispatch(changeProfileImageAsync.request(formData));
            }
        },
        [dispatch]
    );

    if (loading || !me) return <Loading type="component" />;

    return (
        <Wrapper type="card">
            <SEO title="마이 페이지" />

            <section className={styles.userInfoArea}>
                <div className={styles.profileImage}>
                    <Avatar name={me.name} profileImage={me.profileImg} size={120} />

                    <div className={styles.uploadBtn} onClick={onProfileClick}>
                        <CameraOutlined className={styles.cameraIcon} />
                        <input type="file" accept="image/*" ref={inputRef} hidden onChange={uploadProfileImage} />
                    </div>
                </div>
                <h3 className={styles.name}>{me.name}</h3>
                <div className={styles.account}>
                    <div className={styles.email}>
                        <Emoji mr={8}>✉️</Emoji>
                        <span>{me.email}</span>
                    </div>
                    {me.provider !== "LOCAL" && (
                        <div className={styles.provider}>
                            <AuthProviderBadge provider={me.provider} />
                            <span>소셜 계정으로 로그인 된 계정입니다.</span>
                        </div>
                    )}
                </div>
            </section>

            <Divider />

            <section>
                <Tabs defaultActiveKey={selectedKey} centered onChange={setSelectedKey}>
                    {tabItems.map(({ key, name, component: Component }) => (
                        <TabPane tab={name} key={key}>
                            <div className={styles.content}>{selectedKey === key && <Component />}</div>
                        </TabPane>
                    ))}
                </Tabs>
            </section>
        </Wrapper>
    );
};

export default MyPagePage;
