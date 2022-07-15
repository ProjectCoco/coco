import CustomButton from '../../components/CustomButton';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Banner1 from '../../images/BannerImage.png';
import SubTitle from './components/SubTitle';
import Typewriters from './components/Typewriter';
import * as S from './style';
import Toast from '../../components/Toast/Toast';
import { useRecoilValue } from 'recoil';
import { UserState } from '../../lib/atom';

const Main = () => {
  const navigator = useNavigate();
  const [subTitleTimer, setSubTitleTimer] = useState<boolean>(false);
  const userstate = useRecoilValue(UserState);
  return (
    <S.Banner>
      <S.TextBox>
        <S.BannerTitle>
          <Typewriters setSubTitleTimer={setSubTitleTimer} />
        </S.BannerTitle>
        <SubTitle subTitleTimer={subTitleTimer} />
        <S.ButtonBox>
          <CustomButton weight="bold" onClick={() => navigator('/')}>
            자유게시판
          </CustomButton>
          <CustomButton weight="bold" onClick={() => navigator('/study-board')}>
            스터디게시판
          </CustomButton>
        </S.ButtonBox>
      </S.TextBox>
      <S.ImgBox>
        <S.BannerImg src={Banner1}></S.BannerImg>
      </S.ImgBox>
      {userstate.email ? (
        <Toast
          msg={userstate.email ? userstate.username + '님 환영합니다.' : ''}
          status="success"
        />
      ) : null}
    </S.Banner>
  );
};

export default Main;
