import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_COMMENTS_REQUEST, CREATE_COMMENT_REQUEST} from "store/modules/post";
import CommentEditor from "../../components/CommentEditor";
import CommentSingle from "containers/PostView/CommentSingle";

import LTT from "list-to-tree";

import {Divider} from 'antd';
import Avatar from "../../components/Avatar";


const Comments = ({postId}) => {
    const dispatch = useDispatch();
    const { me : {name, profileImg} } = useSelector(state => state.account);
    const { postDetail, comments } = useSelector(state => state.post);
    const [value, setValue] = useState('');
    const [tree, setTree] = useState([]);

    useEffect(() => {
        dispatch({
            type : LOAD_COMMENTS_REQUEST,
            postId
        })
    }, [dispatch, postId]);


    useEffect(() => {
        // 배열 형태로 전달받은 댓글 리스트를 트리 구조로 변경하여 렌더링한다.
        const ltt = new LTT(comments, {
            key_id: 'commentId',
            key_parent: 'parentId'
        });

        const commentTree = ltt.GetTree();
        setTree(commentTree);
    }, [comments]);

    const handleChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const handleSubmit = useCallback(() => {
        const data = {
            content : value
        }

        dispatch({
            type : CREATE_COMMENT_REQUEST,
            postId,
            data
        })

        setValue('');
    }, [dispatch, postId, value]);


    const renderComments = (data) => (
        // 대댓글이 존재하면 재귀호출
        data.map(item => (
            <CommentSingle key={item.commentId}
                           postId={postId}
                           commentId={item.commentId}
                           writer={item.writer}
                           content={item.content}
                           createdDate={item.createdDate}
                           seq={item.seq}
                           isWriter={item.isWriter}
            >
                {item.child && item.child.length > 0 && renderComments(item.child)}
            </CommentSingle>
        ))
    )


    return (
        <CommentsWrap>
            <CommentCount>
                {comments && comments.length} comment{comments.length > 1 && 's'}
            </CommentCount>

            <Divider style={{margin : 0}}/>

            <CommentEditor value={value}
                           onChange={handleChange}
                           onSubmit={handleSubmit}
                           avatar={<Avatar user={{name, profileImg}}/>}/>

            {tree && tree.length > 0 && renderComments(tree)}
        </CommentsWrap>
    )
}

export default Comments;


const CommentsWrap = styled.div`
    margin-top : 2rem;
`

const CommentCount = styled.div`
    margin-bottom : 10px;
    color : var(--font-color-gray);
`