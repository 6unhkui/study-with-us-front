import React from 'react';
import { Route} from "react-router-dom";

import Auth from 'hoc/auth';

import NotFoundPage from 'pages/NotFoundPage';

import MainPage from 'pages/MainPage';
import LoginPage from 'pages/LoginPage';
import OAuth2RedirectHandler from "components/OAuth2/OAuth2RedirectHandler";
import RegisterPage from 'pages/RegisterPage';
import ForgotPasswordPage from 'pages/ForgotPasswordPage';

import MyAccountPage from 'pages/MyAccountPage';

import MyStudyRoomPage from 'pages/MyStudyRoomPage';
import CreateStudyRoomPage from 'pages/CreateStudyRoomPage';

import StudyRoomPage from 'pages/RoomDetailPage';
import CreatePostPage from 'pages/CreatePostPage';
import EditRoomPage from 'pages/EditRoomPage';


import NewsFeedPage from 'pages/NewsFeedPage';

import SearchPage from 'pages/SearchPage';
import SearchByCategoryPage from 'pages/SearchByCategoryPage';


export default [
    <Route path='/' exact component={Auth(MainPage, null)} />,
    <Route path="/login" exact component={Auth(LoginPage, false)} />,
    <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />,
    <Route path="/register" component={Auth(RegisterPage, false)} />,
    <Route path="/forgot-password" component={Auth(ForgotPasswordPage, false)} />,

    <Route path="/account" component={Auth(MyAccountPage, true)} />,

    <Route path="/user/room" component={Auth(MyStudyRoomPage, true)} />,

    <Route path="/room/create" component={Auth(CreateStudyRoomPage, true)} />,

    <Route path="/room/:id/post/create" component={Auth(CreatePostPage, true)} />,
    <Route path="/room/:id/edit" component={Auth(EditRoomPage, true)} />,
    <Route path="/room/:id" component={Auth(StudyRoomPage, true)} />,

    <Route path="/feed" component={Auth(NewsFeedPage, true)} />,
    
    <Route path="/search" exact component={Auth(SearchPage, null)} />,
    <Route path="/search/category/:id" component={Auth(SearchByCategoryPage, null)} />,

    <Route component={Auth(NotFoundPage)} />
];