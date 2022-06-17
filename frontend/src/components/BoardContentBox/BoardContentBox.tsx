import React from 'react';
import * as S from './style';

// Import Icons
import { MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import profileImg2 from '../../images/download.jpg';
import { useNavigate } from 'react-router-dom';

interface IBoard {
  data: {
    _id: string;
    title: string;
    content: string;
    createdDate: string;
    favor: number | null;
  };
}

const BoardContentBox = ({ data }: IBoard) => {
  const navigator = useNavigate();

  return (
    <>
      <S.ContentBox onClick={() => navigator(`${data._id}`)}>
        <S.Subject>{data.title}</S.Subject>
        <S.Content>
          {data.content.length > 235
            ? `${data.content.slice(0, 235)}...`
            : data.content}
        </S.Content>
        <S.UserLogo>
          <S.UserBox>
            <S.UserImg src={profileImg2} />
            <div>
              <S.Author>{data._id}</S.Author>
              <S.Date>{data.createdDate}</S.Date>
            </div>
          </S.UserBox>
          <div style={{ display: 'flex' }}>
            <S.FavoritBox>
              <MdFavorite />
              <h4>{data.favor}</h4>
            </S.FavoritBox>
            <S.FavoritBox style={{ marginLeft: '2rem' }}>
              <AiOutlineComment />
              {/* <h4>{data.comment.length}</h4> */}
            </S.FavoritBox>
          </div>
        </S.UserLogo>
      </S.ContentBox>
    </>
  );
};

export default BoardContentBox;
