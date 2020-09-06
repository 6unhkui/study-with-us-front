import React, {useState, useEffect} from 'react';
import { Route } from "react-router-dom"

import styled from 'styled-components';
import { Layout } from 'antd';

import SubMenu from './Sections/SubMenu';
// import MyStudyRoom from './Sections/MyStudyRoom';
import EditAccountSettingsPage from 'pages/EditAccountSettingsPage';

const { Sider, Content } = Layout;

const MypagePage = ({match}) => {
    return (
        <div className="container">
            <ContainerWrap>
                <Layout>
                    <Sider className='sider' width="250">
                        <SubMenu/>
                    </Sider>

                    <Content className='content'>
                        {/* <Route exact path={match.path} component={MyStudyRoom}/> */}
                        {/* <Route path={`${match.path}/studyroom`} component={MyStudyRoom} /> */}
                        <Route path={`${match.path}/account`} component={EditAccountSettingsPage} />
                    </Content>
                </Layout>
            </ContainerWrap>
        </div>
    )
}

export default MypagePage;

const ContainerWrap = styled.div`
    aside.sider {
        background-color : #fff;
        padding-right : 2rem;
    }

    main.content {
        background-color : #fff;
        padding : 4rem 2rem;
    }
`