import { all, call } from 'redux-saga/effects';
import account from './account';
import category from "./category";
import room from "./room";
import member from "./member";
import post from "./post";
import chat from "./chat";

export default function* rootSaga() {
    yield all([
        call(account),
        call(category),
        call(room),
        call(member),
        call(post),
        call(chat)
    ])
}