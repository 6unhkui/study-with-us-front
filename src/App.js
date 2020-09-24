import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import {NavBar, Footer} from "./components/Layout";
import { BackTop } from 'antd';

import Loading from "components/Loading";

import {CommonRouter} from 'routes';

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router onUpdate={() => window.scrollTo(0, 0)} >
          <NavBar/>
          <Switch>
            {CommonRouter}
          </Switch>
          <Footer/>
          <BackTop/>
      </Router>
    </Suspense>
  );
}

export default App;
