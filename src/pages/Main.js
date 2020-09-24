import React, {useEffect} from 'react';
import styled from 'styled-components';
import breakpoint from "styled-components-breakpoint";

import {useDispatch, useSelector} from "react-redux";
import {LOAD_POPULAR_ROOMS_REQUEST, LOAD_RECENTLY_CREATED_ROOMS_REQUEST} from "store/modules/room";

import CategorySlide from "containers/CategorySlide";
import Card from "components/RoomCard";
import Banner1 from 'assets/image/banner-1.png';
import Banner2 from 'assets/image/banner-2.png';

import {Carousel, Divider, List, Typography} from 'antd';
import {SearchOutlined} from "@ant-design/icons";

const { Title } = Typography;


const Main = () => {
  const dispatch = useDispatch();
  const { popularRooms, recentlyCreatedRooms } = useSelector(state => state.room);

  const mainBanners = [
    {color : '#fbf5f8', image : Banner1},
    {color : '#f4fcff', image : Banner2}
  ]

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


  return (
    <>
        <Carousel effect="fade" autoplay>
            {mainBanners.map(v => (
                <BannerImage background={v.color}>
                    <img src={v.image} alt='banner'/>
                </BannerImage>
             ))}
        </Carousel>

        <div className="container" style={{marginTop : '3rem'}}>
            <SearchWrap>
                <input type="text" placeholder="배우고 싶은게 있나요?"/>
                <SearchOutlined className='ico-search'/>
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

        <SubBanner/>
    </>
  );
}

export default Main;


const BannerImage = styled.div`
  background : ${props => props.background};
  img {
    margin : 0 auto;
  }
`

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

const SubBanner = styled.div`
  margin-top : 4rem;
  height: 16rem;
  background: var(--bg-gray);
`