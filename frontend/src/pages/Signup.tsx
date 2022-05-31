import React from 'react';
import styled from 'styled-components';
import selectArrow from '../images/selectArrow.png';
import { SubmitHandler, useForm } from 'react-hook-form';

type SignupInfo = {
  email: string;
  password: string;
  username: string;
  groupInfo: string;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInfo>();

  const onSubmit: SubmitHandler<SignupInfo> = (data) => console.log(data);

  return (
    <>
      <Container>
        <SignUpContainer>
          <SignUpTextBox>
            <SignUpMainText>Sign Up</SignUpMainText>
            <SignUpSubText>Sign up to join</SignUpSubText>
          </SignUpTextBox>
          <SignUpForm onSubmit={handleSubmit(onSubmit)}>
            <EmailInputBox>
              <label>EMAIL</label>
              <EmailInput
                {...register('email', {
                  required: true,
                  pattern: /\S+@\S+\.\S+/,
                  minLength: 10,
                  maxLength: 30,
                })}
                name="email"
                type="eamil"
                autoComplete="off"
              />
              {errors.email && (
                <ErrorText>이메일 형식을 확인해주세요.</ErrorText>
              )}
            </EmailInputBox>
            <PasswordInputBox>
              <label>PASSWORD</label>
              <PasswordInput
                {...register('password', {
                  required: true,
                  pattern: /(?=.*?[a-z])(?=.*?[0-9])/,
                  minLength: 8,
                  maxLength: 30,
                })}
                name="password"
                type="password"
              />
              {errors.password && (
                <ErrorText>
                  비밀번호는 8자 이상 30자 이하, 최소 1자 이상의 영문, 숫자로
                  입력해주세요.
                </ErrorText>
              )}
            </PasswordInputBox>
            <UsernameInputBox>
              <label>USERNAME</label>
              <UsernameInput
                {...register('username', {
                  required: true,
                  minLength: 2,
                })}
                name="username"
                autoComplete="off"
              />

              {errors.username && (
                <ErrorText>사용자 이름은 2자 이상 입력해주세요.</ErrorText>
              )}
            </UsernameInputBox>
            <GroupInfoInputBox>
              <label>GROUPINFO</label>
              <GroupInfoInput
                {...register('groupInfo', {
                  required: true,
                })}
                name="groupInfo"
                value="CodeStates 기수를 선택해주세요."
              >
                <option value="39">39th</option>
                <option value="40">40th</option>
                {errors.groupInfo && (
                  <ErrorText>CodeStates 기수 정보를 입력해주세요.</ErrorText>
                )}
              </GroupInfoInput>
            </GroupInfoInputBox>
            <SignUpButton>Sign Up</SignUpButton>
          </SignUpForm>
        </SignUpContainer>
      </Container>
    </>
  );
};

export default Signup;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpContainer = styled.div`
  border: 1px solid lightgray;
  padding: 6rem 4rem 8rem 4rem;
  margin-top: 6rem;
  border-radius: 1rem;
`;

const SignUpTextBox = styled.div`
  text-align: center;
`;
const SignUpMainText = styled.h1`
  font-size: 4rem;
  color: #5de0e6;
  font-weight: 500;
`;
const SignUpSubText = styled.p`
  font-size: 1.5rem;
  color: #5de0e6;
`;

const SignUpForm = styled.form`
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

const UsernameInput = styled.input`
  border: none;
  background-color: #ececec;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
`;
const UsernameInputBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
`;

const GroupInfoInput = styled.select`
  border: none;
  height: 4rem;
  border-radius: 1rem;
  padding-left: 1rem;
  background: url(${selectArrow}) no-repeat 97% 50%/1.5rem auto;
  background-color: #ececec;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;
const GroupInfoInputBox = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;

  & label {
    font-size: 1.2rem;
    color: #444;
  }
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

const SignUpButton = styled.button`
  margin-top: 4rem;
  background-color: #5de0e6;
  color: #fff;
  font-weight: 600;
  height: 4rem;
  width: 50%;
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
  font-size: 1rem;
  padding-left: 0.1rem;
  color: red;
`;
