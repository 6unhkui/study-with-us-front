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
          items: 5
        },
        desktop: {
          breakpoint: { max: (3000), min: 1024 },
          items: 5
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
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
                responsive={responsive}>
                {categories.map(v => (
                    <ItemWrap onClick={() => {props.onItemClick(v.idx)}} key={v.idx}>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS1qlNBET-n3EUXXY6s_w9tUoF3o-yjM50Ejg&usqp=CAU" style={{width : '20px', marginRight : '6px'}} />
                        {v.name}</ItemWrap>
                ))}
            </Carousel>
        </SlideWrap>
    )
}

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
    width: calc(100% - 20px);
    /* background-color: red; */
    margin: 0 auto;
    border-radius: 40px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    box-shadow: rgba(41, 42, 43, 0.1) 0px 4px 10px, rgba(41, 42, 43, 0.04) 0px 1px 0px;
    transition: all .5s;

    &:hover {
        box-shadow: rgba(41, 42, 43, 0.1) 0px 1px 1px;
    }
`