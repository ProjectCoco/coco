import CustomButton from '../../components/CustomButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner1 from '../../images/BannerImage.png';
import SubTitle from './components/SubTitle';
import Typewriters from './components/Typewriter';
import * as S from './style';

const Main = () => {
  const navigator = useNavigate();
  const [subTitleTimer, setSubTitleTimer] = useState<boolean>(false);
  return (
    <S.Banner>
      <S.TextBox>
        <S.BannerTitle>
          <Typewriters setSubTitleTimer={setSubTitleTimer} />
        </S.BannerTitle>
        <SubTitle subTitleTimer={subTitleTimer} />
        <S.ButtonBox>
          <CustomButton onClick={() => navigator('/')}>스디게시판</CustomButton>
          <CustomButton onClick={() => navigator('/study-board')}>
            자유게시판
          </CustomButton>
        </S.ButtonBox>
      </S.TextBox>
      <S.ImgBox>
        <S.BannerImg src={Banner1}></S.BannerImg>
      </S.ImgBox>
    </S.Banner>
  );
};

export default Main;
