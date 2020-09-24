import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import Avatar from 'components/Avatar';

import { Typography, Divider} from 'antd';
import { CommentOutlined, FileTextOutlined  } from '@ant-design/icons';

const { Title, Text, Paragraph} = Typography;

export default function PostCard({postId, title, content, author, createdDate, thumbnail, commentCount, fileCount} ) {

    const thumbnailSection = (
      <ThumbnailWrap>
        <img className='cover' alt="thumbnail" src={thumbnail}/> 
      </ThumbnailWrap>
    )

    return (
      <Link to={`/post/${postId}`}>
        <PostCardWrap>
            <AvatarWrap>
                <Avatar user={author} showName={true} subText={createdDate}/>
            </AvatarWrap>

            {thumbnail && thumbnailSection}

            <ContentWrap>
                <Paragraph ellipsis style={{margin: '16px 0 4px 0'}}>
                    <Title level={4} style={{margin: 0}}>
                        {title}
                    </Title>
                </Paragraph>

                {content && content.replace(/(<([^>]+)>)/ig, "").trim().length > 0 &&
                <Paragraph ellipsis={{rows: 3}} style={{margin: 0}}>
                    <Text type="secondary">
                        {content.replace(/(<([^>]+)>)/ig, "")}
                    </Text>
                </Paragraph>}
            </ContentWrap>


            <Divider style={{margin : '0'}}/>

            <BottomWrap>
                <CommentCount>
                    <CommentOutlined /> {commentCount}
                </CommentCount>
                <FileCount>
                    <FileTextOutlined /> {fileCount}
                </FileCount>
            </BottomWrap>
        </PostCardWrap>
      </Link>
    )
}


PostCard.propTypes = {
  title : PropTypes.string.isRequired,
  content : PropTypes.string,
  author : PropTypes.shape({
    name : PropTypes.string.isRequired,
    profileImg : PropTypes.string
  }),
  createdDate : PropTypes.string,
  thumbnail : PropTypes.string,
  commentCount : PropTypes.number
};


const PostCardWrap = styled.div`
    border: 1px solid var(--border-gray);
    border-radius : 4px;
`

const AvatarWrap = styled.div`
    padding : 1rem 1.4rem .1rem 1.4rem;
`

const ContentWrap = styled.div`
    padding : .1rem 1.4rem 1rem 1.4rem;
`

const BottomWrap = styled.div`
    padding : 1rem 1.4rem;
`

const ThumbnailWrap = styled.div`
  margin: 10px 0;

  img {
    width: 100%;
    border-radius: 10px;
  }
`

const CommentCount = styled.span`
    color : var(--font-color-gray);
`

const FileCount = styled.span`
    margin-left : 1rem;
    color : var(--font-color-gray);
`