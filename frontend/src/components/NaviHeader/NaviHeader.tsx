import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './style';
import { imgs } from '@images/index';
import { UserState } from '@lib/atom';
import { useRecoilValue } from 'recoil';
import DropDwonMenu from '../DropDownMenu';
import useGetWheter from '@hooks/useGetWheter';
import { weatherCheck } from '@lib/validation/weahterCheck';
// import { Timer } from '@components/index';
// import useTimer from '@hooks/useTimer';
// import { onRefreshToken } from '@apis/apiClient';
// import { getCookie } from '@lib/cookie/cookie';

export default function NaviHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = useRecoilValue(UserState);
  const { weather, iconUrl, iconName } = useGetWheter();
  console.log(weather, iconUrl, iconName);
  // const { timer, reset } = useTimer();

  // const extensionToken = async () => {
  //   getCookie('RefreshToken') && (await onRefreshToken().then(() => reset()));
  // };

  return (
    <>
      <S.Container>
        <S.Logo onClick={() => navigate('/')}>
          <S.LogoText>COCO</S.LogoText>
          <S.LogoImg src={imgs.wifi} />
        </S.Logo>
        <S.MenuList>
          <S.WeatherIconBox>
            <img src={weatherCheck(iconUrl, iconName)} />
          </S.WeatherIconBox>
          {/* {user.email ? (
            <div>
              <Timer timer={timer} />
              <button onClick={extensionToken}>연장</button>
            </div>
          ) : null} */}
          <S.MenuListContent
            isPathMatch={pathname === '/free-board' ? true : false}
            onClick={() => navigate('/free-board')}
          >
            자유게시판
          </S.MenuListContent>
          <S.MenuListContent
            isPathMatch={pathname === '/study-board' ? true : false}
            onClick={() => navigate('/study-board')}
          >
            스터디구인
          </S.MenuListContent>
          {user.email ? (
            <DropDwonMenu />
          ) : (
            <S.MenuListContent
              isPathMatch={pathname === '/login' ? true : false}
              onClick={() => navigate('/login')}
            >
              로그인
            </S.MenuListContent>
          )}
        </S.MenuList>
      </S.Container>
      <div style={{ height: '7rem' }} />
    </>
  );
}
