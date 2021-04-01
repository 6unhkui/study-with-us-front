import { all, fork, takeEvery, put, call } from "redux-saga/effects";
import { LOAD_CATEGORIES_REQUEST, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAILURE } from "store/modules/category";
import { http } from "utils/httpHandler";

function loadCategoriesAPI() {
    return http.get(`/api/v1/categories`);
}

function* loadCategories() {
    try {
        const {
            data: { data }
        } = yield call(loadCategoriesAPI);
        yield put({
            type: LOAD_CATEGORIES_SUCCESS,
            data
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: LOAD_CATEGORIES_FAILURE,
            error: e
        });
    }
}

function* watchLoadCategories() {
    yield takeEvery(LOAD_CATEGORIES_REQUEST, loadCategories);
}

export default function* categorySaga() {
    yield all([fork(watchLoadCategories)]);
}
