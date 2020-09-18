import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {ACCESS_TOKEN, REMEMBER_ME} from 'constants/index';
import {http} from 'utils/HttpHandler';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CHANGE_ACCOUNT } from 'store/modules/account';

import { Typography } from 'antd';

import LocalLoginForm from "./Sections/LocalLoginForm";
import SocialLogin from "./Sections/SocialLogin";

const { Title } = Typography;

const LoginPage = (props)  => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [rememberMe, setRememberMe] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // 로그인 버튼 클릭
    const handleLocalLogin = values => {
      http.post('/api/v1/auth/login', values)
      .then(response => { 
          const data = response.data.data;
          // 로컬 스토리에 access token을 담고
          window.localStorage.setItem(ACCESS_TOKEN, data.accessToken);

          // remember me가 선택되었을 경우, 계정 정보를 로컬 스토리에 저장한다.
          rememberMe ? window.localStorage.setItem(REMEMBER_ME, data.email) : localStorage.removeItem(REMEMBER_ME);
      
          // account 상태값 저장
          dispatch({ 
            type: CHANGE_ACCOUNT, 
            payload: {name : data.name, profileImg : data.profileImg}
          });
        
          props.history.push(props.location.state ? props.location.state.from.pathname : "/");
      })
      .catch(err => { 
        if(err.response) {
          setIsError(true); 
          setErrorMessage(err.response.data.message)}
      });
    };
  
    return (
      <div className="bg-gray">
        <div className="container content-wrap">
          <div className="form-wrap">
              <Title>{t('auth.login')}</Title>

              <LocalLoginForm handleLocalLogin={handleLocalLogin} 
                              error={{isError, errorMessage}} 
                              rememberMe={{rememberMe, setRememberMe}}/>

              <RegisterWrap>
                <Link to="/register">{t('auth.createAccount')}</Link>
              </RegisterWrap>

              <SocialLogin/>
          </div>
        </div>
      </div>
    );
  };
  
export default LoginPage;

const RegisterWrap = styled.div`
  text-align: center;
`