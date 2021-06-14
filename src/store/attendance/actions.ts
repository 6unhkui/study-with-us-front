import { createActionEntity, createAsyncActionType } from "@/utils/reducerUtils";
import { AxiosError } from "axios";
import {
    RegisterAttendanceDTO,
    AttendanceResponseDTO,
    SearchAttendanceDTO,
    AttendanceFigureDTO,
    AttendanceMemberDTO
} from "@/api/dto/attendance.dto";

// ---
// Action Type
const prefix = "attendance";
export const GET_ATTENDING_MEMBER_LIST = createAsyncActionType(`${prefix}/GET_ATTENDING_MEMBER_LIST`);
export const GET_ATTENDED_MEMBER_LIST_BY_DATE = createAsyncActionType(`${prefix}/GET_ATTENDED_MEMBER_LIST_BY_DATE`);
export const REGISTER_ATTENDANCE = createAsyncActionType(`${prefix}/REGISTER_ATTENDANCE`);

// ---
// Action Creator
export const getAttendingMemberListAsync =
    createActionEntity<number, AttendanceResponseDTO, AxiosError>(GET_ATTENDING_MEMBER_LIST);
export const getAttendedMemberListByDateAsync =
    createActionEntity<SearchAttendanceDTO, AttendanceFigureDTO[], AxiosError>(GET_ATTENDED_MEMBER_LIST_BY_DATE);
export const registerAttendanceAsync =
    createActionEntity<RegisterAttendanceDTO, AttendanceMemberDTO, AxiosError>(REGISTER_ATTENDANCE);
