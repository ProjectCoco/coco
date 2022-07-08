import { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { postBoardWriteApi } from '../../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../lib/atom';
import * as S from './style';
import { TbEraser } from 'react-icons/tb';

type BoardPost = {
  title: string;
  content: string;
  username: string;
  favor: number;
  tag: string[];
};

const BoardWrite = () => {
  const user = useRecoilValue(UserState);

  const [newPost, setNewPost] = useState<BoardPost>({
    title: '',
    content: '',
    username: user.email, // username or email
    favor: 0,
    tag: [],
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

  const handleAddTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim().length < 1) {
      alert('빈 태그는 입력하실 수 없습니다.');
      return;
    }

    if (newPost.tag.includes(event.currentTarget.value)) {
      alert('이미 입력된 태그입니다. 동일한 태그는 입력하실 수 없습니다.');
    }

    if (event.key === 'Enter') {
      setNewPost({
        ...newPost,
        tag: [...newPost.tag, event.currentTarget.value],
      });
      event.currentTarget.value = '';
    }
  };

  const handleRemoveTags = (tagIdx: number) => {
    newPost.tag.splice(tagIdx, 1);
    setNewPost({ ...newPost, tag: [...newPost.tag] });
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
      const response = await postBoardWriteApi(newPost); //
      console.log(response, newPost);
      // TODO: response 성공, 실패
      navigate(-1);
    }
  };

  return (
    <div>
      <S.BoardWirteContainer>
        <S.EditorContainer>
          <S.TitleInput
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
          <S.TagContainer>
            <ul>
              {newPost.tag?.map((tag, idx) => (
                <li key={idx}>
                  <span># {tag}</span>
                  <button onClick={() => handleRemoveTags(idx)}>
                    <TbEraser />
                  </button>
                </li>
              ))}
            </ul>
            <input
              placeholder="태그를 입력하시려면 ENTER키를 눌러주세요."
              onKeyUp={handleAddTags}
            />
          </S.TagContainer>
          <S.WriteButton onClick={handleSubmit}>글쓰기</S.WriteButton>
        </S.EditorContainer>
      </S.BoardWirteContainer>
    </div>
  );
};

export default BoardWrite;
