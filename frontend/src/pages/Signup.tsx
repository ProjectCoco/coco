import { postSignupApi } from '../apis/apiClient';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import selectArrow from '../images/selectArrow.png';

type SignupInfo = {
  email: string;
  password: string;
  passwordConfirm: string;
  username: string;
  groupInfo: string;
};

const Signup = () => {
  const [signupData, setSignupData] = useState<SignupInfo>({
    email: '',
    password: '',
    passwordConfirm: '',
    username: '',
    groupInfo: '',
  });

  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwrodMessage, setPasswrodMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] =
    useState<string>('');
  const [usernameMessage, setUsernameMessage] = useState<string>('');
  const [groupInfoMessage, setGroupInfoMessage] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignupData({ ...signupData, [event?.target.name]: event?.target.value });
  };

  const handleGroupInfoChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSignupData({ ...signupData, groupInfo: event.target.value });
  };

  const isValid = (signupData: SignupInfo) => {
    const emailFormat =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const passwordFormat = /(?=.?[a-z])(?=.?[0-9])/;
    const usernameFormat = /^(?=.*[a-z0-9가-힣])[a-z0-9가-힣]{2,16}$/;

    const { email, password, passwordConfirm, username, groupInfo } =
      signupData;

    let isValidEmail = false;
    let isValidPassword = false;
    let isValidPasswordConfirm = false;
    let isValidUsername = false;
    let isValidGroupInfo = false;

    // 이메일 유효성 검사
    // 길이 10자 이상 30자 이하, [@ , .] 이 포함되어야 통과
    if (!emailFormat.test(email) || email.length < 10 || email.length > 30) {
      setEmailMessage('이메일 형식을 확인해주세요.');
    } else {
      setEmailMessage('');
      isValidEmail = true;
    }

    // 비밀번호 유효성 검사
    // 길이 8자 이상 30자 이하, 영문 소문자, 숫자가 최소 1자 이상 포함되어야 통과
    if (
      !passwordFormat.test(password) ||
      password.length < 8 ||
      password.length > 30
    ) {
      setPasswrodMessage(
        '비밀번호는 영문 소문자, 숫자를 포함하여 8자 이상 30자 이하로 입력해주세요.'
      );
    } else {
      setPasswrodMessage('');
      isValidPassword = true;
    }

    // 비밀번호 확인 유효성 검사
    // 길이 8자 이상 30자 이하, 영문 소문자, 숫자가 최소 1자 이상 포함 && 비밀번호와 일치해야 통과
    if (passwordConfirm.length < 1) {
      setPasswordConfirmMessage(
        '비밀번호는 영문 소문자, 숫자를 포함하여 8자 이상 30자 이하로 입력해주세요.'
      );
    } else if (password !== passwordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmMessage('');
      isValidPasswordConfirm = true;
    }

    // 사용자 이름 유효성 검사
    // 영문 또는 한글 또는 숫자 포함하여 길이 2자 이상 16자 이하로 작성되어야 통과
    if (
      username.length < 2 ||
      username.length > 16 ||
      !usernameFormat.test(username)
    ) {
      setUsernameMessage(
        '유저이름은 영문 또는 숫자 또는 한글을 포함하여 2자 이상 16자 이하로 입력해주세요.'
      );
    } else {
      setUsernameMessage('');
      isValidUsername = true;
    }

    // 그룹 정보 유효성 검사
    // 길이가 최소 1자 이상이여야 통과
    if (groupInfo.length < 1) {
      setGroupInfoMessage('기수 정보를 입력해주세요.');
    } else {
      setGroupInfoMessage('');
      isValidGroupInfo = true;
    }

    if (
      isValidEmail &&
      isValidPassword &&
      isValidPasswordConfirm &&
      isValidUsername &&
      isValidGroupInfo
    ) {
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (isSubmitted) {
      isValid(signupData);
    }
  }, [signupData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (isValid(signupData)) {
      const response = await postSignupApi(signupData);
      console.log(response, signupData);
      // TODO: response 성공, 실패
    }
  };

  return (
    <>
      <Container>
        <SignUpContainer>
          <SignUpTextBox>
            <SignUpMainText>Sign Up</SignUpMainText>
            <SignUpSubText>Sign up to join</SignUpSubText>
          </SignUpTextBox>
          <SignUpForm onSubmit={handleSubmit}>
            <EmailInputBox>
              <label>EMAIL</label>
              <EmailInput
                name="email"
                type="eamil"
                value={signupData.email}
                autoComplete="off"
                onChange={handleChange}
              />
              <ErrorText>{emailMessage}</ErrorText>
            </EmailInputBox>
            <PasswordInputBox>
              <label>PASSWORD</label>
              <PasswordInput
                name="password"
                type="password"
                value={signupData.password}
                autoComplete="off"
                onChange={handleChange}
              />
              <ErrorText>{passwrodMessage}</ErrorText>
            </PasswordInputBox>
            <PasswordInputBox>
              <label>CONFIRM PASSWORD</label>
              <PasswordInput
                name="passwordConfirm"
                type="password"
                value={signupData.passwordConfirm}
                autoComplete="off"
                onChange={handleChange}
              />
              <ErrorText>{passwordConfirmMessage}</ErrorText>
            </PasswordInputBox>
            <UsernameInputBox>
              <label>USERNAME</label>
              <UsernameInput
                name="username"
                value={signupData.username}
                onChange={handleChange}
                autoComplete="off"
              />
              <ErrorText>{usernameMessage}</ErrorText>
            </UsernameInputBox>
            <GroupInfoInputBox>
              <label>GROUPINFO</label>
              <GroupInfoInput
                name="groupInfo"
                value={signupData.groupInfo}
                onChange={handleGroupInfoChange}
              >
                <option value="">선택</option>
                <option value="39">39th</option>
                <option value="40">40th</option>
              </GroupInfoInput>
              <ErrorText>{groupInfoMessage}</ErrorText>
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
