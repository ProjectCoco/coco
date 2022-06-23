import React, { useState } from 'react';
import * as S from '../style';
import { IDuBoardList, IDuComment } from '../../../lib/types';
import commentImg from '../../../images/userProfile.jpg';
import { AiOutlineComment } from 'react-icons/ai';
import { postCommentApi } from '../../../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';
import { useQuery } from 'react-query';

type DataProps = {
  board: IDuBoardList;
};

function Body({ board }: DataProps) {
  const fetchComment = async () => {
    const res = await fetch(`http://localhost:8080/comment/${board._id}`);
    return res.json();
  };
  const { data } = useQuery('comment', fetchComment);
  const [comment, setComment] = useState<string>('');
  const user = useRecoilValue(UserState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentForm = {
      _id: board._id,
      author: user.email,
      comment: comment,
      createdDate: new Date(Date.now()).toISOString(),
    };
    const response = await postCommentApi(commentForm);
    if (response) setComment('');
    console.log(response);
  }

  return (
    <S.Body>
      <S.Content>{board.content}</S.Content>
      <S.CommentBox id="CommentBox">
        <S.CommentLength>
          <AiOutlineComment />
          <p> 댓글 </p>
        </S.CommentLength>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentInput
            type={'text'}
            placeholder={
              user !== undefined
                ? '댓글을 입력해 주세요.'
                : '댓글을 입력하려면 로그인을 해주세요.'
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={user.email.length > 1 ? false : true}
          />
          <S.Button>입력</S.Button>
        </S.CommentForm>
        {data === undefined ? (
          <></>
        ) : (
          data.map((comment: IDuComment) => (
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
