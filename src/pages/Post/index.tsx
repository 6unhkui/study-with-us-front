import Divider from "@/components/Divider";
import Loading from "@/components/Loading";
import Wrapper from "@/components/Wrapper";
import { useTypedSelector } from "@/store";
import { getPostAsync } from "@/store/post";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import ReactHtmlParser from "react-html-parser";
import Avatar from "@/components/Avatar";
import PostComments from "@/components/PostComments";
import EditDeletePostButtons from "@/components/EditDeletePostButtons";
import { useGetIntIdFromUrl } from "@/hooks/useGetIntFromUrl";
import PageHeader from "@/components/PageHeader";
import FileListItem from "@/components/FileListItem";
import SEO from "@/components/SEO";
import styles from "./Post.module.less";

interface PostPageProps {}

const PostPage: React.FC<PostPageProps> = () => {
    const intId = useGetIntIdFromUrl();
    const { data: post, loading, error } = useTypedSelector(({ post: { post: postDetail } }) => postDetail);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            getPostAsync.cancel("");
        };
    }, []);

    useEffect(() => {
        dispatch(getPostAsync.request(intId));
    }, [dispatch, intId]);

    if (!loading && error) return <Redirect to="/404" />;
    if (loading || !post) return <Loading />;

    return (
        <Wrapper type="card" size="full">
            <SEO title={post.title} />
            <PageHeader name={post.roomName} />

            <h1 className={styles.title}>{post?.title}</h1>
            <div className={styles.authorArea}>
                <Avatar name={post.writer.name} profileImage={post?.writer.profileImg} size={45} className={styles.avatar} />
                <span className={styles.name}>{post.writer.name}</span>
                <span className={styles.date}>{post.createdDate}</span>
                {post.isWriter && (
                    <div className={styles.buttons}>
                        <EditDeletePostButtons postId={intId} />
                    </div>
                )}
            </div>

            <Divider />

            <div className={styles.content}>{ReactHtmlParser(post.content)}</div>

            <div className={styles.fileListContainer}>
                {post.files?.map(file => (
                    <FileListItem {...file} key={file.fileId} />
                ))}
            </div>

            <PostComments postId={intId} />
        </Wrapper>
    );
};

export default PostPage;
