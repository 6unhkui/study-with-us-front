import produce from "immer";

const initialState = {
    loadingChatMembers: false,
    chatMembers: [],
    loadingMessageHistory: false,
    chatMessages: []
};

// Actions
export const LOAD_MESSAGE_HISTORY_REQUEST = "LOAD_MESSAGE_HISTORY_REQUEST";
export const LOAD_MESSAGE_HISTORY_SUCCESS = "LOAD_MESSAGE_HISTORY_SUCCESS";
export const LOAD_MESSAGE_HISTORY_FAILURE = "LOAD_MESSAGE_HISTORY_FAILURE";

export const LOAD_CURRENT_CHAT_MEMBERS_REQUEST = "LOAD_CURRENT_CHAT_MEMBERS_REQUEST";
export const LOAD_CURRENT_CHAT_MEMBERS_SUCCESS = "LOAD_CURRENT_CHAT_MEMBERS_SUCCESS";
export const LOAD_CURRENT_CHAT_MEMBERS_FAILURE = "LOAD_CURRENT_CHAT_MEMBERS_FAILURE";

export const ADD_CHAT_MESSAGE = "ADD_CHAT_MESSAGE";

const member = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case LOAD_CURRENT_CHAT_MEMBERS_REQUEST: {
                draft.loadingChatMembers = true;
                break;
            }
            case LOAD_CURRENT_CHAT_MEMBERS_SUCCESS: {
                draft.loadingChatMembers = false;
                draft.chatMembers = action.data;
                break;
            }
            case LOAD_CURRENT_CHAT_MEMBERS_FAILURE: {
                draft.loadingChatMembers = false;
                break;
            }
            case LOAD_MESSAGE_HISTORY_REQUEST: {
                draft.loadingMessageHistory = true;
                break;
            }
            case LOAD_MESSAGE_HISTORY_SUCCESS: {
                draft.loadingMessageHistory = false;
                draft.chatMessages = action.data;
                break;
            }
            case LOAD_MESSAGE_HISTORY_FAILURE: {
                draft.loadingMessageHistory = false;
                break;
            }
            case ADD_CHAT_MESSAGE: {
                draft.chatMessages.push(action.data);
                break;
            }
            default: {
                break;
            }
        }
    });

export default member;
