import { fetcher } from "@/utils/axiosUtils";
import { PostDetailDTO, SearchPostsByPageDTO, PostDTO, CreatePostDTO, UpdatePostDTO } from "@/api/dto/post.dto";
import { PageRequestDTO, PageResponseDTO } from "@/api/dto/common.dto";

export class PostAPI {
    public static async getOne(postId: number): Promise<PostDetailDTO> {
        return fetcher<PostDetailDTO>({ url: `/api/v1/post/${postId}` });
    }

    public static async getAllByPage(request: SearchPostsByPageDTO): Promise<PageResponseDTO<PostDTO[]>> {
        return fetcher<PageResponseDTO<PostDTO[]>>({ url: `/api/v1/room/${request.roomId}/posts`, params: request });
    }

    public static async getNewsFeedByPage(request: PageRequestDTO): Promise<PageResponseDTO<PostDTO[]>> {
        return fetcher<PageResponseDTO<PostDTO[]>>({ url: `/api/v1/posts/new`, params: request });
    }

    public static async create(request: CreatePostDTO): Promise<number> {
        return fetcher<number>({ method: "POST", url: `/api/v1/room/${request.roomId}/post`, data: request });
    }

    public static async updateOne(request: UpdatePostDTO): Promise<boolean> {
        return fetcher<boolean>({ method: "PUT", url: `/api/v1/post/${request.postId}`, data: request });
    }

    public static async deleteOne(postId: number): Promise<boolean> {
        return fetcher<boolean>({ method: "DELETE", url: `/api/v1/post/${postId}` });
    }
}
