import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import styled from 'styled-components';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import {useDispatch, useSelector} from 'react-redux';
import {LOAD_CATEGORIES_REQUEST} from 'store/modules/category';

const CategorySlide = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.category);

    useEffect(() => {
        dispatch({
            type: LOAD_CATEGORIES_REQUEST
        })
    }, []);

    const responsive = {
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
                responsive={responsive}
            >
                {categories.map(category => (
                    <ItemWrap onClick={() => {history.push(`/search/category/${category.categoryId}`, { name : category.name })}} 
                              key={category.categoryId}>
                        {category.name}
                    </ItemWrap>
                ))}
            </Carousel>
        </SlideWrap>
    )
}

export default CategorySlide;


// Style - s /////////////////////////////
const SlideWrap = styled.div`
    .react-multi-carousel-list {
        height : 100px;
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
// Style - e /////////////////////////////