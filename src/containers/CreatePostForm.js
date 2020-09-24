import React, {useState, useCallback} from 'react';
import {CREATE_POST_REQUEST} from "store/modules/post";
import {useDispatch, useSelector} from "react-redux";

import { Form, Input, Button,  Upload} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Editor from 'components/Editor';

const CreateForm = (props) => {
    const roomId = props.match.params.id;
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const {isCreatingPost} = useSelector(state => state.post);

    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);

    const handleSubmit = useCallback( values => {
      const data = {
          roomId,
          post : {
              title : values.title,
              content,
          }
      }

      if(fileList.length > 0) {
          const formData = new FormData();
          fileList.forEach(v => {
              formData.append('files', v);
          })
          data.files = formData;
      }

      dispatch({
          type : CREATE_POST_REQUEST,
          data,
          meta: {
              callbackAction : () => {
                  props.history.push(`${props.location.state.from.pathname}`)
              }
          }
      });
    }, [content, dispatch, fileList, roomId]);


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
        name="create"
        onFinish={handleSubmit}
        scrollToFirstError
        layout = "vertical"
        requiredMark={false}
      >
          <Form.Item 
              name="title" 
              label="Title"
              rules={[
                  {
                    required: true,
                    whitespace: true,
                  },
              ]}>
              <Input allowClear/>
          </Form.Item>

          <Form.Item name="content">
            <Editor onChange={setContent}/>
          </Form.Item>

           <Upload {...uploadConfig}>
               <Button icon={<UploadOutlined />}>Click to Upload</Button>
           </Upload>

          <Form.Item style={{textAlign : 'center'}}>
              <Button type="primary" htmlType="submit" size="large"
                      className='shadow' style={{marginTop : '1rem'}}
                      loading={isCreatingPost}
              >
                  작성하기
              </Button>
          </Form.Item>
      </Form>
    )
}

export default CreateForm;
