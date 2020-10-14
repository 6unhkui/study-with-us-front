import { applyMiddleware, createStore, compose } from 'redux';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './modules';
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const enhancer =
    process.env.NODE_ENV === "production"
        ? compose(applyMiddleware(sagaMiddleware))
        : composeWithDevTools(applyMiddleware(sagaMiddleware, logger));

export const store = createStore(
    rootReducer,
    enhancer
);

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default { store, persistor };