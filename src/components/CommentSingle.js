import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';

import { Comment } from 'antd';
import CommentEditor from 'components/CommentEditor';

const CommentSingle = ({postId, commentId, writer, content, createdDate, seq, children, isWriter}) => {
    const [showReplyInput, setShowReplyInput] = useState(false);

    useEffect(() => {
    }, []);

    const onReplyClick = useCallback(commentId => {
        setShowReplyInput(!showReplyInput);
    }, [showReplyInput])

    return (
        <Comment key={commentId}
                 actions={[<span onClick={onReplyClick}>댓글 달기</span>, <span onClick={onReplyClick}>수정</span>, <span onClick={onReplyClick}>삭제</span>]}
                 author={<>{writer.name}{isWriter && <IsWriterBadge>작성자</IsWriterBadge> }</>}
                 avatar={<Avatar user={{name : writer.name, profileImg : writer.profileImg}}/>}
                 content={content}
                 datetime={createdDate}>
            {showReplyInput && <CommentEditor postId={postId} parentId={commentId}/> }
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