import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import {Header, Footer} from "../src/components/common";
import Auth from './hoc/auth';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import OAuth2RedirectHandler from "components/oauth2/OAuth2RedirectHandler";
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
      <Router>
          <Header/>
          <Route path='/' exact component={Auth(MainPage, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/login/oauth2/redirect" component={Auth(OAuth2RedirectHandler, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Footer/>
      </Router>
  );
}

export default App;
