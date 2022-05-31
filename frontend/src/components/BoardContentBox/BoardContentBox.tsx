import React from 'react';
import * as S from './style';

// Import Icons
import { MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import profileImg2 from '../../images/download.jpg';
import { IDuBoardList } from '../../dummys/dummy';
import { useNavigate } from 'react-router-dom';

interface Prop {
  data: IDuBoardList;
}

const BoardContentBox = ({ data }: Prop) => {
  const navigator = useNavigate();

  return (
    <>
      <S.ContentBox onClick={() => navigator(`${data.id}`)}>
        <S.Subject>{data.subject}</S.Subject>
        <S.Content>
          {data.content.length > 235
            ? `${data.content.slice(0, 235)}...`
            : data.content}
        </S.Content>
        <S.UserLogo>
          <S.UserBox>
            <S.UserImg src={profileImg2} />
            <div>
              <S.Author>{data.author}</S.Author>
              <S.Date>{data.datetime}</S.Date>
            </div>
          </S.UserBox>
          <div style={{ display: 'flex' }}>
            <S.FavoritBox>
              <MdFavorite />
              <h4>{data.favor}</h4>
            </S.FavoritBox>
            <S.FavoritBox style={{ marginLeft: '2rem' }}>
              <AiOutlineComment />
              <h4>{data.comment.length}</h4>
            </S.FavoritBox>
          </div>
        </S.UserLogo>
      </S.ContentBox>
    </>
  );
};

export default BoardContentBox;
