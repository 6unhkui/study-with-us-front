import React from 'react';
import styled from 'styled-components';
import { Row, Col, Card } from 'antd';

import SubMenu from './Sections/SubMenu';

import {MyPageRouter} from 'routes';

const MypagePage = ({match}) => {
    return (
        <div className='bg-gray'>
            <div className="container content-wrap">
                <Card>
                    <Row gutter={[16, 26]}>
                        <Col flex="250px">
                            <SubMenu/>
                        </Col>
                        <Col flex="auto">
                            <ContainerWrap>
                                {MyPageRouter(match.path)}
                            </ContainerWrap>
                        </Col>
                    </Row>
                </Card>
            </div>
        </div>
    )
}

export default MypagePage;

const ContainerWrap = styled.div`
    background-color : #fff;
    padding: 3rem 1.4rem;
`