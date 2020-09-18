import React from 'react';
import {http} from 'utils/HttpHandler';
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, message} from 'antd';

const ChangeProfileInfo = (props) => {
    const [user, setUser] = useRecoilState(userState);  
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const validateMessages = {
      required: t('validate.required', { name: '${label}'})
    };

    const onSubmit = values => {
        const data = {
          name : values.name.trim(),
        }

        http.put('/api/v1/account', data)
        .then(response => {
            setUser({
              ...user,
              "name" : data.name
            })

            message.success('저장이 완료되었습니다.');
        })
    };

    return (
        <Form
          form={form}
          name="profileInfo"
          onFinish={onSubmit}
          initialValues={props.formData}
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

export default ChangeProfileInfo;