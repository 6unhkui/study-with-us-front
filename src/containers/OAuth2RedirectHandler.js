import React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import {ACCESS_TOKEN} from 'constants/index';
import {getParameter} from 'utils/HttpHandler';

import { useDispatch } from "react-redux";
import { LOAD_ACCOUNT_REQUEST } from 'store/modules/account';

const OAuth2RedirectHandler = (props) => {
    const dispatch = useDispatch();
    const token = getParameter(props.location, 'token');
    const error = getParameter(props.location, 'error');

    // Oauth2 로그인 인증 후 파라미터로 토큰을 전달받으면, 
    if(token) {
        // 1. localStorage에 그 값을 저장한다.
        window.localStorage.setItem(ACCESS_TOKEN, token);

        // 2. 계정 정보를 불러와 리덕스 스토어에 담는다
        dispatch({
            type: LOAD_ACCOUNT_REQUEST,
        });

        return <Redirect to={{
                pathname: "/",
                state: { from: props.location }
        }}/>; 
    }else {
        return <Redirect to={{
                pathname: "/login",
                state: {
                    from: props.location,
                    error : error
                }
        }}/>; 
    }
}

export default withRouter(OAuth2RedirectHandler);