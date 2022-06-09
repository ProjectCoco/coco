import React from 'react';
import * as S from '../style';
import { IDuBoardList } from '../../../dummys/dummy';
import profileImg2 from '../../../images/download.jpg';
import mainImg from '../../../images/mainImg.jpg';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';

type DataProps = {
  data: IDuBoardList;
};

function Header({ data }: DataProps) {
  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          <S.UserImg src={profileImg2} />
          <div>
            <S.Author>{data?.author}</S.Author>
            <S.Date>{data?.datetime}</S.Date>
          </div>
        </S.UserBox>
        <S.FavoritBox>
          {data?.favor ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
          <h4>{data?.favor}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{data?.subject}</S.Subject>
      <S.MainImg src={mainImg} />
    </S.Header>
  );
}

export default Header;
