import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {stringToColor} from 'utils/ColorGenerator';
import { Avatar } from 'antd';

import { LoadingOutlined} from '@ant-design/icons';

export default function Avater ({size, style, showName, subText, user, loading}) {
    const {name, profileImg} = user;

    return (
        <AvatarWrap>
            <Avatar size={size}
                    src={profileImg}
                    style={{border: '1px solid var(--border-gray)',
                            backgroundColor: !profileImg && stringToColor(name),
                            ...style}}
                    alt="referrerPolicy='no-referrer'"
                    className={subText && 'include-subtext'}>
                    {loading ? <LoadingOutlined spin/> : name.charAt(0).toLocaleUpperCase()}
            </Avatar>
            <Metadata>
                {showName && <span className='name'>{name}</span>}
                {subText && <span className='subtext'>{subText}</span>}
            </Metadata>
        </AvatarWrap>
    )
}

Avatar.propTypes = {
    size : PropTypes.number,
    style : PropTypes.object,
    showName : PropTypes.bool,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        profileImg: PropTypes.string,
    }),
};

Avatar.defaultProps = {
    user : {
        name : '',
        profileImg : ''
    }
};


// Style - s /////////////////////////////
const AvatarWrap = styled.span`
    display : flex;
    align-items: center;
    display: inline-block;

    .include-subtext {
        position : relative;
        bottom : 10px;
    }
`

const Metadata = styled.div`
  display : inline-block;
  margin-left : 10px;

  .name {
    display: block;
    margin: 0;
    color : var(--font-color-black);
  }

  .subtext {
    font-size: .8rem;
    color: var(--font-color-gray);
    margin: 0;
  }
`
// Style - e /////////////////////////////