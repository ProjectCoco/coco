import React, { useState } from 'react';
import * as S from '../../pages/StudyBoardDetail/style';
import { IDuBoardList } from '../../dummys/dummy';
// import commentImg from '../../../images/userProfile.jpg';
import commentImg from '../../images/userProfile.jpg';
import { AiOutlineComment } from 'react-icons/ai';
import { postCommentApi } from '../../apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../lib/atom';
type DataProps = {
  data: IDuBoardList;
};

function Body({ data }: DataProps) {
  const [comment, setComment] = useState<string>('');
  const user = useRecoilValue(UserState);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentForm = {
      author: user.email,
      comment: comment,
    };
    const response = await postCommentApi(commentForm);
    console.log(response);
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setComment(e.target.value);
  }

  return (
    <S.Body>
      <S.Content>{data?.content}</S.Content>
      <S.CommentBox id="CommentBox">
        <S.CommentLength>
          <AiOutlineComment />
          <p> 댓글 </p>
        </S.CommentLength>
        <S.CommentForm onSubmit={handleSubmit}>
          <S.CommentInput
            type={'text'}
            placeholder={
              user.email.length >= 1
                ? '댓글을 입력해 주세요.'
                : '댓글을 입력하려면 로그인을 해주세요.'
            }
            onChange={handleChange}
            disabled={user.email.length > 1 ? false : true}
          />
          <S.Button>입력</S.Button>
        </S.CommentForm>
        {data?.comment.map((obj) =>
          obj.content.map((comment, idx) => (
            <S.ShowComment key={idx}>
              <S.CommentProfile>
                <div>
                  <S.CommentImg src={commentImg} />
                </div>
                <div>
                  <h1>ghks4{comment.id}</h1>
                  <h3>2022-05-22</h3>
                </div>
              </S.CommentProfile>
              <p>{comment.content}</p>
            </S.ShowComment>
          ))
        )}
      </S.CommentBox>
      <S.Blank></S.Blank>
    </S.Body>
  );
}

export default Body;
