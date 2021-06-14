import { PageRequestDTO } from "@/api/dto/common.dto";
import { MemberDTO } from "@/api/dto/member.dto";

export type RoomSortBy = "NAME" | "CREATED_DATE" | "JOIN_COUNT";

export interface CreateRoomDTO {
    name: string;
    description: string;
    unlimited: boolean;
    maxCount: number;
    categoryId: number;
    fileGroupId?: number;
    coverImage?: FormData;
}

export interface ChangeCoverIdDTO {
    roomId: number;
    coverId: number;
}

export interface ChangeCategoryIdDTO {
    roomId: number;
    categoryId: number;
}

export interface UpdateRoomDTO {
    roomId: number;
    name: string;
    description: string;
    unlimited: boolean;
    maxCount: number;
}

export interface SearchRoomsByPageDTO extends PageRequestDTO, SearchRoomDTO {}

export interface SearchRoomDTO {
    sortBy?: RoomSortBy;
    keyword?: string;
    categoryIds?: Array<number>;
}

export interface RoomDTO {
    roomId: number;
    name: string;
    description?: string;
    unlimited: boolean;
    maxCount: number;
    joinCount: number;
    category: string;
    coverImage?: string;
    manager: MemberDTO;
}

export interface RoomDetailDTO {
    roomId: number;
    name: string;
    description?: string;
    unlimited: boolean;
    maxCount: number;
    joinCount: number;
    createDate: string;
    categoryId: number;
    category: string;
    coverGroupId?: number;
    coverImage?: string;
    manager: MemberDTO;
    isManager: boolean;
    isMember: boolean;
}
