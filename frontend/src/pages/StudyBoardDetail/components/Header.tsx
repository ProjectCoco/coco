import React from 'react';
import * as S from '../style';
import { IDuBoardList } from '../../../lib/types/index';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
// 더미데이터
import profileImg2 from '../../../images/download.jpg';
import mainImg from '../../../images/mainImg.jpg';

type DataProps = {
  data: IDuBoardList;
};

function Header({ data }: DataProps) {
  const parseDate = new Date(data.createdDate);

  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          {/* 더미 더미 더미 */}
          <S.UserImg src={profileImg2} alt="noImg" />
          {/* 더미 더미 더미 */}
          <div>
            <S.Author>{data.author}</S.Author>
            <S.Date>
              {parseDate.toLocaleDateString()}
              {parseDate.toLocaleTimeString()}
            </S.Date>
          </div>
        </S.UserBox>
        <S.FavoritBox>
          {data.favor ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
          <h4>{data.favor === null ? '0' : data.favor}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{data.title}</S.Subject>
      {/* 더미 더미 더미 */}
      <S.MainImg src={mainImg} />
      {/* 더미 더미 더미 */}
    </S.Header>
  );
}

export default Header;
