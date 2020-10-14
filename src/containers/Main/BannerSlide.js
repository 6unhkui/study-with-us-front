import React from "react";
import {Carousel, Button} from "antd";
import Banner1 from "../../assets/image/banner-1.png";
import Banner2 from "../../assets/image/banner-2.png";
import styled from "styled-components";

const mainBanners = [
    {image : Banner1, color : '#fbf5f8',
        title : '정보를 함께 나눠요!',
        sub : '스터디 메이트들과 함께 서로 정보를 공유하며 성장을 함께해보세요'
    },
    {image : Banner2, color : '#f4fcff',
        title : '출석을 함께 관리해보세요!',
        sub : '공부 의지가 안잡히시나요? 함께 출석을 관리해주며 의지를 키워보세요.'
    }
]
const BannerSlide = () => {
    return (
        <Carousel effect="fade">
            {mainBanners.map(value => (
                <BannerImage background={value.color}>
                    <div className="container content">
                        <TextWrap>
                            <Title>
                                {value.title}
                            </Title>
                            <SubText>
                                {value.sub}
                            </SubText>
                        </TextWrap>
                    </div>
                    <img src={value.image} alt='banner'/>
                </BannerImage>
            ))}
        </Carousel>
    )
}

export default BannerSlide;

const BannerImage = styled.div`
  background : ${props => props.background};
  img {
    margin : 0 auto;
  }
  
  .content { 
  }
`

const TextWrap = styled.div`
    position: absolute;
    top: 120px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    font-size: 2.3rem;
    font-weight: 500;
`

const SubText = styled.span`
    font-weight: 300;
`
