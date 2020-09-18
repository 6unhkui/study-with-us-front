import React from 'react';
import { withRouter, Redirect } from "react-router-dom";
import {ACCESS_TOKEN} from 'constants/index';
import {getParameter, http} from 'utils/HttpHandler';
import { useRecoilState } from 'recoil';
import {userState} from "atom/UserState";

const OAuth2RedirectHandler = (props) => {
    const [user, setUser] = useRecoilState(userState);
    const token = getParameter(props.location, 'token');
    const error = getParameter(props.location, 'error');

    // Oauth2 로그인 인증 후 파라미터로 토큰을 전달받으면, 
    if(token) {
        // 1. localStorage에 그 값을 저장한다.
        window.localStorage.setItem(ACCESS_TOKEN, token);

        // 2. 사용자 정보를 담아와 rocoil의 atom으로 관리하는 userState에 넣어준다.
        http.get('/api/v1/account')
        .then(response => {
            const data = response.data.data;
            setUser({
              'name' : data.name,
              'profileImg' : data.profileImg
            });
        })
        .catch(err => {console.log(err)});

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