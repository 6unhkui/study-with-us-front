import React from 'react';
import styled, { css } from "styled-components";
import breakpoint from 'styled-components-breakpoint';

import {PageHeader, Typography} from 'antd';
import {useHistory} from "react-router-dom";
const { Title } = Typography;

const Card = ({title, size, pageHeader, children, style}) => {
    const history = useHistory();
    return (
        <Background>
            <div className="container content-wrap" {...style}>
                <CardWrap size={size}>
                    {title && <Title>{title}</Title>}
                    {pageHeader &&
                        <PageHeader
                            onBack={() => history.push(`${pageHeader.backUrl}`)}
                            title={pageHeader.title}
                            style={{padding : '0', marginBottom : '1rem'}}
                            subTitle={pageHeader.subTitle}
                            extra={pageHeader.extra}
                        />
                    }
                    {children}
                </CardWrap>
            </div>
        </Background>
    )
}

export default Card;

const Background = styled.div`
    background : var(--bg-gray);
`

const CardWrap = styled.div`
    border: 1px solid var(--border-gray);
    border-radius : var(--border-radius);
    background : #fff;
    margin : 0 auto;
    min-height: 30rem;
    
    ${({ size }) => {
        if(size === 'small') {
            return css`
                max-width : 540px;
                h1 {
                    text-align: center;
                    margin-bottom: 3rem;
                } 
    
                ${breakpoint('tablet')`
                    padding : 4rem;
                `}
                
                ${breakpoint('mobile')`
                    padding : 2rem;
                `}
            `
        }else {
            return css`
                ${breakpoint('tablet')`
                    padding : 2.2rem 3.2rem;
                `}
                
                ${breakpoint('mobile')`
                    padding : 2rem;
                `}
            `
        }
    }}
`