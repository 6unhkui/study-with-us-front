import React from 'react';
import styled from 'styled-components';
import Avatar from 'components/Avatar';

import { Typography, Card, Menu, Dropdown, Divider} from 'antd';
import { EllipsisOutlined, CommentOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';

const { Title, Text, Paragraph} = Typography;

export default function PostCard(props) {
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <EditOutlined /> 수정
          </Menu.Item>
          <Menu.Item key="1">
            <DeleteOutlined /> 삭제
          </Menu.Item>
        </Menu>
      );

    return (
        <Card>
            <AuthorWrap>
              <Author>
                <Avatar user={props.author} style={{position : 'relative', bottom : '8px'}}/>
                <span style={{display : 'inline-block', marginLeft : '10px'}}>
                  <span className='author-name'>{props.author.name}</span>
                  <span className='created-date'>{props.createdDate}</span>
                </span>
              </Author>
      
              <div className='more-btn'>
                <Dropdown overlay={menu}><EllipsisOutlined/></Dropdown>
              </div>
            </AuthorWrap>

            {props.thumbnail &&
              <ThumbnailWrap>
                <img className='cover' alt="thumbnail" src={props.thumbnail}/> 
              </ThumbnailWrap>}
           
            <Paragraph ellipsis style={{margin: '16px 0 4px 0'}}>
                <Title level={4} style={{margin: 0}}>{props.title}</Title>
            </Paragraph>
            <Paragraph ellipsis={{ rows: 2 }} style={{margin: 0}}>
                <Text type="secondary">{props.content.replace(/(<([^>]+)>)/ig,"")}</Text>
            </Paragraph>

            <Divider style={{margin : '18px 0'}}/>

            <span><CommentOutlined /> 11</span>
        </Card>
    )
}


const AuthorWrap = styled.div`
  display : flex;
  .more-btn {
    margin-left: auto;
  }
`

  
const Author = styled.div`
  line-height: 16px;

  .author-name {
    display: block;
    font-weight: bold;
    margin: 0;
  }

  .created-date {
    font-size: .8rem;
    color: gray;
    margin: 0;
  }
`

const ThumbnailWrap = styled.div`
  margin: 10px 0;

  img {
    width: 100%;
    border-radius: 10px;
  }
`