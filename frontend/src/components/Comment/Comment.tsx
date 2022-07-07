import React, { useState } from 'react';
import { IDuComment, UserStateType } from '../../lib/types';
import commentImg from '../../images/userProfile.jpg';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { putComment, removeComment } from '../../apis/apiClient';
import * as S from './style';

interface Prop {
  comment: IDuComment;
  user: UserStateType;
}

export default function Comment({ comment, user }: Prop) {
  const [editString, setEditString] = useState('');
  const [edit, setEdit] = useState(false);

  return (
    <>
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
            <AiFillEdit
              style={{ cursor: 'pointer' }}
              onClick={() => setEdit((prev) => !prev)}
            />
            <AiOutlineDelete
              style={{ cursor: 'pointer' }}
              onClick={() => removeComment(comment._id)}
            />
          </S.IconAlign>
        ) : (
          <></>
        )}
      </S.CommentProfile>
      {edit ? (
        <S.EditComment>
          <textarea
            value={comment.comment || editString}
            onChange={(e) => setEditString(e.target.value)}
          />
          <S.Button
            onClick={async () =>
              await putComment(comment._id, {
                ...comment,
                comment: editString,
              })
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
