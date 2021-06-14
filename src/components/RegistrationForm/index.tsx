import React, { useCallback, useEffect, useState } from "react";
import { Alert, Button, Checkbox, Col, Form, Input, Row } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import { useDispatch } from "react-redux";
import { registerAsync } from "@/store/account";
import { useTypedSelector } from "@/store";
import { AccountAPI } from "@/api/account.api";
import useModal from "@/hooks/useModal";
import styles from "./RegistrationForm.module.less";
import TermsNCoditionsModal from "../TermsNCoditionsModal";
// import Checkbox from "../Checkbox";

type Fields = "name" | "email" | "password" | "confirmPassword" | "agreement";
const validateRules: Record<Fields, Rule[]> = {
    email: [{ type: "email" }, { required: true }, { max: 50 }],
    name: [{ required: true }, { type: "string", max: 20 }],
    password: [
        { required: true },
        {
            pattern: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/,
            message: "비밀번호는 영소대문자와 숫자를 포함한 6자리 이상만 가능합니다."
        },
        { type: "string", max: 50 }
    ],
    confirmPassword: [
        { required: true },
        ({ getFieldValue }) => ({
            validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
            }
        })
    ],
    agreement: [
        {
            validator: (_, value) => (value ? Promise.resolve() : Promise.reject(new Error("Should accept agreement")))
        }
    ]
};

interface RegistrationFormProps {
    onSuccess: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onSuccess }) => {
    const [form] = Form.useForm();
    const { data: result, loading, error } = useTypedSelector(state => state.account.register);
    const dispatch = useDispatch();
    const { visible, onClose, onOpen } = useModal();
    const [checkDuplicatedEmail, setCheckDuplicatedEmail] = useState({
        isValid: false,
        complete: false
    });

    useEffect(() => {
        if (result) {
            onSuccess();
        }
    }, [result, onSuccess]);

    const setFieldErrorOnInvalidEmail = useCallback(() => {
        form.setFields([
            {
                name: "email",
                errors: ["Email has already been token"]
            }
        ]);
    }, [form]);

    const onSubmit = useCallback(
        (values: Record<Fields, any>) => {
            if (Object.values(checkDuplicatedEmail).every(value => value === true)) {
                dispatch(registerAsync.request(values));
            } else {
                setFieldErrorOnInvalidEmail();
            }
        },
        [dispatch, checkDuplicatedEmail, setFieldErrorOnInvalidEmail]
    );

    const onEmailChange = useCallback(
        async (e: React.FocusEvent<HTMLInputElement>) => {
            setCheckDuplicatedEmail(state => ({ ...state, complete: false }));

            const email = form.getFieldValue("email") as string;
            if (email) {
                try {
                    const isInvalid = await AccountAPI.checkDuplicatedEmail(email);

                    if (isInvalid) {
                        setFieldErrorOnInvalidEmail();
                    }

                    setCheckDuplicatedEmail(state => ({ ...state, isValid: !isInvalid }));
                } finally {
                    setCheckDuplicatedEmail(state => ({ ...state, complete: true }));
                }
            }
        },
        [form, setFieldErrorOnInvalidEmail, setCheckDuplicatedEmail]
    );

    return (
        <Form layout="vertical" scrollToFirstError onFinish={onSubmit} form={form}>
            <TermsNCoditionsModal visible={visible} onClose={onClose} />
            {!loading && error && <Alert message={error} type="error" showIcon className={styles.alert} />}

            <Form.Item name="email" label="이메일" rules={validateRules.email} hasFeedback>
                <Input type="email" placeholder="youremail@example.com" allowClear onBlur={onEmailChange} />
            </Form.Item>

            <Form.Item name="name" hasFeedback label="이름" rules={validateRules.name}>
                <Input placeholder="이름을 입력하세요." allowClear />
            </Form.Item>

            <Form.Item name="password" label="비밀번호" rules={validateRules.password} hasFeedback>
                <Input.Password type="password" placeholder="비밀번호를 입력해주세요." allowClear />
            </Form.Item>

            <Form.Item name="confirmPassword" label="비밀번호 확인" rules={validateRules.confirmPassword} hasFeedback>
                <Input.Password type="password" placeholder="비밀번호를 다시 입력해주세요." allowClear />
            </Form.Item>

            <Form.Item name="agreement" valuePropName="checked" rules={validateRules.agreement}>
                <Checkbox>
                    약관에 동의합니다.
                    <span onClick={onOpen} className={styles.openModal}>
                        약관 보기
                    </span>
                </Checkbox>
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                회원 가입
            </Button>
        </Form>
    );
};

export default React.memo(RegistrationForm);
