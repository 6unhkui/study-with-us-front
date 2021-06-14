import { all, fork, takeEvery } from "redux-saga/effects";
import { CategoryAPI } from "@/api/category.api";
import { createAsyncSaga } from "@/utils/reducerUtils";
import { getCategoryListAsync, GET_CATEGORY_LIST } from "./actions";

const getCategoryListSaga = createAsyncSaga(getCategoryListAsync, CategoryAPI.getAll);
function* watchGetCategoryList() {
    yield takeEvery(GET_CATEGORY_LIST.REQUEST, getCategoryListSaga);
}

export function* categorySagas() {
    yield all([fork(watchGetCategoryList)]);
}
