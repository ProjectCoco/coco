import { removeCookie } from '../../lib/cookie/cookie';
import React, { useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { UserState } from '../../lib/atom';
import { useNavigate } from 'react-router-dom';
import { CgProfile, CgLogOut, CgClose } from 'react-icons/cg';
import { onRemoveToken } from '../../apis/apiClient';

function DropDwonMenu() {
  const [isDrop, setIsDrop] = useState<boolean>(false);
  const SetUserInfo = useSetRecoilState(UserState);
  const navigate = useNavigate();

  function handleDrop() {
    setIsDrop((pre) => !pre);
  }

  function handleUserProfile() {
    navigate('/profile');
  }

  // LogOut
  async function handleLogOut() {
    // 1. 아톰 전역 유저 정보 초기화
    SetUserInfo({
      email: '',
      exp: 0,
      sub: '',
      profileImg: '',
      username: '',
    });
    await onRemoveToken();
    removeCookie('accessToken'); // 2. 쿠키에서 토큰 삭제
    removeCookie('RefreshToken'); // 2. 쿠키에서 토큰 삭제
    navigate('/'); // ( 유저정보 초기화 , 토큰삭제 ) 했으면 홈으로 리 다이렉트
    location.reload(); // 토큰값 제대로 없애기 위해서 새로고침 (그냥 리다이렉트만 된 상태면 토큰이 제대로 안사라져있음)
  }

  return (
    <UserIcon onClick={handleDrop}>
      <AiOutlineUser className="DropMenu" />
      {isDrop ? (
        <DropMenu>
          <DropMenuList onClick={handleUserProfile}>
            <CgProfile /> Profile
          </DropMenuList>
          <DropMenuList onClick={handleLogOut}>
            <CgLogOut />
            LogOut
          </DropMenuList>
          <DropMenuList>
            <CgClose /> Exit
          </DropMenuList>
        </DropMenu>
      ) : null}
    </UserIcon>
  );
}

export default DropDwonMenu;

const UserIcon = styled.div`
  position: relative;
  font-size: 1.6rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const DropMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  padding-left: 1.2rem;
  width: 90%;

  &:hover {
    background-color: #5de0e6;
    color: white;
  }
`;
