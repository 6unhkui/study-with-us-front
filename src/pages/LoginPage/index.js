import React, {useState}  from 'react';
import { useTranslation } from 'react-i18next';
import {ACCESS_TOKEN, REMEMBER_ME, request} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";
import styled from "styled-components";
import { Typography, Alert } from 'antd';

import LoginForm from "./Sections/LoginForm";
import SocialLogin from "./Sections/SocialLogin";


const { Title } = Typography;

const LoginPage = (props)  => {
    const { t } = useTranslation();

    const [user, setUser] = useRecoilState(userState);

    const [rememberMe, setRememberMe] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 로그인 버튼 클릭
    const onSubmit = values => {
      request().post('/api/v1/auth/login', values)
      .then(response => { 
          const data = response.data.data;
          window.localStorage.setItem(ACCESS_TOKEN, data.accessToken);

          rememberMe ? window.localStorage.setItem(REMEMBER_ME, data.email) : localStorage.removeItem(REMEMBER_ME);
      
          setUser({
            'name' : data.name,
            'profileImg' : data.profileImg
          });

          props.history.push("/");
      })
      .catch(err => { 
        if(err.response) {
          setIsError(true); 
          setErrorMessage(err.response.data.message)}
      });
    };
  
    return (
      <div className="container content-wrap">
       <div className="form-wrap">
          <Title style={{textAlign : 'center'}}>{t('auth.login')}</Title>

          <LoginForm onSubmit={onSubmit} error={{isError, errorMessage}} rememberMe={{rememberMe, setRememberMe}}/>

          <RegisterWrap>
            <Link to="/register">{t('auth.createAccount')}</Link>
          </RegisterWrap>

          <SocialLogin/>
      </div>
      </div>
    );
  };
  
export default LoginPage;

const RegisterWrap = styled.div`
  text-align: center;
`