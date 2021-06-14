import { tokenStore } from "@/utils/tokenUtils";
import React from "react";
import { Redirect, Route, RouteProps, useLocation } from "react-router";

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ ...rest }) => {
    const { pathname } = useLocation();

    const currentPagePath = encodeURIComponent(pathname);

    if (!tokenStore.tokenExist()) return <Redirect to={`/login?next=${currentPagePath}`} />;
    return <Route {...rest} />;
};

export default PrivateRoute;
