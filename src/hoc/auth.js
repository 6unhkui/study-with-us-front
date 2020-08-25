import React, { useEffect } from 'react';

// option = null : 누구나 접근 가능 / true : 로그인 한 유저만 / false : 로그인한 유저는 접근 불가능
export default (SpecialComponent, option, adminRoute = null) => {
  
    const AuthenticateCheck = (props) => {
        useEffect(() => {
            if(!localStorage.getItem("accessToken")) {
                if(option) props.history.push('/login');
            }else {
                if(option === false) props.history.push('/');
            }
        }, []);
  
      return (
        <main><SpecialComponent {...props}/></main>
      )
    };
  
    return AuthenticateCheck;
};