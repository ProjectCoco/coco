import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from '../style';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useRecoilValue } from 'recoil';
import { UserState } from '@lib/atom';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { IDuBoardList, IDuComment } from '@lib/types/index';
import { delBoard, delFavor, removeComment, upFavor } from '@apis/apiClient';
import { imgs } from '@images/index';
interface Props {
  board: IDuBoardList;
  comment: IDuComment[];
  refetch: () => void;
}

export default function Header({ board, comment, refetch }: Props) {
  const parseDate = new Date(board?.createdDate);
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();

  const handleFavor = useCallback(async () => {
    if (user.email !== null) {
      if (!board.favorState)
        await upFavor(board._id, user.username).then(() => refetch());
      if (board.favorState)
        await delFavor(board._id, user.username).then(() => refetch());
    }
  }, [board._id, board.favorState, refetch, user.email, user.username]);

  const removeFunc = async () => {
    return await delBoard(board._id)
      .then(() => comment.forEach((item) => removeComment(item._id)))
      .then(() => navigate('/study-board'));
  };

  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          <S.UserImg src={imgs.userProfile2} alt="noImg" />
          <div>
            <S.Author>{board.username}</S.Author>
            <S.Date>
              {parseDate.toLocaleDateString()}
              {parseDate.toLocaleTimeString()}
            </S.Date>
          </div>
          {user.username === board.username ? (
            <>
              <AiFillEdit
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/study-board/edit/${board._id}`)}
              />
              <AiOutlineDelete
                style={{ cursor: 'pointer' }}
                onClick={removeFunc}
              />
            </>
          ) : null}
        </S.UserBox>
        <S.FavoritBox>
          {board.favorState ? (
            <MdFavorite onClick={handleFavor} />
          ) : (
            <MdOutlineFavoriteBorder onClick={handleFavor} />
          )}
          <h4>{board.favorCount ?? '0'}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{board.title}</S.Subject>
    </S.Header>
  );
}
