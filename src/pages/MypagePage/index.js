import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SERVER_URI, header} from 'utils/HttpHandler';

import { Route } from "react-router-dom"
            
import { Layout } from 'antd';

import SubMenu from './Sections/SubMenu';
// import UserInfo from './Sections/UserInfo';
import MyStudyRoom from './Sections/MyStudyRoom';
import EditAccountSettingsPage from 'pages/EditAccountSettingsPage';


const { Sider, Content } = Layout;

const MypagePage = ({match}) => {
    

    return (
        <div className="container">
            <Layout>
                <Sider style={{backgroundColor : '#fff'}}><SubMenu/></Sider>

                <Content style={{backgroundColor : '#fff', padding : '4rem 10%'}}>
                    <Route exact path={match.path} component={EditAccountSettingsPage}/>
                    <Route path={`${match.path}/studyroom`} component={MyStudyRoom} />
                    <Route path={`${match.path}/account`} component={EditAccountSettingsPage} />
                </Content>
            </Layout>
        </div>
    )
}

export default MypagePage;