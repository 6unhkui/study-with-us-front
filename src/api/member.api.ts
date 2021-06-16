import { fetcher } from "@/utils/axiosUtils";
import { SearchMembersByPageDTO, MemberDTO, MemberDetailDTO, ChangeManagerDTO } from "@/api/dto/member.dto";
import { PageResponseDTO } from "@/api/dto/common.dto";

export class MemeberAPI {
    public static getAllByPage(request: SearchMembersByPageDTO): Promise<PageResponseDTO<MemberDTO[]>> {
        return fetcher<PageResponseDTO<MemberDTO[]>>({ url: `/api/v1/room/${request.roomId}/members`, params: request });
    }

    public static getOne(memberId: number): Promise<MemberDetailDTO> {
        return fetcher<MemberDetailDTO>({ url: `/api/v1/member/${memberId}` });
    }

    public static getMyInfo(roomId: number): Promise<MemberDetailDTO> {
        return fetcher<MemberDetailDTO>({ url: `/api/v1/room/${roomId}/member` });
    }

    public static deleteOne(memberId: number): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: `/api/v1/member/${memberId}` });
    }

    public static changeManager(request: ChangeManagerDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: `/api/v1/room/${request.roomId}/member/manager`, params: request });
    }
}
