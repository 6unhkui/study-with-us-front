import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function CategorySlide(props) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        _getCategories();
    }, []);

    const _getCategories = () => {
        http.get("/api/v1/categories")
        .then(response => {
            const data = response.data.data;
            setCategories(data);
        })
    }

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 6
        },
        desktop: {
          breakpoint: { max: (3000), min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };

    return (
        <SlideWrap>
            <Carousel 
                infinite={true}
                autoPlay
                autoPlaySpeed={4000}
                responsive={responsive}>
                {categories.map(v => (
                    <ItemWrap onClick={() => {props.onItemClick(v)}} key={v.id}>
                        {v.icon && <img src={v.icon} className='icon' alt='icon'/>}{v.name}
                    </ItemWrap>
                ))}
            </Carousel>
        </SlideWrap>
    )
}

const SlideWrap = styled.div`
    .react-multi-carousel-list {
        height : 100px;
        /* border : 1px solid var(--primary-light-color); */
    }

    .react-multiple-carousel__arrow--left {
        position: absolute;
        left: 0 !important;
        background: linear-gradient(90deg, white, transparent);
        height: 100%;
        width: 60px;

        &::before {
            text-align : left !important;
        }
    }

    .react-multiple-carousel__arrow--right {
        position: absolute;
        right: 0 !important;
        background: linear-gradient(-90deg, white, transparent);
        height: 100%;
        width: 60px;

        &::before {
            text-align : right !important;
        }
    }   

    .react-multiple-carousel__arrow {
        z-index : 10 !important;

        &::before {
            color : var(--font-color-black);
        }
    }
`

const ItemWrap = styled.div`
    cursor : pointer;
    width: calc(100% - 16px);
    color : var(--primary-color);
    border : 1px solid var(--primary-light-color);
    margin: 0 auto;
    border-radius: 40px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    box-shadow: rgba(93, 0, 215, 0.1) 0px 4px 10px, rgba(93, 0, 215, 0.04) 0px 1px 0px;
    transition: all .5s;

    &:hover {
        box-shadow: rgba(93, 0, 215, 0.1) 0px 1px 1px;
    }

    .icon {
        margin-right: 6px;
        width: 28px;
        position: relative;
        bottom: 2px; 
    }
`