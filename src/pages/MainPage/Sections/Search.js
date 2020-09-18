import React from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import breakpoint from 'styled-components-breakpoint';

import CategorySlide from 'components/List/CategorySlide';

import { Divider } from 'antd';
import {SearchOutlined} from '@ant-design/icons';

export default function Search(props) {
    const history = useHistory();

    return (
        <ContentWrap style={{...props.style}}>
            <SearchWrap>
                <input type="text" placeholder="배우고 싶은게 있나요?"/>
                <SearchOutlined className='ico-search'/>
            </SearchWrap>
            <CategorySlide onItemClick={val => {history.push(`/search/category/${val.id}`, { name : val.name })}}/>
            <Divider/>
        </ContentWrap>
    )
}


const ContentWrap = styled.div`
    text-align: center;
    margin-top: 3rem;

    .search-wrap {
        max-width : 500px;
        margin-bottom : 1.4rem;
    }
`

const SearchWrap = styled.div`
    border: 2px solid var(--border-gray);
    overflow: hidden;
    height: 3.4rem;
    margin: 0 auto 1rem auto;
    padding: .4rem .6rem;
    border-radius: 30px;
    display: flex;

    ${breakpoint('mobile')`
        width: 100%;
    `}

    ${breakpoint('tablet')`
        width: 40%;
    `}

    input {
        font-size: 1.4rem;
        border: 0 none;
        background-color: transparent;
        width: calc(100% - 3rem);
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
        position: relative;
        flex: none;
        margin-left: .4rem;

        &::placeholder {
            color : var(--font-color-gray);
            opacity : .3;
        }
    }

    .ico-search {
        margin-left: auto;
        color: #fff;
        width: 35px;
        height: 35px;
        font-size: 1rem;
        background: var(--primary-color);
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 5px 10px 0 rgba(93, 0, 215, 0.2), 0 0 1px 0 rgba(0,0,0,.06);
        cursor: pointer;

        &:hover {
            transition: all .5s;
            box-shadow: none;
            opacity : .6;
        }
    }
`