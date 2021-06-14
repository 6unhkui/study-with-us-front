import { UserDTO } from "@/api/dto/account.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import {
    loginAsync,
    logout,
    meAsync,
    registerAsync,
    changeProfileImageAsync,
    updateAccountAsync,
    changePasswordAsync,
    withdrawAsync
} from "./actions";

export type AccountAction = ActionType<
    | typeof loginAsync
    | typeof meAsync
    | typeof logout
    | typeof registerAsync
    | typeof changeProfileImageAsync
    | typeof updateAccountAsync
    | typeof changePasswordAsync
    | typeof withdrawAsync
>;

export interface AccountState {
    me: AsyncState<UserDTO>;
    login: AsyncState<boolean>;
    register: AsyncState<boolean>;
    changeProfileImage: AsyncState<boolean>;
    updateAccount: AsyncState<boolean>;
    changePassword: AsyncState<boolean>;
    withdraw: AsyncState<boolean>;
}
