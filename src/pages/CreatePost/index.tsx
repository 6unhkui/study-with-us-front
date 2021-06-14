import Wrapper from "@/components/Wrapper";
import { useTypedSelector } from "@/store";
import React, { useCallback } from "react";
import PostForm, { PostFormValue } from "@/components/PostForm";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import PageHeader from "@/components/PageHeader";
import { CreatePostDTO } from "@/api/dto/post.dto";
import { useDispatch } from "react-redux";
import { createPostAsync } from "@/store/post";
import SEO from "@/components/SEO";

interface CreatePostPageProps {}

const CreatePostPage: React.FC<CreatePostPageProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: roomInfo } = useTypedSelector(({ room: { room } }) => room);
    const { loading } = useTypedSelector(({ post: { createPost } }) => createPost);
    const dispatch = useDispatch();

    const onSubmit = useCallback(
        (values: PostFormValue) => {
            const payload: CreatePostDTO = {
                roomId: intId,
                title: values.title,
                content: values.content || ""
            };

            if (values.files) {
                payload.files = values?.files.reduce((acc, file) => {
                    acc.append("files", file as any);
                    return acc;
                }, new FormData());
            }

            dispatch(createPostAsync.request(payload));
        },
        [intId, dispatch]
    );

    return (
        <Wrapper type="card" size="full">
            <SEO title="게시글 작성" />
            <PageHeader groupName={roomInfo?.name} name="게시글 작성" />
            <PostForm onSubmit={onSubmit} loading={loading} />
        </Wrapper>
    );
};

export default CreatePostPage;
