import React from 'react';
import {stringToColor} from 'utils/ColorGenerator';
import { Avatar } from 'antd';

export default function Avater(props) {
    const {size, style, showName} = props;
    const {name, profileImg} = props.user;

    return (
        <>
            <Avatar size={size}
                    src={profileImg}
                    style={{border: '1px solid var(--border-gray)',
                            backgroundColor: !profileImg && stringToColor(name), 
                            ...style}}
                    alt="referrerPolicy='no-referrer'">
                    {name.charAt(0).toLocaleUpperCase()}
            </Avatar> 
            {showName && <span style={{marginLeft : '.5rem', position : 'relative', top : '2px'}}>{name}</span>}
        </>
    )
}