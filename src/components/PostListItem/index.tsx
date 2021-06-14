import { PostDTO } from "@/api/dto/post.dto";
import { Space } from "antd";
import React from "react";
import ReactHtmlParser from "react-html-parser";
import { MessageOutlined, PaperClipOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Badge from "@/components/Badge";
import Avatar from "@/components/Avatar";
import styles from "./PostListItem.module.less";

const IconText = React.memo(({ icon, text }: { icon: any; text: string | number }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
));

export interface PostListItemProps extends PostDTO {
    visibleRoomName?: boolean;
}

const PostListItem: React.FC<PostListItemProps> = ({
    postId,
    title,
    thumbnail,
    writer,
    content,
    createdDate,
    roomName,
    commentCount,
    fileCount,
    visibleRoomName
}) => {
    const extractPureText = content?.replace(/(<([^>]+)>)/gi, "").trim();

    return (
        <article className={styles.wrapper}>
            <Link to={`/post/${postId}`} className={thumbnail ? styles.containerWithImage : styles.container}>
                {thumbnail ? <img src={thumbnail} alt={`${title} 이미지`} className={styles.thumbnail} /> : null}
                <div>
                    {visibleRoomName && (
                        <div className={styles.badge}>
                            <Badge type="secondary">{roomName}</Badge>
                        </div>
                    )}
                    <div className={styles.authorArea}>
                        <Avatar name={writer.name} profileImage={writer.profileImg} size={40} className={styles.avatar} />
                        <span className={styles.name}>{writer.name}</span>
                        <span className={styles.date}>{createdDate}</span>
                    </div>

                    <h1 className={styles.title}>{title}</h1>

                    <p className={styles.content}>{ReactHtmlParser(extractPureText)}</p>

                    <div className={styles.countArea}>
                        <IconText icon={MessageOutlined} text={commentCount} />
                        <IconText icon={PaperClipOutlined} text={fileCount} />
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default React.memo(PostListItem);
