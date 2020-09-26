import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {WRITE_COMMENT_REQUEST} from "store/modules/post";
import Avatar from "./Avatar";

import {Button, Input, Row, Col, Comment} from 'antd';
const { TextArea } = Input;

const CommentEditor = ({ postId, parentId }) => {
    const dispatch = useDispatch();
    const { name, profileImg } = useSelector(state => state.account.me);
    const [content, setContent] = useState('');

    const style = {
        minHeight : '70px'
    }

    const handleChange = useCallback(e => {
        setContent(e.target.value);
    }, [])


    const handleSubmit = useCallback(() => {
        const data = {
            content
        }
        if(parentId) data.parentId = parentId;

        dispatch({
            type : WRITE_COMMENT_REQUEST,
            postId,
            data
        })

        setContent('');
    }, [content, dispatch, parentId, postId]);


    return (
        <Comment avatar={<Avatar user={{name, profileImg}}/>}
                 content={
                     <Row gutter={10}>
                         <Col span={20}>
                             <TextArea style={style} value={content} onChange={handleChange}/>
                         </Col>
                         <Col span={4}>
                             <Button htmlType="submit"
                                     onClick={handleSubmit}
                                     type="primary"
                                     style={style}>
                                 Add Comment
                             </Button>
                         </Col>
                     </Row>
                 }
        />
    )
};


export default CommentEditor;