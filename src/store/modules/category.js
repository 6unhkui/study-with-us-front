import produce from "immer";

const initialState = {
    categories: [],
    loadingCategories: false
};

// Actions
export const LOAD_CATEGORIES_REQUEST = "LOAD_CATEGORIES_REQUEST";
export const LOAD_CATEGORIES_SUCCESS = "LOAD_CATEGORIES_SUCCESS";
export const LOAD_CATEGORIES_FAILURE = "LOAD_CATEGORIES_FAILURE";

const category = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case LOAD_CATEGORIES_REQUEST: {
                draft.categories = [];
                draft.loadingCategories = true;
                break;
            }
            case LOAD_CATEGORIES_SUCCESS: {
                draft.categories = action.data;
                draft.loadingCategories = false;
                break;
            }
            case LOAD_CATEGORIES_FAILURE: {
                draft.loadingCategories = false;
                break;
            }
            default: {
                break;
            }
        }
    });

export default category;
