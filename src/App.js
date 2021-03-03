import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch} from "react-router-dom";
import {NavBar, Footer} from "./components/layout";
import { BackTop } from 'antd';

import Loading from "components/Loading";

import {CommonRouter} from 'routes';

function App() {
  return (
    <Suspense fallback={<Loading/>}>
      <Router>
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
