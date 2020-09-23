import { all, call } from 'redux-saga/effects';
import account from './account';
import category from "./category";
import room from "./room";

export default function* rootSaga() {
    yield all([
        call(account),
        call(category),
        call(room)
    ])
}