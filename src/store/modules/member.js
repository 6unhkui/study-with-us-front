import produce from "immer";

const initialState = {
    loadingMembers: false, // 멤버 리스트
    members: [],
    hasMoreMembers: false,

    loadingMemberDetail: false, // 멤버 상세 정보
    memberDetail: {},

    isDeletingMember: false, // 멤버 삭제
    deleteMemberErrorReason: "", // 멤버 삭제 실패 이유

    loadMyDetail: false, // 스터디방 내 정보
    me: {},

    isWithdrawing: false, // 탈퇴
    withdrawErrorReason: "",

    isChangeManager: false, // 매니저 변경
    changeManagerErrorReason: ""
};

// Actions
export const LOAD_MEMBERS_REQUEST = "LOAD_MEMBERS_REQUEST";
export const LOAD_MEMBERS_SUCCESS = "LOAD_MEMBERS_SUCCESS";
export const LOAD_MEMBERS_FAILURE = "LOAD_MEMBERS_FAILURE";

export const LOAD_MEMBER_DETAIL_REQUEST = "LOAD_MEMBER_DETAIL_REQUEST";
export const LOAD_MEMBER_DETAIL_SUCCESS = "LOAD_MEMBER_DETAIL_SUCCESS";
export const LOAD_MEMBER_DETAIL_FAILURE = "LOAD_MEMBER_DETAIL_FAILURE";

export const DELETE_MEMBER_REQUEST = "DELETE_MEMBER_REQUEST";
export const DELETE_MEMBER_SUCCESS = "DELETE_MEMBER_SUCCESS";
export const DELETE_MEMBER_FAILURE = "DELETE_MEMBER_FAILURE";

export const LOAD_MY_DETAIL_REQUEST = "LOAD_MY_DETAIL_REQUEST";
export const LOAD_MY_DETAIL_SUCCESS = "LOAD_MY_DETAIL_SUCCESS";
export const LOAD_MY_DETAIL_FAILURE = "LOAD_MY_DETAIL_FAILURE";

export const WITHDRAWAL_REQUEST = "WITHDRAWAL_REQUEST";
export const WITHDRAWAL_SUCCESS = "WITHDRAWAL_SUCCESS";
export const WITHDRAWAL_FAILURE = "WITHDRAWAL_FAILURE";

export const CHANGE_MANAGER_REQUEST = "CHANGE_MANAGER_REQUEST";
export const CHANGE_MANAGER_SUCCESS = "CHANGE_MANAGER_SUCCESS";
export const CHANGE_MANAGER_FAILURE = "CHANGE_MANAGER_FAILURE";

const member = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            // 멤버 리스트
            case LOAD_MEMBERS_REQUEST: {
                draft.loadingMembers = true;
                break;
            }
            case LOAD_MEMBERS_SUCCESS: {
                if (action.first) {
                    draft.members = action.data;
                } else {
                    action.data.forEach(d => {
                        draft.members.push(d);
                    });
                }
                draft.hasMoreMembers = !action.last;
                draft.loadingMembers = false;
                break;
            }
            case LOAD_MEMBERS_FAILURE: {
                draft.loadingMembers = false;
                draft.members = [];
                break;
            }

            // 멤버 정보
            case LOAD_MEMBER_DETAIL_REQUEST: {
                draft.loadingMemberDetail = true;
                break;
            }
            case LOAD_MEMBER_DETAIL_SUCCESS: {
                draft.loadingMemberDetail = false;
                draft.memberDetail = action.data;
                break;
            }
            case LOAD_MEMBER_DETAIL_FAILURE: {
                draft.loadingMemberDetail = false;
                break;
            }

            // 멤버 삭제
            case DELETE_MEMBER_REQUEST: {
                draft.isDeletingMember = true;
                draft.deleteMemberErrorReason = "";
                break;
            }
            case DELETE_MEMBER_SUCCESS: {
                draft.isDeletingMember = false;
                const findIndex = draft.members.findIndex(member => member.memberId === action.memberId);
                draft.members.splice(findIndex, 1);
                break;
            }
            case DELETE_MEMBER_FAILURE: {
                draft.isDeletingMember = false;
                draft.deleteMemberErrorReason = action.error;
                break;
            }

            // 스터디방의 내 정보
            case LOAD_MY_DETAIL_REQUEST: {
                draft.loadMyDetail = true;
                break;
            }
            case LOAD_MY_DETAIL_SUCCESS: {
                draft.loadMyDetail = false;
                draft.me = action.data;
                break;
            }
            case LOAD_MY_DETAIL_FAILURE: {
                draft.loadMyDetail = false;
                break;
            }

            // 스터디방 탈퇴
            case WITHDRAWAL_REQUEST: {
                draft.isWithdrawing = true;
                draft.withdrawErrorReason = "";
                break;
            }
            case WITHDRAWAL_SUCCESS: {
                draft.isWithdrawing = false;
                break;
            }
            case WITHDRAWAL_FAILURE: {
                draft.isWithdrawing = false;
                draft.withdrawErrorReason = action.data;
                break;
            }

            // 매니저 변경
            case CHANGE_MANAGER_REQUEST: {
                draft.isChangeManager = true;
                draft.changeManagerErrorReason = "";
                break;
            }
            case CHANGE_MANAGER_SUCCESS: {
                draft.isChangeManager = false;
                draft.me.role = "MATE";
                break;
            }
            case CHANGE_MANAGER_FAILURE: {
                draft.isChangeManager = false;
                draft.changeManagerErrorReason = action.error;
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default member;
