import React from 'react';
import {SERVER_URI} from 'constants/index';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Divider } from 'antd';
import {UserOutlined} from '@ant-design/icons';

import Avatar from 'components/Avatar';
import EmptyThumbnail from 'assets/image/empty-thumbnail.png';

const { Paragraph } = Typography;

export default function RoomCard(props) {
  return (
    <Link to={`/room/${props.id}`}>
      <CardWrap>
        <Badge>{props.category}</Badge>
        <Card className='light-primary-border'
              cover={<div className='cover'>
                        <img alt="cover" src={(props.coverImage ? SERVER_URI + '/resource/room/cover-image/' + props.coverImage : EmptyThumbnail)}/>
                     </div>}
        >
          <CardMetaWrap>
            <div className='main'>
                <div className='name'>
                    <Paragraph ellipsis>
                        {props.name}
                    </Paragraph>
                </div>
                <div className='description'>
                    <Paragraph ellipsis>
                         {props.description}
                    </Paragraph>
                </div>
            </div>

            <div className='sub'> 
              <Divider/>     
              <span className='manager-wrap'>
              {props.manager &&  <Avatar user={props.manager} size={22} style={{fontSize : '11px'}} showName={true}/>}
              </span>

              <span className='count-wrap'>
                 <UserOutlined /> 
                    <span className="count">
                      {props.joinCount + (props.maxCount === 0 ? '' : `${'/' +  props.maxCount}`)}
                    </span>
              </span>
            </div>
          </CardMetaWrap>
        </Card>
      </CardWrap>
    </Link>
  )
}

const Badge = styled.span`
    position: absolute;
    z-index: 1;
    margin-left: 12px;
    margin-top: 12px;
    background-color: var(--primary-color);
    border-radius: 4px;
    padding: .2rem .4rem;
    color: #fff;
    font-size: .8rem;
    font-weight : 500;
`

const CardWrap = styled.div`
  .ant-card {
    cursor: pointer;
  }

  .cover {
    height : 180px;
    object-fit : cover;
    /* border-radius: 6px 6px 0 0 !important; */
    width : calc(100% - 2px);
    margin : 0 auto;

    img {
      width : 100%;
      height : 100%;
      object-fit : cover;
      border-radius: 6px 6px 0 0;
      border-bottom : 1px solid var(--border-gray);
    }
  }

  .ant-card-body {
      padding : 1rem 1.2rem;
  }
`

const CardMetaWrap = styled.div`
  .main {
      height : 52px;
  }
  .name {
    font-weight: 700;
    margin-bottom: .3rem;
    font-size : 1rem;
  }

  .description {
    /* flex: 1; */
    div.ant-typography {
      color : var(--font-color-gray);
    }
  }

  .ant-typography-ellipsis-single-line {
     margin-bottom : 0;
   }

  .sub {
      font-size: .8rem;

     .ant-divider {
       margin : 10px 0;
     }

     .count-wrap {
      float: right;

      .count {
        margin-left : .2rem;
      }
    }
  }

`