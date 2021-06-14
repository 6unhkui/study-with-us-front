import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import { isProd } from "@/constants";
import rootReducer, { rootSaga } from "@/store";

const sagaMiddleware = createSagaMiddleware();

const enhancer = isProd ? compose(applyMiddleware(sagaMiddleware)) : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));
const store = createStore(rootReducer, enhancer);

sagaMiddleware.run(rootSaga);

interface ReduxStoreProviderProps {}

const ReduxStoreProvider: React.FC<ReduxStoreProviderProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxStoreProvider;
