import { RecevieMessageDTO, ChatMemberDTO } from "@/api/dto/chat.dto";
import { asyncStateInit } from "@/utils/reducerUtils";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import { GET_CHAT_HISTORY, ADD_CHAT_MESSAGE, GET_CURRENT_CHAT_MEMBER_LIST } from "./actions";
import { ChatAction, ChatState } from "./types";

const initalState: ChatState = {
    history: asyncStateInit,
    chatMemberList: asyncStateInit
};

const chatReducer = createReducer<ChatState, ChatAction>(initalState, {
    [GET_CHAT_HISTORY.REQUEST]: produce(({ history: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_CHAT_HISTORY.SUCCESS]: produce(({ history: state }, action) => {
        state.loading = false;
        state.data = action.payload as RecevieMessageDTO[];
        state.error = null;
    }),
    [GET_CHAT_HISTORY.FAILURE]: produce(({ history: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [GET_CURRENT_CHAT_MEMBER_LIST.REQUEST]: produce(({ chatMemberList: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_CURRENT_CHAT_MEMBER_LIST.SUCCESS]: produce(({ chatMemberList: state }, action) => {
        state.loading = false;
        state.data = action.payload as ChatMemberDTO[];
        state.error = null;
    }),
    [GET_CURRENT_CHAT_MEMBER_LIST.FAILURE]: produce(({ chatMemberList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [ADD_CHAT_MESSAGE]: produce(({ history: state }, action) => {
        if (state.data) {
            state.data.push(action.payload as RecevieMessageDTO);
        }
    })
});

export default chatReducer;
