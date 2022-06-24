import React from 'react';
import * as S from './style';

// Import Icons
import { MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import profileImg2 from '../../images/download.jpg';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';

interface IBoard {
  board: {
    _id: string;
    author: string;
    title: string;
    content: string;
    createdDate: string;
    favor: number | null;
  };
}

const BoardContentBox = ({ board }: IBoard) => {
  const navigator = useNavigate();
  const fetchComment = async () => {
    const res = await fetch(`http://localhost:8080/comment/${board._id}`);
    return res.json();
  };
  const { data } = useQuery('comment', fetchComment);
  const parseDate = new Date(board.createdDate);

  return (
    <>
      <S.ContentBox onClick={() => navigator(`${board._id}`)}>
        <S.Subject>{board.title}</S.Subject>
        <S.Content>
          {board.content.length > 235
            ? `${board.content.slice(0, 235)}...`
            : board.content}
        </S.Content>
        <S.UserLogo>
          <S.UserBox>
            <S.UserImg src={profileImg2} />
            <div>
              <S.Author>{board.author}</S.Author>
              <S.Date>
                {parseDate.toLocaleDateString()}.
                {parseDate.toLocaleTimeString()}
              </S.Date>
            </div>
          </S.UserBox>
          <div style={{ display: 'flex' }}>
            <S.FavoritBox>
              <MdFavorite />
              {board.favor !== null ? <h4>{board.favor}</h4> : <h4>0</h4>}
            </S.FavoritBox>
            <S.FavoritBox style={{ marginLeft: '2rem' }}>
              <AiOutlineComment />
              {data !== undefined ? <h4>{data.length}</h4> : <h4>0</h4>}
            </S.FavoritBox>
          </div>
        </S.UserLogo>
      </S.ContentBox>
    </>
  );
};

export default BoardContentBox;
