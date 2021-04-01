import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import ReactHtmlParser from "react-html-parser";
import Avatar from "components/Avatar";
import FileSaver from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_DETAIL_REQUEST, DELETE_POST_REQUEST } from "store/modules/post";
import { useHistory } from "react-router-dom";
import { bytesToSize } from "utils/file";
import CardWrap from "components/CardBox";
import Comments from "containers/PostView/Comments";
import loadFile from "utils/loadFile";

import { Divider, Dropdown, Menu, Typography, List, Modal } from "antd";
import { EllipsisOutlined, DeleteOutlined, EditOutlined, PaperClipOutlined } from "@ant-design/icons";
import SEO from "components/SEO";
import { htmlTagRegExp } from "utils/regularExpression";

const { Title } = Typography;

const PostView = props => {
    const postId = props?.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const {
        postDetail,
        postDetail: { writer, isWriter }
    } = useSelector(state => state.post);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    useEffect(() => {
        dispatch({
            type: LOAD_POST_DETAIL_REQUEST,
            data: postId
        });
    }, [dispatch, postId]);

    const handleFileDownload = useCallback((identifier, fileName) => {
        FileSaver.saveAs(loadFile(identifier, "attachment"), fileName);
    }, []);

    const handleDeletePost = useCallback(() => {
        dispatch({
            type: DELETE_POST_REQUEST,
            data: postId,
            meta: {
                callbackAction: () => {
                    history.push(`/room/${postDetail.roomId}`);
                }
            }
        });
    }, [dispatch, history, postDetail.roomId, postId]);

    const dropdownMenuItems = (
        <Menu>
            <Menu.Item
                key="0"
                onClick={() => {
                    history.push(`/post/${postId}/edit`);
                }}
            >
                <EditOutlined /> 수정
            </Menu.Item>
            <Menu.Item key="1">
                <span onClick={setDeleteModalVisible.bind(null, true)} aria-hidden>
                    <DeleteOutlined /> 삭제
                </span>
                <Modal
                    title={postDetail.title}
                    visible={deleteModalVisible}
                    onOk={handleDeletePost}
                    onCancel={setDeleteModalVisible.bind(null, false)}
                >
                    <p>{postDetail.title} 포스트를 정말 삭제 하시겠습니까?</p>
                </Modal>
            </Menu.Item>
        </Menu>
    );

    return (
        <CardWrap pageHeader={{ title: postDetail?.roomName, backUrl: `/room/${postDetail.roomId}` }}>
            <SEO title={postDetail?.roomName} description={postDetail?.content?.replace(htmlTagRegExp, "").slice(0, 50)} />
            <Title level={2}>{postDetail.title}</Title>

            {isWriter && (
                <MoreBtn>
                    <Dropdown overlay={dropdownMenuItems} trigger={["click"]}>
                        <EllipsisOutlined />
                    </Dropdown>
                </MoreBtn>
            )}

            {writer && <Avatar user={postDetail.writer} showName subText={postDetail.createdDate} />}

            <Divider />

            <ContentWrap>{ReactHtmlParser(postDetail.content)}</ContentWrap>

            {postDetail?.files?.length > 0 && (
                <List
                    grid={{ gutter: 20, column: 1 }}
                    dataSource={postDetail.files}
                    style={{ marginTop: "3rem" }}
                    renderItem={item => (
                        <List.Item key={item.fileId}>
                            <FileItemWrap>
                                <PaperClipOutlined />
                                <FileName
                                    onClick={() => {
                                        handleFileDownload(item.saveName, item.originName);
                                    }}
                                >
                                    {item.originName}
                                </FileName>
                                <Divider type="vertical" />
                                <FileSize>{bytesToSize(item.fileSize)}</FileSize>
                            </FileItemWrap>
                        </List.Item>
                    )}
                />
            )}

            <Comments postId={postId} />
        </CardWrap>
    );
};

export default PostView;

const MoreBtn = styled.span`
    display: inline-block;
    float: right;
    font-weight: bold;
    font-size: 1.4rem;
`;

const ContentWrap = styled.div`
    padding: 1rem 0 3rem 0;
    line-height: 2rem;

    img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
    }

    figure.image {
        text-align: center;

        figcaption {
            font-size: 0.8rem;
            color: gray;
        }
    }

    blockquote {
        border-left: 4px solid lightgray;
        padding-left: 14px;
        font-style: italic;
        color: gray;
    }

    p {
        margin: 0;
    }

    ul,
    li {
        list-style: initial;
    }

    ul {
        padding-left: 20px;
    }
`;

const FileItemWrap = styled.div``;

const FileName = styled.span`
    margin-left: 6px;
    cursor: pointer;
    position: relative;

    &::after {
        content: "";
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -4px;
        border-width: 0 0 1px;
        border-style: solid;
        opacity: 0.4;
    }
`;

const FileSize = styled.span`
    color: var(--font-color-gray);
`;
