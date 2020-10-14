import React, {useCallback, useEffect, useState} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import breakpoint from "styled-components-breakpoint";

import {useDispatch, useSelector} from "react-redux";
import {LOAD_POPULAR_ROOMS_REQUEST, LOAD_RECENTLY_CREATED_ROOMS_REQUEST} from "store/modules/room";

import CategorySlide from "containers/CategorySlide";
import Card from "components/RoomCard";

import { Button, Divider, List, Typography} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {BannerSlide, NowStartBanner} from "../containers/Main";

const { Title } = Typography;

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { popularRooms, recentlyCreatedRooms } = useSelector(state => state.room);
  const [searchValue, setSearchValue] = useState('');


  useEffect(() => {
    dispatch({
        type : LOAD_POPULAR_ROOMS_REQUEST,
        pagination : {
            page : 1,
            size : 3,
            direction : 'ASC',
        },
        orderType : 'JOIN_COUNT'
    })

    dispatch({
          type : LOAD_RECENTLY_CREATED_ROOMS_REQUEST,
          pagination : {
              page : 1,
              size : 3,
              direction : 'ASC',
          },
          orderType : 'CREATED_DATE'
     })
  },[]);


  const recommendRoomsSections = [
      {title : '지금, 인기 스터디방', data : popularRooms},
      {title : '신규 스터디방', data : recentlyCreatedRooms},
  ]

  const handleChangeSearchValue = useCallback(e => {
      setSearchValue(e.target.value);
  }, [])

  const handleSearch = () => {
      if(searchValue.trim().length === 0) return;
      history.push({
          pathname : '/search',
          search : `?query=${searchValue}`
      })
  }

  return (
    <>
        <BannerSlide/>
        <div className="container" style={{marginTop : '3rem'}}>
            <SearchWrap>
                <input type="text" placeholder="배우고 싶은게 있나요?"
                       onChange={handleChangeSearchValue}
                       onKeyDown={e => {
                           if (e.key === 'Enter') {
                               e.preventDefault();
                               handleSearch();
                           }
                       }}
                />
                <SearchOutlined className='ico-search'
                                onClick={handleSearch}/>
            </SearchWrap>

            <CategorySlide/>

            <Divider/>
            {recommendRoomsSections.map((value,i) => (
                  <div style={{marginTop : '4rem'}}>
                      <Title level={3} style={{marginBottom : '1rem'}}>{value.title}</Title>
                      <List grid={{ gutter: 20, xs: 1, sm: 2, column :3}}
                            dataSource={value.data}
                            renderItem={item => (
                                <List.Item>
                                    <Card {...item}/>
                                </List.Item>
                            )}
                      />
                  </div>
              ))
            }
        </div>

        <NowStartBanner/>
    </>
  );
}

export default Main;


const SearchWrap = styled.div`
    margin-top: 3rem;
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
