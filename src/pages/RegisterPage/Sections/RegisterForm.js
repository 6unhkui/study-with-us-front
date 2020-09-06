import React, {useState} from 'react';
import { request} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Form, Input, Row, Col, Checkbox, Button, message} from 'antd';

import {PasswordRegex} from "utils/Form/FormValidation";
import AgreeLayer from './AgreeLayer';


export default function RegisterForm(props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [duplicateCheckCompleted, setDuplicateCheckCompleted] = useState(false);
    const [agreeLayerOpen, setAgreeLayerOpen] = useState(false);

    const validateMessages = {
      required: t('validate.required', { name: '${label}'}),
      pattern: {
        mismatch: t('validate.password'),
      }
    };
  
    const onSubmit = values => {
      const data = {
        name : values.name.trim(),
        password : values.password.trim(),
        email : values.email.trim(),
      }

      if(duplicateCheckCompleted) {
        request().post('/api/v1/auth/register', data)
        .then(response => { 
            props.success.setSuccess(true);
            props.user.setUser({name : data.name});
        })
        .catch(err => { console.log(err)});
      }else {
        message.error(t('auth.pleaseDuplicateAccountCheck'));
      }
    };


    const checkDuplicateEmail = () => {
      const email = form.getFieldValue('email') ? form.getFieldValue('email').trim() : '';

      // 이메일 필드에 데이터가 존재하고, 에러가 발생하지 않았다면
      if(!duplicateCheckCompleted && email.length > 0 && form.getFieldError('email').length === 0) {
        request().get(`/api/v1/auth/check-email?email=${email}`)
        .then(response => { 
            if(response.data.data){
                message.success(t('auth.isAvailableAccount'));
                setDuplicateCheckCompleted(true);
            }else {
                message.error(t('auth.isDuplicateAccount'));
            }
        })
        .catch(err => { console.log(err)});
      }
    };

    return (
      <>
      {agreeLayerOpen && <AgreeLayer setAgreeLayerOpen={setAgreeLayerOpen}/>}
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
                label={t('auth.email')}
            >
              <Row gutter={8}>
                <Col span={16}>
                  <Form.Item
                    name="email"
                    noStyle
                    label={t('auth.email')}
                    rules={[
                      {
                        type: 'email',
                        message: t('validate.email'),
                      },
                      {
                        required: true,
                      },]}
                  >
                    <Input disabled={duplicateCheckCompleted} placeholder="youremail@example.com" allowClear/>
                  </Form.Item>
                </Col>
                <Col Col span={8}>
                  <Button onClick={checkDuplicateEmail} type="primary" ghost>
                    {t('auth.duplicateAccountCheck')}
                  </Button>
                </Col>
              </Row>
            </Form.Item>

              <Form.Item
                name="name"
                label={t('auth.name')}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder={t('auth.name')} allowClear/>
              </Form.Item>

            <Form.Item
              name="password"
              label={t('auth.password')}
              rules={[
                {
                  required: true,
                },
                {
                  pattern: PasswordRegex
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder={t('auth.password')} allowClear/>
            </Form.Item>
  
            <Form.Item
              name="confirm"
              label={t('auth.confirmPassword')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
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
                <Input.Password placeholder={t('auth.confirmPassword')} allowClear/>
            </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject('Should accept agreement'),
              }
            ]}
          >
            <Checkbox>
              <AgreementText onClick={() => {setAgreeLayerOpen(true)}} >
                {t('auth.AgreementOnTermsAndConditions')}
              </AgreementText>
            </Checkbox>
          </Form.Item>


        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large" className='shadow' style={{marginTop : '1rem'}}>
              {t('auth.createAccount')}
          </Button>
        </Form.Item>
    </Form>
    </>
  )
}

const AgreementText = styled.span`
  color : var(--primary-color);
  /* margin-left : .6rem; */
  cursor: pointer;
  position : absolute
` 