import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import { _api } from "../../plugins/axios";
// import { useNavigate } from 'react-router-dom';
import React from 'react';

const StudyBoardWrite = () => {
  const [title, setTitle] = useState<string>('');

  const editorRef = useRef<Editor>(null);
  // const navigate = useNavigate();

  const handlePostingButtonClick = () => {
    console.log({
      id: Date.now(),
      title: title,
      content: editorRef.current?.getInstance().getHTML(),
      datetime: new Date(),
      favor: 30,
      comment: null,
      author: '짱구',
    });
    // navigate('/study-board');
  };

  return (
    <div>
      <StudyBoardWirteContainer>
        <Title
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
        <Editor
          initialValue=" "
          previewStyle="vertical"
          height="600px"
          initialEditType="wysiwyg"
          plugins={[colorSyntax]}
          useCommandShortcut={true}
          ref={editorRef}
          autofocus={false}
        />
        <WriteButton onClick={handlePostingButtonClick}>글쓰기</WriteButton>
      </StudyBoardWirteContainer>
    </div>
  );
};

export default StudyBoardWrite;

const StudyBoardWirteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.input`
  width: 814px;
  padding: 1.3rem 2.5rem;
  margin: 3rem 0 1rem;
  border: 1px solid #dcdfe7;
  border-radius: 0.3rem;
`;

const WriteButton = styled.button`
  width: 100px;
  margin-top: 2rem;
  padding: 1rem;
  border: none;
  background-color: skyblue;
  border-radius: 0.5rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  &:hover {
    opacity: 70%;
    color: #545454;
  }
`;
