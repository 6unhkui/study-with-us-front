import { useMeFetch } from "@/hooks/useRedux";
import { Button, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import React, { useCallback } from "react";
import Avatar from "../Avatar";
import styles from "./CommentEditor.module.less";

interface CommentEditorProps {
    visibleAvatar?: boolean;
    defaultText?: string;
    onSubmit: (v: string) => void;
    submitBtnName?: string;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
    defaultText,
    visibleAvatar = true,
    onSubmit: submitAction,
    submitBtnName = "등록"
}) => {
    const { data } = useMeFetch();
    const [form] = useForm();

    const onSubmit = useCallback(
        ({ content }: { content: string }) => {
            submitAction(content);
            form.resetFields();
        },
        [form, submitAction]
    );

    return (
        <Form
            className={`${styles.wrapper} ${visibleAvatar ? styles.includeAvatar : ""}`}
            form={form}
            onFinish={onSubmit}
            initialValues={{ content: defaultText || "" }}
            layout="inline"
        >
            {visibleAvatar && <Avatar name={data?.name} profileImage={data?.profileImg} size={50} />}

            <Form.Item name="content" className={styles.textArea}>
                <TextArea />
            </Form.Item>

            <Button type="primary" htmlType="submit" className={styles.submitBtn}>
                {submitBtnName}
            </Button>
        </Form>
    );
};

export default React.memo(CommentEditor);
