import { fetcher } from "@/utils/axiosUtils";
import { FileDTO, FileGroupDTO, UploadFileByGroupIdDTO, UploadFileDTO, UploadFileListByGroupIdDTO } from "@/api/dto/file.dto";

export class FileAPI {
    public static async uploadCoverImage(request: UploadFileByGroupIdDTO): Promise<FileGroupDTO> {
        return fetcher<FileGroupDTO>({
            method: "POST",
            url: "/api/v1/files/cover",
            data: request.file,
            params: { fileGroupId: request.fileGroupId },
            headers: { "Content-type": "multipart/form-data;charset=utf-8" }
        });
    }

    public static async uploadEditorImage(request: UploadFileDTO): Promise<FileDTO> {
        return fetcher<FileDTO>({
            method: "POST",
            url: "/api/v1/files/editor",
            data: request.file,
            headers: { "Content-type": "multipart/form-data;charset=utf-8" }
        });
    }

    public static async uploadAttachment(request: UploadFileListByGroupIdDTO): Promise<FileGroupDTO> {
        return fetcher<FileGroupDTO>({
            method: "POST",
            url: "/api/v1/files/attachment",
            params: { fileGroupId: request.fileGroupId },
            data: request.files,
            headers: { "Content-type": "multipart/form-data;charset=utf-8" }
        });
    }
}
