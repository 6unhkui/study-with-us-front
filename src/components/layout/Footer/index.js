import React from 'react';
import styled from 'styled-components';
import { Divider} from 'antd';
import { TwitterOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';

const Footer = () => {
    return (
        <div className="footer-wrap">
            <Divider style={{margin : '0'}}/>
            <div className='container'>
                <TitleWrap>study with us</TitleWrap>
                <SocialWrap><TwitterOutlined /><InstagramOutlined /><FacebookOutlined /></SocialWrap>
                <CorpWrap>
                    <span>이용약관</span>
                    <span>개인정보처리방침</span>
                    <span>고객센터</span>
                    <span style={{fontWeight : '600'}}>{new Date().getFullYear()} © study with us.</span>
                </CorpWrap>
            </div>
        </div>
    )
}

export default Footer;

const TitleWrap = styled.div`
    display: inline-block;
    font-size: 1.5rem;
    font-weight: bold;
    opacity: .6;
`

const SocialWrap = styled.div`
    display: inline-block;
    float: right;

    span {
        font-size: 1.4rem;
        opacity: .5;
        margin-left : .8rem;
    }
`

const CorpWrap = styled.div`
    margin-top : .4rem;
    opacity : .8;

    span:not(:last-child)::after {
        content: "|";
        margin: 0 .4rem;
        opacity: 0.4;
    }
`

