import React, { lazy } from "react";
import { Route } from "react-router-dom";
import Auth from "hoc/auth";

const NotFound = lazy(() => import("pages/NotFound"));
const Main = lazy(() => import("pages/Main"));
const LoginPage = lazy(() => import("pages/Login"));
const OAuth2RedirectHandler = lazy(() => import("pages/OAuth2RedirectHandler"));
const Register = lazy(() => import("pages/Register"));
const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
const MyAccount = lazy(() => import("pages/MyAccount"));
const MyRooms = lazy(() => import("pages/MyRooms"));
const CreateStudyRoom = lazy(() => import("pages/CreateRoom"));
const RoomDetail = lazy(() => import("pages/RoomDetail"));
const CreatePost = lazy(() => import("pages/CreatePost"));
const Chatting = lazy(() => import("pages/Chatting"));
const RoomSetting = lazy(() => import("pages/RoomSetting"));
const PostView = lazy(() => import("pages/PostView"));
const EditPost = lazy(() => import("pages/EditPost"));
const NewsFeed = lazy(() => import("pages/NewsFeed"));
const SearchRoom = lazy(() => import("pages/SearchRoom"));

export default [
    <Route path="/" exact component={Auth(Main, null)} />,
    <Route path="/login" exact component={Auth(LoginPage, false)} />,
    <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />,
    <Route path="/register" component={Auth(Register, false)} />,
    <Route path="/forgot-password" component={Auth(ForgotPassword, false)} />,

    <Route path="/account" component={Auth(MyAccount, true)} />,

    <Route path="/user/rooms" component={Auth(MyRooms, true)} />,

    <Route path="/room/create" component={Auth(CreateStudyRoom, true)} />,

    <Route path="/room/:id/post/create" component={Auth(CreatePost, true)} />,
    <Route path="/room/:id/setting" component={Auth(RoomSetting, true)} />,
    <Route path="/room/:id/chatting" component={Auth(Chatting, true)} />,
    <Route path="/room/:id" component={Auth(RoomDetail, true)} />,

    <Route path="/post/:id/edit" component={Auth(EditPost, true)} />,
    <Route path="/post/:id" component={Auth(PostView, true)} />,

    <Route path="/feed" component={Auth(NewsFeed, true)} />,

    <Route path="/search" exact component={Auth(SearchRoom, null)} />,

    <Route component={Auth(NotFound)} />
];
