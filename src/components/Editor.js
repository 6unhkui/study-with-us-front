import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {http} from 'utils/HttpHandler';
import {SERVER_URI} from 'constants/index';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';


const TextEditor = ({initValue = '', onChange}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    const contentBlock = htmlToDraft(initValue);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [])

  const imageUploadCallback = file => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);

      http.post('/api/v1/files/editor', formData, {'Content-type': 'multipart/form-data;charset=utf-8'})
      .then(response => {
        const data = response.data.data;
        resolve({ data: { link: `${SERVER_URI}/api/v1/files/editor/${data.saveName}`}})
      }).catch(err => {
        reject("Upload failed");
      })
    });
  }

  const config = {
    options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'image', 'remove', 'history'],
    image: {
      urlEnabled: true,
      uploadEnabled: true,
      alignmentEnabled: true,
      uploadCallback: imageUploadCallback,
      previewImage: true,
      inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
      alt: { present: false, mandatory: false },
      defaultSize: {
        height: 'auto',
        width: 'auto',
      },
    },
  }

  return (
      <EditorWrap>
        <Editor toolbar={config} editorState={editorState}
                onEditorStateChange={v =>{
                  setEditorState(v);
                  onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
                }}/>
      </EditorWrap>
  )
}

export default TextEditor;

const EditorWrap = styled.div`
  border : 1px solid var(--border-gray);
  .DraftEditor-root {
    padding : 0 1rem 1rem 1rem;
    height : 300px;
  }
  
  .public-DraftStyleDefault-block {
    margin : .5rem 0;
  }
`