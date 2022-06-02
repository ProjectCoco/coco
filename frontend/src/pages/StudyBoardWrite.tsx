import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
// import { useNavigate } from 'react-router-dom';
import React from 'react';
import { postStudyBoardWriteApi } from '../apis/apiClient';

type StudyBoardPost = {
  title: string;
  content: string;
  author: string;
};

const StudyBoardWrite = () => {
  const [newPost, setNewPost] = useState<StudyBoardPost>({
    title: '',
    content: '',
    author: 'sunny',
  });

  const editorRef = useRef<Editor>(null);
  // const navigate = useNavigate();

  const handleTitleChange = (event: { target: { value: string } }) => {
    setNewPost({ ...newPost, title: event.target.value });
  };

  const handleContentChange = () => {
    setNewPost({
      ...newPost,
      content: editorRef.current?.getInstance().getMarkdown() || '',
    });
  };

  const isValid = (newPost: StudyBoardPost): boolean => {
    const removeContentBlank = newPost.content.replace(/\n|\r|\s*/g, '');
    if (
      newPost.title.trim().length >= 1 &&
      removeContentBlank.trim().length >= 1
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isValid(newPost)) {
      alert('제목과 내용은 최소 1자 이상 입력되어야 합니다.');
    } else {
      const response = await postStudyBoardWriteApi(newPost);
      console.log(response, newPost);
      // TODO: response 성공, 실패

      // navigate(-1);
    }
  };

  return (
    <div>
      <StudyBoardWirteContainer>
        <Title
          placeholder="제목을 입력해주세요."
          value={newPost.title}
          onChange={handleTitleChange}
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
          onChange={handleContentChange}
        />
        <WriteButton onClick={handleSubmit}>글쓰기</WriteButton>
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
