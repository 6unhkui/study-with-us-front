import { FileDTO } from "@/api/dto/file.dto";
import React, { useCallback } from "react";
import { PaperClipOutlined } from "@ant-design/icons";
import byteConverter from "@/utils/byteConverter";
import Divider from "@/components/Divider";
import FileSaver from "file-saver";
import makeFileUrl from "@/utils/makeFileUrl";
import styles from "./FileListItem.module.less";

interface FileListItemProps extends FileDTO {}

const FileListItem: React.FC<FileListItemProps> = ({ fileSize, originName, saveName }) => {
    const fileDownload = useCallback(() => {
        FileSaver.saveAs(makeFileUrl(saveName, "ATTACHMENT"), originName);
    }, [saveName, originName]);

    return (
        <div className={styles.container}>
            <PaperClipOutlined />
            <span className={styles.fileName} onClick={fileDownload}>
                {originName}
            </span>
            <Divider type="vertical" />
            <span className={styles.fileSize}>{byteConverter(fileSize)}</span>
        </div>
    );
};

export default FileListItem;
