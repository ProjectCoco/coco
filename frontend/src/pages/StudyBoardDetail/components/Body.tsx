import React, { useState } from 'react';
import * as S from '../style';
import { IDuBoardList, IDuComment } from '@lib/types';
import { AiOutlineComment } from 'react-icons/ai';
import { postCommentApi } from '@apis/apiClient';
import { useRecoilValue } from 'recoil';
import { UserState } from '@lib/atom';
import { Viewer } from '@toast-ui/react-editor';
import Comment from '@components/Comment';

interface Prop {
  board: IDuBoardList;
  comment: IDuComment[];
  refetch: () => void;
}

export default function Body({ board, comment, refetch }: Prop) {
  const [string, setString] = useState<string>('');
  const user = useRecoilValue(UserState);

  const handleSubmit = async () => {
    const commentForm = {
      contentId: board._id,
      username: user.username,
      comment: string,
      createdDate: new Date(Date.now()).toISOString(),
    };
    await postCommentApi(commentForm).then(() => setString(''));
  };

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
        <S.CommentForm>
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
          <S.Button onClick={handleSubmit}>입력</S.Button>
        </S.CommentForm>
        {comment.map((comment) => (
          <S.ShowComment key={comment._id}>
            <Comment comment={comment} user={user} refetch={refetch} />
          </S.ShowComment>
        ))}
      </S.CommentBox>
      <S.Blank />
    </S.Body>
  );
}
