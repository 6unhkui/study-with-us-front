import { ChatMemberDTO, RecevieMessageDTO } from "@/api/dto/chat.dto";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";
import { createAction } from "typesafe-actions";

// ---
// Action Type
const prefix = "chat";
export const GET_CHAT_HISTORY = createAsyncActionType(`${prefix}/GET_CHAT_HISTORY`);
export const GET_CURRENT_CHAT_MEMBER_LIST = createAsyncActionType(`${prefix}/GET_CURRENT_CHAT_MEMBER_LIST`);
export const ADD_CHAT_MESSAGE = `${prefix}/ADD_CHAT_MESSAGE` as const;

// ---
// Action Creator
export const getChatHistoryAsync = createActionEntity<number, RecevieMessageDTO[], AxiosError>(GET_CHAT_HISTORY);
export const getCurrentChatMemeberListAsync =
    createActionEntity<number, ChatMemberDTO[], AxiosError>(GET_CURRENT_CHAT_MEMBER_LIST);
export const addChatMessage = createAction(ADD_CHAT_MESSAGE)<RecevieMessageDTO>();
