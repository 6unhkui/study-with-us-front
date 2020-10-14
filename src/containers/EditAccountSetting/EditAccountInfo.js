import React, {useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import {useDispatch} from "react-redux";

import { Form, Input, Button, message} from 'antd';
import {EDIT_ACCOUNT_REQUEST} from "store/modules/account";


const EditAccountInfo = ({account}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const validateMessages = {
      required: t('validate.required', { name: '${label}'})
    };


    const handleSubmit = useCallback( value => {
        const data = {
            name : value.name.trim(),
        }

        dispatch({
            type : EDIT_ACCOUNT_REQUEST,
            data,
            meta : {
                callbackAction : () => {
                    message.success('계정 정보 수정이 완료됐습니다.');
                    form.resetFields();
                }
            }
        });
    }, []);

    return (
        <Form
          form={form}
          name="profileInfo"
          onFinish={handleSubmit}
          initialValues={account}
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