import { postLoginApi } from '../apis/apiClient';
import React, { useState } from 'react';
import styled from 'styled-components';
import ImgSrc from '../images/Login_logo.png';
import { Link } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

const Login = () => {
  const [formdata, setFormData] = useState<IFormInput>({
    email: '',
    password: '',
  });

  const [errorText, setErrorText] = useState<string>('');

  function handleValidation(formData: IFormInput): boolean {
    let email_check = false;
    let password_check = false;

    // 이메일 유효성 검사
    // 길이가 10자 이상 30자 이하
    // [@ , .] 이 무조건 들어있어야 통과
    if (formData.email.length >= 10 && formData.email.length <= 30) {
      const mailformat =
        /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
      if (mailformat.test(formData.email)) {
        email_check = true;
      }
    }

    // 패스워드 유효성 검사
    // 길이가 8자 이상 30자 이하
    // 영어 [대문자 , 숫자] 무조건 조합이 되어야 통과
    if (formData.password.length >= 8 && formData.password.length <= 30) {
      const mailformat = /(?=.?[a-z])(?=.?[0-9])/;
      if (mailformat.test(formData.password)) {
        password_check = true;
      }
    }

    // 이메일 패스워드 유효성 성공 시 true 반환, 아니면 false 반환
    if (password_check === false || email_check === false) {
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = handleValidation(formdata);
    if (result === false)
      setErrorText(
        'email 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 email 입니다.'
      );
    else setErrorText('');
    if (result) {
      const response = await postLoginApi(formdata);
      console.log(response);
      // 만약 response 성공이라면 리 다이렉트
      // TODO {}
      // 만약 response 실패라면
      // TODO {}
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }
  return (
    <LoginContainer>
      <LoginImgBox>
        <LoginImg src={ImgSrc} />
      </LoginImgBox>
      <LoginTextBox>
        <LoginMainText>Login</LoginMainText>
        <LoginSubText>Sign in to continue</LoginSubText>
      </LoginTextBox>
      <LoginForm onSubmit={handleSubmit}>
        <EmailInputBox>
          <label>EMAIL</label>
          <EmailInput name={'email'} type={'email'} onChange={handleChange} />
        </EmailInputBox>
        <PasswordInputBox>
          <label>PASSWORD</label>
          <PasswordInput
            type={'password'}
            name="password"
            autoComplete="off"
            onChange={handleChange}
          />
        </PasswordInputBox>
        <ErrorText>{errorText}</ErrorText>
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
