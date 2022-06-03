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

const LeftMenubar = () => {
  const navigator = useNavigate();

  return (
    <S.Container>
      <S.Home>
        <MdOutlineHome onClick={() => navigator('/')} />
      </S.Home>
      <S.Favor>
        <MdOutlineFavoriteBorder />
      </S.Favor>
      <S.LinkCommnet href={'#CommentBox'}>
        <AiOutlineComment />
      </S.LinkCommnet>
      <S.GoBack>
        <MdOutlineKeyboardBackspace onClick={() => navigator(-1)} />
      </S.GoBack>
      <S.Hr>
        <hr />
      </S.Hr>
      <S.Write>
        <IoMdPaper onClick={() => navigator('/study-board-write')} />
      </S.Write>
    </S.Container>
  );
};

export default LeftMenubar;
