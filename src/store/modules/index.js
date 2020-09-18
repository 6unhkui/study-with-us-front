import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineReducers } from 'redux';
import account from './account';

// 새로고침시 저장된 상태를 유지하도록 Redux Persist 라이브러리를 사용해 상태를 캐시에 저장한다.
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

// 리듀서를 모두 결합하고
const rootReducer = combineReducers({
  account,
});

// persistReducer에 리듀서를 넣는다.
const enhancedRootReducer = persistReducer(persistConfig, rootReducer);

export default createStore(enhancedRootReducer, composeWithDevTools());