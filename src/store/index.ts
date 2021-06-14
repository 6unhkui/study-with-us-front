import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import category, { categorySagas } from "@/store/category";
import account, { accountSagas } from "@/store/account";
import room, { roomSagas } from "@/store/room";
import member, { memberSagas } from "@/store/member";
import post, { postSagas } from "@/store/post";
import chat, { chatSagas } from "@/store/chat";
import attendance, { attendanceSagas } from "@/store/attendance";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const rootReducer = combineReducers({
    category,
    account,
    room,
    member,
    post,
    chat,
    attendance
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([categorySagas(), accountSagas(), roomSagas(), memberSagas(), postSagas(), chatSagas(), attendanceSagas()]);
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
