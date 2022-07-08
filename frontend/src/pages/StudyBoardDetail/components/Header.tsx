import React, { useCallback, useState } from 'react';
import * as S from '../style';
import { IDuBoardList } from '../../../lib/types/index';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import profileImg2 from '../../../images/download.jpg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FavorBoardList, UserState } from '../../../lib/atom';
import { putBoard } from '../../../apis/apiClient';

interface DataProps {
  board: IDuBoardList;
}

const Header = ({ board }: DataProps) => {
  const parseDate = new Date(board?.createdDate);
  const [like, setLike] = useState(false);
  const user = useRecoilValue(UserState);
  const [list, setList] = useRecoilState(FavorBoardList);

  const handleFavor = useCallback(async () => {
    if (user.email !== null) {
      if (!like)
        await putBoard(board._id, { ...board, favor: (board.favor += 1) })
          .then(() => setLike(true))
          .then(() => setList([...list, board]));
      if (like)
        await putBoard(board._id, { ...board, favor: (board.favor -= 1) })
          .then(() => setLike(false))
          .then(() =>
            setList(() => list.filter((item) => item._id !== board._id))
          );
    }
  }, [board, like, list, setList, user.email]);

  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          {/* 더미 더미 더미 */}
          <S.UserImg src={profileImg2} alt="noImg" />
          {/* 더미 더미 더미 */}
          <div>
            <S.Author>{board.author}</S.Author>
            <S.Date>
              {parseDate.toLocaleDateString()}
              {parseDate.toLocaleTimeString()}
            </S.Date>
          </div>
        </S.UserBox>
        <S.FavoritBox>
          {like ? (
            <MdFavorite onClick={handleFavor} />
          ) : (
            <MdOutlineFavoriteBorder onClick={handleFavor} />
          )}
          <h4>{board.favor ?? '0'}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{board.title}</S.Subject>
    </S.Header>
  );
};

export default Header;
