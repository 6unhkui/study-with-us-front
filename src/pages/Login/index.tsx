import React, { useCallback, useEffect } from "react";
import Wrapper from "@/components/Wrapper";
import { useDispatch } from "react-redux";
import { loginAsync } from "@/store/account";
import { Alert, Button, Divider, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import SocialLoginButtons from "@/components/SocialLoginButtons";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { LoginDTO } from "@/api/dto/account.dto";
import { useTypedSelector } from "@/store";
import styles from "./Login.module.less";

interface LoginPageProps {}

const LoginPage: React.FC<LoginPageProps> = () => {
    const { loading, error } = useTypedSelector(state => state.account.login);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("%c LoginPage Mount", "color: yellow; font-weight: bold");

        return () => {
            dispatch(loginAsync.cancel(""));
        };
    }, [dispatch]);

    const onSubmit = useCallback(
        (values: LoginDTO) => {
            dispatch(loginAsync.request(values));
        },
        [dispatch]
    );

    return (
        <Wrapper type="card" header="Log In" size="small">
            <SEO title="Login" />
            {!loading && error && <Alert message={error} type="error" showIcon className={styles.error} />}

            <Form
                initialValues={{ email: "", password: "" }}
                onFinish={onSubmit}
                size="large"
                layout="vertical"
                scrollToFirstError
                requiredMark={false}
            >
                <Form.Item name="email" rules={[{ required: true }]}>
                    <Input type="email" prefix={<UserOutlined />} placeholder="youremail@example.com" allowClear />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input type="password" prefix={<LockOutlined />} placeholder="비밀번호를 입력해주세요." allowClear />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading}>
                        로그인
                    </Button>
                </Form.Item>
            </Form>

            <div className={styles.signUp}>
                <span>계정이 존재하지 않으신가요?</span>
                <Link to="/register">{`계정 생성 >`}</Link>
            </div>

            <Divider plain>Log In With</Divider>
            <SocialLoginButtons />
        </Wrapper>
    );
};

export default LoginPage;
