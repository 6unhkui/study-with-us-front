import { AttendanceFigureDTO, AttendanceMemberDTO, AttendanceResponseDTO } from "@/api/dto/attendance.dto";
import { asyncStateInit } from "@/utils/reducerUtils";
import produce from "immer";
import { createReducer } from "typesafe-actions";
import { GET_ATTENDED_MEMBER_LIST_BY_DATE, GET_ATTENDING_MEMBER_LIST, REGISTER_ATTENDANCE } from "./actions";
import { AttendanceAction, AttendanceState } from "./types";

const initalState: AttendanceState = {
    attendingMemberList: asyncStateInit,
    attendanceHistory: asyncStateInit,
    register: asyncStateInit
};

const attendanceReducer = createReducer<AttendanceState, AttendanceAction>(initalState, {
    [GET_ATTENDING_MEMBER_LIST.REQUEST]: produce(({ attendingMemberList: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_ATTENDING_MEMBER_LIST.SUCCESS]: produce(({ attendingMemberList: state }, action) => {
        state.loading = false;
        const payload = action.payload as AttendanceResponseDTO;

        state.data = {
            isAttended: payload.isRegistered,
            attendedMemberList: payload.members.filter(v => !!v.attendance) as Required<AttendanceMemberDTO>[],
            nonattendanceMemberList: payload.members.filter(v => !v.attendance)
        };

        state.error = null;
    }),
    [GET_ATTENDING_MEMBER_LIST.FAILURE]: produce(({ attendingMemberList: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),

    [GET_ATTENDED_MEMBER_LIST_BY_DATE.REQUEST]: produce(({ attendanceHistory: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [GET_ATTENDED_MEMBER_LIST_BY_DATE.SUCCESS]: produce(({ attendanceHistory: state }, action) => {
        state.loading = false;
        state.data = action.payload as AttendanceFigureDTO[];
        state.error = null;
    }),
    [GET_ATTENDED_MEMBER_LIST_BY_DATE.FAILURE]: produce(({ attendanceHistory: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    }),

    [REGISTER_ATTENDANCE.REQUEST]: produce(({ register: state }) => {
        state.loading = true;
        state.data = null;
        state.error = null;
    }),
    [REGISTER_ATTENDANCE.SUCCESS]: produce(({ register, attendingMemberList }, action) => {
        register.loading = false;
        register.data = true;
        register.error = null;

        if (attendingMemberList.data) {
            const payload = action.payload as Required<AttendanceMemberDTO>;
            const prevMemberData = attendingMemberList.data.nonattendanceMemberList.find(
                member => member.memberId === payload.memberId
            ) as AttendanceMemberDTO;

            attendingMemberList.data.isAttended = true;
            attendingMemberList.data.attendedMemberList.push({ ...prevMemberData, ...payload });
            attendingMemberList.data.attendedMemberList.sort(({ attendance: { time: aTime } }, { attendance: { time: bTime } }) =>
                aTime > bTime ? -1 : aTime < bTime ? 1 : 0
            );
            attendingMemberList.data.nonattendanceMemberList = attendingMemberList.data.nonattendanceMemberList.filter(
                member => member.memberId !== payload.memberId
            );
        }
    }),
    [REGISTER_ATTENDANCE.FAILURE]: produce(({ register: state }, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
    })
});

export default attendanceReducer;
