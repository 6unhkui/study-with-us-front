import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Form, Input, Button, Alert, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const LocalLoginForm = (props)  => {
    const { t } = useTranslation();
    const initialAccount = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    const validateMessages = {
      required: t('validate.required', { name: '${name}'})
    };

    return (
       <>
         {props.error.isError && 
            <Alert message={props.error.errorMessage} type="error" showIcon style={{marginBottom : '1rem'}}
          />}
        
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{'email' : initialAccount}}
              onFinish={props.handleLocalLogin}
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
                <Checkbox onClick={(v) => props.rememberMe.setRememberMe(v.target.checked)} checked={props.rememberMe.rememberMe}>
                  {t('auth.rememberAccount')}
                </Checkbox>
              </RememberMe>

              <ForgotPassword>
                <Link to="/forgot-password">{t('auth.forgotPassword')}</Link>
              </ForgotPassword>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="shadow" block>
                  {t('auth.login')}
                </Button>
              </Form.Item>
          </Form>
      </>
    );
  };
  
export default LocalLoginForm;

const RememberMe = styled.div`
  margin-bottom : 1rem;
  display : inline-block;
`

const ForgotPassword = styled.div`
  float : right;
`