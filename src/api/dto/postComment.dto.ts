import { MemberDTO } from "@/api/dto/member.dto";

export interface CreateCommentDTO {
    postId: number;
    content: string;
    parentId?: number;
}

export interface UpdateCommentDTO {
    commentId: number;
    content: string;
}

export interface CommentDTO {
    commentId: number;
    content: string;
    seq: number;
    createdDate: string;
    writer: MemberDTO;
    isWriter: boolean;
    child?: CommentDTO[];
}
