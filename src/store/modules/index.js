import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

import account from './account';
import category from "./category"
import room from "./room";
import post from "./post";
import member from "./member";

// persist config
const persistConfig = {
  key: 'myApp',
  storage, // 로컬 스토리지에 저장
  whitelist: ["account"], // 대상이 되는 리듀서
  transforms: [
    createWhitelistFilter(
        'account',
        ['me.accountId', 'me.name', 'me.profileImg']
    ), // account 리듀서에 저장된 유저 정보중 accountId, name, profileImg만 persist 대상으로 설정한다.
  ],
};

// 리듀서를 모두 결합하고
const rootReducer = combineReducers({
  account,
  category,
  room,
  post,
  member
});

export default persistReducer(persistConfig, rootReducer);