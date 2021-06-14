import { UpdatePostDTO } from "@/api/dto/post.dto";
import Loading from "@/components/Loading";
import PageHeader from "@/components/PageHeader";
import PostForm, { PostFormValue } from "@/components/PostForm";
import SEO from "@/components/SEO";
import Wrapper from "@/components/Wrapper";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import { useTypedSelector } from "@/store";
import { getPostAsync, updatePostAsync } from "@/store/post";
import React, { useCallback, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";

interface EditPostPageProps {}

const EditPostPage: React.FC<EditPostPageProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: post, loading, error } = useTypedSelector(({ post: { post: postDetail } }) => postDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPostAsync.request(intId));
    }, [dispatch, intId]);

    const initialValues: PostFormValue | undefined = useMemo(() => {
        if (!post) return undefined;
        return { ...post, files: post.files?.map(file => ({ uid: file.fileId, name: file.originName })) as any };
    }, [post]);

    const onSubmit = useCallback(
        (values: PostFormValue) => {
            const payload: UpdatePostDTO = {
                postId: intId,
                title: values.title,
                content: values.content || ""
            };

            if (post?.files) {
                payload.fileGroupId = post.fileGroupId;
                payload.delFiles = initialValues?.files?.filter(file => !values.files?.includes(file)).map(file => +file.uid);
            }

            if (values.files) {
                const newFiles: PostFormValue["files"] = values.files?.filter(file => !initialValues?.files?.includes(file));
                if (newFiles && newFiles.length > 0) {
                    payload.files = newFiles.reduce((acc, file) => {
                        acc.append("files", file as any);
                        return acc;
                    }, new FormData());
                }
            }

            dispatch(updatePostAsync.request(payload));
        },
        [intId, initialValues, post, dispatch]
    );

    if (loading || !post) return <Loading />;
    if (!loading && error) return <Redirect to={`/room/${intId}`} />;

    return (
        <Wrapper type="card">
            <SEO title={`[${post.title}] 수정`} />
            <PageHeader groupName={post.title} name="수정" />
            <PostForm loading={false} onSubmit={onSubmit} defaultValues={initialValues} />
        </Wrapper>
    );
};

export default EditPostPage;
