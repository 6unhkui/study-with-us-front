import { all, fork, takeLatest } from "redux-saga/effects";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { ChatAPI } from "@/api/chat.api";
import { getChatHistoryAsync, GET_CHAT_HISTORY, GET_CURRENT_CHAT_MEMBER_LIST, getCurrentChatMemeberListAsync } from "./actions";

const chatHistorySaga = createAsyncSaga(getChatHistoryAsync, ChatAPI.getHistory);
function* watchChatHistorySaga() {
    yield takeLatest(GET_CHAT_HISTORY.REQUEST, chatHistorySaga);
}

const currentChatMemeberListSaga = createAsyncSaga(getCurrentChatMemeberListAsync, ChatAPI.getCurrentChatMembers);
function* watchCurrentChatMembersSaga() {
    yield takeLatest(GET_CURRENT_CHAT_MEMBER_LIST.REQUEST, currentChatMemeberListSaga);
}

export function* chatSagas() {
    yield all([fork(watchChatHistorySaga), fork(watchCurrentChatMembersSaga)]);
}
