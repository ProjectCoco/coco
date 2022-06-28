import React from 'react';
import * as S from './style';

// Import Icons
import { MdFavorite } from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import profileImg2 from '../../images/download.jpg';
import { useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import { IDuComment } from '../../lib/types';

interface IBoard {
  board: {
    _id: string;
    author: string;
    title: string;
    content: string;
    createdDate: string;
    favor: number | null;
  };
  comment: () => Promise<unknown>;
}

const BoardContentBox = ({ board, comment }: IBoard) => {
  const navigator = useNavigate();
  const parseDate = new Date(board.createdDate);

  return (
    <>
      <S.ContentBox onClick={() => navigator(`${board._id}`)}>
        <S.Subject>{board.title}</S.Subject>
        <S.Content>
          {board.content.length > 235 ? (
            <Viewer initialValue={`${board.content.slice(0, 235)}...`} />
          ) : (
            <Viewer initialValue={board.content} />
          )}
        </S.Content>
        <S.UserLogo>
          <S.UserBox>
            <S.UserImg src={profileImg2} />
            <div>
              <S.Author>{board.author}</S.Author>
              <S.Date>
                {`${parseDate.toLocaleDateString()} `}
                {parseDate.toLocaleTimeString()}
              </S.Date>
            </div>
          </S.UserBox>
          <div style={{ display: 'flex' }}>
            <S.FavoritBox>
              <MdFavorite />
              <h4>{board.favor ?? 0}</h4>
            </S.FavoritBox>
            <S.FavoritBox style={{ marginLeft: '2rem' }}>
              <AiOutlineComment />
              <h4>{comment.length ?? 0}</h4>
            </S.FavoritBox>
          </div>
        </S.UserLogo>
      </S.ContentBox>
    </>
  );
};

export default BoardContentBox;
