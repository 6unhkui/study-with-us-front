import {
    ChangeCategoryIdDTO,
    ChangeCoverIdDTO,
    CreateRoomDTO,
    SearchRoomsByPageDTO,
    RoomDetailDTO,
    RoomDTO,
    UpdateRoomDTO
} from "@/api/dto/room.dto";
import { fetcher } from "@/utils/axiosUtils";
import { CategoryDTO } from "@/api/dto/category.dto";
import { PageResponseDTO } from "@/api/dto/common.dto";

export class RoomAPI {
    public static async getOne(roomId: number): Promise<RoomDetailDTO> {
        return fetcher<RoomDetailDTO>({ url: `api/v1/room/${roomId}` });
    }

    public static async getAllByPage(request: SearchRoomsByPageDTO): Promise<PageResponseDTO<RoomDTO[]>> {
        return fetcher<PageResponseDTO<RoomDTO[]>>({ url: "api/v1/rooms", params: request });
    }

    public static async getMyRoomsByPage(request: SearchRoomsByPageDTO): Promise<PageResponseDTO<RoomDTO[]>> {
        return fetcher<PageResponseDTO<RoomDTO[]>>({ url: "api/v1/user/rooms", params: request });
    }

    public static async create(request: CreateRoomDTO): Promise<number> {
        return fetcher<number>({ method: "POST", url: "api/v1/room", data: request });
    }

    public static async updateOne(request: UpdateRoomDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: `api/v1/room/${request.roomId}`, data: request });
    }

    public static async deleteOne(roomId: number): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: `api/v1/room/${roomId}` });
    }

    public static async changeCoverId(request: ChangeCoverIdDTO): Promise<boolean> {
        return fetcher<boolean>({
            method: "PUT",
            url: `api/v1/room/${request.roomId}/cover`,
            params: { coverId: request.coverId }
        });
    }

    public static async changeCategoryId(request: ChangeCategoryIdDTO): Promise<CategoryDTO> {
        return fetcher<CategoryDTO>({
            method: "PUT",
            url: `api/v1/room/${request.roomId}/category`,
            params: { categoryId: request.categoryId }
        });
    }

    public static async joinRoom(roomId: number): Promise<boolean> {
        return fetcher<boolean>({ method: "POST", url: `/api/v1/room/${roomId}/join` });
    }

    public static async leaveRoom(roomId: number): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: `/api/v1/room/${roomId}/member` });
    }
}
