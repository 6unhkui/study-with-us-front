import React from "react";
import { Redirect } from "react-router-dom";

// option = null : 누구나 접근 가능 / true : 로그인 한 유저만 / false : 로그인한 유저는 접근 불가능
export default (SpecialComponent, option, adminRoute = null) => {
    const AuthenticateCheck = props => {
        // 페이지 이동 시에 Scroll Top 위치로
        window.scrollTo(0, 0);

        if (!localStorage.getItem("accessToken")) {
            if (option) {
                return (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                );
            }
        } else if (option === false) {
            return (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />
            );
        }

        return <SpecialComponent {...props} />;
    };

    return AuthenticateCheck;
};
