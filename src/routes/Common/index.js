import React from 'react';
import { Route} from "react-router-dom";

import Auth from 'hoc/auth';

import NotFoundPage from 'pages/NotFoundPage';

import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import OAuth2RedirectHandler from "components/OAuth2/OAuth2RedirectHandler";
import RegisterPage from 'pages/RegisterPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';

import MypagePage from 'pages/MypagePage';

import MyStudyRoomPage from 'pages/MyStudyRoomPage';
import CreateStudyRoomPage from 'pages/CreateStudyRoomPage';

import StudyRoomPage from 'pages/RoomDetailPage';
import CreatePostPage from 'pages/CreatePostPage';

import NewFeedPage from 'pages/NewFeedPage';
import SearchPage from 'pages/SearchPage';


export default [
    <Route path='/' exact component={Auth(MainPage, null)} />,
    <Route path="/login" exact component={Auth(LoginPage, false)} />,
    <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />,
    <Route path="/register" component={Auth(RegisterPage, false)} />,
    <Route path="/forgot-password" component={Auth(ForgotPasswordPage, false)} />,

    <Route path="/mypage" component={Auth(MypagePage, true)} />,

    <Route path="/user/room" component={Auth(MyStudyRoomPage, true)} />,

    <Route path="/room/create" component={Auth(CreateStudyRoomPage, true)} />,

    <Route path="/room/:idx" exact component={Auth(StudyRoomPage, true)} />,
    <Route path="/room/:idx/post/create" component={Auth(CreatePostPage, true)} />,

    <Route path="/feed" component={Auth(NewFeedPage, true)} />,
    
    <Route path="/search" component={Auth(SearchPage, null)} />,

    <Route component={Auth(NotFoundPage)} />
];