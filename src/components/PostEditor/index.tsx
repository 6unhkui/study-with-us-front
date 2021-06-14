import React, { useCallback } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FileAPI } from "@/api/file.api";
import makeFileUrl from "@/utils/makeFileUrl";
import styled from "styled-components";
import styles from "./PostEditor.module.less";

ClassicEditor.defaultConfig = {
    placeholder: "내용을 입력해주세요.",
    toolbar: [
        "heading",
        "|",
        "alignment",
        "|",
        "bold",
        "italic",
        "|",
        "link",
        "|",
        "uploadImage",
        "blockQuote",
        "|",
        "undo",
        "redo"
    ]
};

class UploadAdapter {
    loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    async upload() {
        return this.loader.file.then((file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            return FileAPI.uploadEditorImage({ file: formData })
                .then(data => ({ default: makeFileUrl(data.saveName, "EDITOR") }))
                .catch(() => Promise.reject(new Error("Upload failed")));
        });
    }

    abort(): Promise<any> {
        console.log(this);
        return Promise.reject();
    }
}

interface PostEditorProps {
    value?: string;
    onChange?: (v: string) => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ value, onChange }) => {
    const onReady = useCallback((editor: any) => {
        if (editor?.plugins) {
            editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => new UploadAdapter(loader);
        }
    }, []);

    const onEditorChange = useCallback(
        (event: any, editor: any) => {
            const data = editor.getData();
            onChange && onChange(data);
        },
        [onChange]
    );

    return (
        <Editor className={styles.content}>
            <CKEditor data={value} editor={ClassicEditor} onReady={onReady} onChange={onEditorChange} className="hah" />
        </Editor>
    );
};

export default React.memo(PostEditor);

const Editor = styled.div`
    .ck-editor__main > .ck-content {
        height: 400px;
        padding: 16px;
    }
`;
