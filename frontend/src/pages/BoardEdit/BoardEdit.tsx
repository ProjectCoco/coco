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
import { TbEraser } from 'react-icons/tb';

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
    username: user.username,
    profileImg: user.profileImg,
    tag: [],
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
        tag: data.tag,
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

  const handleAddTags = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (post.tag?.includes(event.currentTarget.value)) {
      alert('이미 입력된 태그입니다. 동일한 태그는 입력하실 수 없습니다.');
    }

    if (event.key === 'Enter') {
      if (event.currentTarget.value.trim().length < 1) {
        alert('빈 태그는 입력하실 수 없습니다.');
        return;
      }

      setPost({
        ...post,
        tag: post.tag ? [...post.tag, event.currentTarget.value] : [],
      });
      event.currentTarget.value = '';
    }
  };

  const handleRemoveTags = (tagIdx: number) => {
    post.tag?.splice(tagIdx, 1);
    setPost({ ...post, tag: post.tag ? [...post.tag] : [] });
  };

  const isValid = (content: string): boolean => {
    const removeContentBlank = content.replace(/\n|\r|\s*/g, '');
    if (removeContentBlank.trim().length >= 1) {
      return true;
    }
    return false;
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (!isValid(post.title) || !isValid(post.content)) {
      alert('제목과 내용은 최소 1자 이상 입력되어야 합니다.');
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
                placeholder="제목을 입력해주세요."
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
              <S.TagContainer>
                <ul>
                  {post.tag?.map((tag, idx) => (
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
              <S.WriteButton onClick={handleSubmit}>수정 완료</S.WriteButton>
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
