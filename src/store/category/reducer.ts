import { asyncStateInit } from "@/utils/reducerUtils";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import { GET_CATEGORY_LIST } from "./actions";
import { CategoryAction, CategoryState } from "./types";

const initalState: CategoryState = {
    categoryList: asyncStateInit
};

const category = createReducer<CategoryState, CategoryAction>(initalState, {
    [GET_CATEGORY_LIST.REQUEST]: produce(({ categoryList: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_CATEGORY_LIST.SUCCESS]: produce(({ categoryList: state }, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
    }),
    [GET_CATEGORY_LIST.FAILURE]: produce(({ categoryList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    })
});

export default category;
