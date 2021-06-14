import { Button, Form, Input, message } from "antd";
import React, { useCallback, useEffect } from "react";
import { Rule } from "rc-field-form/lib/interface";
import { useMeAsync } from "@/hooks/useRedux";
import { useDispatch } from "react-redux";
import { updateAccountAsync } from "@/store/account";
import { useTypedSelector } from "@/store";
import styles from "./MyProfileEditForm.module.less";

type Fields = "name";
const validateRules: Record<Fields, Rule[]> = {
    name: [{ required: true }, { type: "string", max: 20 }]
};

interface MyProfileEditFormProps {}

const MyProfileEditForm: React.FC<MyProfileEditFormProps> = () => {
    const { data: me } = useMeAsync();
    const { data, loading } = useTypedSelector(({ account: { updateAccount } }) => updateAccount);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(updateAccountAsync.cancel(""));
        };
    }, [dispatch]);

    useEffect(() => {
        if (!loading && data) {
            message.success("회원 정보 변경에 성공하였습니다.");
        }
    }, [loading, data]);

    const onSubmit = useCallback(
        (values: Record<Fields, any>) => {
            dispatch(updateAccountAsync.request(values));
        },
        [dispatch]
    );

    return (
        <Form layout="vertical" scrollToFirstError initialValues={{ name: me?.name }} onFinish={onSubmit}>
            <Form.Item name="name" hasFeedback label="이름" rules={validateRules.name}>
                <Input placeholder="이름을 입력하세요." allowClear />
            </Form.Item>

            <Form.Item className={styles.button}>
                <Button type="primary" htmlType="submit" size="large" loading={loading}>
                    변경하기
                </Button>
            </Form.Item>
        </Form>
    );
};

export default MyProfileEditForm;
