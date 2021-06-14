import { FileType } from "@/api/dto/file.dto";
import EmptyThumbnail from "@/images/empty-thumbnail.png";

export default (fileName: string | undefined, type: FileType): string => {
    if (!fileName || fileName.length === 0) {
        return EmptyThumbnail;
    }

    return `${process.env.REACT_APP_API_SERVER_URI}/api/v1/files/${type}/${fileName}`;
};
