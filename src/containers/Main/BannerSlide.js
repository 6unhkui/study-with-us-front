import React from "react";
import {Carousel} from "antd";
import Banner1 from "assets/image/banner-1.png";
import Banner2 from "assets/image/banner-2.png";
import styled from "styled-components";

const banners = [
    {image : Banner1, backgroundColor : '#fffcf3'},
    {image : Banner2, backgroundColor : '#fffaf6'},
]

const BannerSlide = () => { 
    return (
        <CarouselWrap>
            <Carousel autoplay>
                {banners.map((banner, i) => 
                    <BannerImage background={banner.backgroundColor} key={i}>
                        <img src={banner.image} alt='banner'/>
                    </BannerImage>)
                }
            </Carousel>
        </CarouselWrap>
    )
}

export default BannerSlide;

const BannerImage = styled.div`
  background : ${props => props.background};
  img {
    margin : 0 auto;
  }
`

const CarouselWrap = styled.div`
    .ant-carousel .slick-dots li button {
        background : var(--primary-light-color) !important
    }
`
