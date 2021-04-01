import React from "react";
import { useTranslation } from "react-i18next";
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import LoginForm from "containers/Login/LoginForm";
import SocialLogin from "containers/Login/SocialLogin";
import CardWrap from "components/CardBox";
import SEO from "components/SEO";

const Login = props => {
    const { t } = useTranslation();

    return (
        <>
            <SEO title="Login" />
            <CardWrap title={t("auth.login")} size="small">
                <LoginForm {...props} />

                <RegisterWrap>
                    <Link to="/register">{t("auth.createAccount")}</Link>
                </RegisterWrap>

                <SocialLogin />
            </CardWrap>
        </>
    );
};

export default withRouter(Login);

const RegisterWrap = styled.div`
    text-align: center;
`;
