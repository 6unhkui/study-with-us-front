import React, { useState } from "react";
import styled from "styled-components";
import { http } from "utils/HttpHandler";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import loadFile from "utils/loadFile";

const TextEditor = ({ value = "", onChange }) => {
    const [editorState, setEditorState] = useState(() => {
        const contentBlock = htmlToDraft(value);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            return EditorState.createWithContent(contentState);
        } else return EditorState.createEmpty();
    });

    const imageUploadCallback = file => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", file);

            http.post("/api/v1/files/editor", formData, {
                "Content-type": "multipart/form-data;charset=utf-8"
            })
                .then(({ data: { data } }) => {
                    resolve({ data: { link: loadFile(data.saveName, "editor") } });
                })
                .catch(err => {
                    reject("Upload failed");
                });
        });
    };

    const toolbar = {
        options: ["inline", "fontSize", "textAlign", "list", "colorPicker", "link", "image", "history"],
        list: { inDropdown: true },
        textAlign: { inDropdown: true },
        link: { inDropdown: true },
        history: { inDropdown: false },
        image: {
            urlEnabled: true,
            uploadEnabled: true,
            alignmentEnabled: false,
            uploadCallback: imageUploadCallback,
            previewImage: true,
            inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            alt: { present: false, mandatory: false },
            defaultSize: {
                height: "auto",
                width: "auto"
            }
        }
    };

    return (
        <EditorWrap>
            <Editor
                toolbar={toolbar}
                editorState={editorState}
                localization={{
                    locale: "ko"
                }}
                placeholder="내용을 작성해주세요."
                onEditorStateChange={state => {
                    setEditorState(state);
                    onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                }}
            />
        </EditorWrap>
    );
};

export default TextEditor;

const EditorWrap = styled.div`
    border: 1px solid var(--border-gray);
    .DraftEditor-root {
        padding: 0 1rem 1rem 1rem;
        height: 300px;
    }

    .public-DraftStyleDefault-block {
        margin: 0.5rem 0;
    }
`;
