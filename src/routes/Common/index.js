import React from 'react';
import { Route } from "react-router-dom";

import Auth from 'hoc/auth';

import NotFound from 'pages/NotFound';

import Main from 'pages/Main';
import LoginPage from 'pages/Login';
import OAuth2RedirectHandler from "containers/OAuth2RedirectHandler";
import Register from 'pages/Register';
import ForgotPassword from 'pages/ForgotPassword';

import MyAccount from 'pages/MyAccount';

import MyStudyRoom from 'pages/MyStudyRoom';
import CreateStudyRoom from 'pages/CreateStudyRoom';

import RoomDetail from 'pages/RoomDetail';
import CreatePost from 'pages/CreatePost';
import Chatting from "pages/Chatting";
import RoomSetting from 'pages/RoomSetting';

import PostView from 'pages/PostView';
import EditPost from "pages/EditPost";

import NewsFeed from 'pages/NewsFeed';

import Search from 'pages/Search';
import RoomsByCategory from 'pages/RoomsByCategory';


export default [
    <Route path='/' exact component={Auth(Main, null)} />,
    <Route path="/login" exact component={Auth(LoginPage, false)} />,
    <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />,
    <Route path="/register" component={Auth(Register, false)} />,
    <Route path="/forgot-password" component={Auth(ForgotPassword, false)} />,

    <Route path="/account" component={Auth(MyAccount, true)} />,

    <Route path="/user/room" component={Auth(MyStudyRoom, true)} />,

    <Route path="/room/create" component={Auth(CreateStudyRoom, true)} />,

    <Route path="/room/:id/post/create" component={Auth(CreatePost, true)} />,
    <Route path="/room/:id/setting" component={Auth(RoomSetting, true)} />,
    <Route path="/room/:id/chatting" component={Auth(Chatting, true)} />,
    <Route path="/room/:id" component={Auth(RoomDetail, true)} />,

    <Route path="/post/:id/edit" component={Auth(EditPost, true)} />,
    <Route path="/post/:id" component={Auth(PostView, true)} />,

    <Route path="/feed" component={Auth(NewsFeed, true)} />,
    
    <Route path="/search" exact component={Auth(Search, null)} />,
    <Route path="/search/category/:id" component={Auth(RoomsByCategory, null)} />,

    <Route component={Auth(NotFound)} />
];