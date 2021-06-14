import { PageRequestDTO } from "@/api/dto/common.dto";
import { AttendanceFigureDTO } from "./attendance.dto";

export type MemberSortBy = "NAME" | "JOIN_DATE" | "ROLE";
export type MemberRole = "MATE" | "MANAGER";

export interface SearchMembersByPageDTO extends PageRequestDTO, SearchMemberDTO {}

export interface SearchMemberDTO {
    roomId?: number;
    sortBy?: MemberSortBy;
    keyword?: string;
}

export interface MemberDTO {
    memberId: number;
    name: string;
    profileImg?: string;
    role: MemberRole;
    email: string;
}

export interface MemberDetailDTO {
    memberId: number;
    role: MemberRole;
    name: string;
    profileImg: string;
    email: string;
    joinDate: string;
    postCount: number;
    attendanceStatistics: AttendanceFigureDTO[];
}

export interface ChangeManagerDTO {
    memberId: number;
    roomId: number;
}
