import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Form, Input, Button, Alert, Checkbox} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';


import { Typography } from 'antd';

const { Title } = Typography;

export default function ForgotPasswordPage() {
    const { t } = useTranslation();
    const validateMessages = {
      required: t('validate.required', { name: '${name}'})
    };

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
          <div className="card-wrap card-width-small">
          <Title style={{textAlign : 'center'}}>{t('auth.resetPassword')}</Title>
          <div className="sub-text">{t('auth.enterEmailToResetPassword')}</div>
          <Form
              name="normal_login"
              className="login-form"
              // onFinish={props.onSubmit}
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
                <Input placeholder="youremail@example.com" type="email" allowClear/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="shadow" size="large" block> 
                  {t('auth.login')}
                </Button>
              </Form.Item>
          </Form>
          </div>
        </div>
      </div>
    )
}
