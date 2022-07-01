import React from 'react';
import { IoIosLock } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import * as S from './style';

interface IMessage {
  message: string;
}

const AccessWarning = ({ message }: IMessage) => {
  const navigate = useNavigate();
  return (
    <S.PageContainer>
      <S.ContentContainer>
        <S.IconContainer>
          <IoIosLock />
        </S.IconContainer>
        <S.MessageBox>{message}</S.MessageBox>
        <S.SubmessageBox>
          해당 페이지를 이용하시려면 로그인해주세요.
        </S.SubmessageBox>
        <S.ButtonContainter>
          <S.NavigateButton onClick={() => navigate(-1)}>
            이전 페이지로
          </S.NavigateButton>
          <S.NavigateButton onClick={() => navigate('/login')}>
            로그인 페이지로
          </S.NavigateButton>
        </S.ButtonContainter>
      </S.ContentContainer>
    </S.PageContainer>
  );
};

export default AccessWarning;
