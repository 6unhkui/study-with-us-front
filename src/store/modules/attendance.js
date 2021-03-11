import produce from "immer";

const initialState = {
    loadingMembersStatistics: false, // 월별 출석 기록 데이터
    MembersStatistics: [],

    loadingMembersAttendance: false, // 금일 출석 멤버 리스트
    membersAttendance: [],
    isRegisteredToday: false,

    isRegistering: false, // 출석 등록
    registerErrorReason: ""
};

// Actions
export const LOAD_MEMBERS_STATISTIC_REQUEST = "LOAD_MEMBERS_STATISTIC_REQUEST";
export const LOAD_MEMBERS_STATISTIC_SUCCESS = "LOAD_MEMBERS_STATISTIC_SUCCESS";
export const LOAD_MEMBERS_STATISTIC_FAILURE = "LOAD_MEMBERS_STATISTIC_FAILURE";

export const LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST = "LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST";
export const LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS = "LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS";
export const LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE = "LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE";

export const REGISTER_ATTENDANCE_REQUEST = "REGISTER_ATTENDANCE_REQUEST";
export const REGISTER_ATTENDANCE_SUCCESS = "REGISTER_ATTENDANCE_SUCCESS";
export const REGISTER_ATTENDANCE_FAILURE = "REGISTER_ATTENDANCE_FAILURE";

const member = (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case LOAD_MEMBERS_STATISTIC_REQUEST: {
                draft.loadingMembersStatistics = true;
                break;
            }
            case LOAD_MEMBERS_STATISTIC_SUCCESS: {
                draft.loadingMembersStatistics = false;
                draft.MembersStatistics = action.data;
                break;
            }
            case LOAD_MEMBERS_STATISTIC_FAILURE: {
                draft.loadingMembersStatistics = false;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST: {
                draft.loadingMembersAttendance = true;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS: {
                draft.loadingMembersAttendance = false;
                draft.membersAttendance = action.members;
                draft.isRegisteredToday = action.isRegistered;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE: {
                draft.loadingMembersAttendance = false;
                break;
            }
            case REGISTER_ATTENDANCE_REQUEST: {
                draft.isRegistering = true;
                draft.registerErrorReason = "";
                break;
            }
            case REGISTER_ATTENDANCE_SUCCESS: {
                draft.isRegistering = false;
                const targetIndex = draft.membersAttendance.findIndex(v => v.memberId === action.memberId);
                const target = draft.membersAttendance[targetIndex];
                draft.membersAttendance.splice(targetIndex, 1);
                draft.membersAttendance.push({
                    attendance: { ...action.attendance },
                    ...target
                });

                draft.isRegisteredToday = true;
                break;
            }
            case REGISTER_ATTENDANCE_FAILURE: {
                draft.isRegistering = false;
                draft.registerErrorReason = action.error;
                break;
            }
            default: {
                break;
            }
        }
    });
};

export default member;
