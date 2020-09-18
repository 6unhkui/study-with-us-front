import React from 'react';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import { useDispatch } from "react-redux";
import { CHANGE_NAME } from 'store/modules/account';

import { Form, Input, Button, message} from 'antd';


const EditAccountInfo = (props) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const validateMessages = {
      required: t('validate.required', { name: '${label}'})
    };

    const handleSubmit = values => {
        const data = {
          name : values.name.trim(),
        }

        http.put('/api/v1/account', data)
        .then(response => {
            dispatch({ 
              type: CHANGE_NAME, 
              payload: {name : data.name}
            });

            message.success('저장이 완료되었습니다.');
        })
    };

    return (
        <Form
          form={form}
          name="profileInfo"
          onFinish={handleSubmit}
          initialValues={props.account}
          scrollToFirstError
          layout = "vertical"
          requiredMark={false}
          validateMessages={validateMessages}
        >
          <Form.Item
            label={t('auth.email')}
            name="email"
          >
            <Input placeholder={t('auth.email')} disabled={true}/>
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
              <Input placeholder={t('auth.name')}/>
            </Form.Item>

            <Form.Item style={{marginTop : '2.4rem'}}>
              <Button type="primary" htmlType="submit" size="large" className="shadow">
                {t('common.save')}
              </Button>
            </Form.Item>
        </Form>
    )
}

export default EditAccountInfo;