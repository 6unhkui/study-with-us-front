import React from 'react';
import styled from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { Divider, Typography, Button  } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function LayerPopup(props) {
    return (
        <LayerWrap>
            <Layer>
                <Title level={3} className='title'>{props.title}</Title>
                <Button type="text" className='close' onClick={() => {props.setLayerOpen(false);}}><CloseOutlined size={40} /></Button>
                <Divider style={{margin : '0'}}/>
                <Content>{props.children}</Content>
            </Layer>
            <LayerDim onClick={() => {props.setLayerOpen(false);}}/>
        </LayerWrap>
    )
}

const LayerWrap = styled.div`
    z-index: 100;
    /* background-color: #00000040; */
    height: 100%;
    width: 100%;
    position: absolute;
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
    }

    ${breakpoint('mobile')`
        max-width: initial;
        margin: 0 20px;
    `}

    ${breakpoint('desktop')`
       max-width: 60vw;
       margin: 0 auto;
    `}
` 

const Content = styled.div`
    padding: 20px 0;
    overflow-y : scroll;
    min-height: 20vh;
    max-height: 40vh;
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
