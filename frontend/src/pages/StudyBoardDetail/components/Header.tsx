import React, { useEffect } from 'react';
import * as S from '../style';
import { IDuBoardList } from '../../../lib/types/index';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
// 더미데이터
import profileImg2 from '../../../images/download.jpg';
import Loading from '../../../components/Loading';

interface DataProps {
  board: IDuBoardList;
}

const Header = ({ board }: DataProps) => {
  const parseDate = new Date(board?.createdDate);

  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          {/* 더미 더미 더미 */}
          <S.UserImg src={profileImg2} alt="noImg" />
          {/* 더미 더미 더미 */}
          <div>
            <S.Author>{board?.author}</S.Author>
            <S.Date>
              {parseDate.toLocaleDateString()}
              {parseDate.toLocaleTimeString()}
            </S.Date>
          </div>
        </S.UserBox>
        <S.FavoritBox>
          {board?.favor ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
          <h4>{board?.favor === null ? '0' : board?.favor}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{board?.title}</S.Subject>
    </S.Header>
  );
};

export default Header;
