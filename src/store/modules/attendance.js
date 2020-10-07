import produce from 'immer';

const initialState = {
    loadingMonthlyStatistics : false, // 월별 출석 기록 데이터
    monthlyStatistics : [],

    loadingMembersAttendance : false, // 금일 출석 멤버 리스트
    membersAttendance : [],
    isRegisteredToday : false,

    isRegistering : false, // 출석 등록
    registerErrorReason : '',
};


// Actions
export const LOAD_MONTHLY_STATISTIC_REQUEST = 'LOAD_MONTHLY_STATISTIC_REQUEST';
export const LOAD_MONTHLY_STATISTIC_SUCCESS = 'LOAD_MONTHLY_STATISTIC_SUCCESS';
export const LOAD_MONTHLY_STATISTIC_FAILURE = 'LOAD_MONTHLY_STATISTIC_FAILURE';

export const LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST = 'LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST';
export const LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS = 'LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS';
export const LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE = 'LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE';

export const REGISTER_ATTENDANCE_REQUEST = 'REGISTER_ATTENDANCE_REQUEST';
export const REGISTER_ATTENDANCE_SUCCESS = 'REGISTER_ATTENDANCE_SUCCESS';
export const REGISTER_ATTENDANCE_FAILURE = 'REGISTER_ATTENDANCE_FAILURE';


const member = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOAD_MONTHLY_STATISTIC_REQUEST : {
                draft.loadingMonthlyStatistics = true;
                break;
            }
            case LOAD_MONTHLY_STATISTIC_SUCCESS : {
                draft.loadingMonthlyStatistics = false;
                draft.monthlyStatistics = action.data;
                break;
            }
            case LOAD_MONTHLY_STATISTIC_FAILURE : {
                draft.loadingMonthlyStatistics = false;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_REQUEST : {
                draft.loadingMembersAttendance = true;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_SUCCESS : {
                draft.loadingMembersAttendance = false;
                draft.membersAttendance = action.members;
                draft.isRegisteredToday = action.isRegistered;
                break;
            }
            case LOAD_MEMBERS_ATTENDANCE_TODAY_FAILURE : {
                draft.loadingMembersAttendance = false;
                break;
            }
            case REGISTER_ATTENDANCE_REQUEST : {
                draft.isRegistering = true;
                draft.registerErrorReason = "";
                break;
            }
            case REGISTER_ATTENDANCE_SUCCESS : {
                draft.isRegistering = false;
                const findIndex = draft.membersAttendance.findIndex(v => v.memberId === action.memberId);
                draft.membersAttendance.splice(
                    findIndex, 1,
                    {
                        attendance : {...action.attendance},
                        ...draft.membersAttendance[findIndex],
                    }
                )
                draft.isRegisteredToday = true;
                break;
            }
            case REGISTER_ATTENDANCE_FAILURE : {
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