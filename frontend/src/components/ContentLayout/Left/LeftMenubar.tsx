import React from 'react';
import * as S from './style';
import {
  MdOutlineHome,
  MdOutlineFavoriteBorder,
  MdOutlineKeyboardBackspace,
} from 'react-icons/md';
import { AiOutlineComment } from 'react-icons/ai';
import { IoMdPaper } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../../lib/atom';

const LeftMenubar = () => {
  const navigator = useNavigate();

  const user = useRecoilValue(UserState);

  return (
    <S.Container>
      <S.Home>
        <MdOutlineHome onClick={() => navigator('/')} />
      </S.Home>
      <S.Favor>
        <MdOutlineFavoriteBorder onClick={() => navigator('/my-favor')} />
      </S.Favor>
      <S.LinkCommnet>
        <AiOutlineComment onClick={() => navigator('/my-comment')} />
      </S.LinkCommnet>
      <S.GoBack>
        <MdOutlineKeyboardBackspace onClick={() => navigator(-1)} />
      </S.GoBack>
      <S.Hr>
        <hr />
      </S.Hr>
      <S.Write>
        <IoMdPaper
          onClick={() => {
            user.email
              ? navigator('/study-board/write')
              : alert('글을 작성하시려면 로그인해주세요.');
          }}
        />
      </S.Write>
    </S.Container>
  );
};

export default LeftMenubar;
