import produce from 'immer';

const initialState = {
    me : { // 현재 접속한 유저 정보
        accountId : 0,
        email : '',
        name : '',
        profileImg : '',
        provider : ''
    },

    isRegistered : false, // 회원가입 성공
    isRegistering : false, // 회원가입 시도중
    registerErrorReason : '', // 회원가입 실패 사유

    isDuplicateAccount : false,
    isCheckingAccountDuplication : false,

    isLoggedIn : false, // 로그인 여부
    isLoggingIn : false, // 로그인 시도중
    logInErrorReason : '', // 로그인 실패 사유

    isRememberMe : false,

    isUploadingProfile : false, // 프로필 이미지 업로드중
    uploadProfileErrorReason: '', // 프로필 이미지 업로드 실패 사유

    isEditingAccount : false, // 계정 정보 수정중
    editAccountErrorReason: '', // 수정 실패 사유

    isChangingPassword : false, // 비밀번호 변경중
    changePasswordErrorReason: '', // 비밀번호 변경 실패 사유

    isDeletingAccount : false, // 계정 삭제
    deleteAccountErrorReason: '', // 계정 삭제 실패 사유
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

export const EDIT_ACCOUNT_REQUEST = 'EDIT_ACCOUNT_REQUEST';
export const EDIT_ACCOUNT_SUCCESS = 'EDIT_ACCOUNT_SUCCESS';
export const EDIT_ACCOUNT_FAILURE = 'EDIT_ACCOUNT_FAILURE';

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST';
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS';
export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE';

export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';



const account = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {

            // 회원 가입 //////////////////////////////
            case REGISTER_REQUEST : {
                draft.isRegistered = false;
                draft.isRegistering = true;
                draft.registerErrorReason = '';
                break;
            }
            case REGISTER_SUCCESS : {
                draft.isRegistered = true;
                draft.isRegistering = false;
                break;
            }
            case REGISTER_FAILURE : {
                draft.isRegistered = false;
                draft.isRegistering = false;
                draft.registerErrorReason = action.error;
                break;
            }


            // 계정 중복 체크 //////////////////////////////
            case CHECK_DUPLICATED_ACCOUNT_REQUEST : {
                draft.isCheckingAccountDuplication = true;
                break;
            }
            case CHECK_DUPLICATED_ACCOUNT_SUCCESS : {
                draft.isCheckingAccountDuplication = false;
                draft.isDuplicateAccount = action.data;
                break;
            }
            case CHECK_DUPLICATED_ACCOUNT_FAILURE : {
                draft.isCheckingAccountDuplication = false;
                break;
            }

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
                action.meta.callbackAction();
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

            // 프로필 이미지 업로드 ////////////////////////////////
             case UPLOAD_PROFILE_REQUEST : {
                draft.isUploadingProfile = true;
                draft.uploadProfileErrorReason = '';
                draft.me.profileImg = '';
                break;
            }
            case UPLOAD_PROFILE_SUCCESS : {
                draft.isUploadingProfile = false;
                draft.me.profileImg = action.data;
                break;
            }
            case UPLOAD_PROFILE_FAILURE : {
                draft.isUploadingProfile = false;
                draft.uploadProfileErrorReason = action.error;
                break;
            }

            // 계정 정보 수정 //////////////////////////////
            case EDIT_ACCOUNT_REQUEST : {
                draft.isEditingAccount = true;
                draft.editAccountErrorReason = '';
                break;
            }
            case EDIT_ACCOUNT_SUCCESS : {
                draft.isEditingAccount = false;
                draft.me.name = action.data.name;
                break;
            }
            case EDIT_ACCOUNT_FAILURE : {
                draft.isEditingAccount = false;
                draft.editAccountErrorReason = action.error;
                break;
            }

            // 비밀번호 수정 //////////////////////////////
            case CHANGE_PASSWORD_REQUEST : {
                draft.isChangingPassword = true;
                draft.changePasswordErrorReason = '';
                break;
            }
            case CHANGE_PASSWORD_SUCCESS : {
                draft.isChangingPassword = false;
                break;
            }
            case CHANGE_PASSWORD_FAILURE : {
                draft.isChangingPassword = false;
                draft.changePasswordErrorReason = action.error;
                break;
            }

            // 계정 탈퇴 //////////////////////////////
            case DELETE_ACCOUNT_REQUEST : {
                draft.isDeletingAccount = true;
                draft.deleteAccountErrorReason = '';
                break;
            }
            case DELETE_ACCOUNT_SUCCESS : {
                draft.isDeletingAccount = false;
                draft.me = {
                    accountId : 0,
                    email : '',
                    name : '',
                    profileImg : '',
                    provider : '',
                };
                break;
            }
            case DELETE_ACCOUNT_FAILURE : {
                draft.isDeletingAccount = false;
                draft.deleteAccountErrorReason = action.error;
                break;
            }

            default: {
                break;
            }
    }
    });
};

export default account;