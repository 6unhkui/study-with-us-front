import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Divider, Typography, Button  } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function LayerPopup(props) {
    return (
        <LayerWrap>
            <Layer size={props.size}>
                <Title level={3} className='title'>{props.title}</Title>
                <span className='close' onClick={() => {props.setLayerOpen(false);}}><CloseOutlined size={40} /></span>
                <Divider style={{margin : '0'}}/>
                <Content>{props.children}</Content>
            </Layer>
            <LayerDim onClick={() => {props.setLayerOpen(false);}}/>
        </LayerWrap>
    )
}

const LayerWrap = styled.div`
    z-index: 9999;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
` 

const Layer = styled.div`
    background-color: #fff;
    top: 20vh;
    position: relative;
    border-radius: 4px;
    padding : 30px;

    .title {
        display : inline-block;
    }

    .close {
        float : right;
        width: 20px;
        height: 20px;
        text-align: right;
        cursor: pointer;

        &:hover {
            opacity : .6;
        }
    }

    ${breakpoint('mobile')`
        max-width: initial;
        margin: 0 20px;
    `}

    ${breakpoint('tablet')`
        max-width: ${(props) => props.size || "60vw"};
        margin: 0 auto;
    `}
` 

const Content = styled.div`
    padding: 20px 0;
    overflow-y : scroll;
    min-height: 20vh;
    max-height: 40vh;

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera*/
    }
` 

const LayerDim = styled.div`
    background-color: #00000040;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index : -99;
` 
