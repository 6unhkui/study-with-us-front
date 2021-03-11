import React from "react";
import breakpoint from "styled-components-breakpoint";
import { Carousel } from "antd";
import Banner1 from "assets/image/banner-1.png";
import Banner1_700w from "assets/image/banner-1-700w.png";
import Banner2 from "assets/image/banner-2.png";
import Banner2_700w from "assets/image/banner-2-700w.png";
import styled from "styled-components";

const banners = [
    { images: [Banner1, Banner1_700w], backgroundColor: "#fffcf2" },
    { images: [Banner2, Banner2_700w], backgroundColor: "#fffaf5" }
];

const BannerSlide = () => {
    return (
        <CarouselWrap>
            <Carousel autoplay>
                {banners.map((banner, i) => (
                    <BannerImage background={banner.backgroundColor} key={i} images={banner.images}>
                        <img alt="banner" src={banner.images[0]} />
                    </BannerImage>
                ))}
            </Carousel>
        </CarouselWrap>
    );
};

export default BannerSlide;

const BannerImage = styled.div`
    background: ${props => props.background};

    img {
        margin: 0 auto;
        width: 100%;
        content: url(${props => props.images[1]});

        ${breakpoint("tablet")`
        content: url(${props => props.images[0]});
    `}

        ${breakpoint("desktop")`
        width: initial;
    `}
    }
`;

const CarouselWrap = styled.div`
    .ant-carousel .slick-dots li button {
        background: lightgray !important;
    }
`;
