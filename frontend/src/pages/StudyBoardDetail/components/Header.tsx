import React, { useCallback, useState } from 'react';
import * as S from '../style';
import { IDuBoardList, IDuComment } from '../../../lib/types/index';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
import profileImg2 from '../../../images/download.jpg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { FavorBoardList, UserState } from '../../../lib/atom';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { removeComment } from '../../../apis/apiClient';

import axios, { AxiosRequestHeaders } from 'axios';
import { getCookie } from '../../../lib/cookie/cookie';

interface DataProps {
  board: IDuBoardList;
  comment: IDuComment[];
}

const headers: AxiosRequestHeaders = {
  Authorization: `Bearer ${getCookie('accessToken')}`,
};

const upFavor = async (id: string, username: string) => {
  return await axios.post(
    `http://localhost:8080/api/content/${id}/favor/${username}`,
    { headers }
  );
};
const delFavor = async (id: string, username: string) => {
  return await axios.delete(
    `http://localhost:8080/api/content/${id}/favor/${username}`,
    { headers }
  );
};
const delBoard = async (id: string) => {
  return await axios.delete(`http://localhost:8080/api/content/${id}`, {
    headers,
  });
};

const Header = ({ board, comment }: DataProps) => {
  const parseDate = new Date(board?.createdDate);
  const [like, setLike] = useState(false);
  const user = useRecoilValue(UserState);
  const [list, setList] = useRecoilState(FavorBoardList);
  const navigate = useNavigate();

  const handleFavor = useCallback(async () => {
    if (user.email !== null) {
      if (!like)
        await upFavor(board._id, user.username)
          .then(() => setLike(true))
          .then(() => setList([...list, board]));
      if (like)
        await delFavor(board._id, user.username)
          .then(() => setLike(false))
          .then(() =>
            setList(() => list.filter((item) => item._id !== board._id))
          );
    }
  }, [like]);

  const removeFunc = async () => {
    return await delBoard(board._id)
      .then(() => comment.forEach((item) => removeComment(item._id)))
      .then(() => navigate('/study-board'));
  };

  return (
    <S.Header>
      <S.UserLogo>
        <S.UserBox>
          <S.UserImg src={profileImg2} alt="noImg" />
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
