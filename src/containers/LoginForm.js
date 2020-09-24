import React, {useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form, Input, Button, Alert, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST, LOAD_ACCOUNT_REQUEST, REMEMBER_ME } from 'store/modules/account';


const LoginForm = (props)  => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {isLoggedIn, isLoggingIn, logInErrorReason, isRememberMe} = useSelector(state => state.account);

    const initialAccount =  REMEMBER_ME && window.localStorage.getItem(REMEMBER_ME) ? window.localStorage.getItem(REMEMBER_ME) : '';

    const validateMessages = {
        required: t('validate.required', { name: '${name}'})
    };

    const handleLocalLogin = useCallback(values => {
        dispatch({
            type: LOG_IN_REQUEST,
            data : values,
            meta: {
                callbackAction : () => {
                    props.history.push(props.location.state ? props.location.state.from.pathname : "/");
                }
            }
        });

        if(!isLoggedIn) return false;

        isRememberMe ? window.localStorage.setItem(REMEMBER_ME, values.email) : localStorage.removeItem(REMEMBER_ME);
    }, []);


    const handleRememberMe = useCallback(e => {
        dispatch({
            type: REMEMBER_ME,
            data : e.target.checked
        })
    }, []);

    return (
        <>
            {!isLoggedIn && logInErrorReason &&
                <Alert message={logInErrorReason} type="error" showIcon style={{marginBottom : '1rem'}}
            />}

            <Form
                name="normal_login"
                className="login-form"
                initialValues={{'email' : initialAccount}}
                onFinish={handleLocalLogin}
                size="large"
                layout = "vertical"
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="email"
                    rules={[{
                        type: 'email',
                        message: t('validate.email'),
                    },{
                        required: true,
                    }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />}
                           placeholder="youremail@example.com" type="email"
                           allowClear/>
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true}]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder={t('auth.password')}
                        allowClear
                    />
                </Form.Item>

                <RememberMe>
                  <Checkbox onClick={handleRememberMe} checked={isRememberMe}>
                    {t('auth.rememberAccount')}
                  </Checkbox>
                </RememberMe>

                <ForgotPassword>
                    <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
                </ForgotPassword>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="shadow" block
                            loading={isLoggingIn}
                    >
                        {t('auth.login')}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default LoginForm;


const RememberMe = styled.div`
  margin-bottom : 1rem;
  display : inline-block;
`

const ForgotPassword = styled.div`
  float : right;
`