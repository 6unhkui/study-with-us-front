import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { BackTop } from "antd";
import Loading from "components/Loading";
import { CommonRouter } from "routes";
import { enableES5 } from "immer";
import { NavBar, Footer } from "./components/layout";

import "./assets/css/index.less";
import "./i18n";

enableES5();

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Router>
                <NavBar />
                <main>
                    <Switch>{CommonRouter}</Switch>
                </main>
                <Footer />
                <BackTop />
            </Router>
        </Suspense>
    );
}

export default App;
