import { AttendanceFigureDTO, AttendanceMemberDTO } from "@/api/dto/attendance.dto";
import { AsyncState } from "@/utils/reducerUtils";
import { ActionType } from "typesafe-actions";
import { getAttendingMemberListAsync, getAttendedMemberListByDateAsync, registerAttendanceAsync } from "./actions";

export type AttendanceAction = ActionType<
    typeof getAttendingMemberListAsync | typeof getAttendedMemberListByDateAsync | typeof registerAttendanceAsync
>;

export interface AttendanceState {
    attendingMemberList: AsyncState<AttendingMemberList>;
    attendanceHistory: AsyncState<AttendanceFigureDTO[]>;
    register: AsyncState<boolean>;
}

interface AttendingMemberList {
    attendedMemberList: Required<AttendanceMemberDTO>[];
    nonattendanceMemberList: Omit<AttendanceMemberDTO, "attendance">[];
    isAttended: boolean;
}
