import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN } from 'constants/index';
import { http } from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { CHANGE_PROFILE_IMG } from 'store/modules/account';

import breakpoint from 'styled-components-breakpoint';
import Avatar from 'components/Avatar';

import { Menu, Divider} from 'antd';
import { CameraOutlined} from '@ant-design/icons';


const SubMenuWrap = (props) => {
    const { t } = useTranslation();
    const { name, profileImg } = useSelector(state => state.account, []);
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const handleProfileImgOnChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        http.post(`/api/v1/account/profile`, data, {'Content-Type' : 'multipart/form-data'})
        .then(response => { 
            const data = response.data.data;
            dispatch({ 
                type: CHANGE_PROFILE_IMG, 
                payload: {profileImg : data}
            });
        })
        .catch(err => { console.log(err)});
    };

    const handleLogout = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        props.history.push("/");
    };

    
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
                    <Avatar user={{name, profileImg}} size={100} style={{fontSize : '2.4rem'}}/>
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