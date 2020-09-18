export const LOAD_ACCOUNT = "account/LOAD_ACCOUNT";
export const LOAD_ACCOUNT_SUCCESS = "account/LOAD_ACCOUNT_SUCCESS";
export const LOAD_ACCOUNT_FAIL = "account/LOAD_ACCOUNT_FAIL";

export const CHANGE_ACCOUNT = "account/CHANGE_ACCOUNT";
export const CHANGE_NAME = "account/CHANGE_NAME";
export const CHANGE_PROFILE_IMG = "account/CHANGE_PROFILE_IMG";

const initialState = {
    name: "",
    profileImg : ""
};

const account = (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_ACCOUNT:
        return {
          ...state,
          name: action.payload.name,
          profileImg: action.payload.profileImg
        };
      case CHANGE_NAME:
        return {
          ...state,
          name: action.payload.name
        };
      case CHANGE_PROFILE_IMG:
        return {
          ...state,
          profileImg: action.payload.profileImg
        };
      default:
        return state;
    }
};

export default account;