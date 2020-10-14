import React, {useState} from 'react';
import PropTypes from "prop-types";
import { Form, Input, Button,  Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Editor from 'components/Editor';

const PostForm = ({initialValue, onSubmit, submitText, submitLoading}) => {
    const [form] = Form.useForm();
    const [content, setContent] = useState((initialValue && initialValue.content) || '');
    const [fileList, setFileList] = useState((initialValue && initialValue.fileList) || []);

    const uploadConfig =  {
        fileList,
        beforeUpload: file => {
            setFileList(fileList.concat([file]))
            return false;
        },
        onRemove : file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        }
    };

    return (
       <Form 
        form={form}
        name="postForm"
        onFinish={values => {onSubmit(values, content, fileList)}}
        scrollToFirstError
        layout = "vertical"
        requiredMark={false}
      >
          <Form.Item 
              name="title" 
              label="Title"
              initialValue={initialValue && initialValue.title}
              rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
              ]}>
              <Input allowClear/>
          </Form.Item>

           <Editor onChange={setContent} value={`${content}`}/>

           <Upload {...uploadConfig}>
               <Button icon={<UploadOutlined />} style={{marginTop : '2rem'}}>
                   File Upload
               </Button>
           </Upload>

          <Form.Item style={{textAlign : 'center', marginTop : '2rem'}}>
              <Button type="primary" htmlType="submit" size="large" className='shadow' style={{marginTop : '1rem'}}
                      loading={submitLoading}
              >
                  {submitText}
              </Button>
          </Form.Item>
      </Form>
    )
}

export default PostForm;

PostForm.propTypes = {
    formData : PropTypes.shape({
        title : PropTypes.string,
        content : PropTypes.string,
        fileList : PropTypes.array
    }),
    submitText : PropTypes.string,
    onSubmit : PropTypes.func,
    submitLoading : PropTypes.bool
};

PostForm.defaultProps = {
    formData : {
        title : '',
        content : '',
        fileList : []
    },
    submitText : '작성하기',
    onSubmit : () => {console.error("submit function is not defined");},
    submitLoading : false
};
