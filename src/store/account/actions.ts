import { ChangePasswordDTO, LoginDTO, RegisterDTO, UpdateUserDTO, UserDTO } from "@/api/dto/account.dto";
import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";
import { createAction } from "typesafe-actions";

// ---
// Action Type
const prefix = "account";
export const ME = createAsyncActionType(`${prefix}/ME`);
export const ME_RESET = `${prefix}/ME_RESET` as const;
export const LOGIN = createAsyncActionType(`${prefix}/LOGIN`);
export const LOGIN_RESET = `${prefix}/LOGIN_RESET` as const;
export const LOGOUT = `${prefix}/LOGOUT` as const;
export const REGISTER = createAsyncActionType(`${prefix}/REGISTER`);
export const CHANGE_PROFILE_IMAGE = createAsyncActionType(`${prefix}/CHANGE_PROFILE_IMAGE`);
export const UPDATE_ACCOUNT = createAsyncActionType(`${prefix}/UPDATE_ACCOUNT`);
export const CHANGE_PASSWORD = createAsyncActionType(`${prefix}/CHANGE_PASSWORD`);
export const WITHDRAW = createAsyncActionType(`${prefix}/WITHDRAW`);
export const RESET_ACCOUNT = `${prefix}/RESET_ACCOUNT` as const;

// ---
// Action Creator
export const meAsync = createActionEntity<any, UserDTO, AxiosError, any>(ME);
export const loginAsync = createActionEntity<LoginDTO, boolean, AxiosError, any>(LOGIN);
export const logout = createAction(LOGOUT)<any>();
export const registerAsync = createActionEntity<RegisterDTO, boolean, AxiosError, any>(REGISTER);
export const changeProfileImageAsync = createActionEntity<FormData, string, AxiosError>(CHANGE_PROFILE_IMAGE);
export const updateAccountAsync = createActionEntity<UpdateUserDTO, UpdateUserDTO, AxiosError, any>(UPDATE_ACCOUNT);
export const changePasswordAsync = createActionEntity<ChangePasswordDTO, boolean, AxiosError, any>(CHANGE_PASSWORD);
export const withdrawAsync = createActionEntity<any, boolean, AxiosError>(WITHDRAW);
