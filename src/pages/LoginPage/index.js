import React, {useState}  from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import {ACCESS_TOKEN, REMEMBER_ME, SERVER_URI} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";
import styled from "styled-components";
import { Typography, Alert } from 'antd';

import breakpoint from 'styled-components-breakpoint';

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
      axios.post(`${SERVER_URI}/api/v1/auth/login`, values)
      .then(response => { 
          window.localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);

          rememberMe ? window.localStorage.setItem(REMEMBER_ME, response.data.email) : localStorage.removeItem(REMEMBER_ME);
      
          setUser({
            'name' : response.data.name,
            'profileImg' : response.data.profileImg
          });

          props.history.push("/");
      })
      .catch(err => { 
        if(err.response) {
          setIsError(true); 
          setErrorMessage(err.response.data.restRequestError.message)}
      });
    };
  
    return (
      <div class="container content-wrap">
       <ContainerWrap>
          <Title style={{textAlign : 'center'}}>{t('auth.login')}</Title>

          <LoginForm onSubmit={onSubmit} error={{isError, errorMessage}} rememberMe={{rememberMe, setRememberMe}}/>

          <RegisterWrap>
            <Link to="/register">{t('auth.signUp')}</Link>
            <Link to="/register">계정 찾기</Link>
            <Link to="/register">비밀번호 찾기</Link>
          </RegisterWrap>

          <SocialLogin/>

      </ContainerWrap>
      </div>
    );
  };
  
export default LoginPage;

const ContainerWrap = styled.div`
  max-width : 400px;
  padding-top : 4rem;
  /* ${breakpoint('tablet')`
    max-width : 100px;
  `}

  ${breakpoint('desktop')`
    max-width : 500px;
  `} */
  margin : 0 auto;
`

const RegisterWrap = styled.div`
  text-align: center;

  a:not(:first-child) {
    &::before {
      content : '|';
      margin: 0 .4rem;
      color : var(--border-gray);
    }
  }
`