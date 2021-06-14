import { useTypedSelector } from "@/store";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Rule } from "rc-field-form/lib/interface";
import { Alert, Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import { changePasswordAsync } from "@/store/account";
import styles from "./PasswordEditForm.module.less";

type Fields = "oldPassword" | "newPassword" | "confirmNewPassword";
const validateRules: Record<Fields, Rule[]> = {
    oldPassword: [{ required: true }],
    newPassword: [
        { required: true },
        {
            pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
            message: "비밀번호는 영소대문자와 숫자를 포함한 6자리 이상만 가능합니다."
        },
        { type: "string", max: 50 }
    ],
    confirmNewPassword: [
        { required: true },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
            }
        })
    ]
};

interface PasswordEditFormProps {}

const PasswordEditForm: React.FC<PasswordEditFormProps> = () => {
    const [form] = useForm();
    const { data, loading, error } = useTypedSelector(({ account: { changePassword } }) => changePassword);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(changePasswordAsync.cancel(""));
        };
    }, [dispatch]);

    useEffect(() => {
        if (!loading && data) {
            form.resetFields();
            message.success("비밀번호 변경에 성공하였습니다.");
        }
    }, [data, form, loading]);

    const onSubmit = useCallback(
        async (values: Record<Fields, any>) => {
            if (values.newPassword === values.confirmNewPassword) {
                dispatch(changePasswordAsync.request(values));
            }
        },
        [dispatch]
    );

    return (
        <Form form={form} layout="vertical" scrollToFirstError onFinish={onSubmit}>
            {error && <Alert message={error} type="error" showIcon className={styles.error} />}

            <Form.Item name="oldPassword" hasFeedback label="기존 비밀번호" rules={validateRules.oldPassword}>
                <Input.Password type="password" placeholder="기존 비밀번호를 입력해주세요." allowClear />
            </Form.Item>

            <Form.Item name="newPassword" hasFeedback label="새로운 비밀번호" rules={validateRules.newPassword}>
                <Input.Password type="password" placeholder="새로운 비밀번호를 입력해주세요." allowClear />
            </Form.Item>

            <Form.Item
                name="confirmNewPassword"
                hasFeedback
                label="새로운 비밀번호 확인"
                rules={validateRules.confirmNewPassword}
            >
                <Input.Password type="password" placeholder="새로운 비밀번호를 다시 입력해주세요." allowClear />
            </Form.Item>

            <Form.Item className={styles.button}>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    변경하기
                </Button>
            </Form.Item>
        </Form>
    );
};

export default PasswordEditForm;
