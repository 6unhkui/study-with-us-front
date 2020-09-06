import React from 'react';
import styled from 'styled-components';
import { Input, Typography} from 'antd';
const { Search } = Input;
const { Title } = Typography;

const Recommend = () => {
    return (
        <div className="container">
            <ContentWrap>
            <Title level={2}>원하는 주제를 선택하세요</Title>
            <Search placeholder="input search text" 
                    onSearch={value => console.log(value)} 
                    enterButton size="large" 
                    className='search-wrap'/>
            </ContentWrap>
        </div>
    )
}

export default Recommend;

const ContentWrap = styled.div`
    text-align: center;
    margin-top: 3rem;

    .search-wrap {
        max-width : 600px;
        margin-top : .6rem;
    }
`