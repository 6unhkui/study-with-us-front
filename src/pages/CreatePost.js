import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { PageHeader } from "antd";
import CreateForm from "components/PostForm";
import { useDispatch, useSelector } from "react-redux";
import { CREATE_POST_REQUEST } from "store/modules/post";
import CardWrap from "components/CardBox";

const CreatePost = props => {
    const roomId = props?.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const { roomDetail } = useSelector(state => state.room);
    const { isCreatingPost } = useSelector(state => state.post);

    const handleSubmit = useCallback(
        (values, content, fileList) => {
            console.log(content);
            const data = {
                roomId,
                post: {
                    title: values.title,
                    content
                }
            };

            if (fileList.length > 0) {
                data.files = fileList.reduce((acc, file) => {
                    acc.append("files", file);
                    return acc;
                }, new FormData());
            }

            dispatch({
                type: CREATE_POST_REQUEST,
                data,
                meta: {
                    callbackAction: idx => {
                        history.push(`/post/${idx}`);
                    }
                }
            });
        },
        [dispatch, history, roomId]
    );

    return (
        <CardWrap>
            <PageHeader
                onBack={() => history.push(`/room/${roomDetail.roomId}`)}
                title={roomDetail && roomDetail.name}
                style={{ padding: "0", marginBottom: "1rem" }}
            />

            <CreateForm onSubmit={handleSubmit} submitLoading={isCreatingPost} />
        </CardWrap>
    );
};

export default CreatePost;
