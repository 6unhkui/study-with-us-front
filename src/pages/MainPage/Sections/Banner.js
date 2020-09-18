import React from 'react';
import styled from 'styled-components';
import { Carousel } from 'antd';

import Banner1 from 'assets/image/banner-1.png';
import Banner2 from 'assets/image/banner-2.png';


export default function Banner() {
  const banner = [
    {color : '#fbf5f8', image : Banner1},
    {color : '#f4fcff', image : Banner2}
  ]

  return (
    <Carousel effect="fade" autoplay>
      {banner.map(v => (
        <BannerImage background={v.color}>
           <img src={v.image} alt='banner'/>
        </BannerImage>
      ))}
    </Carousel>
  );
}

const BannerImage = styled.div`
  background : ${props => props.background};
  img {
    margin : 0 auto;
  }
`