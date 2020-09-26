import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Avatar from 'components/Avatar';
import FileSaver from 'file-saver';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_COMMENTS_REQUEST, LOAD_POST_DETAIL_REQUEST} from "store/modules/post";
import {useHistory} from "react-router-dom";
import {SERVER_URI} from "constants/index";
import {bytesToSize} from "utils/File";
import CommentEditor from "../components/CommentEditor";
import CommentSingle from "components/CommentSingle";

import LTT from "list-to-tree";

import {Divider, Dropdown, Menu, Typography, PageHeader, List} from 'antd';
import { EllipsisOutlined, DeleteOutlined,  EditOutlined, LikeOutlined, PaperClipOutlined} from '@ant-design/icons';

const { Title } = Typography;

export default function PostViewPage(props) {
    const postId = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [tree, setTree] = useState([]);

    const { roomDetail } = useSelector(state => state.room);
    const { postDetail,comments } = useSelector(state => state.post);
    const { me } = useSelector(state => state.account);

    useEffect(() => {
        dispatch({
            type : LOAD_POST_DETAIL_REQUEST,
            data : postId
        })

        dispatch({
            type : LOAD_COMMENTS_REQUEST,
            postId
        })
    }, [dispatch, postId]);


    useEffect(() => {
        // 배열 형태로 전달받은 댓글 리스트를 트리 구조로 변경하여 렌더링한다.
        const ltt = new LTT(comments, {
            key_id: 'commentId',
            key_parent: 'parentId'
        });

        const commentTree = ltt.GetTree();
        setTree(commentTree);
    }, [comments]);


    const handleFileDownload = useCallback((identifier, fileName) => {
        FileSaver.saveAs(`${SERVER_URI}/api/v1/files/attachment/${identifier}`, fileName);
    },[])

    // const handleLikeCount = useCallback(() => {
    //     console.log(likeChecked);
    // },[likeChecked])


    const menuItems = () => (
        <Menu>
            <Menu.Item key="0">
                <EditOutlined /> 수정
            </Menu.Item>
            <Menu.Item key="1">
                <DeleteOutlined /> 삭제
            </Menu.Item>
        </Menu>
    )

    const renderComments = (data) => {
        // 대댓글이 존재하면 재귀호출
        return data.map(item => (
            <>
                <CommentSingle key={item.commentId}
                               postId={postId}
                               commentId={item.commentId}
                               writer={item.writer}
                               content={item.content}
                               createdDate={item.createdDate}
                               seq={item.seq}
                               isWriter={(item.writer && item.writer.accountId) === (postDetail.writer && postDetail.writer.accountId)}
                >
                    {item.child && item.child.length > 0 && renderComments(item.child)}
                </CommentSingle>
            </>
        ));
    }

    return (
        <div className="bg-gray">
            <div className="container content-wrap">
                <div className="card-wrap card-width-full">
                    {roomDetail.name &&
                        <PageHeader
                            onBack={() => history.push(`/room/${roomDetail.roomId}`)}
                            title={roomDetail.name}
                            style={{padding: '0', marginBottom: '1rem'}}
                        />
                    }

                    <Title level={2}>{postDetail.title}</Title>

                    {(me && me.accountId) === (postDetail.writer && postDetail.writer.accountId) &&
                        <MoreBtn>
                            <Dropdown overlay={menuItems}><EllipsisOutlined/></Dropdown>
                        </MoreBtn>
                    }

                    {postDetail.writer &&
                        <Avatar user={postDetail.writer} showName={true} subText={postDetail.createdDate}/>
                    }
                    <Divider/>

                    <ContentWrap>
                        {ReactHtmlParser(postDetail.content)}
                    </ContentWrap>

                    {/*<LikeWrap onClick={handleLikeCount}>*/}
                    {/*    <LikeOutlined /> {postDetail.likeCount}*/}
                    {/*</LikeWrap>*/}

                    {postDetail.files &&
                        <List
                            grid={{gutter: 20, column: 1}}
                            dataSource={postDetail.files}
                            style={{marginTop: '3rem'}}
                            renderItem={item => (
                                <List.Item>
                                    <FileItemWrap>
                                        <PaperClipOutlined/>
                                        <FileName onClick={() => {
                                            handleFileDownload(item.saveName, item.originName)
                                        }}>
                                            {item.originName}
                                        </FileName>
                                        <Divider type="vertical"/>
                                        <FileSize>{bytesToSize(item.fileSize)}</FileSize>
                                    </FileItemWrap>
                                </List.Item>
                            )}
                        />
                    }

                    <Divider/>

                    <CommentEditor postId={postId}/>

                    {tree && tree.length > 0 && renderComments(tree)}
                </div>
            </div>
        </div>
  )
}


const MoreBtn = styled.span`
  display: inline-block;
  float: right;
  font-weight: bold;
  font-size: 1.4rem;
`

const ContentWrap =  styled.div`
  padding: 1rem 0 3rem 0;
  line-height : 2rem;
  
  img {
    max-width: 100%;
    margin : 20px 0;
  }
  
  p {
    margin : 0;
  }
`

const LikeWrap = styled.div`
    font-size : 1.4rem;
    cursor :pointer;
    width: fit-content;
    margin: 0 auto;
    color : var(--font-color-gray);
    border : 1px solid var(--border-gray);
    border-radius : 30px;
    padding : 4px 18px;
    
    &:hover {
        color : var(--primary-color);
        border : 1px solid var(--primary-color);
    }
`

const FileItemWrap = styled.div`
`

const FileName = styled.span`
    margin-left : 6px;
    cursor : pointer;
    position : relative;
    
    &: after {
        content: '';
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -4px;
        border-width: 0 0 1px;
        border-style: solid;
        opacity: .4;
    }
`

const FileSize = styled.span`
    color : var(--font-color-gray);
`