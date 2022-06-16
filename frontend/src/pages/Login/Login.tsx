import React from 'react';
import ImgSrc from '../../images/Login_logo.png';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';
import * as S from './style';

const Login = () => {
  return (
    <S.LoginContainer>
      <S.LoginImgBox>
        <S.LoginImg src={ImgSrc} />
      </S.LoginImgBox>
      <S.LoginTextBox>
        <S.LoginMainText>Login</S.LoginMainText>
        <S.LoginSubText>Sign in to continue</S.LoginSubText>
      </S.LoginTextBox>
      <LoginForm />
      <S.ForgotBox>
        <Link to="/signup">회원가입</Link> |
        <Link to="/">아이디 · 패스워드 찾기 </Link>
      </S.ForgotBox>
    </S.LoginContainer>
  );
};

export default Login;
