import React from 'react';
import PropTypes from "prop-types";

import {Button, Input, Row, Col, Comment} from 'antd';
const { TextArea } = Input;

const CommentEditor = ({ avatar, onChange, value, onSubmit, submitText}) => {
    const style = {
        minHeight : '70px'
    }

    return (
        <Comment avatar={avatar}
                 content={
                     <Row gutter={10}>
                         <Col span={21}>
                             <TextArea style={style} value={value} onChange={onChange}/>
                         </Col>
                         <Col span={3}>
                             <Button htmlType="submit"
                                     onClick={onSubmit}
                                     type="primary"
                                     style={{minWidth : '100%', ...style}}>
                                 {submitText}
                             </Button>
                         </Col>
                     </Row>
                 }
        />
    )
};

CommentEditor.propTypes = {
    avatar : PropTypes.node,
    onSubmit : PropTypes.func,
    onChange : PropTypes.func,
    value : PropTypes.string,
    submitText : PropTypes.string
};

CommentEditor.defaultProps = {
    onSubmit : () => {console.error("submit function is not defined");},
    onChange : () => {console.error("change function is not defined");},
    submitText : 'Add Comment'
};


export default CommentEditor;