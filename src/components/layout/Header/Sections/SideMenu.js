import React, {useState, useEffect} from 'react';
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { Avatar, Button, Badge } from 'antd';
import { UserOutlined  } from '@ant-design/icons';

import { useRecoilValue } from 'recoil';
import {userState} from "atom/UserState";


export default function SideMenu(props) {

    const user = useRecoilValue(userState);

    const logoutHandler = () => {
        localStorage.removeItem('accessToken');
        props.history.push("/");
    };
 
    if(localStorage.getItem("accessToken")){
        return (
            <div className="user-wrap">
                <Link to="/mypage">
                <div className="user-info">
                    <Avatar style={{marginRight : '.6rem'}} 
                      src={user.profileImg}
                      icon={<UserOutlined />} 
                      alt="referrerPolicy='no-referrer'"/>
                    <span>{user.name}</span>
                </div>
                </Link>
              <span className="session-btn" onClick={logoutHandler}>로그아웃</span>
            </div>
        )
    }else {
        return (
            <div className="user-wrap">
                <Link to="/login"><span className="session-btn">로그인</span></Link>
           </div>
        )
    }
}
