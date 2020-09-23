import produce from 'immer';

const initialState = {
    categories : []
};


// Actions
export const LOAD_CATEGORIES_REQUEST = 'LOAD_CATEGORIES_REQUEST';
export const LOAD_CATEGORIES_SUCCESS = 'LOAD_CATEGORIES_SUCCESS';
export const LOAD_CATEGORIES_FAILURE = 'LOAD_CATEGORIES_FAILURE';


const category = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_CATEGORIES_REQUEST : {
                draft.categories = [];
                break;
            }
            case LOAD_CATEGORIES_SUCCESS : {
                draft.categories = action.data;
                break;
            }
            case LOAD_CATEGORIES_FAILURE : {
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default category;