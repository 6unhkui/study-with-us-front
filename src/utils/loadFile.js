import { SERVER_URI } from "constants/index";
import EmptyThumbnail from "assets/image/empty-thumbnail.png";

export default function (fileName, type) {
    if (!fileName || fileName.length === 0) {
        return `${EmptyThumbnail}`;
    }

    switch (type) {
        case "cover":
            return `${SERVER_URI}/api/v1/files/cover/${fileName}`;
        case "editor":
            return `${SERVER_URI}/api/v1/files/editor/${fileName}`;
        case "attachment":
            return `${SERVER_URI}/api/v1/files/attachment/${fileName}`;
        default:
            return `${EmptyThumbnail}`;
    }
}
