import React from 'react';
import {GOOGLE_AUTH_URL, NAVER_AUTH_URL} from 'constants/index';
import styled from "styled-components";
import {OAUTH_PROVIDER} from 'constants/index';
import { Button, Divider} from 'antd';

import Naver from "assets/image/naver-ico.svg";
import Google from "assets/image/google-ico.svg";


const SocialLogin = () => {
    const socialLoginHandler = provider => {
        if(provider === 'GOOGLE') window.location.assign(GOOGLE_AUTH_URL);
        else if(provider === 'NAVER') window.location.assign(NAVER_AUTH_URL);
    }

    const socialLogo = provider => {
        if(provider === 'GOOGLE') return Google
        else if(provider === 'NAVER') return Naver
    }

    return (
        <SocialLoginWrap>
            <Divider plain>Log In With</Divider>
            {
                OAUTH_PROVIDER.map(v => (
                    <ButtonWrap>
                        <Button onClick={() => socialLoginHandler(v)} className={`social ${v.toLowerCase()}`}>
                            <img src={socialLogo(v)} alt={v.toLowerCase()}/> {v}
                        </Button>
                    </ButtonWrap>
                ))
            }
        </SocialLoginWrap>
    )
}

export default SocialLogin;


const SocialLoginWrap = styled.div`
  margin-top : 5rem;
  text-align: center;
`

const ButtonWrap = styled.span`
  &:not(:first-child) {
    margin-right : .4rem;
  }

  Button.social {
    &.google {
      &:hover {
         color : var(--social-google);
         border : 1px solid var(--social-google);
      }
    }

    &.naver {
      &:hover {
         color : var(--social-naver);
         border : 1px solid var(--social-naver);
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