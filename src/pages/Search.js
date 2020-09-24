import React from 'react';
import CategorySlide from 'containers/CategorySlide';

import { Typography, Divider } from 'antd';

const { Title } = Typography;

const SearchPage = () => {
    return (
        <div className="container content-wrap">
             <Title>스터디방 찾기</Title>
             <Divider/>
             <CategorySlide/>
        </div>
    )
}

export default SearchPage;