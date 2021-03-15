import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Form, Input, Button, Alert, message } from "antd";
import { PasswordRegex } from "utils/Form/FormValidation";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_PASSWORD_REQUEST } from "store/modules/account";

const ChangePassword = () => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const { changePasswordErrorReason } = useSelector(state => state.account);

    const validateMessages = {
        required: t("validate.required", { name: "${label}" }),
        pattern: {
            mismatch: t("validate.password")
        }
    };

    const handleSubmit = useCallback(
        value => {
            const data = {
                oldPassword: value.oldPassword,
                newPassword: value.password
            };

            dispatch({
                type: CHANGE_PASSWORD_REQUEST,
                data,
                meta: {
                    callbackAction: () => {
                        message.success("비밀번호 변경이 완료됐습니다.");
                        form.resetFields();
                    }
                }
            });
        },
        [dispatch, form]
    );

    return (
        <>
            {changePasswordErrorReason && changePasswordErrorReason.length > 0 && (
                <Alert message={changePasswordErrorReason} type="error" showIcon />
            )}
            <Form
                form={form}
                name="register"
                onFinish={handleSubmit}
                scrollToFirstError
                layout="vertical"
                requiredMark={false}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="oldPassword"
                    label={t("auth.oldPassword")}
                    rules={[
                        {
                            required: true
                        }
                    ]}
                >
                    <Input.Password placeholder={t("auth.oldPassword")} />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t("auth.newPassword")}
                    rules={[
                        {
                            required: true
                        },
                        {
                            pattern: PasswordRegex
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder={t("auth.newPassword")} />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label={t("auth.confirmNewPassword")}
                    dependencies={["password"]}
                    hasFeedback
                    rules={[
                        {
                            required: true
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(t("validate.confirmPassword"));
                            }
                        })
                    ]}
                >
                    <Input.Password placeholder={t("auth.confirmNewPassword")} />
                </Form.Item>

                <Form.Item style={{ marginTop: "2.4rem" }}>
                    <Button type="primary" htmlType="submit" size="large" className="shadow">
                        {t("common.save")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default ChangePassword;
