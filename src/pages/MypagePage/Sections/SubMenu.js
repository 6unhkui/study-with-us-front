import React, {useState, useRef} from 'react';
import { useTranslation } from 'react-i18next';
import { ACCESS_TOKEN, request} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";
import { withRouter } from "react-router-dom";

import breakpoint from 'styled-components-breakpoint';

import { Button, Menu, Avatar, Divider} from 'antd';
import { CameraOutlined, UserOutlined, EditOutlined} from '@ant-design/icons';


const SubMenuWrap = (props) => {
    const { t } = useTranslation();
    const inputRef = useRef(null);

    const [preview, setPreview] = useState('');
    const [user, setUser] = useRecoilState(userState);

    const handleProfileImgOnChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const data = new FormData();
        data.append('file', file);

        request().post(`/api/v1/user/profile`, data, {'Content-Type' : 'multipart/form-data'})
        .then(response => { 
            const data = response.data.data;
            setPreview(data);
             setUser({
                ...user,
                'profileImg' : data
            })
        })
        .catch(err => { console.log(err)});
    };

    const logoutHandler = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        props.history.push("/");
    };


    return (
        <Menu style={{padding : '4rem 0'}} defaultSelectedKeys={['1']}>
            <UserWrap>
                <div className="avatar-wrap">
                    <div className="file-attachment" onClick={() => {inputRef.current.click()}}>
                        <EditOutlined style={{color : "#fff", fontSize : "1.2rem"}} />
                        <input type='file' 
                               accept="image/*"
                               onChange={handleProfileImgOnChange}
                               style = {{display : 'none'}}
                               ref={inputRef}/>
                    </div>

                    <Avatar size={100} icon={<UserOutlined />} src={preview.length > 0 ? preview : user.profileImg} className="avatar" alt="referrerPolicy='no-referrer'"/>

                    {/* <Button shape="circle" 
                            icon={<CameraOutlined />} className="file-attachment-btn"
                            onClick={() => {inputRef.current.click()}}/>
                    <input type='file' 
                           accept="image/*"
                           onChange={handleProfileImgOnChange}
                           style = {{display : 'none'}}
                           ref={inputRef}/> */}
                </div>

                <h1>{t('mypage.title', { name: user.name})}</h1>
            </UserWrap>
            
            <Divider/>
            
            <Menu.Item key="1" >
                <Link to="/mypage/studyroom">내가 가입한 스터디방</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/mypage/studyroom">나의 스터디 기록</Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to="/mypage/account">{t('mypage.editAccountSettings.title')}</Link>
            </Menu.Item>
            <Menu.Item key="4">
                <div onClick={logoutHandler}>로그아웃</div>
            </Menu.Item>
        </Menu>
    )
}

export default withRouter(SubMenuWrap);

const UserWrap = styled.div`
    padding: 0 16px;

    .avatar-wrap {
        /* text-align : center; */
        /* height: 160px; */
   

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

        /* .avater {
            border : 1px solid;
        }

        .file-attachment-btn {
            position: relative;
            bottom: 40px;
            right: -60px;
        } */
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

    /* ${breakpoint('desktop')`
        max-width : 500px;
    `} */
`