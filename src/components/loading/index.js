import React from "react";
import styled from "styled-components";
import { Spin, Alert } from 'antd';

export default function Loading() {
    return (
        <LoadingWrap><Spin tip="Loading..."/></LoadingWrap>
    )
}

const LoadingWrap = styled.div`
    text-align : center;
    line-height : 50vh;
`