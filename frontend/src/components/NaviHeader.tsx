import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import coco_logo from '../images/wifi.png';
import React from 'react';
const NaviHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <Container>
        <Logo onClick={() => navigate('/')}>
          <LogoText>COCO</LogoText>
          <LogoImg src={coco_logo} />
        </Logo>
        <div>
          <MenuList>
            <MenuListContent
              isPathMatch={pathname === '/free-board' ? true : false}
            >
              자유게시판
            </MenuListContent>
            <MenuListContent
              isPathMatch={pathname === '/study-board' ? true : false}
              onClick={() => navigate('/study-board')}
            >
              스터디구인
            </MenuListContent>
            <MenuListContent
              isPathMatch={pathname === '/login' ? true : false}
              onClick={() => navigate('/login')}
            >
              로그인
            </MenuListContent>
          </MenuList>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  height: 7rem;
  border-bottom: 0.1rem solid lightgray;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  margin-left: 1rem;
  cursor: pointer;
  display: flex;
`;

const LogoText = styled.p`
  font-size: 3rem;
  font-weight: bold;
  color: #444;
  caret-color: rgba(0, 0, 0, 0);
`;

const LogoImg = styled.img`
  width: 2.5rem;
  height: 2.5rem;
`;

const MenuList = styled.ul`
  display: flex;
`;
const MenuListContent = styled.li<{ isPathMatch: boolean }>`
  margin-right: 1rem;
  font-size: 1.2rem;
  cursor: pointer;
  caret-color: rgba(0, 0, 0, 0);

  color: ${(prop) => (prop.isPathMatch ? '#56b6e7' : 'black')};
`;

export default NaviHeader;
