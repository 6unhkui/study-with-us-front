import produce from 'immer';

const initialState = {
    loadingMembers : false,
    members : [],
    hasMoreMembers : false,
};


// Actions
export const LOAD_MEMBERS_REQUEST = 'LOAD_MEMBERS_REQUEST';
export const LOAD_MEMBERS_SUCCESS = 'LOAD_MEMBERS_SUCCESS';
export const LOAD_MEMBERS_FAILURE = 'LOAD_MEMBERS_FAILURE';


const member = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_MEMBERS_REQUEST : {
                draft.loadingMembers = true;
                break;
            }
            case LOAD_MEMBERS_SUCCESS : {
                if(action.first) {
                    draft.members = action.data;
                }else {
                    action.data.forEach((d) => {
                        draft.members.push(d);
                    });
                }
                draft.hasMoreMembers = !action.last;
                draft.loadingMembers = false;
                break;
            }
            case LOAD_MEMBERS_FAILURE : {
                draft.loadingMembers = false;
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default member;