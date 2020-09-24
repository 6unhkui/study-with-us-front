import React from 'react';
import PropTypes from 'prop-types';
import {SERVER_URI} from 'constants/index';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Card, Typography, Divider } from 'antd';
import {UserOutlined} from '@ant-design/icons';

import Avatar from 'components/Avatar';
import EmptyThumbnail from 'assets/image/empty-thumbnail.png';

const { Paragraph } = Typography;

export default function RoomCard({roomId, category, coverImage, name, description, manager, joinCount, maxCount}) {

  const coverSection = (
    <div className='cover'>
      <img alt="cover" src={(coverImage ? SERVER_URI + '/api/v1/files/cover/' + coverImage : EmptyThumbnail)}/>
    </div>
  )

  return (
    <Link to={`/room/${roomId}`}>
      <CardWrap>
        <Badge>{category}</Badge>
        <Card className='light-primary-border'
              cover={coverSection}
        >

          <CardMetaWrap>
            <div className='main'>
                <div className='name'>
                    <Paragraph ellipsis>
                        {name}
                    </Paragraph>
                </div>
                <div className='description'>
                    <Paragraph ellipsis>
                         {description}
                    </Paragraph>
                </div>
            </div>

            <div className='meta-data'> 
              <Divider/>     
              <ManagerWrap>
                {manager &&  
                  <Avatar user={manager} size={22} style={{fontSize : '11px'}} showName={true}/>}
              </ManagerWrap>

              <JoinCountWrap>
                 <UserOutlined /> 
                 <span className="join-count">
                    {joinCount + (maxCount === 0 ? '' : `${'/' +  maxCount}`)}
                 </span>
              </JoinCountWrap>
            </div>
          </CardMetaWrap>

        </Card>
      </CardWrap>
    </Link>
  )
}


RoomCard.propTypes = {
  id : PropTypes.number,
  category : PropTypes.string,
  coverImage : PropTypes.string,
  name : PropTypes.string,
  description : PropTypes.string,
  manager : PropTypes.shape({
    name : PropTypes.string.isRequired,
    profileImg : PropTypes.string
  }),
  joinCount : PropTypes.number,
  maxCount : PropTypes.number
};



// Style - s /////////////////////////////
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

  .description {
    div.ant-typography {
      color : var(--font-color-gray);
    }
  }

  .ant-typography-ellipsis-single-line {
     margin-bottom : 0;
   }

  .meta-data {
      font-size: .8rem;

     .ant-divider {
       margin : 10px 0;
     }
  }

`

const ManagerWrap = styled.span`
`

const JoinCountWrap = styled.span`
  float: right;
  position : relative;
  top : 8px;

  .join-count {
    margin-left : .2rem;
  }
`
// Style - e /////////////////////////////