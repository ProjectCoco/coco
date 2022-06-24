import { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { postStudyBoardWriteApi } from '../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../lib/atom';

type BoardPost = {
  title: string;
  content: string;
  author: string;
};

const BoardWrite = () => {
  const user = useRecoilValue(UserState);

  const [newPost, setNewPost] = useState<BoardPost>({
    title: '',
    content: '',
    author: user.email, // username or email
  });
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();

  const handleTitleChange = (event: { target: { value: string } }) => {
    setNewPost({ ...newPost, title: event.target.value });
  };

  const handleContentChange = () => {
    setNewPost({
      ...newPost,
      content: editorRef.current?.getInstance().getHTML() || '',
    });
  };

  const isValid = (newPost: BoardPost): boolean => {
    const removeContentBlank = newPost.content.replace(/\n|\r|\s*/g, '');
    if (
      newPost.title.trim().length >= 1 &&
      removeContentBlank.trim().length >= 1
    ) {
      console.log('removeContentBlank', removeContentBlank.trim().length);
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isValid(newPost)) {
      alert('제목과 내용은 최소 1자 이상 입력되어야 합니다.');
    } else {
      const response = await postStudyBoardWriteApi(newPost); //
      console.log(response, newPost);
      // TODO: response 성공, 실패
      navigate(-1);
    }
  };

  return (
    <div>
      <BoardWirteContainer>
        <EditorContainer>
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
        </EditorContainer>
      </BoardWirteContainer>
    </div>
  );
};

export default BoardWrite;

const BoardWirteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
`;

const Title = styled.input`
  width: 814px;
  padding: 1.3rem 2.5rem;
  margin-bottom: 2rem;
  border: 1px solid #dcdfe7;
  border-radius: 0.3rem;
`;

const WriteButton = styled.button`
  margin-top: 3rem;
  background-color: #5de0e6;
  color: #fff;
  font-weight: 600;
  height: 4rem;
  width: 20%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;
