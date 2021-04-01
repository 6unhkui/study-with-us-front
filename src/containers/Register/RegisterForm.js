import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { CHECK_DUPLICATED_ACCOUNT_REQUEST, REGISTER_REQUEST } from "store/modules/account";
import { passwordRegExp } from "utils/regularExpression";

import { Form, Input, Row, Col, Checkbox, Button } from "antd";

import AgreeLayer from "./AgreeLayer";

export default function RegisterForm(props) {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    const { isDuplicateAccount, isRegistering } = useSelector(state => state.account);
    const [duplicateCheckCompleted, setDuplicateCheckCompleted] = useState(false);
    const [agreeLayerOpen, setAgreeLayerOpen] = useState(false);

    const validateMessages = {
        required: t("validate.required", { name: "${label}" }),
        pattern: {
            mismatch: t("validate.password")
        }
    };

    const handleSubmit = useCallback(
        values => {
            if (!duplicateCheckCompleted || isDuplicateAccount) {
                form.setFields([
                    {
                        name: "email",
                        errors: [t("auth.isDuplicateAccount")]
                    }
                ]);

                return;
            }

            const data = {
                name: values.name.trim(),
                password: values.password.trim(),
                email: values.email.trim()
            };

            dispatch({
                type: REGISTER_REQUEST,
                data,
                meta: {
                    callbackAction: () => {
                        props.setIsSuccess(true);
                        props.setUser({ name: data.name });
                    }
                }
            });
        },
        [dispatch, duplicateCheckCompleted, form, isDuplicateAccount, props, t]
    );

    const handleCheckDuplicateEmail = useCallback(() => {
        setDuplicateCheckCompleted(false);
        const email = form.getFieldValue("email") ? form.getFieldValue("email").trim() : "";

        function callback(result) {
            if (!result) {
                setDuplicateCheckCompleted(true);
            } else {
                form.setFields([
                    {
                        name: "email",
                        errors: [t("auth.isDuplicateAccount")]
                    }
                ]);
            }
        }

        // 이메일 필드에 데이터가 존재하고, 에러가 발생하지 않았다면
        if (!duplicateCheckCompleted && email.length > 0 && form.getFieldError("email").length === 0) {
            dispatch({
                type: CHECK_DUPLICATED_ACCOUNT_REQUEST,
                data: email,
                meta: {
                    callbackAction: callback
                }
            });
        }
    }, [dispatch, duplicateCheckCompleted, form, t]);

    return (
        <>
            {agreeLayerOpen && <AgreeLayer setLayerOpen={setAgreeLayerOpen} />}
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
                    name="email"
                    hasFeedback
                    label={t("auth.email")}
                    rules={[
                        {
                            type: "email",
                            message: t("validate.email")
                        },
                        {
                            required: true
                        },
                        {
                            max: 50
                        }
                    ]}
                >
                    <Input placeholder="youremail@example.com" allowClear onBlur={handleCheckDuplicateEmail} />
                </Form.Item>

                <Form.Item
                    name="name"
                    label={t("auth.name")}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            whitespace: true
                        },
                        {
                            type: "string",
                            max: 20
                        }
                    ]}
                >
                    <Input placeholder={t("auth.name")} allowClear />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={t("auth.password")}
                    rules={[
                        {
                            required: true
                        },
                        {
                            pattern: passwordRegExp
                        },
                        {
                            type: "string",
                            max: 50
                        }
                    ]}
                    hasFeedback
                >
                    <Input.Password placeholder={t("auth.password")} allowClear />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label={t("auth.confirmPassword")}
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
                    <Input.Password placeholder={t("auth.confirmPassword")} allowClear />
                </Form.Item>

                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                        {
                            validator: (_, value) =>
                                value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement"))
                        }
                    ]}
                >
                    <Row>
                        <Col span={2}>
                            <Checkbox />
                        </Col>
                        <Col span={22}>
                            <AgreementText
                                onClick={() => {
                                    setAgreeLayerOpen(true);
                                }}
                            >
                                {t("auth.AgreementOnTermsAndConditions")}
                            </AgreementText>
                        </Col>
                    </Row>
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        size="large"
                        className="shadow"
                        style={{ marginTop: "1rem" }}
                        loading={isRegistering}
                    >
                        {t("auth.createAccount")}
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

const AgreementText = styled.span`
    color: var(--primary-color);
    cursor: pointer;
    position: absolute;
`;
