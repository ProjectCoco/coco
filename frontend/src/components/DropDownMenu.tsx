import { removeCookie } from '../lib/cookie/cookie';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserState } from '../lib/atom';
import { useNavigate } from 'react-router-dom';

function DropDwonMenu() {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const SetUserInfo = useSetRecoilState(UserState);
  const navigate = useNavigate();

  function handleDrop() {
    setIsDrop((pre) => !pre);
  }

  // LogOut
  function handleLogOut() {
    // 1. 아톰 전역 유저 정보 초기화
    SetUserInfo({
      email: '',
      exp: 0,
      sub: '',
    });
    removeCookie('accessToken'); // 2. 쿠키에서 토큰 삭제
    navigate('/'); // ( 유저정보 초기화 , 토큰삭제 ) 했으면 홈으로 리 다이렉트
  }

  return (
    <UserIcon onClick={handleDrop}>
      <AiOutlineUser className="DropMenu" />
      {isDrop ? (
        <DropMenu>
          <DropMenuList>프로필 수정</DropMenuList>
          <DropMenuList onClick={handleLogOut}>로그아웃</DropMenuList>
          <DropMenuList>X</DropMenuList>
        </DropMenu>
      ) : null}
    </UserIcon>
  );
}

export default DropDwonMenu;

const UserIcon = styled.div`
  position: relative;
  font-size: 2rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const DropMenu = styled.div`
  position: absolute;
  width: 10rem;
  right: 0.2rem;
  background-color: white;
  -webkit-box-shadow: -2px -1px 29px -7px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: -2px -1px 29px -7px rgba(0, 0, 0, 0.24);
  box-shadow: -2px -1px 29px -7px rgba(0, 0, 0, 0.24);
`;

const DropMenuList = styled.div`
  font-size: 1.5rem;
  color: #444;
`;
