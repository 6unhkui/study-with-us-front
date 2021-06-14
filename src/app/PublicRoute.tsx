import { tokenStore } from "@/utils/tokenUtils";
import React from "react";
import { Redirect, Route, RouteProps } from "react-router";

interface PublicRouteProps extends RouteProps {
    restricted: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted, ...rest }) => {
    if (restricted && tokenStore.tokenExist()) return <Redirect to="/" />;
    return <Route {...rest} />;
};

export default PublicRoute;
