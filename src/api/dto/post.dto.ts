import { FileDTO } from "@/api/dto/file.dto";
import { PageRequestDTO } from "@/api/dto/common.dto";
import { MemberDTO } from "@/api/dto/member.dto";

export interface SearchPostsByPageDTO extends PageRequestDTO, SearchPostDTO {}

export interface SearchPostDTO {
    roomId: number;
    keyword?: string;
}

export interface CreatePostDTO {
    roomId: number;
    title: string;
    content: string;
    fileGroupId?: number;
    files?: FormData;
}

export interface UpdatePostDTO {
    postId: number;
    title: string;
    content?: string;
    fileGroupId?: number;
    delFiles?: Array<number>;
    files?: FormData;
}

export interface PostDTO {
    roomName: string;
    postId: number;
    title: string;
    content: string;
    thumbnail?: string;
    createdDate: string;
    writer: MemberDTO;
    commentCount: number;
    fileCount: number;
}

export interface PostDetailDTO {
    roomId: number;
    roomName: string;
    postId: number;
    title: string;
    content: string;
    thumbnail: string;
    createdDate: string;
    writer: MemberDTO;
    isWriter: boolean;
    fileGroupId?: number;
    files?: FileDTO[];
}
