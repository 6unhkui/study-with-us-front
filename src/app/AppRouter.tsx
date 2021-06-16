import React, { useEffect } from "react";
import { Switch } from "react-router";
import PrivateRoute from "@/app/PrivateRoute";
import PublicRoute from "@/app/PublicRoute";
import { useMeFetch } from "@/hooks/useRedux";
import { tokenStore } from "@/utils/tokenUtils";
import { useDispatch } from "react-redux";
import { meAsync } from "@/store/account";
import useLocationChange from "@/hooks/useLocationChange";
import routes from "@/routes/app";

interface AppRouterProps {}

const AppRouter: React.FC<AppRouterProps> = () => {
    const { fetch: fetchMe, data: me } = useMeFetch();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("%c AppRouter Mount", "color: red; font-weight: bold");
        if (!me) fetchMe();
    }, [fetchMe, me, dispatch]);

    useLocationChange(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        if (!tokenStore.getAccessToken()) {
            dispatch(meAsync.cancel(""));
        }
    }, [dispatch]);

    return (
        <Switch>
            {routes.map(({ isPrivate, restricted = false, path, component, exact }) => {
                const Route = isPrivate ? PrivateRoute : PublicRoute;
                return <Route key={path?.toString()} path={path} component={component} exact={exact} restricted={restricted} />;
            })}
        </Switch>
    );
};

export default AppRouter;
