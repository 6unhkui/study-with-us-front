import React from 'react';

import { Button, Input, Row, Col} from 'antd';
const { TextArea } = Input;

const CommentEditor = ({ onChange, onSubmit, value }) => {
    const style = {
        minHeight : '70px'
    }

    return (
        <Row gutter={10}>
            <Col span={20}>
                <TextArea style={style} onChange={onChange}/>
            </Col>

            <Col span={4}>
                <Button htmlType="submit" 
                        onClick={onSubmit} 
                        type="primary"
                        style={style}>
                        Add Comment
                </Button>
            </Col>
        </Row>
    )
};


export default CommentEditor;