import React, {useCallback} from 'react';
import { useHistory } from "react-router-dom";

import { PageHeader } from 'antd';
import CreateForm from 'containers/PostForm';
import {useDispatch, useSelector} from "react-redux";
import {CREATE_POST_REQUEST} from "../store/modules/post";
import CardWrap from "../components/Layout/Main/Card";

const CreatePost = (props) => {
    const roomId = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const { roomDetail } = useSelector(state => state.room);
    const { isCreatingPost } = useSelector(state => state.post);

    const handleSubmit = useCallback( (values, content, fileList) => {
        const data = {
            roomId,
            post : {
                title : values.title,
                content,
            }
        }

        if(fileList.length > 0) {
            const formData = new FormData();
            fileList.forEach(v => {
                formData.append('files', v);
            })
            data.files = formData;
        }

        dispatch({
            type : CREATE_POST_REQUEST,
            data,
            meta: {
                callbackAction : () => {
                    history.push(`room/${roomDetail.roomId}`)
                }
            }
        });
    }, [dispatch, history, roomDetail.roomId, roomId]);


    return (
        <CardWrap>
            <PageHeader onBack={() => history.push(`/room/${roomDetail.roomId}`)}
                        title={roomDetail && roomDetail.name}
                        style={{padding : '0', marginBottom : '1rem'}}
            />

            <CreateForm onSubmit={handleSubmit} submitLoading={isCreatingPost}/>
        </CardWrap>
    )
}

export default CreatePost;