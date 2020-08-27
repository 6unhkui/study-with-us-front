import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Header, Footer} from "./components/layout";
import Auth from './hoc/auth';

import NotFoundPage from './pages/NotFoundPage';

import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import OAuth2RedirectHandler from "components/oauth2/OAuth2RedirectHandler";
import RegisterPage from './pages/RegisterPage';

import MypagePage from './pages/MypagePage';


function App() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Router>
          <Header/>
          <Switch>
            <Route path='/' exact component={Auth(MainPage, null)} />
            <Route path="/login" exact component={Auth(LoginPage, false)} />
            <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />
            
            <Route path="/register" component={Auth(RegisterPage, false)} />

            <Route path="/mypage" component={Auth(MypagePage, true)} />

            <Route component={Auth(NotFoundPage)} />
          </Switch>
          <Footer/>
      </Router>
    </Suspense>
  );
}

export default App;
