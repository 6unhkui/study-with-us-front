export interface RegisterAttendanceDTO {
    roomId: number;
    memo: string;
}

export interface AttendanceResponseDTO {
    members: AttendanceMemberDTO[];
    isRegistered: boolean;
}

export interface AttendanceMemberDTO {
    memberId: number;
    name: string;
    profileImg?: string;
    attendance?: AttendanceField;
}

interface AttendanceField {
    memo: string;
    time: string;
}

export interface AttendanceFigureDTO {
    name: string;
    count: number;
}

export interface SearchAttendanceDTO {
    roomId: number;
    startDate: string;
    endDate: string;
}
