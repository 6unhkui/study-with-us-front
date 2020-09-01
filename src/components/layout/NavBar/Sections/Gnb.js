import React, {useState} from 'react'
import { NavLink } from "react-router-dom";
import { Menu } from 'antd';

export default function Gnb() {
    return (
        <div className="gnb-wrap">
            <ul>
                <li>
                    <NavLink to="/room" activeClassName="active">나의 스터디룸</NavLink>
                </li>
                <li>
                    <NavLink to="/feed" activeClassName="active">새글 피드</NavLink>
                </li>
                <li>
                    <NavLink to="/search" activeClassName="active">스터디룸 찾기</NavLink>
                </li>
                <li>
                   문의사항
                </li>
            </ul>

            {/* <Menu mode="horizontal" className="gnb">
                <Menu.Item key="1">
                    <Link to="/room">나의 스터디룸</Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to="/feed">새글 피드</Link>
                </Menu.Item>

                <Menu.Item key="3">
                    <Link to="/search">스터디룸 찾기</Link>
                </Menu.Item>
        
                <Menu.Item key="4">
                    문의사항
                </Menu.Item>
            </Menu> */}
      </div>
    )
}
