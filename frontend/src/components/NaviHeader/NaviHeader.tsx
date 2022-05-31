import * as S from './style';
import { useNavigate, useLocation } from 'react-router-dom';
import coco_logo from '../../images/wifi.png';
import React from 'react';
const NaviHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <S.Container>
        <S.Logo onClick={() => navigate('/')}>
          <S.LogoText>COCO</S.LogoText>
          <S.LogoImg src={coco_logo} />
        </S.Logo>
        <div>
          <S.MenuList>
            <S.MenuListContent
              isPathMatch={pathname === '/free-board' ? true : false}
            >
              자유게시판
            </S.MenuListContent>
            <S.MenuListContent
              isPathMatch={pathname === '/study-board' ? true : false}
              onClick={() => navigate('/study-board')}
            >
              스터디구인
            </S.MenuListContent>
            <S.MenuListContent
              isPathMatch={pathname === '/login' ? true : false}
              onClick={() => navigate('/login')}
            >
              로그인
            </S.MenuListContent>
          </S.MenuList>
        </div>
      </S.Container>
      <div style={{ height: '7rem' }}></div>
    </>
  );
};

export default NaviHeader;
