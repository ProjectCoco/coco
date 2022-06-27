import React, { useState } from 'react';
import * as S from '../style';
import { IDuBoardList, IDuComment } from '../../../lib/types';
import commentImg from '../../../images/userProfile.jpg';
import { AiOutlineComment } from 'react-icons/ai';
import { postCommentApi } from '../../../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';
import { Viewer } from '@toast-ui/react-editor';

interface DataProps {
  board: IDuBoardList;
  comment: IDuComment[];
}

function Body({ board, comment }: DataProps) {
  const [string, setString] = useState<string>('');
  const user = useRecoilValue(UserState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentForm = {
      contentId: board._id,
      author: user.email,
      comment: string,
      createdDate: new Date(Date.now()).toISOString(),
    };
    const response = await postCommentApi(commentForm);
    if (response) setString('');
    console.log(response);
  }

  return (
    <S.Body>
      <S.Content>
        <Viewer initialValue={board?.content} />
      </S.Content>
      <S.CommentBox id="CommentBox">
        <S.CommentLength>
          <AiOutlineComment onClick={() => console.log(comment)} />
        </S.CommentLength>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentInput
            type={'text'}
            placeholder={
              user !== undefined
                ? '댓글을 입력해 주세요.'
                : '댓글을 입력하려면 로그인을 해주세요.'
            }
            value={string}
            onChange={(e) => setString(e.target.value)}
            disabled={user.email.length > 1 ? false : true}
          />
          <S.Button>입력</S.Button>
        </S.CommentForm>
        {comment === undefined ? (
          <></>
        ) : (
          comment.map((comment) => (
            <S.ShowComment key={comment._id}>
              <S.CommentProfile>
                <div>
                  <S.CommentImg src={commentImg} />
                </div>
                <div>
                  <h1>{comment.author}</h1>
                  <h3>{comment.createdDate}</h3>
                </div>
              </S.CommentProfile>
              <p>{comment.comment}</p>
            </S.ShowComment>
          ))
        )}
      </S.CommentBox>
      <S.Blank />
    </S.Body>
  );
}

export default Body;
