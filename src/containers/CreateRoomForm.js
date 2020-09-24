import React, {useState, useEffect, useRef, useCallback} from 'react';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Switch, Radio} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_CATEGORIES_REQUEST} from "../store/modules/category";
import {CREATE_ROOM_REQUEST} from "../store/modules/room";


const CreateRoomForm = (props) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const inputRef = useRef(null);

    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);

    const [maxCountDisabled, setMaxCountDisabled] = useState(true);
    const [maxCount, setMaxCount] = useState(0);
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const validateMessages = {
        required: t('validate.required', { name: '${name}'}),
    };

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        })
    }, []);

    const handleSubmit = useCallback(values => {
        const data = {
            room : {
                name : values.name,
                description : values.description === undefined ? '' : values.description,
                unlimited : maxCountDisabled,
                maxCount :  maxCountDisabled ? 0 : maxCount,
                categoryId : values.category,
            }
        };

        if(file) {
            const formData = new FormData();
            formData.append('file', file);
            data.file = formData;
        };

        dispatch({
            type : CREATE_ROOM_REQUEST,
            data,
            meta: {
                callbackAction : () => {
                    props.history.push("/user/room");
                }
            }
        });
    }, [file, maxCount, maxCountDisabled]);


    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    const handleCoverImageOnChange = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setFile(file);

        const preview = await getBase64(file);
        setPreviewImage(preview);
    };


    return (
        <Form 
          form={form}
          name="create"
          initialValues={{'category' : categories.length > 0 ? categories[0].categoryId : 1}}
          onFinish={handleSubmit}
          scrollToFirstError
          layout = "vertical"
          requiredMark={false}
          validateMessages={validateMessages}
        >
            <Form.Item
                name="category"
                label="Category"
                rules={[{required: true},
            ]}>
                {categories.length > 0 &&
                    <Radio.Group buttonStyle="solid">
                        {categories.map(value => (
                            <Radio.Button value={value.categoryId}>{value.name}</Radio.Button>
                        ))}
                    </Radio.Group>
                }
            </Form.Item>
        
            <Form.Item 
                name="name" 
                label="Name"
                rules={[{required: true, whitespace: true}]}>
                <Input allowClear/>
            </Form.Item>

            <Form.Item name="description" label="Description">
                <Input.TextArea rows={6}/>
            </Form.Item>


            <MaxCountWrap>
                <span className='label-wrap'>
                    <span className='label'>인원수</span>
                    <Switch checkedChildren="제한" unCheckedChildren="무제한"
                            onChange={(checked) => {setMaxCountDisabled(!checked); setMaxCount(0);}}/>
                </span>

                <Form.Item name="maxCount" rules={[{ type: 'number', min: 1, max: 999}]}
                           style={{width : '100%', display : (maxCountDisabled ? 'none' : 'block')}}>
                    <InputNumber defaultValue={maxCount} value={maxCount}
                                 onChange={value => {setMaxCount(value)}}/>
                </Form.Item>
            </MaxCountWrap>


            <Form.Item
                name="thumbnail"
                label="Thumbnail"
                extra="* 썸네일은 이미지 형식의 파일만 등록 가능합니다."
            >
                <ThumbnailWrap>
                    <div className="file-attachment" onClick={() => {inputRef.current.click()}}>
                        {previewImage ? <img src={previewImage} style={{ width: '100%' }} alt="preview"/> : <PlusOutlined />}
                        <input type='file'
                               accept="image/*"
                               onChange={handleCoverImageOnChange}
                               style = {{display : 'none'}}
                               ref={inputRef}/>
                    </div>
                </ThumbnailWrap>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" block size="large" className='shadow' style={{marginTop : '1rem'}}>
                    생성
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CreateRoomForm;

const MaxCountWrap = styled.div`
    .label-wrap {
        display : flex;
        margin-bottom: 8px;

        .label {
            flex : 1;
        }

        button.ant-switch {
            margin-right : 0;
        }    
    }

    .ant-input-number {
        width : 100%;
    }
`

const ThumbnailWrap = styled.div`
    width: 100%;
    border: 1px dashed #d9d9d9;
    text-align: center;
    min-height: 100px;
    line-height: 100px;
    padding: 8px;
    cursor: pointer;
`