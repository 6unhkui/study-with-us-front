import React, {useState, useEffect, useRef} from 'react';
import {http} from 'utils/HttpHandler';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Form, Input, InputNumber, Button, Switch, Radio} from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const CreateForm = (props) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const inputRef = useRef(null);

    const [categories, setCategories] = useState([]);

    const [maxCountDisabled, setMaxCountDisabled] = useState(true);
    const [maxCount, setMaxCount] = useState(0);

    const [file, setFile] = useState(null);

    const [previewImage, setPreviewImage] = useState('');

    const validateMessages = {
        required: t('validate.required', { name: '${name}'}),
    };


    useEffect(() => {
        _getCategories();
    }, []);

    const _getCategories = () => {
        http.get("/api/v1/categories")
        .then(response => {
            const data = response.data.data;
            setCategories(data);
            form.setFieldsValue({
                category : response.data.data[0].id
            });

            console.log(data);
        })
    }

    const onSubmit  = values => {
        const data = new FormData();
        if(file) data.append('file', file);
        data.append("name", values.name);
        data.append("description", values.description === undefined ? '' : values.description);
        data.append('unlimited', maxCountDisabled);
        data.append("maxCount", maxCount);
        data.append("categoryId", values.category);

        http.post('/api/v1/room', data, {'Content-type': 'multipart/form-data;charset=utf-8'})
        .then(response => { 
             props.history.push("/user/room");
        })
        .catch(err => { 
            console.log(err)
        });
    }


    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
    }

    const handleProfileImgOnChange = async (e) => {
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
          onFinish={onSubmit}
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
                    <Radio.Group defaultValue={categories[0].id} buttonStyle="solid">
                        {categories.map(v => (
                            <Radio.Button value={v.id}>{v.name}</Radio.Button>
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
                                 onChange={(value) => {setMaxCount(value)}}/>
                </Form.Item>
            </MaxCountWrap>


            <Form.Item
                name="thumbnail"
                label="Thumbnail"
                // getValueFromEvent={normFile}
                extra="* 썸네일은 이미지 형식의 파일만 등록 가능합니다."
            >
                <ThumbnailWrap>
                    <div className="file-attachment" onClick={() => {inputRef.current.click()}}>
                        {previewImage ? <img src={previewImage} style={{ width: '100%' }} alt="preview"/> : <PlusOutlined />}
                        <input type='file' 
                               accept="image/*"
                               onChange={handleProfileImgOnChange}
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

export default CreateForm;

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