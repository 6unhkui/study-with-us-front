import React, {useRef, useCallback} from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN } from 'constants/index';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

import breakpoint from 'styled-components-breakpoint';
import Avatar from 'components/Avatar';

import { Menu, Divider, Spin} from 'antd';
import { CameraOutlined, LoadingOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {UPLOAD_PROFILE_REQUEST, LOG_OUT} from "store/modules/account";


const SubMenuWrap = (props) => {
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const dispatch = useDispatch();
    const { name, profileImg } = useSelector(state => state.account.me, []);
    const { isUploadingProfile } = useSelector(state => state.account, []);

    const handleProfileImgOnChange = useCallback(e => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        dispatch({
            type : UPLOAD_PROFILE_REQUEST,
            file : data
        })
    }, []);

    const handleLogout = useCallback(() => {
        dispatch({
            type : LOG_OUT,
            meta: {
                callbackAction : () => {
                    localStorage.removeItem(ACCESS_TOKEN);
                    props.history.push("/");
                }
            }
        })
    }, []);

    
    const items = [
        <Link to={`${props.match.path}/studyroom`}>나의 스터디방 관리</Link>,
        <Link to={`${props.match.path}/studyroom`}>스터디 기록</Link>,
        <Link to={`${props.match.path}/setting`}>{t('mypage.editAccountSettings.title')}</Link>,
        <div onClick={handleLogout}>로그아웃</div>
    ]

    return (
        <Menu style={{padding : '3rem 0', height : '100%'}} defaultSelectedKeys={['0']}>
            <UserWrap>
                <div className="avatar-wrap">
                    <div className="file-attachment" onClick={() => {inputRef.current.click()}}>
                        <CameraOutlined style={{color : "#fff", fontSize : "1.2rem"}} />
                        <input type='file' 
                               accept="image/*"
                               onChange={handleProfileImgOnChange}
                               style = {{display : 'none'}}
                               ref={inputRef}/>
                     </div>
                     <Avatar user={{name, profileImg}} size={100} style={{fontSize : '2.4rem'}} loading={isUploadingProfile}/>
                </div>

                 <h1>{t('mypage.title', { name: name})}</h1>
            </UserWrap>
            
            <Divider/>
            
            {items.map((v, i) => (
                <Menu.Item key={i}>{v}</Menu.Item>
            ))}
        </Menu>
    )
}

export default withRouter(SubMenuWrap);


const UserWrap = styled.div`
    padding: 0 16px;

    .avatar-wrap {
        &:hover {
            .file-attachment {
                display : block;
            }
        }

        .file-attachment {
            display: none;
            cursor : pointer;
            position: absolute;
            width: 100px;
            height: 100px;
            background-color: #00000050;
            z-index: 99;
            text-align: center;
            line-height : 100px;
        }
    }

    h1 {
        font-size : var(--font-medium);
        margin : 1rem 0;
        line-height : 2rem;
    }

    ${breakpoint('tablet')`
        .avatar-wrap {

        }
    `} 
`