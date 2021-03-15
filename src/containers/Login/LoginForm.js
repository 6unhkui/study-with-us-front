import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Form, Input, Button, Alert, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "store/modules/account";
import { REMEMBER_ME } from "constants/index";

const LoginForm = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [isRememberMe, setIsRememberMe] = useState(() => !!window.localStorage.getItem(REMEMBER_ME));
    const { isLoggedIn, isLoggingIn, logInErrorReason } = useSelector(state => state.account);

    const validateMessages = {
        required: t("validate.required", { name: "${name}" })
    };

    const saveRememberMe = useCallback(
        email => {
            if (isRememberMe) {
                window.localStorage.setItem(REMEMBER_ME, email);
            } else {
                window.localStorage.removeItem(REMEMBER_ME);
            }
        },
        [isRememberMe]
    );

    const handleLocalLogin = useCallback(
        values => {
            dispatch({
                type: LOG_IN_REQUEST,
                data: values,
                meta: {
                    callbackAction: () => {
                        saveRememberMe(values.email);
                        props.history.push(props.location.state ? props.location.state.from.pathname : "/");
                    }
                }
            });
        },
        [dispatch, saveRememberMe]
    );

    return (
        <>
            {!isLoggedIn && logInErrorReason && (
                <Alert message={logInErrorReason} type="error" showIcon style={{ marginBottom: "1rem" }} />
            )}

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    email: isRememberMe ? window.localStorage.getItem(REMEMBER_ME) : ""
                }}
                onFinish={handleLocalLogin}
                size="large"
                layout="vertical"
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: t("validate.email")
                        },
                        {
                            required: true
                        }
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="youremail@example.com"
                        type="email"
                        allowClear
                    />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={t("auth.password")}
                        allowClear
                    />
                </Form.Item>

                <RememberMe>
                    <Checkbox onClick={e => setIsRememberMe(e.target.checked)} checked={isRememberMe}>
                        {t("auth.rememberAccount")}
                    </Checkbox>
                </RememberMe>

                {/* <ForgotPassword> */}
                {/*    <Link to="/forgot-password">{t('auth.forgotPassword')}</Link> */}
                {/* </ForgotPassword> */}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="shadow" block loading={isLoggingIn}>
                        {t("auth.login")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;

const RememberMe = styled.div`
    margin-bottom: 1rem;
    display: inline-block;
`;
