import OAuth2RedirectPage from "@/pages/OAuth2Redirect";
import { lazy } from "react";
import { RouteProps } from "react-router";

export interface Route extends RouteProps {
    isPrivate?: boolean;
    restricted?: boolean;
}

const appRoutes: Route[] = [
    { path: "/", component: lazy(() => import("@/pages/Main")), exact: true },
    { path: "/login", component: lazy(() => import("@/pages/Login")), restricted: true },
    { path: "/login/oauth2/redirect", component: OAuth2RedirectPage, restricted: true },
    { path: "/register", component: lazy(() => import("@/pages/Register")), restricted: true },
    { path: "/myrooms", component: lazy(() => import("@/pages/MyRooms")), isPrivate: true },
    { path: "/newsfeed", component: lazy(() => import("@/pages/NewsFeed")), isPrivate: true },
    { path: "/search", component: lazy(() => import("@/pages/Search")) },
    { path: "/room/create", component: lazy(() => import("@/pages/CreateRoom")), isPrivate: true },
    { path: "/room/:id/post/create", component: lazy(() => import("@/pages/CreatePost")), isPrivate: true },
    { path: "/room/:id/chatting", component: lazy(() => import("@/pages/Chatting")), isPrivate: true },
    { path: "/room/:id/settings", component: lazy(() => import("@/pages/RoomSettings")), isPrivate: true },
    { path: "/room/:id", component: lazy(() => import("@/pages/Room")), isPrivate: true },
    { path: "/post/:id/edit", component: lazy(() => import("@/pages/EditPost")), isPrivate: true },
    { path: "/post/:id", component: lazy(() => import("@/pages/Post")), isPrivate: true },
    { path: "/mypage", component: lazy(() => import("@/pages/MyPage")), isPrivate: true },
    { path: "*", component: lazy(() => import("@/pages/404")) }
];

export default appRoutes;
