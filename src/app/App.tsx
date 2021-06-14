import React, { Suspense } from "react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import "reset-css";
import "antd/dist/antd.css";
import "@/styles/_global.less";

import "@/i18nConfig";

import Layout from "@/components/Layout";
import AppRouter from "@/app/AppRouter";
import ReduxStoreProvider from "@/app/ReduxStoreProvider";
import Loading from "@/components/Loading";

export const customHistory = createBrowserHistory();

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <ReduxStoreProvider>
            <Router history={customHistory}>
                <Suspense fallback={<Loading />}>
                    <Layout>
                        <AppRouter />
                    </Layout>
                </Suspense>
            </Router>
        </ReduxStoreProvider>
    );
};

export default App;
