export type FileType = "COVER" | "EDITOR" | "ATTACHMENT";

export interface UploadFileByGroupIdDTO {
    fileGroupId?: number;
    file: FormData;
}

export interface UploadFileDTO {
    file: FormData;
}

export interface UploadFileListByGroupIdDTO {
    fileGroupId?: number;
    files: FormData;
}

export interface FileDTO {
    fileId: number;
    saveName: string;
    originName: string;
    fileSize: number;
}

export interface FileGroupDTO {
    fileGroupId: number;
    files: Array<FileDTO>;
}
