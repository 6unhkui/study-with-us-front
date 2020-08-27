import React, {useState}  from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Form, Input, Button, Alert, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


const LoginForm = (props)  => {
    const { t } = useTranslation();

    const initialAccount = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

    return (
       <>
         {props.error.isError && <Alert message={props.error.errorMessage} type="error" showIcon style={{marginBottom : '1rem'}}/>}
        
          <Form
              name="normal_login"
              className="login-form"
              initialValues={{'email' : initialAccount}}
              onFinish={props.onSubmit}
              size="large"
              layout = "vertical"
          >
              <Form.Item
                name="email"
                rules={[{
                    type: 'email',
                    message: t('validate.email'),
                },{
                    required: true, 
                    message: t('validate.required')}]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t('auth.email')} type="email"/>
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: t('validate.required')}]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder={t('auth.password')}
                />
              </Form.Item>

              <RememberMe>
                <Checkbox onClick={(v) => props.rememberMe.setRememberMe(v.target.checked)} checked={props.rememberMe.rememberMe}>Remember me</Checkbox>
              </RememberMe>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" block>
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
`