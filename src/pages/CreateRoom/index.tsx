import { CreateRoomDTO } from "@/api/dto/room.dto";
import CategorySelector from "@/components/CategorySelector";
import DragNDropImageUploader from "@/components/DragNDropImageUploader";
import SEO from "@/components/SEO";
import Wrapper from "@/components/Wrapper";
import useToggle from "@/hooks/useToggle";
import { useTypedSelector } from "@/store";
import { createRoomAsync } from "@/store/room";
import { Button, Form, Input, InputNumber, Switch } from "antd";
import { Rule } from "rc-field-form/lib/interface";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./CreateRoom.module.less";

type Item = "name" | "description" | "maxCount" | "category" | "limited";

const validateRules: Record<"category" | "name" | "description" | "maxCount", Rule[]> = {
    category: [{ required: true }],
    description: [{ required: true }],
    name: [
        { required: true, whitespace: true },
        {
            type: "string",
            max: 50
        }
    ],
    maxCount: [{ type: "number", min: 1, max: 999 }]
};

interface CreateRoomPageProps {}

const CreateRoomPage: React.FC<CreateRoomPageProps> = () => {
    const [coverImage, setCoverImage] = useState<File>();
    const { isOn: isLimited, onToggle: onToggleLimited } = useToggle();
    const { data: result, loading, error } = useTypedSelector(({ room: { createRoom } }) => createRoom);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (values: Record<Item, any>) => {
            const payload: CreateRoomDTO = {
                name: values.name,
                description: values.description,
                unlimited: !values.limited,
                maxCount: values.maxCount,
                categoryId: values.category
            };

            if (coverImage) {
                const formData = new FormData();
                formData.append("file", coverImage);
                payload.coverImage = formData;
            }

            dispatch(createRoomAsync.request(payload));
        },
        [dispatch, coverImage]
    );

    return (
        <Wrapper type="card" header="스터디방 만들기" size="small">
            <SEO title="스터디방 만들기" />
            <Form
                scrollToFirstError
                layout="vertical"
                initialValues={{
                    category: 1,
                    maxCount: 1,
                    limited: false
                }}
                onFinish={onSubmit}
            >
                <Form.Item name="category" label="카테고리" rules={validateRules.category}>
                    <CategorySelector />
                </Form.Item>

                <Form.Item name="name" label="이름" rules={validateRules.name}>
                    <Input allowClear />
                </Form.Item>

                <Form.Item name="description" label="설명" rules={validateRules.description}>
                    <Input.TextArea rows={6} />
                </Form.Item>

                <Form.Item label="인원수">
                    <Form.Item name="maxCount" noStyle rules={validateRules.maxCount}>
                        <InputNumber placeholder="최대 인원수" min={1} max={999} disabled={!isLimited} />
                    </Form.Item>
                    <Form.Item name="limited" noStyle>
                        <Switch
                            checkedChildren="제한"
                            unCheckedChildren="무제한"
                            onChange={onToggleLimited}
                            className={styles.limitToggle}
                            checked={isLimited}
                        />
                    </Form.Item>
                </Form.Item>

                <Form.Item label="커버 이미지" extra="* 커버 이미지는 이미지 형식의 파일만 등록 가능합니다.">
                    <div className={styles.uploadField}>
                        <DragNDropImageUploader value={coverImage} onChange={setCoverImage} />
                    </div>
                </Form.Item>

                <Button type="primary" htmlType="submit" block size="large" loading={loading}>
                    만들기
                </Button>
            </Form>
        </Wrapper>
    );
};

export default CreateRoomPage;
