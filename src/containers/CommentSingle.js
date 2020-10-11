import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';

import {Comment, message} from 'antd';
import CommentEditor from 'components/CommentEditor';
import {useDispatch, useSelector} from "react-redux";
import {DELETE_COMMENT_REQUEST, CREATE_COMMENT_REQUEST, UPDATE_COMMENT_REQUEST} from "store/modules/post";

const CommentSingle = ({postId, commentId, writer, content, createdDate, seq, children, isWriter}) => {
    const dispatch = useDispatch();
    const { me : {name, profileImg, accountId} } = useSelector(state => state.account);
    const [hasEditPermission, setHasEditPermission] = useState(false);
    const [showEditInput, setShowEditInput] = useState(false);
    const [editValue, setEditValue] = useState(content);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [replyValue, setReplyValue] = useState('');

    useEffect(() => {
        if(isWriter) {
            setHasEditPermission(true);
        }
    }, [accountId, writer]);


    const handleDeleteComment = useCallback(() => {
        if(children) {
            message.error('답변 댓글이 존재할 경우 삭제할 수 없습니다.');
            return false;
        }

        dispatch({
            type : DELETE_COMMENT_REQUEST,
            data : commentId
        })
    }, [children, commentId, dispatch]);


    const handleReplySubmit = useCallback(() => {
        const data = {
            content : replyValue
        }
        if(commentId) data.parentId = commentId;

        dispatch({
            type : CREATE_COMMENT_REQUEST,
            postId,
            data
        })

        setReplyValue('');
        setShowReplyInput(false);
    }, [dispatch, commentId, postId, replyValue]);


    const handleEditSubmit = useCallback(() => {
        const data = {
            content : editValue
        }

        dispatch({
            type : UPDATE_COMMENT_REQUEST,
            commentId,
            data
        })

        setEditValue(editValue);
        setShowEditInput(false);
    }, [commentId, dispatch, editValue, content]);


    const handleEditChange = useCallback(e => {
        setEditValue(e.target.value);
    }, []);


    const handleReplyChange = useCallback(e => {
        setReplyValue(e.target.value);
    }, []);


    const onEditClick = useCallback(() => {
        setShowEditInput(!showEditInput);
        setEditValue(content);
    }, [showEditInput])


    const onReplyClick = useCallback(() => {
        setShowReplyInput(!showReplyInput);
    }, [showReplyInput]);


    const editInput = (
        <CommentEditor value={editValue}
                       onChange={handleEditChange}
                       onSubmit={handleEditSubmit}
                       submitText={'수정'}
        />
    )

    return (
            <Comment key={commentId}
                     actions={[
                         <span onClick={onReplyClick}>댓글 달기</span>,
                         hasEditPermission && <span onClick={onEditClick}>수정</span>,
                         hasEditPermission && <span onClick={handleDeleteComment}>삭제</span>
                     ]}
                     author={writer.name}
                     avatar={<Avatar user={{name : writer.name, profileImg : writer.profileImg}}/>}
                     content={showEditInput ? editInput : content}
                     datetime={createdDate}>

                {showReplyInput && <CommentEditor value={replyValue}
                                                  onChange={handleReplyChange}
                                                  onSubmit={handleReplySubmit}
                                                  avatar={<Avatar user={{name, profileImg}}/>}/>}

                {children}
            </Comment>
    )
}

export default CommentSingle;

const IsWriterBadge = styled.span`
    margin-left: 4px;
    background-color: var(--primary-color);
    color: #fff;
    font-size: .6rem;
    padding: 2px 4px;
    border-radius: 3px;
    position: relative;
    bottom: 1px;
`