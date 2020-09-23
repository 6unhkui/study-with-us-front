import produce from 'immer';

const initialState = {
    me : {
        accountId : 0,
        email : '',
        name : '',
        profileImg : '',
        provider : ''
    },

    isLoggedIn : false, // 로그인 여부
    isLoggingIn : false, // 로그인 시도중
    logInErrorReason : '', // 로그인 실패 사유

    // isLoggingOut : false, // 로그아웃 시도중

    isRegistered : false, // 회원가입 성공
    isRegistering : false, // 회원가입 시도중
    registerErrorReason : '', // 회원가입 실패 사유

    isRememberMe : false,

    isUploadingProfile : false,
    uploadProfileErrorReason: '',
};


// Actions
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const CHECK_DUPLICATED_ACCOUNT_REQUEST = 'CHECK_DUPLICATED_ACCOUNT_REQUEST';
export const CHECK_DUPLICATED_ACCOUNT_SUCCESS = 'CHECK_DUPLICATED_ACCOUNT_SUCCESS';
export const CHECK_DUPLICATED_ACCOUNT_FAILURE = 'CHECK_DUPLICATED_ACCOUNT_FAILURE';

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT = 'LOG_OUT';

export const REMEMBER_ME = 'REMEMBER_ME';

export const LOAD_ACCOUNT_REQUEST = 'LOAD_ACCOUNT_REQUEST';
export const LOAD_ACCOUNT_SUCCESS = 'LOAD_ACCOUNT_SUCCESS';
export const LOAD_ACCOUNT_FAILURE = 'LOAD_ACCOUNT_FAILURE';


export const UPLOAD_PROFILE_REQUEST = 'UPLOAD_PROFILE_REQUEST';
export const UPLOAD_PROFILE_SUCCESS = 'UPLOAD_PROFILE_SUCCESS';
export const UPLOAD_PROFILE_FAILURE = 'UPLOAD_PROFILE_FAILURE';



const account = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            // 로그인 ////////////////////
             case LOG_IN_REQUEST : {
                draft.isLoggingIn = true;
                draft.logInErrorReason = '';
                break;
            }
             case LOG_IN_SUCCESS : {
                draft.isLoggingIn = false;
                draft.isLoggedIn = true;
                break;
            }
            case LOG_IN_FAILURE: {
                draft.isLoggingIn = false;
                draft.isLoggedIn = false;
                draft.logInErrorReason = action.error;
                break;
             }
            case REMEMBER_ME : {
                draft.isRememberMe = action.data;
                break;
            }

            case LOG_OUT : {
                draft.me = {
                    accountId : 0,
                    email : '',
                    name : '',
                    profileImg : '',
                    provider : '',
                };
                break;
            }

            case LOAD_ACCOUNT_REQUEST : {
                 break;
            }
            case LOAD_ACCOUNT_SUCCESS : {
                draft.me = action.data;
                break;
            }
            case LOAD_ACCOUNT_FAILURE : {
                break;
             }

            // ////////////////////////////////
             case UPLOAD_PROFILE_REQUEST : {
                draft.isEditingProfile = true;
                draft.editProfileErrorReason = '';
                draft.me.profileImg = '';
                break;
            }
            case UPLOAD_PROFILE_SUCCESS : {
                draft.isEditingProfile = false;
                draft.me.profileImg = action.data;
                break;
            }
            case UPLOAD_PROFILE_FAILURE : {
                draft.isEditingProfile = false;
                draft.editProfileErrorReason = action.error;
                break;
            }

      // // 회원 가입 ////////////////////
      // case REGISTER_REQUEST :
      //     return {
      //         ...state,
      //         isRegistered : false,
      //         isRegistering: true,
      //         registerErrorReason: ''
      //     }
      // case REGISTER_SUCCESS :
      //     return {
      //         ...state,
      //         isRegistered : true,
      //         isRegistering: false,
      //     }
      // case REGISTER_FAILURE :
      //     return {
      //         ...state,
      //         isRegistered : false,
      //         registerErrorReason : action.error,
      //     }
      //
      // // 프로필 변경 ////////////////////
      // case EDIT_PROFILE_REQUEST :
      //     return {
      //         ...state,
      //         isEditingProfile: true,
      //         editProfileErrorReason: ''
      //     }
      // case EDIT_PROFILE_SUCCESS :
      //       return {
      //           ...state,
      //           isEditingProfile: false,
      //           me : {
      //               ...me,
      //               profileImg: action.data.profileImg
      //           }
      //       }
      // case EDIT_PROFILE_FAILURE :
      //     return {
      //         ...state,
      //         isEditingProfile: false,
      //         editProfileErrorReason: action.error
      //     }
        default: {
            break;
        }
    }
    });
};

export default account;