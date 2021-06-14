import { fetcher } from "@/utils/axiosUtils";
import {
    RegisterAttendanceDTO,
    AttendanceMemberDTO,
    AttendanceResponseDTO,
    SearchAttendanceDTO,
    AttendanceFigureDTO
} from "@/api/dto/attendance.dto";

export class AttendanceAPI {
    public static async register(request: RegisterAttendanceDTO): Promise<AttendanceMemberDTO> {
        return fetcher<AttendanceMemberDTO>({ method: "POST", url: `/api/v1/room/${request.roomId}/attendance`, data: request });
    }

    public static async getAttendingMembers(roomId: number): Promise<AttendanceResponseDTO> {
        return fetcher<AttendanceResponseDTO>({ url: `/api/v1/room/${roomId}/attendance/members/today` });
    }

    public static async getAttendedMembersByDate(request: SearchAttendanceDTO): Promise<AttendanceFigureDTO[]> {
        return fetcher<AttendanceFigureDTO[]>({ url: `/api/v1/room/${request.roomId}/attendance/members`, params: request });
    }
}
