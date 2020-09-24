import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { http } from 'utils/HttpHandler';
import Avatar from 'components/Avatar';

import { Card, Divider, Comment, Tooltip, List, Form, Input, Dropdown, Menu, Row, Col, Typography} from 'antd';
import { EllipsisOutlined, CommentOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';

import CommentEditor from "components/CommentEditor";
import {useDispatch, useSelector} from "react-redux";
import {LOAD_POST_DETAIL_REQUEST} from "store/modules/post";
import Comments from "components/Comments";

const { Title } = Typography;

export default function PostViewPage(props) {
    const postId = props.match.params.id;
    const dispatch = useDispatch();
    const { postDetail, loadingPostDetail } = useSelector(state => state.post);
    const { name, profileImg } = useSelector(state => state.account);

    useEffect(() => {
        dispatch({
            type : LOAD_POST_DETAIL_REQUEST,
            data : postId
        })
    }, [postId]);


    const menuItems = () => {
  // console.log(accountId, post.author.id)
  // if(accountId === post.author.id) {
        return (
          <Menu>
            <Menu.Item key="0">
              <EditOutlined /> 수정
            </Menu.Item>
            <Menu.Item key="1">
              <DeleteOutlined /> 삭제
            </Menu.Item>
        </Menu>
        )
  // }else return null;
    }

    return (
        <div className="bg-gray">
            <div className="container content-wrap">
                <Card loading={loadingPostDetail && postDetail}>
                    <Title>{postDetail.title}</Title>
                    <MoreBtn>
                        <Dropdown overlay={menuItems}><EllipsisOutlined/></Dropdown>
                    </MoreBtn>

                    {postDetail.author &&
                        <Avatar user={postDetail.author} showName={true} subText={postDetail.createdDate}/>
                    }
                    <Divider/>

                    <ContentWrap>
                        <div dangerouslySetInnerHTML={{__html: postDetail.content}}></div>
                    </ContentWrap>

                     <Divider/>

                     <Comments postId={postId}/>
                </Card>
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
  img {
    max-width: 100%;
  }

`