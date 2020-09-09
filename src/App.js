import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {NavBar, Footer} from "./components/Layout";
import { BackTop } from 'antd';

import Auth from './hoc/auth';

import Loading from "components/Loading";

import NotFoundPage from './pages/NotFoundPage';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import OAuth2RedirectHandler from "components/OAuth2/OAuth2RedirectHandler";
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

import MypagePage from './pages/MypagePage';

import MyStudyRoomPage from './pages/MyStudyRoomPage';
import CreateStudyRoomPage from './pages/CreateStudyRoomPage';
import StudyRoomPage from './pages/RoomDetailPage';

import NewFeedPage from './pages/NewFeedPage';
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router>
          <NavBar/>
          <Switch>
            <Route path='/' exact component={Auth(MainPage, null)} />
            <Route path="/login" exact component={Auth(LoginPage, false)} />
            <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />
            <Route path="/register" component={Auth(RegisterPage, false)} />
            <Route path="/forgot-password" component={Auth(ForgotPasswordPage, false)} />

            <Route path="/mypage" component={Auth(MypagePage, true)} />

            <Route path="/user/room" component={Auth(MyStudyRoomPage, true)} />

            <Route path="/room/create" component={Auth(CreateStudyRoomPage, true)} />
            <Route path="/room/:idx" component={Auth(StudyRoomPage, true)} />

            <Route path="/feed" component={Auth(NewFeedPage, true)} />
            
            <Route path="/search" component={Auth(SearchPage, null)} />

            <Route component={Auth(NotFoundPage)} />
          </Switch>
          <Footer/>
          <BackTop/>
      </Router>
    </Suspense>
  );
}

export default App;
