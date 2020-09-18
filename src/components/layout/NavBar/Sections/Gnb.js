import React from 'react'
import { NavLink } from "react-router-dom";

export default function Gnb() {
    const items = [
        {path : "/user/room", name  : "나의 스터디방"},
        {path : "/feed", name  : "새글 피드"},
        {path : "/search", name  : "스터디방 찾기"},
        {path : "/qna", name  : "문의 사항"}
    ]

    return (
        <div className="gnb-wrap">
            <ul>
                {items.map(v => (
                    <li><NavLink to={v.path} activeClassName="active">{v.name}</NavLink></li>
                ))}
            </ul>
        </div>
    )
}
