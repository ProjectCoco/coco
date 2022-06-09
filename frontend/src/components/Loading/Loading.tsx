import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingGif from '../../images/loading_wifi.gif';
import * as S from './style';
function Loading() {
  const [time, setTime] = useState<boolean>(false);
  const navigate = useNavigate();
  if (time) navigate('/');

  useEffect(() => {
    setTimeout(() => {
      setTime(true);
    }, 10000);
  }, []);

  return (
    <S.LoadingContainer>
      <S.LoadingImg src={LoadingGif} />
      <S.TitleBox>
        <S.LoadingTitle>Loading</S.LoadingTitle>
        <S.DotBox>
          <S.RepeatDot></S.RepeatDot>
          <S.RepeatDot></S.RepeatDot>
          <S.RepeatDot></S.RepeatDot>
        </S.DotBox>
      </S.TitleBox>
    </S.LoadingContainer>
  );
}

export default Loading;
