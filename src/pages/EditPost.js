import React, {useState, useCallback, useEffect} from 'react';

import PostForm from 'containers/PostForm';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_POST_DETAIL_REQUEST, UPDATE_POST_REQUEST} from "../store/modules/post";
import CardWrap from "../components/Layout/Main/Card";

const EditPost = (props) => {
    const postId = props.match.params.id;
    const dispatch = useDispatch();
    const { postDetail, isAddingPost } = useSelector(state => state.post);
    const [initialValue, setInitialValue] = useState({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        dispatch({
            type : LOAD_POST_DETAIL_REQUEST,
            data : postId
        })
    }, [dispatch, postId]);


    useEffect(() => {
        setInitialValue({
            title : postDetail.title,
            content : postDetail.content,
            fileList : postDetail.files && postDetail.files.map(v => ({name : v.originName, uid : v.fileId}))
        })

    }, [postDetail.content, postDetail.files, postDetail.title]);


    useEffect(() => {
        if(initialValue.title){
            setLoading(false);
        }
    }, [initialValue.title]);


    const handleSubmit = useCallback( (values, content, fileList) => {
        console.log(values, content)
        const data = {
            postId,
            post : {
                title : values.title,
                content,
            },
        }

        // 이미 등록된 첨부 파일이 존재한다면
        if(initialValue.fileList && initialValue.fileList.length > 0) {
            data.fileGroupId = postDetail.fileGroupId;

            // 기존 파일 리스트에서 삭제된 파일 리스트
            const delFiles = initialValue.fileList.filter(v => !fileList.includes(v)).map(v => v.uid);
            if(delFiles.length > 0) {
                data.delFiles = delFiles;
            }

            // 기존 파일 리스트에 존재하지 않는 새로 업로드한 파일 리스트
            const newFiles = fileList.filter(v => !initialValue.fileList.includes(v));
            if(newFiles.length > 0) {
                const formData = new FormData();
                newFiles.forEach(v => {
                    formData.append('files', v);
                })
                data.files = formData;
            }
        }else { // 첨부파일이 존재하지 않을 경우
            if(fileList.length > 0) {
                const formData = new FormData();
                fileList.forEach(v => {
                    formData.append('files', v);
                })
                data.files = formData;
            }
        }

        dispatch({
            type : UPDATE_POST_REQUEST,
            data,
            meta : {
                callbackAction : () => {
                    props.history.push(`/post/${postId}`)
                }
            }
        })

    }, [initialValue.fileList]);


    return (
        <CardWrap pageHeader={{title : postDetail && postDetail.roomName, backUrl : `/post/${postId}`}}>
            {!loading &&
                <PostForm initialValue={initialValue}
                          submitLoading={isAddingPost}
                          onSubmit={handleSubmit}
                          submitText="수정하기"
                />
            }
        </CardWrap>
    )
}

export default EditPost;