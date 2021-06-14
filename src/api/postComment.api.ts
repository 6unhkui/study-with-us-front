import { fetcher } from "@/utils/axiosUtils";
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from "./dto/postComment.dto";

export class PostCommentAPI {
    public static async getAll(postId: number): Promise<CommentDTO[]> {
        return fetcher({ url: `/api/v1/post/${postId}/comments` });
    }

    public static async create(request: CreateCommentDTO): Promise<CommentDTO> {
        return fetcher({ method: "POST", url: `/api/v1/post/${request.postId}/comment`, data: request });
    }

    public static async update(request: UpdateCommentDTO): Promise<boolean> {
        return fetcher({ method: "PUT", url: `/api/v1/comment/${request.commentId}`, data: request });
    }

    public static async delete(commentId: number): Promise<boolean> {
        return fetcher({ method: "DELETE", url: `/api/v1/comment/${commentId}` });
    }
}
