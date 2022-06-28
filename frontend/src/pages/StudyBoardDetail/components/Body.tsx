import React, { useState } from 'react';
import * as S from '../style';
import { IDuBoardList, IDuComment } from '../../../lib/types';
import commentImg from '../../../images/userProfile.jpg';
import { AiOutlineComment, AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { postCommentApi } from '../../../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';

interface DataProps {
  board: IDuBoardList;
  comment: IDuComment[];
}

const removeComment = async (id: string) => {
  return await axios.delete(`http://localhost:8080/api/comment/${id}`);
};
const putComment = async (id: string, data: string) => {
  return await axios.put(`http://localhost:8080/api/comment/${id}`, data);
};

const Body = ({ board, comment }: DataProps) => {
  const [string, setString] = useState<string>('');
  const [editString, setEditString] = useState('');
  const [edit, setEdit] = useState(false);
  const user = useRecoilValue(UserState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentForm = {
      contentId: board._id,
      author: user.email,
      comment: string,
      createdDate: new Date(Date.now()).toISOString(),
    };
    async () => await postCommentApi(commentForm).then(() => setString(''));
  }

  return (
    <S.Body>
      <S.Content>
        <Viewer initialValue={board?.content} />
      </S.Content>
      <S.CommentBox id="CommentBox">
        <S.CommentLength>
          <AiOutlineComment />
          <p>{comment.length ?? 0}</p>
        </S.CommentLength>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentInput
            type={'text'}
            placeholder={
              user.email.length > 1
                ? '댓글을 입력해 주세요.'
                : '댓글을 입력하려면 로그인을 해주세요.'
            }
            value={string}
            onChange={(e) => setString(e.target.value)}
            disabled={user.email.length > 1 ? false : true}
          />
          <S.Button>입력</S.Button>
        </S.CommentForm>
        {comment.map((comment) => (
          <S.ShowComment key={comment._id}>
            <S.CommentProfile>
              <div>
                <S.CommentImg src={commentImg} />
              </div>
              <div>
                <h1>{comment.author}</h1>
                <h3>{comment.createdDate}</h3>
              </div>
              {user.email === comment.author ? (
                <S.IconAlign>
                  <AiFillEdit onClick={() => setEdit((prev) => !prev)} />
                  <AiOutlineDelete onClick={() => removeComment(comment._id)} />
                </S.IconAlign>
              ) : (
                <></>
              )}
            </S.CommentProfile>
            {edit ? (
              <S.EditComment>
                <textarea
                  value={comment.comment}
                  onChange={(e) => setEditString(e.target.value)}
                />
                <S.Button
                  onClick={async () =>
                    await putComment(comment._id, editString)
                  }
                >
                  수정완료
                </S.Button>
              </S.EditComment>
            ) : (
              <p>{comment.comment}</p>
            )}
          </S.ShowComment>
        ))}
      </S.CommentBox>
      <S.Blank />
    </S.Body>
  );
};

export default Body;
