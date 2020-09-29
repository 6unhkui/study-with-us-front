import React, {useState, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import Avatar from 'components/Avatar';
import FileSaver from 'file-saver';
import {useDispatch, useSelector} from "react-redux";
import {LOAD_POST_DETAIL_REQUEST, DELETE_POST_REQUEST} from "store/modules/post";
import {useHistory} from "react-router-dom";
import {SERVER_URI} from "constants/index";
import {bytesToSize} from "utils/File";

import Comments from "components/Comments";

import {Divider, Dropdown, Menu, Typography, PageHeader, List, Modal} from 'antd';
import { EllipsisOutlined, DeleteOutlined,  EditOutlined, PaperClipOutlined} from '@ant-design/icons';
import CardWrap from "../components/Layout/Main/Card";

const { Title } = Typography;

const PostView = (props) => {
    const postId = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const { postDetail } = useSelector(state => state.post);
    const { writer } = useSelector(state => state.post.postDetail);
    const { me } = useSelector(state => state.account);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [hasEditPermission, setHasEditPermission] = useState(false);

    useEffect(() => {
        dispatch({
            type : LOAD_POST_DETAIL_REQUEST,
            data : postId
        })
    }, [dispatch, postId]);

    useEffect(() => {
        if(me.accountId === (writer && writer.accountId)) {
            setHasEditPermission(true);
        }else {
            setHasEditPermission(false);
        }
    }, [me && me.accountId, writer && writer.accountId]);


    const handleFileDownload = useCallback((identifier, fileName) => {
        FileSaver.saveAs(`${SERVER_URI}/api/v1/files/attachment/${identifier}`, fileName);
    },[])


    const handleDeletePost = useCallback(() => {
        dispatch({
            type : DELETE_POST_REQUEST,
            data : postId,
            meta : {
                callbackAction : () =>{
                    history.push(`/room/${postDetail.roomId}`);
                }
            }
        })
    },[dispatch, history, postDetail.roomId, postId])


    const menuItems = (
        <Menu>
            <Menu.Item key="0" onClick={() => {history.push(`/post/${postId}/edit`)}}>
                <EditOutlined/> 수정
            </Menu.Item>
            <Menu.Item key="1">
                <span onClick={() => {setDeleteModalVisible(true)}}>
                    <DeleteOutlined /> 삭제
                </span>
                <Modal
                    title={postDetail.title}
                    visible={deleteModalVisible}
                    onOk={handleDeletePost}
                    onCancel={() => {setDeleteModalVisible(false)}}
                >
                    {<p>{postDetail.title} 포스트를 정말 삭제 하시겠습니까?</p>}
                </Modal>
            </Menu.Item>
        </Menu>
    )

    return (
        <CardWrap pageHeader={{title : postDetail && postDetail.roomName, backUrl : `/room/${postDetail.roomId}`}}>
            <Title level={2}>{postDetail.title}</Title>

            {hasEditPermission &&
                <MoreBtn>
                    <Dropdown overlay={menuItems} trigger={['click']}>
                        <EllipsisOutlined/>
                    </Dropdown>
                </MoreBtn>
            }

            {writer && <Avatar user={postDetail.writer} showName={true} subText={postDetail.createdDate}/>}

            <Divider/>

            <ContentWrap>
                {ReactHtmlParser(postDetail.content)}
            </ContentWrap>

            {postDetail.files &&
            <List grid={{gutter: 20, column: 1}}
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

            <Comments postId={postId}/>
    </CardWrap>
  )
}

export default PostView;


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
