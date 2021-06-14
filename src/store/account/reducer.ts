import { UpdateUserDTO, UserDTO } from "@/api/dto/account.dto";
import { asyncStateInit } from "@/utils/reducerUtils";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import {
    CHANGE_PASSWORD,
    CHANGE_PROFILE_IMAGE,
    LOGIN,
    LOGOUT,
    ME,
    REGISTER,
    RESET_ACCOUNT,
    UPDATE_ACCOUNT,
    WITHDRAW
} from "./actions";
import { AccountAction, AccountState } from "./types";

const initalState: AccountState = {
    me: asyncStateInit,
    login: asyncStateInit,
    register: asyncStateInit,
    changeProfileImage: asyncStateInit,
    updateAccount: asyncStateInit,
    changePassword: asyncStateInit,
    withdraw: asyncStateInit
};

const accountReducer = createReducer<AccountState, AccountAction>(initalState, {
    [LOGIN.REQUEST]: produce(({ login: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [LOGIN.SUCCESS]: produce(({ login: state }, action) => {
        state.loading = false;
        state.data = action.payload as boolean;
        state.error = null;
    }),
    [LOGIN.FAILURE]: produce(({ login: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [LOGIN.RESET]: produce(({ login: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [LOGOUT]: produce(({ me: state }) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [ME.REQUEST]: produce(({ me: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [ME.SUCCESS]: produce(({ me: state }, action) => {
        state.loading = false;
        state.data = action.payload as UserDTO;
        state.error = null;
    }),
    [ME.FAILURE]: produce(({ me: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [ME.RESET]: produce(({ me: state }) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [REGISTER.REQUEST]: produce(({ register: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [REGISTER.SUCCESS]: produce(({ register: state }, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    }),
    [REGISTER.FAILURE]: produce(({ register: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),
    [REGISTER.RESET]: produce(({ register: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_PROFILE_IMAGE.REQUEST]: produce(({ changeProfileImage: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_PROFILE_IMAGE.SUCCESS]: produce(({ changeProfileImage, me }, action) => {
        changeProfileImage.loading = false;
        changeProfileImage.data = true;
        changeProfileImage.error = null;

        if (me.data) {
            me.data.profileImg = action.payload as string;
        }
    }),
    [CHANGE_PROFILE_IMAGE.FAILURE]: produce(({ changeProfileImage: state }, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload;
    }),
    [UPDATE_ACCOUNT.REQUEST]: produce(({ updateAccount: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [UPDATE_ACCOUNT.SUCCESS]: produce(({ updateAccount, me }, action) => {
        updateAccount.loading = false;
        updateAccount.data = true;
        updateAccount.error = null;

        if (me.data) {
            me.data.name = (action.payload as UpdateUserDTO).name;
        }
    }),
    [UPDATE_ACCOUNT.FAILURE]: produce(({ updateAccount: state }, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload;
    }),
    [UPDATE_ACCOUNT.RESET]: produce(({ updateAccount: state }) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_PASSWORD.REQUEST]: produce(({ changePassword: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [CHANGE_PASSWORD.SUCCESS]: produce(({ changePassword: state }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;
    }),
    [CHANGE_PASSWORD.FAILURE]: produce(({ changePassword: state }, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload;
    }),
    [CHANGE_PASSWORD.RESET]: produce(({ changePassword: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [WITHDRAW.SUCCESS]: produce(({ withdraw: state, me }, action) => {
        state.loading = false;
        state.data = true;
        state.error = null;

        me.data = null;
    }),
    [WITHDRAW.FAILURE]: produce(({ withdraw: state }, action) => {
        state.loading = false;
        state.data = false;
        state.error = action.payload;
    }),
    [WITHDRAW.RESET]: produce(({ withdraw: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = null;
    }),
    [RESET_ACCOUNT]: () => ({ ...initalState })
});

export default accountReducer;
