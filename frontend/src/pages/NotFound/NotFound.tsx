import CustomButton from '../../components/CustomButton';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImgSrc from '../../images/404.png';
import * as S from './style';
function NotFound() {
  const navigate = useNavigate();
  return (
    <S.NotFoundCotainer>
      <S.NotFoundBox>
        <S.NotFoundImg src={NotFoundImgSrc} />
        <CustomButton
          bgColor="skyblue"
          color="white"
          width="18rem"
          height="5rem"
          onClick={() => navigate('/')}
        >
          Go Home !!
        </CustomButton>
      </S.NotFoundBox>
    </S.NotFoundCotainer>
  );
}

export default NotFound;
