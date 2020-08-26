import React, {useState} from 'react';
import axios from 'axios';
import { SERVER_URI, ACCESS_TOKEN } from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Form, Input, Tooltip, Cascader, Select, Row, Col, Checkbox, Button, message} from 'antd';


export default function RegisterForm(props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const [duplicateChkCmp, setDuplicateChkCmp] = useState(false);
  
    const onSubmit = values => {
      const data = {
        name : values.name.trim(),
        password : values.password.trim(),
        email : values.email.trim(),
      }

      axios.post(`${SERVER_URI}/api/v1/auth/register`, data)
        .then(response => { 
            props.success.setSuccess(true);
            props.user.setUser({name : data.name});
        })
        .catch(err => { console.log(err)});
    };


    const checkDuplicateEmail = () => {
      const email = form.getFieldValue('email') ? form.getFieldValue('email').trim() : '';

      // 이메일 필드에 데이터가 존재하고, 에러가 발생하지 않았다면
      if(!duplicateChkCmp && email.length > 0 && form.getFieldError('email').length === 0) {
        axios.get(`${SERVER_URI}/api/v1/auth/check-email?email=${email}`)
        .then(response => { 
            if(response.data){
                message.success('사용할 수 있는 이메일입니다.');
                setDuplicateChkCmp(true);
            }else {
                message.error('해당 이메일은 이미 존재하는 계정입니다.');
            }
        })
        .catch(err => { console.log(err)});
      }
    };
  
    return (
            <Form
                // {...formItemLayout}
                form={form}
                name="register"
                onFinish={onSubmit}
                // initialValues={{
                //     // residence: ['zhejiang', 'hangzhou', 'xihu'],
                //     prefix: '010',
                // }}
                scrollToFirstError
                layout = "vertical"
                requiredMark={false}
            >

              <Form.Item
                name="name"
                label={t('auth.name')}
                rules={[
                  {
                    required: true,
                    message: t('validate.required'),
                    whitespace: true,
                  },
                ]}
              >
                <Input placeholder={t('auth.name')}/>
              </Form.Item>


              <Form.Item
                label={t('auth.email')}
             >
                <Form.Item
                  name="email"
                  noStyle  
                  rules={[
                    {
                      type: 'email',
                      message: t('validate.email'),
                    },
                    {
                      required: true,
                      message: t('validate.required'),
                    },]}
                >
                  <Input disabled={duplicateChkCmp} placeholder={t('auth.email')} style={{width : 'calc(100% - 90px)'}} />
                </Form.Item>
                <Button onClick={checkDuplicateEmail} style={{wdith : '90px', float : 'right'}}>중복 확인</Button>
            </Form.Item>
  
            <Form.Item
              name="password"
              label={t('auth.password')}
              rules={[
                {
                  required: true,
                  message: t('validate.required'),
                },
              ]}
              hasFeedback
            >
              <Input.Password placeholder={t('auth.password')}/>
            </Form.Item>
  
            <Form.Item
              name="confirm"
              label={t('auth.confirmPassword')}
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t('validate.required'),
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
                <Input.Password placeholder={t('auth.confirmPassword')}/>
            </Form.Item>
  
            {/* <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
              {
                  required: true,
                  message: 'Please input your phone number!',
              },]}
            >
                <Input style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}/>
            <span
            style={{ display: 'inline-block', width: '18px', lineHeight: '32px', textAlign: 'center' }}
          >
            -
          </span>
          <Input style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}/>
            <span
            style={{ display: 'inline-block', width: '18px', lineHeight: '32px', textAlign: 'center' }}
          >
            -
          </span>
          <Input style={{ display: 'inline-block', width: 'calc(33% - 12px)' }}/>
        </Form.Item> */}
  
        {/* <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="longgggggggggggggggggggggggggggggggggg"
      >
        <Upload name="logo" action="/upload.do" listType="picture">
          <Button>
            <UploadOutlined /> Click to upload
          </Button>
        </Upload>
      </Form.Item> */}

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject('Should accept agreement'),
            },
          ]}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item> 
        
        <Form.Item>
          <Button type="primary" htmlType="submit" block size="large">
              가입하기
          </Button>
        </Form.Item>
      </Form>
    )
}