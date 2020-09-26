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

import StudyRoom from 'pages/RoomDetail';
import WritePost from 'pages/WritePost';
import SettingRoom from 'pages/SettingRoom';

import PostView from 'pages/PostView';

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

    <Route path="/room/:id/post/write" component={Auth(WritePost, true)} />,
    <Route path="/room/:id/setting" component={Auth(SettingRoom, true)} />,
    <Route path="/room/:id" component={Auth(StudyRoom, true)} />,

    <Route path="/post/:id" component={Auth(PostView, true)} />,

    <Route path="/feed" component={Auth(NewsFeed, true)} />,
    
    <Route path="/search" exact component={Auth(Search, null)} />,
    <Route path="/search/category/:id" component={Auth(RoomsByCategory, null)} />,

    <Route component={Auth(NotFound)} />
];