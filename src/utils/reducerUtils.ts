import { AsyncActionCreatorBuilder, createAsyncAction } from "typesafe-actions";
import { call, put } from "@redux-saga/core/effects";

export const asyncStateInit = {
    data: null,
    loading: false,
    error: null
};

export type AsyncState<T, E = any> = {
    data: T | null;
    loading: boolean;
    error: E | null;
};

export type AsyncAction = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    RESET: string;
};

export type PromiseCreatorFunction<P, T> = ((payment: P) => Promise<T>) | (() => Promise<T>);

export const createAsyncActionType = (actionName: string): AsyncAction => {
    const asyncTypeAction: string[] = ["_REQUEST", "_SUCCESS", "_FAILURE", "_RESET"];

    return {
        REQUEST: actionName + asyncTypeAction[0],
        SUCCESS: actionName + asyncTypeAction[1],
        FAILURE: actionName + asyncTypeAction[2],
        RESET: actionName + asyncTypeAction[3]
    };
};

export const createActionEntity = <R, S, F, C = any>(asyncAction: AsyncAction) =>
    createAsyncAction(asyncAction.REQUEST, asyncAction.SUCCESS, asyncAction.FAILURE, asyncAction.RESET)<R, S, F, C>();

export function createAsyncSaga<RequestType, RequestPayload, SuccessType, SuccessPayload, FailureType, FailurePayload>(
    asyncAction: AsyncActionCreatorBuilder<
        [RequestType, [RequestPayload, undefined]],
        [SuccessType, [SuccessPayload, undefined]],
        [FailureType, [FailurePayload, undefined]]
    >,
    asyncFunction: PromiseCreatorFunction<RequestPayload, SuccessPayload>,
    successFunc?: any,
    failureFunc?: any
) {
    return function* saga(action: ReturnType<typeof asyncAction.request>) {
        try {
            const result: SuccessPayload = yield call(asyncFunction, (action as any).payload);
            yield put(asyncAction.success(result));
            if (successFunc) {
                yield call(successFunc, result);
            }
        } catch (err) {
            yield put(asyncAction.failure(err.response ? err.response.data.message : err));
            if (failureFunc) {
                yield call(successFunc, err);
            }
        }
    };
}
