import React, { useCallback, useState } from 'react';
import * as S from './style';
import { imgs } from '@images/index';
import { IDuComment, UserStateType } from '@lib/types';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { putComment, removeComment } from '@apis/apiClient';

interface Prop {
  comment: IDuComment;
  user: UserStateType;
  refetch: () => void;
}

export default function Comment({ comment, user, refetch }: Prop) {
  const parseDate = new Date(comment.createdDate);
  const [editString, setEditString] = useState('');
  const [edit, setEdit] = useState(false);

  const handle = useCallback(() => {
    setEdit((prev) => !prev);
    setEditString(comment.comment);
  }, [edit]);

  return (
    <>
      <S.CommentProfile>
        <div>
          <S.CommentImg src={imgs.userProfile} />
        </div>
        <div>
          <h1>{comment.username}</h1>
          <h3>
            {parseDate.toLocaleDateString()}
            {parseDate.toLocaleTimeString()}
          </h3>
        </div>
        {user.username === comment.username ? (
          <S.IconAlign>
            <AiFillEdit style={{ cursor: 'pointer' }} onClick={handle} />
            <AiOutlineDelete
              style={{ cursor: 'pointer' }}
              onClick={() => removeComment(comment._id).then(() => refetch())}
            />
          </S.IconAlign>
        ) : null}
      </S.CommentProfile>
      {edit ? (
        <S.EditComment>
          <textarea
            value={editString}
            onChange={(e) => setEditString(e.target.value)}
          />
          <S.Button
            onClick={async () =>
              await putComment(comment._id, {
                ...comment,
                comment: editString,
              })
                .then(() => setEdit(false))
                .then(() => refetch())
            }
          >
            수정완료
          </S.Button>
        </S.EditComment>
      ) : (
        <p>{comment.comment}</p>
      )}
    </>
  );
}
