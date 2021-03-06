import { useEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import { getBoardDetail, putBoard } from '../../apis/apiClient';
import * as S from './style';
import * as T from '../../apis/types';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../lib/atom';
import Loading from '../../components/Loading';
import NotFound from '../NotFound/NotFound';

// type BoardPost = {
//   title: string;
//   content: string;
//   username: string;
//   tag: string[];
// };

const BoardEdit = () => {
  const { id } = useParams();
  const user = useRecoilValue(UserState);

  const [post, setPost] = useState<T.BoardForm>({
    title: '',
    content: '',
    username: '', // username or email
    // tag: [],
  });
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const data = await getBoardDetail(id);

      setPost({
        title: data.title,
        content: data.content,
        username: data.username,
        // tag: data.tag,
      });
      editorRef.current?.getInstance().setHTML(data.content);
    })();
  }, []);

  const handleTitleChange = (event: { target: { value: string } }) => {
    setPost({ ...post, title: event.target.value });
  };

  const handleContentChange = () => {
    setPost({
      ...post,
      content: editorRef.current?.getInstance().getHTML() || '',
    });
  };

  const isValid = (post: T.BoardForm): boolean => {
    const removeContentBlank = post.content.replace(/\n|\r|\s*/g, '');
    if (
      post.title.trim().length >= 1 &&
      removeContentBlank.trim().length >= 1
    ) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isValid(post)) {
      alert('????????? ????????? ?????? 1??? ?????? ??????????????? ?????????.');
    } else {
      const response = await putBoard(id, post);
      console.log(response);
      navigate('/study-board');
    }
  };

  if (!post.content) {
    return <Loading />;
  } else {
    if (user.username === post.username) {
      return (
        <div>
          <S.BoardWirteContainer>
            <S.EditorContainer>
              <S.TitleInput
                placeholder="????????? ??????????????????."
                value={post.title}
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
              <S.WriteButton onClick={handleSubmit}>?????? ??????</S.WriteButton>
            </S.EditorContainer>
          </S.BoardWirteContainer>
        </div>
      );
    } else {
      return <NotFound />;
    }
  }
};

export default BoardEdit;
