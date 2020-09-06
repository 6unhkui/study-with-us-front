import React from 'react';
import {GOOGLE_AUTH_URL, NAVER_AUTH_URL} from 'utils/HttpHandler';
import styled from "styled-components";
import {provider} from "utils/OAuth2Provider";
import { Button, Divider} from 'antd';
import Naver from "assets/image/naver-ico.svg";
import Google from "assets/image/google-ico.svg";

export default function SocialLogin() {
    const socialLoginHandler = provider => {
        if(provider === 'google') window.location.assign(GOOGLE_AUTH_URL);
        else if(provider === 'naver') window.location.assign(NAVER_AUTH_URL);
    }

    return (
        <SocialLoginWrap>
          <Divider plain>Log In With</Divider>
          <Button onClick={() => socialLoginHandler('google')} className="google">
            <img src={Google} alt="naver"/> GOOGLE
          </Button>
          <Button onClick={() => socialLoginHandler('naver')} className="naver">
            <img src={Naver} alt="naver"/> NAVER
          </Button>
        </SocialLoginWrap>
    )
}

const SocialLoginWrap = styled.div`
  margin-top : 5rem;
  text-align: center;

  button {
    margin-right : .4rem;

    &.google {
      &:hover {
         color : ${provider["GOOGLE"].color};
         border : 1px solid ${provider["GOOGLE"].color};
      }
    }

    &.naver {
      &:hover {
         color : ${provider["NAVER"].color};
         border : 1px solid ${provider["NAVER"].color};
      }
    }

    img {
      width : 1rem;
      margin-right : .4rem;
      bottom: 1px;
      position: relative;
    }
  }
`