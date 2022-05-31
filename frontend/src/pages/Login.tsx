import { postLoginApi } from '../apis/apiClient';
import React from 'react';
import styled from 'styled-components';
import ImgSrc from '../images/Login_logo.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await postLoginApi(data);
    console.log(response);
  };
  return (
    <LoginContainer>
      <LoginImgBox>
        <LoginImg src={ImgSrc} />
      </LoginImgBox>
      <LoginTextBox>
        <LoginMainText>Login</LoginMainText>
        <LoginSubText>Sign in to continue</LoginSubText>
      </LoginTextBox>
      <LoginForm onSubmit={handleSubmit(onSubmit)}>
        <EmailInputBox>
          <label>EMAIL</label>
          <EmailInput
            {...register('email', {
              required: true,
              pattern: /\S+@\S+.\S+/,
              minLength: 10,
              maxLength: 30,
            })}
            name={'email'}
            type={'email'}
          />
        </EmailInputBox>
        <PasswordInputBox>
          <label>PASSWORD</label>
          <PasswordInput
            {...register('password', {
              required: true,
              pattern: /(?=.?[a-z])(?=.?[0-9])/,
              maxLength: 30,
              minLength: 8,
            })}
            type={'password'}
            name="password"
            autoComplete="off"
          />
        </PasswordInputBox>
        <ErrorText>
          {errors.password && '이메일 또는 비밀번호를 확인하세요'}
        </ErrorText>
        <LoginButton>Login</LoginButton>
      </LoginForm>
      <ForgotBox>
        <Link to={'/signup'}>회원가입</Link> |
        <Link to={'/'}>아이디 · 패스워드 찾기 </Link>
      </ForgotBox>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginImgBox = styled.div`
  margin-top: 2rem;
  caret-color: rgba(0, 0, 0, 0);
`;
const LoginImg = styled.img``;
const LoginTextBox = styled.div`
  text-align: center;
`;
const LoginMainText = styled.h1`
  font-size: 4rem;
  color: #5de0e6;
  font-weight: 500;
`;
const LoginSubText = styled.p`
  font-size: 1.5rem;
  color: #5de0e6;
`;

const LoginForm = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 35rem;
`;

const EmailInputBox = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;
const EmailInput = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;
const PasswordInputBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;
const PasswordInput = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;
const LoginButton = styled.button`
  margin-top: 3rem;
  background-color: #5de0e6;
  color: #fff;
  height: 4rem;
  width: 50%;
  font-weight: 600;
  margin-left: 25%;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  font-size: 1.5rem;

  &:hover {
    transform: scale(0.98);
  }
`;

const ErrorText = styled.p`
  margin-top: 0.1rem;
  color: red;
`;

const ForgotBox = styled.div`
  margin-top: 2rem;

  & a {
    color: #444;

    text-decoration: none;
  }

  & a:first-child {
    padding-right: 1rem;
  }

  & a:last-child {
    padding-left: 1rem;
  }
`;
