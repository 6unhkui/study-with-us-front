import { Button, Form, Input, Upload } from "antd";
import React, { useCallback, useMemo, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { UploadFile, UploadProps } from "antd/lib/upload/interface";
import { Rule } from "rc-field-form/lib/interface";
import PostEditor from "../PostEditor";
import styles from "./PostForm.module.less";

type Fields = "title" | "content" | "files";
const validateRules: Record<Extract<Fields, "title">, Rule[]> = {
    title: [
        {
            required: true,
            whitespace: true,
            type: "string",
            max: 100
        }
    ]
};

export interface PostFormValue {
    title: string;
    content?: string;
    files?: UploadFile[];
}

interface PostFormProps {
    defaultValues?: PostFormValue;
    onSubmit: (values: PostFormValue) => void;
    loading: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ defaultValues, onSubmit, loading }) => {
    const [fileList, setFileList] = useState<UploadFile[]>(defaultValues?.files || []);

    const uploadConfig: UploadProps = useMemo(
        () => ({
            fileList,
            beforeUpload: (target: UploadFile) => {
                setFileList(files => [...files, target]);
                return false;
            },
            onRemove: (target: UploadFile) => {
                setFileList(files => files.filter(file => file !== target));
            }
        }),
        [fileList]
    );

    const onFormSubmit = useCallback(
        (values: PostFormValue) => {
            onSubmit && onSubmit({ ...values, files: fileList });
        },
        [onSubmit, fileList]
    );

    return (
        <Form scrollToFirstError layout="vertical" initialValues={defaultValues} requiredMark={false} onFinish={onFormSubmit}>
            <Form.Item name="title" rules={validateRules.title}>
                <Input placeholder="제목을 입력하세요." size="large" allowClear />
            </Form.Item>

            <Form.Item name="content">
                <PostEditor />
            </Form.Item>

            <Form.Item name="files">
                <Upload {...uploadConfig}>
                    <Button icon={<UploadOutlined />} className={styles.uploadBtn}>
                        File Upload
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" size="large" className={styles.submitBtn} loading={loading}>
                    등록
                </Button>
            </Form.Item>
        </Form>
    );
};

export default React.memo(PostForm);
