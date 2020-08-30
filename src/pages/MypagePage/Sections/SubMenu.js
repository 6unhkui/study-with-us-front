import React, {useState, useRef} from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import {SERVER_URI, headerFormData} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";

import { Button, Menu, Avatar, Divider} from 'antd';
import { CameraOutlined, UserOutlined } from '@ant-design/icons';


const SubMenuWrap = () => {
    const { t } = useTranslation();
    const inputRef = useRef(null);

    const [preview, setPreview] = useState('');
    const [user, setUser] = useRecoilState(userState);

    const handleProfileImgOnChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        axios.post(`${SERVER_URI}/api/v1/user/profile`, data, headerFormData())
        .then(response => { 
            setPreview(response.data);
             setUser({
                ...user,
                'profileImg' : response.data
            })
        })
        .catch(err => { console.log(err)});
    };


    return (
        <Menu style={{padding : '4rem 0', border : '0'}}>
            <UserWrap>
                <div>
                    <Avatar size={160} icon={<UserOutlined />} src={preview.length > 0 ? preview : user.profileImg}/>

                    <Button shape="circle" 
                            icon={<CameraOutlined />} style={{position : 'absolute', top : '190px', right : '35px'}}
                            onClick={() => {inputRef.current.click()}}/>
                    <input type='file' 
                           accept="image/*"
                           onChange={handleProfileImgOnChange}
                           style = {{display : 'none'}}
                           ref={inputRef}/>
                </div>

                <h1>{t('mypage.title', { name: user.name})}
                </h1>
            </UserWrap>
            
            <Divider/>
            
            <Menu.Item key="9">
                <Link to="">가입한 스터디룸</Link>
            </Menu.Item>
            <Menu.Item key="10">
                <Link to="/mypage/studyroom">나의 스터디 현황</Link>
            </Menu.Item>
            <Menu.Item key="11">
                <Link to="/mypage/account">{t('mypage.editAccountSettings.title')}</Link>
            </Menu.Item>
            <Menu.Item key="12">
                <div>로그아웃</div>
            </Menu.Item>
        </Menu>
    )
}

export default SubMenuWrap;

const UserWrap = styled.div`
    padding: 0 16px;
    

    h1 {
        font-size : var(--font-medium);
        margin : 1rem 0;
        line-height : 2rem;
    }
`