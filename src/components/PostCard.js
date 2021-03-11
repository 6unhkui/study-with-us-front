import React from "react";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "components/Avatar";
import { Typography, Divider } from "antd";
import { CommentOutlined, PaperClipOutlined } from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const PostCard = ({
    postId,
    title,
    content,
    writer,
    createdDate,
    thumbnail,
    commentCount,
    fileCount,
    showRoomName,
    roomName
}) => {
    const thumbnailSection = (
        <ThumbnailWrap>
            <img alt="thumbnail" src={thumbnail} />
        </ThumbnailWrap>
    );

    return (
        <Link to={`/post/${postId}`}>
            <div className="card-wrap">
                {showRoomName && (
                    <>
                        <RoomNameWrap>{roomName}</RoomNameWrap>
                        <Divider style={{ margin: "0" }} />
                    </>
                )}

                <AvatarWrap>
                    <Avatar user={writer} showName={true} subText={createdDate} />
                </AvatarWrap>

                {thumbnail && thumbnailSection}

                <ContentWrap>
                    <Paragraph ellipsis style={{ margin: 0 }}>
                        <Title level={4} style={{ margin: 0 }}>
                            {title}
                        </Title>
                    </Paragraph>

                    {content && content.replace(/(<([^>]+)>)/gi, "").trim().length > 0 && (
                        <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                            <Text type="secondary">{ReactHtmlParser(content.replace(/(<([^>]+)>)/gi, "").trim())}</Text>
                        </Paragraph>
                    )}
                </ContentWrap>

                <Divider style={{ margin: "0" }} />

                <CountWrap>
                    <span className="item">
                        <CommentOutlined /> {commentCount}
                    </span>
                    <span className="item">
                        <PaperClipOutlined /> {fileCount}
                    </span>
                </CountWrap>
            </div>
        </Link>
    );
};

export default PostCard;

PostCard.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    writer: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profileImg: PropTypes.string
    }),
    createdDate: PropTypes.string,
    thumbnail: PropTypes.string,
    commentCount: PropTypes.number,
    showRoomName: PropTypes.bool,
    roomName: PropTypes.string
};

PostCard.defaultProps = {
    showRoomName: false
};

const RoomNameWrap = styled.div`
    padding: 10px 1.4rem;
    color: var(--primary-color);
    background: var(--bg-gray);
    // font-weight : bold;
`;

const ContentWrap = styled.div`
    padding: 0 1.4rem 1rem 1.4rem;
`;

const AvatarWrap = styled.div`
    padding: 1rem 1.4rem;
`;

const ThumbnailWrap = styled.div`
    margin-bottom: 14px;

    img {
        width: 100%;
        object-fit: cover;
        height: 250px;
    }
`;

const CountWrap = styled.div`
    padding: 1rem 1.4rem;
    span.item {
        margin-right: 20px;
        color: var(--font-color-gray, gray);
    }
`;
