import React from 'react';
import * as S from './style';

// Import Icons
import { MdFavorite, MdOutlineFavoriteBorder } from 'react-icons/md';
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

const FreeBoardContentBox = ({ board }: IBoard) => {
  const navigator = useNavigate();
  const fetchComment = async () => {
    const res = await fetch(`http://localhost:8080/api/comment/${board._id}`);
    console.log(res.json());
    return res.json();
  };
  const { data } = useQuery('comment', fetchComment);
  const parseDate = new Date(+new Date(board.createdDate) + 3240 * 10000)
    .toISOString()
    .replace('T', ' ')
    .replace(/\..*/, '')
    .slice(0, -3);

  return (
    <>
      <S.ContentBox onClick={() => navigator(`${board._id}`)}>
        <S.Subject>{board.title}</S.Subject>
        <S.Content>
          {board.content.length > 110
            ? `${board.content.slice(0, 110)}...`
            : board.content}
        </S.Content>
        <S.UserLogo>
          <S.UserBox>
            <S.UserImg src={profileImg2} />
            <div>
              <S.Author>{board.author}</S.Author>
              <S.Date>{parseDate}</S.Date>
            </div>
          </S.UserBox>
          <div style={{ display: 'flex' }}>
            <S.FavoritBox>
              <MdOutlineFavoriteBorder />
              {/* find 메서드로 좋아요 누른 리스트에 id가 있으면 MdFavorite 반환, 아니면 MdOutlineFavoriteBorder 반환 */}
              {board.favor !== null ? <h4>{board.favor}</h4> : <h4>0</h4>}
            </S.FavoritBox>
            <S.CommentBox style={{ marginLeft: '2rem' }}>
              <AiOutlineComment />
              {data !== undefined ? <h4>{data.length}</h4> : <h4>0</h4>}
            </S.CommentBox>
          </div>
        </S.UserLogo>
      </S.ContentBox>
    </>
  );
};

export default FreeBoardContentBox;
