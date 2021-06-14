import useQuery from "@/hooks/useQuery";
import React from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { meAsync } from "@/store/account";
import { tokenStore } from "@/utils/tokenUtils";

interface OAuth2RedirectPageProps {}

const OAuth2RedirectPage: React.FC<OAuth2RedirectPageProps> = () => {
    const dispatch = useDispatch();
    const query = useQuery();
    const token = query.get("token");

    if (token) {
        tokenStore.setAccessToken(token);
        dispatch(meAsync.request(""));

        return <Redirect to="/" />;
    }

    return <Redirect to="/login" />;
};

export default OAuth2RedirectPage;
