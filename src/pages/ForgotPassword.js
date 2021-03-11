import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button } from "antd";
import CardWrap from "components/CardBox";

export default function ForgotPasswordPage() {
    const { t } = useTranslation();

    const validateMessages = {
        required: t("validate.required", { name: "${name}" })
    };

    return (
        <CardWrap title={t("auth.resetPassword")} size={"small"}>
            <div className="sub-text">{t("auth.enterEmailToResetPassword")}</div>
            <Form
                name="normal_login"
                className="login-form"
                // onFinish={props.onSubmit}
                size="large"
                layout="vertical"
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="email"
                    rules={[
                        {
                            type: "email",
                            message: t("validate.email")
                        },
                        {
                            required: true
                        }
                    ]}
                >
                    <Input placeholder="youremail@example.com" type="email" allowClear />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="shadow" size="large" block>
                        {t("auth.login")}
                    </Button>
                </Form.Item>
            </Form>
        </CardWrap>
    );
}
