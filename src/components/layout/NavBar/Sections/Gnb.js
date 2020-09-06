import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';

export default function Gnb() {
    return (
        <div className="gnb-wrap">
            <ul>
                <li>
                    <NavLink to="/user/room" activeClassName="active">나의 스터디방</NavLink>
                </li>
                <li>
                    <NavLink to="/feed" activeClassName="active">새글 피드</NavLink>
                </li>
                <li>
                    <NavLink to="/search" activeClassName="active">스터디방 찾기</NavLink>
                </li>
                <li>
                   문의사항
                </li>
            </ul>
      </div>
    )
}
