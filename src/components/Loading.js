import React from "react";
import styled from "styled-components";
import { Spin } from 'antd';

export default function Loading() {
    return (
        <LoadingWrap>
            <Spin tip="Loading..."/>
        </LoadingWrap>
    )
}

const LoadingWrap = styled.div`
    margin : 0 auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    min-height: inherit;
`