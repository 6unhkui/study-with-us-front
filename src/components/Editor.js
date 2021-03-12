import React from "react";
import styled from "styled-components";
import { http } from "utils/HttpHandler";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import loadFile from "utils/LoadFile";

ClassicEditor.defaultConfig = {
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
    constructor(loader) {
        this.loader = loader;
    }

    async upload() {
        return this.loader.file.then(file => {
            const formData = new FormData();
            formData.append("file", file);

            return http
                .post("/api/v1/files/editor", formData, {
                    "Content-type": "multipart/form-data;charset=utf-8"
                })
                .then(({ data: { data } }) => ({ default: loadFile(data.saveName, "editor") }))
                .catch(() => Promise.reject("Upload failed"));
        });
    }

    abort() {
        return Promise.reject();
    }
}

const Editor = ({ value = "", onChange }) => {
    return (
        <EditorWrap>
            <CKEditor
                editor={ClassicEditor}
                data={value}
                onReady={editor => {
                    editor.plugins.get("FileRepository").createUploadAdapter = loader => new UploadAdapter(loader);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
            />
        </EditorWrap>
    );
};

export default Editor;

const EditorWrap = styled.div`
    .ck-editor__main > .ck-editor__editable {
        height: 400px;
    }
`;
