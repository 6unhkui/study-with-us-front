import React from 'react';
import {SERVER_URI} from 'constants/index';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Divider, Avatar } from 'antd';
import {UserOutlined, PictureOutlined} from '@ant-design/icons';

const { Paragraph } = Typography;

export default function RoomCard(props) {
    return (
      <Link to={`/room/${props.idx}`}>
      <CardWrap>
        <Badge>{props.category}</Badge>
        <Card 
          className={'light-primary-border'}
          cover= {props.coverImage ? <div className='cover'><img alt="cover" src={SERVER_URI + '/resource/room/cover-image/' + props.coverImage}/></div>
                                    : <div className='cover empty'><PictureOutlined /></div>}
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
              <Avatar size={22} style={{fontSize : '12px'}}>I</Avatar> inkyung
              <span className='count-wrap'>
                 <UserOutlined /> 
                    <span className="count">
                      {props.maxCount === 0 ? '무제한' : `${1  + '/' +  props.maxCount}`}
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
    border-radius : 6px;
    cursor: pointer;
  }

  .cover {
    height : 180px;
    object-fit : cover;
    border-radius: 6px 6px 0 0 !important;
    width : calc(100% - 2px);
    margin : 0 auto;

    img {
      width : 100%;
      height : 100%;
      object-fit : cover;
      border-bottom : 1px solid var(--border-gray);
    }

    &.empty {
      color : var(--font-color-gray);
      background-color: var(--bg-gray);
      text-align: center;
      font-size: 6rem;
      line-height: 180px;
      width: calc(100% - 2px);
      margin: 0 auto;

      span {
        opacity : .24;
      }
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

  /* .sub {
    display : flex;
    color : var(--font-color-gray);
  } */

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

     /* .category {
       color : var(--primary-color);
       &::before {
         content : "# "
       }
     } */

     .count-wrap {
      float: right;
      /* color : var(--font-color-gray); */

      .count {
        margin-left : .2rem;
      }
    }
  }

`