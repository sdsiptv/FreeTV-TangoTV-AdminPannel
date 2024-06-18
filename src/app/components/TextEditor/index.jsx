import { EditorState } from 'draft-js';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function TextEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Editor
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        required
        fullwidth
        wrapperStyle={{
          fontSize: 20,
          border: '1px solid black',
          backgroundColor: 'white',
        }}
        onEditorStateChange={onEditorStateChange}
      />
    </div>
  );
}
