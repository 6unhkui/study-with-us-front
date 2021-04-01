import React from "react";
import styled from "styled-components";
import { Card } from "antd";
import SubMenu from "containers/MyAccount/SubMenu";
import { MyPageRouter } from "routes";
import SEO from "components/SEO";

const MyAccountPage = ({ match }) => (
    <div className="bg-gray">
        <SEO title="나의 계정" />
        <div className="container content-wrap">
            <Card>
                <SubMenu />
            </Card>
            <Card>
                <ContainerWrap>{MyPageRouter(match.path)}</ContainerWrap>
            </Card>
        </div>
    </div>
);

export default MyAccountPage;

const ContainerWrap = styled.div`
    background-color: #fff;
    padding: 3rem 1.4rem;
`;
