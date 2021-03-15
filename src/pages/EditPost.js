import React, { useState, useCallback, useEffect } from "react";
import PostForm from "components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_DETAIL_REQUEST, UPDATE_POST_REQUEST } from "../store/modules/post";
import CardWrap from "../components/CardBox";

const EditPost = props => {
    const postId = props?.match.params.id;
    const dispatch = useDispatch();
    const { postDetail, isCreatingPost } = useSelector(state => state.post);
    const [initialValue, setInitialValue] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch({
            type: LOAD_POST_DETAIL_REQUEST,
            data: postId
        });
    }, [dispatch, postId]);

    useEffect(() => {
        setInitialValue({
            title: postDetail.title,
            content: postDetail.content,
            fileList: postDetail.files && postDetail.files.map(file => ({ name: file.originName, uid: file.fileId }))
        });
    }, [postDetail.content, postDetail.files, postDetail.title]);

    useEffect(() => {
        if (initialValue.title) {
            setLoading(false);
        }
    }, [initialValue.title]);

    const handleSubmit = useCallback(
        (values, content, fileList) => {
            const data = {
                postId,
                post: {
                    title: values.title,
                    content
                }
            };

            // 이미 등록된 첨부 파일이 존재한다면
            if (initialValue.fileList && initialValue.fileList.length > 0) {
                data.fileGroupId = postDetail.fileGroupId;

                // 기존 파일 리스트에서 삭제된 파일 리스트
                const delFiles = initialValue.fileList.filter(file => !fileList.includes(file)).map(file => file.uid);

                if (delFiles.length > 0) {
                    data.delFiles = delFiles;
                }

                // 기존 파일 리스트에 존재하지 않는 새로 업로드한 파일 리스트
                const newFiles = fileList.filter(file => !initialValue.fileList.includes(file));
                console.log(newFiles);
                if (newFiles.length > 0) {
                    data.files = newFiles.reduce((acc, file) => {
                        acc.append("files", file);
                        return acc;
                    }, new FormData());
                }
            } else if (fileList.length > 0) {
                // 이미 등로한 첨부파일이 존재하지 않고, 새로 등록한 첨부 파일이 존재할 경우
                data.files = fileList.reduce((acc, file) => {
                    acc.append("files", file);
                    return acc;
                }, new FormData());
            }

            dispatch({
                type: UPDATE_POST_REQUEST,
                data,
                meta: {
                    callbackAction: () => {
                        props.history.push(`/post/${postId}`);
                    }
                }
            });
        },
        [dispatch, initialValue.fileList, postDetail.fileGroupId, postId, props?.history]
    );

    return (
        <CardWrap pageHeader={{ title: postDetail && postDetail.roomName, backUrl: `/post/${postId}` }}>
            {!loading && (
                <PostForm
                    initialValue={initialValue}
                    submitLoading={isCreatingPost}
                    onSubmit={handleSubmit}
                    submitText="수정하기"
                />
            )}
        </CardWrap>
    );
};

export default EditPost;
