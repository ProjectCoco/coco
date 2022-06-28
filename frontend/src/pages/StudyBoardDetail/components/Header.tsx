import React, { useEffect, useState } from 'react';
import * as S from '../style';
import { IDuBoardList } from '../../../lib/types/index';
import { MdOutlineFavoriteBorder, MdFavorite } from 'react-icons/md';
// 더미데이터
import profileImg2 from '../../../images/download.jpg';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';

interface DataProps {
  board: IDuBoardList;
}

// 헤더 고쳐진거 보고 넣자
const favorPut = async (id: string, data: number) => {
  return await axios.put(
    `http://localhost:8080/api/content/${id}`,
    JSON.stringify(data)
  );
};

const Header = ({ board }: DataProps) => {
  const parseDate = new Date(board?.createdDate);
  const [like, setLike] = useState(false);
  const user = useRecoilValue(UserState);

  useEffect(() => {
    if (user.email !== null) {
      if (like) favorPut(board._id, board.favor + 1);
      else favorPut(board._id, board.favor - 1);
    }
  }, [like]);

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
          {like ? (
            <MdFavorite onClick={() => setLike(false)} />
          ) : (
            <MdOutlineFavoriteBorder onClick={() => setLike(true)} />
          )}
          <h4>{board?.favor ?? '0'}</h4>
        </S.FavoritBox>
      </S.UserLogo>
      <S.Subject>{board?.title}</S.Subject>
    </S.Header>
  );
};

export default Header;
