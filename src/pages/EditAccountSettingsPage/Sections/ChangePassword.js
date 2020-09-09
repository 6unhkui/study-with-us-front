import React, {useState} from 'react';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Alert, message} from 'antd';

import {PasswordRegex} from "utils/Form/FormValidation";

const ChangePassword = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [errorMessage, setErrorMessage] = useState('');

 
    const validateMessages = {
      required: t('validate.required', { name: '${label}'}),
      pattern: {
        mismatch: t('validate.password'),
      }
    };

    const onSubmit = (values) => {
      const data = {
        oldPassword : values.oldPassword,
        newPassword : values.password,
      }

      http.put('/api/v1/user/password', data)
      .then(res => {
        message.success('저장이 완료되었습니다.');
      })
      .catch(err => {
        if(err.response) {
          setErrorMessage(err.response.data.restRequestError.message)}
          form.resetFields();
      })
    }

    return (
      <>
      {errorMessage.length > 0 && <Alert message={errorMessage} type="error" showIcon />}
      <Form
        form={form}
        name="register"
        onFinish={onSubmit}
        scrollToFirstError
        layout = "vertical"
        requiredMark={false}
        validateMessages={validateMessages}
      >
        <Form.Item
          name="oldPassword"
          label={t('auth.oldPassword')}
          rules={[
            {
              required: true
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder={t('auth.oldPassword')}/>
        </Form.Item>

        <Form.Item
          name="password"
          label={t('auth.newPassword')}
          rules={[
            {
              required: true
            },
            {
              pattern: PasswordRegex
            },
          ]}
            hasFeedback
          >
            <Input.Password placeholder={t('auth.newPassword')}/>
        </Form.Item>
  
            <Form.Item
              name="confirm"
              label={t('auth.confirmNewPassword')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
  
                    return Promise.reject(t('validate.confirmPassowrd'));
                  },
                }),
              ]}>
                <Input.Password placeholder={t('auth.confirmNewPassword')}/>
        </Form.Item>
  
        <Form.Item style={{marginTop : '2.4rem'}}>
          <Button type="primary" htmlType="submit" size="large" className="shadow">
            {t('common.save')}
          </Button>
        </Form.Item>
      </Form>
      </>
    )
}

export default ChangePassword;