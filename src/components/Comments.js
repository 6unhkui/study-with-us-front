import React, {useState, useEffect, useCallback} from 'react';
import Avatar from 'components/Avatar';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_COMMENTS_REQUEST} from "store/modules/post";

import { Comment } from 'antd';
import CommentEditor from 'components/CommentEditor';

const Comments = ({postId}) => {
    const initPagination = {
        page : 1,
        size : 6,
        direction : 'ASC'
    }
    const dispatch = useDispatch();
    const { name, profileImg } = useSelector(state => state.account.me);
    const { comments } = useSelector(state => state.post);
    const [pagination, setPagination] = useState(initPagination);
    const [commentValue, setCommentValue] = useState([]);

    useEffect(() => {
        dispatch({
            type : LOAD_COMMENTS_REQUEST,
            postId,
            pagination
        })
    }, [pagination.page]);


    const handleSubmit = useCallback( () => {

    }, []);


    const renderComments = (data) => {
      return data.map((item) => (
           // 하위 코맨트가 있을 경우 자식 코멘트를 재귀 호출
          <Comment key={item.id}
                   actions={[<span onClick={(e) => {console.log(item.depth, item.seq)}}>Reply to</span>]}
                   author={item.author.name} 
                   avatar={<Avatar user={{name : item.author.name, profileImg : item.author.profileImg}}/>} 
                   content={item.content}
                   datetime={item.createdDate}>
            {item.child.length > 0 && renderComments(item.child)} 
          </Comment>
      ));
    }

    return (
        <>
            <Comment avatar={<Avatar user={{name, profileImg}}/>}
                     content={<CommentEditor onChange={e => {setCommentValue(e.target.value)}}
                                             onSubmit={handleSubmit}/>}
            />

            {comments.length > 0 && renderComments(comments)}
        </>
    )
}

export default Comments;