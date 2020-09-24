import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, withRouter } from "react-router-dom";
import styled from "styled-components";
import LoginForm from 'containers/LoginForm';
import SocialLogin from "containers/SocialLogin";

import { Typography } from 'antd';

const { Title } = Typography;

const Login = (props)  => {
    const { t } = useTranslation();

    return (
      <div className="bg-gray">
        <div className="container content-wrap">
          <div className="form-wrap">
              <Title>{t('auth.login')}</Title>
              <LoginForm {...props}/>

              <RegisterWrap>
                <Link to="/register">{t('auth.createAccount')}</Link>
              </RegisterWrap>

              <SocialLogin/>
          </div>
        </div>
      </div>
    );
  };
  
export default withRouter(Login);

const RegisterWrap = styled.div`
  text-align: center;
`